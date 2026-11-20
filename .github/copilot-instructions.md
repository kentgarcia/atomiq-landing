<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->
# atomiq-landing

AtomIQ marketing landing page. TanStack Start + React 19 + Vite 8. File-based routing in `src/routes/`. Full SSR with prerendered `/` + ISR.

- Dev: `npm run dev` (localhost:3000)
- Build: `npm run build` (SSR + prerender)
- Start: `npm run start` (srvx prod server)
- Router setup: `src/router.tsx`, shell: `src/routes/__root.tsx`
- Landing route: `src/routes/index.tsx` (loader: random counter start + year, ISR headers)
- Content data: `src/lib/landing.ts` (FAQs, team, quiz, Shrodi samples)
- Counter: `src/hooks/useExcitedCounter.ts` — no backend; the route loader picks a random start (700,000–950,000), clicks add one, total kept in `localStorage`
- Design: mirrors the AtomIQ app (tokens in `src/styles/variables.css`, shared `.btn` / `.card3d` / `.chip-word` in `globals.css`, keyframes in `motion.css`). Shrodi is live (`components/art/Shrodi.tsx`); other art comes from `src/art/generated.ts`, made by `scripts/export-art.mjs` from the app repo — never edit it by hand.
