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

## Quota-safe engine

The engine lives at `tools/guiropa_historical_editorial.py` and the scheduled workflow at `.github/workflows/guiropa-historical-editorial.yml`.

Safety rules are evaluated before any AI process is launched:

1. Daily hard stop is checked.
2. Monthly hard stop is checked.
3. The queue must contain an unpublished 1950–1989 candidate.
4. At least two research sources must be fetched successfully.
5. Only then may the generator run.

The engine deliberately permits **at most one Copilot invocation per workflow run**. There is no automatic AI retry and no fallback chain that could silently multiply quota usage.

The scheduled workflow runs once per day. Manual runs default to dry-check mode unless `apply=true` is explicitly selected.

A generated story is written as a static page under `client/public/editorial/history/`, while `client/public/editorial/history/index.json` becomes the lightweight feed. Publication state is recorded in `data/guiropa-historical-editorial-state.json` before the next scheduled run can select another story.

## Safe implementation sequence

1. Establish historical policy and story schema. **Done.**
2. Build a small curated research queue. **Done.**
3. Build the quota-safe generator and static archive output. **Done in PR; not yet on main.**
4. Connect the archive/feed to the GUIROPA visual interface without touching audio. **Next phase.**
5. Observe actual provider consumption before considering any increase above one scheduled generation attempt per day.

## Initial story seeds

The planning seed file lives at `client/src/data/historicalEditorial.js`. The runnable research queue lives at `data/guiropa-historical-editorial.json`. Queue entries are planning prompts with research URLs; source text itself is never committed as copied article content.
