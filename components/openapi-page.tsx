"use client";

import { createOpenAPIPage } from "fumadocs-openapi/ui";

// Bound to the schema declared in lib/openapi.ts; registered as `OpenAPIPage` in
// components/mdx.tsx so generated pages (content/docs/api-reference/endpoints/**) can render it —
// see scripts/generate-docs.mts, which is what writes those files.
export const OpenAPIPage = createOpenAPIPage({});
