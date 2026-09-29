# Vercel deployment

1. Push this folder to GitHub.
2. Import the repository into Vercel.
3. Set `RAWG_API_KEY` in Project Settings → Environment Variables.
4. Deploy.

The app works without the key using the bundled demo games. The live catalog route uses the server-side RAWG key, so the secret is not sent to the browser.

Before production launch, review and implement the attribution / rate-limit requirements of your selected game-data API plan.
