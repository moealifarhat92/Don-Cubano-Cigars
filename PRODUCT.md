# Product

## Register

brand

## Users

The primary visitor is an owner-operator of an independent Canadian cigar shop or tobacconist evaluating a new wholesale supplier. They are the buyer, the merchandiser, and the person on the phone with reps — not a corporate procurement team and not a consumer. They land here while doing a B2B sourcing decision: comparing wholesalers, weighing whether a small Windsor-based house is credible enough to call.

The single job to be done on this site is assess credibility, then submit the trade-enquiry form (or call) to receive the private catalogue and case-pricing sheet. There is no e-commerce, no logged-in portal, no public pricing. A successful visit ends with a form submission from someone who could plausibly become a wholesale account.

## Product Purpose

A marketing surface for Don Cubano Cigars, a family-owned wholesale cigar house operating from Windsor, Ontario since 2008. The site exists to convert credibility into trade enquiries from independent Canadian retailers.

Success is binary at the page level: a real retailer reads enough to feel "these are serious people who will still be here in five years," and they fill out the form. Volume of submitted enquiries is the operational metric; quality of those enquiries (do they convert to wholesale accounts) is the business metric.

The site is not a brochure, not a catalogue, and not a consumer shop. It is closer to a trade house's calling card.

## Brand Personality

Three words: quiet, confident, family-trade.

Voice is plainspoken and competent. The tone of a long-running wholesale house talking to a peer, not a lifestyle brand performing for a customer. Old-world trade, not "luxury cigar lifestyle." Sentences are short, claims are concrete, decoration is minimal. The reader should feel they are being addressed by someone who has been doing this for two decades and does not need to oversell.

Emotional goals: trust, durability, low-key expertise. Never aspiration, never urgency, never wink-wink heritage performance.

## Anti-references

Two real sites the founder explicitly dislikes — both are typical Canadian online cigar retail and represent the wrong register:

- [humidor1.ca](https://humidor1.ca/) — busy product-grid e-commerce, retail promotions, mass-market category-shop energy.
- [hofhcanada.com](https://www.hofhcanada.com/) — same family of patterns: sale banners, dense SKU listing, consumer-facing tone.

Don Cubano is trade-only, no public pricing, no cart, no "deals." Visual cues from those sites — discount badges, urgency banners, dense product grids, retail color palettes, exclamation copy — are off-brand by definition.

Other anti-patterns to avoid:

- Cheesy luxury cigar cliches. No leather chairs, brandy snifters, sepia gentlemen, fake-heritage seals, ornate badges, Cuban-flag iconography, "since 18XX" theatrics. Don Cubano is from 2008 and acts like it.
- Generic Tailwind SaaS shapes. No indigo gradients, glassmorphic hero cards, rounded-card grids, big-number stat templates. Wrong category entirely.
- Loud or salesy marketing. No "Limited time," "Don't miss out," countdown timers, badge-collection trust strips, exclamation marks in copy, generic stock photography of smoke or hands holding cigars.
- Fake heritage. Don Cubano does not pretend to be Cuban, pre-revolution, or a hundred years old. The brand is a Windsor family operation that has been steady since 2008. The honesty of that is the asset; ornamenting around it would undermine it.

## Design Principles

1. **Show the trade, not the lifestyle.** Photography is of boxes, leaves, bands, and cigars on real surfaces. Not models, not lounges, not snifters. The reader is a retailer, and the imagery should look like the artifact they will eventually shelve.
2. **Restraint reads as credibility.** The retailer's underlying question is "will these people still be here in five years and ship me consistent boxes." Quiet, undecorated presentation answers yes. Loud marketing answers no, even when it is technically well-made.
3. **Speak as a wholesaler to a wholesaler.** No retail copy, no "Buy now," no public pricing, no consumer-facing reassurance. The reader is a peer; the page exists to start a conversation, not close a sale.
4. **The page is a working catalogue, not a brochure.** Editorial structure — numbered sections, plates, hairline rules, sectioned house lines — should feel like the printed artifact a verified retailer would receive in the mail. The website is a preview of that material.
5. **Every claim earns its credibility through concreteness.** Years trading, origin nations, headquarters address, phone number, hours. No "premium," "finest," "exquisite," "world-class." Concrete is more persuasive than ornamented to this audience.

## Accessibility & Inclusion

WCAG 2.1 AA across the site is the floor.

A mandatory age-verification gate is required before content renders, in line with Canadian tobacco regulations. Legal smoking age varies by province (18 in most, 19 in BC, NB, NL, NS, NU, ON, PEI, YT — verify per province at implementation). The gate should persist via cookie or localStorage so returning retailers don't re-pass it on every visit, and it should be focusable, keyboard-operable, and screen-reader-announced.

The strength scale visualization (●●●● for full, ●○○○ for mild) must remain accessible to color-blind users — the current pattern of filled vs. empty dots in a fixed position carries the meaning without depending on color, and that property must be preserved when new strength visualizations are added.

Reduced motion: the rise-on-load animations and image hover-scale interactions must respect `prefers-reduced-motion` and disable themselves when the user has requested less motion.

Body text contrast (parchment on ink) is designed for readability; verify ≥4.5:1 against WCAG AA when introducing any new text colors. Trade-targeted retailers may include older readers, so do not push base body type below 16px.
