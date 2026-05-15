import { createServer } from 'node:http';
import { stat, open } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, normalize, sep, extname } from 'node:path';

const ROOT = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.mjs':  'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.txt':  'text/plain; charset=utf-8',
  '.mp4':  'video/mp4',
  '.webm': 'video/webm',
  '.mov':  'video/quicktime',
};

const STREAM_TYPES = new Set(['.mp4', '.webm', '.mov']);

async function resolvePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const cleaned = decoded.replace(/^\/+/, '');
  const candidate = normalize(join(ROOT, cleaned));
  if (!candidate.startsWith(ROOT + sep) && candidate !== ROOT) return null;
  try {
    const s = await stat(candidate);
    if (s.isDirectory()) {
      const indexPath = join(candidate, 'index.html');
      const si = await stat(indexPath).catch(() => null);
      return si && si.isFile() ? { path: indexPath, size: si.size } : null;
    }
    return s.isFile() ? { path: candidate, size: s.size } : null;
  } catch {
    return null;
  }
}

// Parse a single-range "bytes=START-END" header. Returns null if absent or invalid.
function parseRange(header, total) {
  if (!header || !header.startsWith('bytes=')) return null;
  const spec = header.slice(6).split(',')[0].trim();
  const m = /^(\d*)-(\d*)$/.exec(spec);
  if (!m) return null;
  let start = m[1] === '' ? null : Number(m[1]);
  let end = m[2] === '' ? null : Number(m[2]);
  if (start === null && end === null) return null;
  if (start === null) { // suffix: last N bytes
    start = Math.max(0, total - end);
    end = total - 1;
  } else if (end === null) {
    end = total - 1;
  }
  if (Number.isNaN(start) || Number.isNaN(end) || start > end || start >= total) {
    return { invalid: true };
  }
  if (end >= total) end = total - 1;
  return { start, end };
}

const server = createServer(async (req, res) => {
  try {
    const resolved = await resolvePath(req.url || '/');
    if (!resolved) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }
    const { path: filePath, size } = resolved;
    const ext = extname(filePath).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';

    // For video files, honor HTTP Range requests so the browser can seek
    // and only fetch the bytes it needs. Without this, even preload="metadata"
    // pulls the whole file.
    if (STREAM_TYPES.has(ext)) {
      const range = parseRange(req.headers.range, size);
      if (range && range.invalid) {
        res.writeHead(416, {
          'Content-Range': `bytes */${size}`,
          'Content-Type': 'text/plain; charset=utf-8',
        });
        res.end('Range Not Satisfiable');
        return;
      }
      if (range) {
        const { start, end } = range;
        res.writeHead(206, {
          'Content-Type': type,
          'Content-Length': end - start + 1,
          'Content-Range': `bytes ${start}-${end}/${size}`,
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'no-store',
        });
        createReadStream(filePath, { start, end }).pipe(res);
        return;
      }
      // No Range header: stream the whole file but advertise Accept-Ranges
      res.writeHead(200, {
        'Content-Type': type,
        'Content-Length': size,
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'no-store',
      });
      createReadStream(filePath).pipe(res);
      return;
    }

    // Static files: read fully (small)
    const fh = await open(filePath, 'r');
    try {
      const data = await fh.readFile();
      res.writeHead(200, {
        'Content-Type': type,
        'Cache-Control': 'no-store',
      });
      res.end(data);
    } finally {
      await fh.close();
    }
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Internal error: ' + err.message);
  }
});

server.listen(PORT, () => {
  console.log(`Don Cubano dev server: http://localhost:${PORT}`);
});
