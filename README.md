# Pixel Perfect Display

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5d249801-8193-423c-a595-6a2d302d90fe).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Deploying to Vercel

This is a plain Vite + React single-page app (React Router, client-side only).

- Build: `npm run build` → static files in `dist/`
- `vercel.json` rewrites every path to `index.html`, so deep links like `/app` resolve client-side.
- Supabase config is read at build time from `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.

Routes: `/` (landing), `/sign-in`, `/sign-up`, `/app` (requires sign-in). `/auth` redirects to `/sign-in`.
