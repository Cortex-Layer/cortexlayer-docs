# cortexlayer-docs

Developer docs for Cortex, at `docs.cortexlayer.net`. Built with
[Fumadocs](https://fumadocs.dev) on Next.js (task 0081) — a separate app from
`cortexlayer-frontend`, which runs on vinext (not Fumadocs-compatible).

```bash
npm install
npm run dev      # http://localhost:3000/docs
```

## Content

All docs content lives in `content/docs/*.mdx`, one folder per nav section, each with a
`meta.json` controlling title/icon/page order:

```
content/docs/
  index.mdx              Getting started
  sdk/                    Hosted (CortexClient) + Embedded (Memory) + Mem0 migration
  agents/                 Hermes, Claude Code
  mcp/                    Generic "just the link" OAuth connect flow
  api-reference/          Overview + endpoints (hand-maintained; see note below)
```

Source of truth for code snippets: `cortexlayer-frontend/components/site/code-demo.tsx` (hero
tabs) and `cortexlayer-python/README.md` (SDK behavior/method signatures) — keep docs content in
sync with those rather than re-deriving snippets from memory.

`llms.txt` / `llms-full.txt` and per-page OG images are generated automatically (scaffolded by
`create-fumadocs-app`) — no separate maintenance needed when adding a page.

### API reference

`content/docs/api-reference/*.mdx` is hand-written against `cortex-backend/docs/cortex-api.md`,
not generated from an OpenAPI spec — no spec exists yet (see task 0081 notes). When one is written
and exported, swap these pages for a generated reference and update task 0081's acceptance
criteria.

## Deploy (Cloudflare Workers)

Scaffolded with [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) (standard adapter
for Next.js on Workers — vinext's Cloudflare setup, used by `cortexlayer-frontend`, doesn't apply
here since this is a plain Next.js app).

```bash
npm run deploy     # opennextjs-cloudflare build && deploy
```

Needs, one-time, before the first deploy:

1. `npx wrangler login` (Cloudflare account access).
2. `docs.cortexlayer.net` added as a custom domain to this Worker — either add the route in
   `wrangler.jsonc` (already there) and deploy, then attach the domain from the dashboard
   (**Workers & Pages → cortexlayer-docs → Custom Domains**), or attach it first and deploy after.
3. DNS: `docs` CNAME/record on `cortexlayer.net`, per Cloudflare's custom-domain instructions once
   the Worker exists.

`npm run preview` builds and runs the Worker locally via `wrangler dev` first, if you want to check
the Workers build before pushing.

## Learn more

- [Fumadocs docs](https://fumadocs.dev/docs/ui)
- [Next.js docs](https://nextjs.org/docs)
- [OpenNext Cloudflare adapter](https://opennext.js.org/cloudflare)
