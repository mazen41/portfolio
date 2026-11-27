# Deploy

The site is prerendered (react-snap style, via `scripts/prerender.mjs`) so Google and link previews can read the case studies. Prerendering needs Chrome. Vercel's build machine has no Chrome, so the prerender step is skipped there (`process.env.VERCEL` is set). That means a plain `git push` deploy ships the client-only build. Use the prebuilt flow below for production.

## One-time setup

1. Confirm Chrome is installed. Default location on Windows:
   `C:\Program Files\Google\Chrome\Application\chrome.exe`
2. Confirm the Vercel CLI works: `vercel --version`. Log in once with `vercel login` and link the folder with `vercel link` (project "portfolio").

## Each deploy (PowerShell, from D:\portfolio)

Step 1. Point the prerender at local Chrome:

    $env:CHROME_PATH = "C:\Program Files\Google\Chrome\Application\chrome.exe"

Step 2. Build locally. This runs react-scripts build, then the prerender and its verification. It must finish with no errors:

    npm run build

Step 3. Build the Vercel output:

    vercel build

Step 4. Check that the prerendered text survived step 3. `vercel build` sets `VERCEL=1` when it runs `npm run build` locally, which would skip prerendering unless `CHROME_PATH` (or `FORCE_PRERENDER=1`) is set. Both `scripts/prerender.mjs` and `scripts/verify-prerender.mjs` honour `CHROME_PATH` and `FORCE_PRERENDER=1` even when `VERCEL=1` is present, so keeping `$env:CHROME_PATH` set from Step 1 preserves the prerendered output. Still verify:

    Select-String -Path .vercel\output\static\projects\nazbiz\index.html -Pattern "NazBiz"

If this finds nothing, do not deploy. Re-run steps 1 and 2, then run `vercel build` with `$env:CHROME_PATH` set (or `$env:FORCE_PRERENDER = "1"`), and check again.

Step 5. Deploy the prebuilt output:

    vercel deploy --prebuilt

Use the preview URL it prints first. Check one case study page, then promote to production with `vercel deploy --prebuilt --prod` when it looks right.

## Why not just push to Git

Vercel's own build runs `npm run build`, which prints "Skipping prerender: this is a Vercel build, which has no Chrome" and ships the client-only site. Google will not see the case-study text. Always deploy the prebuilt output for production.

## Environment variables

Set these in Vercel (Project → Settings → Environment Variables), not in the repo. Values never go in Git or in this file.

- [ ] `GROQ_API_KEY` — Groq API key for `/api/assistant` (Maz brain)
- [ ] `ELEVENLABS_API_KEY` — ElevenLabs API key (text-to-speech scope only) for `/api/assistant`
- [ ] `ELEVENLABS_VOICE_EN` — ElevenLabs voice ID for English replies
- [ ] `ELEVENLABS_VOICE_AR` — ElevenLabs voice ID for Arabic replies
- [ ] `RESEND_API_KEY` — Resend API key for `/api/contact`
- [ ] `CONTACT_FROM_EMAIL` — Verified sender email in Resend for `/api/contact`

## Checklist before production

- `npm run build` ends with 16 prerendered routes and no errors.
- Step 4 finds the NazBiz text in the built output.
- The preview URL shows the case study with its text and images.
- Keys are not in `build\` or `.vercel\output\`. Search both folders for the start of a key value and expect no match.
