<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->
# atomiq-landing

AtomIQ marketing landing page. TanStack Start + React 19 + Vite 8. File-based routing in `src/routes/`. Full SSR with prerendered `/` + ISR.

- Dev: `npm run dev` (localhost:3000)
- Build: `npm run build` (SSR + prerender)
- Start: `npm run start` (srvx prod server)
- Router setup: `src/router.tsx`, shell: `src/routes/__root.tsx`
- Landing route: `src/routes/index.tsx` (loader: excited count + year, ISR headers)
- Content data: `src/lib/landing.ts` (FAQs, team, quiz, Shrodi samples)
- Counter: `src/hooks/useExcitedCounter.ts` + `src/lib/engagement.*` (Supabase `excited_counts`, RPC increment, memory fallback)
- File separation: `.ts` = shared client-safe, `.functions.ts` = server-fn wrappers only, `.server.ts` = server-only (never import on client)
