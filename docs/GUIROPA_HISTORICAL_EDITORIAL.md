# GUIROPA RADIO · Historical Editorial

## Mission

GUIROPA Radio's editorial lane is a living historical magazine about music from **1950 through 1989 only**.

It is intentionally different from Passport Radio's high-volume current-news Editorial Engine. GUIROPA does not chase breaking news and does not need a large generation reservoir.

## Approved publication envelope

- Normal target: **1 finished historical story per day**.
- Daily hard stop: **2 stories**.
- Monthly planning target: **30 stories**.
- Monthly hard stop: **45 stories**.
- No story may use a focal year outside **1950–1989**.
- Historical research may be collected ahead of publication and kept as a queue.

These are editorial/product guardrails, not a claim about any external AI provider's quota.

## Editorial character

The writing must read like a human music magazine, not a chronology dump or SEO factory. A story should reconstruct a moment: people, sound, place, cultural pressure, recording context, reception and consequences.

Core lanes may include rock'n'roll, jazz, blues, soul, Motown, R&B, psychedelic rock, progressive rock, hard rock, heavy metal, punk, disco, funk, new wave, post-punk, gothic, synthpop, AOR and adjacent music that belongs to the 1950–1989 period.

## Research-source policy

Historical magazines, newspapers, broadcasters, archives, museums, libraries, artist/label archives and other reputable historical sources may be used as research signals. Source material is evidence, not copy: GUIROPA must write an original reconstruction and should not republish protected articles or long passages.

Potential research families include period music press such as Melody Maker, NME, Record Mirror, Sounds, Blues & Soul and Rolling Stone, plus legitimate archives that preserve historical music journalism. Access and reuse must respect each source's terms and copyright.

## Architecture guardrail

Historical Editorial must remain independent from:

- the persistent radio player;
- the 80s Tunnel at `/1986`;
- local MP3 catalog playback;
- schedule/player state;
- Marvin Gaye Archive;
- Store, Support, Advertising and Contact flows.

Adding or repairing editorial functionality must never require refactoring those systems.

## Safe implementation sequence

1. Establish historical policy and story schema.
2. Build a small curated research queue.
3. Build an editorial archive/feed UI.
4. Only then add scheduled automation, with quota/cost checks and hard stops before any generation call.
5. Start at one story per day and observe actual provider consumption before considering any increase.

## Initial story seeds

The repository seed file lives at `client/src/data/historicalEditorial.js`. Seeds are planning prompts only; they are not automatically published and do not contain copied source text.
