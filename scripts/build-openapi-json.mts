import { readFileSync, writeFileSync } from "node:fs";
import { parse } from "yaml";

// Cloudflare Workers has no filesystem, so createOpenAPI() can't read the .yaml file at
// request time in production (confirmed: `[OpenAPI] Failed to resolve input` under `wrangler
// dev` against the real .open-next build, even though `next build`'s Node runtime hides the
// problem). Pre-parse to JSON here so lib/openapi.ts can `import` it — a real JS object,
// inlined into the bundle at build time, needs no runtime fs access on any target.
const src = new URL("../openapi/cortex-api.yaml", import.meta.url);
const out = new URL("../openapi/cortex-api.json", import.meta.url);

const doc = parse(readFileSync(src, "utf-8"));
writeFileSync(out, JSON.stringify(doc));
console.log("Generated: openapi/cortex-api.json");
