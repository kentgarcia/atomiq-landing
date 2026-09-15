import { defineConfig } from "nitro";

export default defineConfig({
  preset: "vercel",
  routeRules: {
    // Prerendered landing: cache at the edge, revalidate in background.
    "/": { isr: 60 },
    // Static assets: immutable, cache for a year.
    "/assets/**": { headers: { "cache-control": "public, max-age=31536000, immutable" } },
    "/images/**": { headers: { "cache-control": "public, max-age=86400" } },
    "/fonts/**": { headers: { "cache-control": "public, max-age=31536000, immutable" } },
  },
});
