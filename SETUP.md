# Loop Generator — Complete Setup Guide (Netlify)

Follow these steps in order. Each one takes 2–5 minutes.

---

## STEP 1 — Get your Anthropic API key
1. Go to https://console.anthropic.com
2. Sign up / log in
3. Click "API Keys" in the left sidebar
4. Click "Create Key" → copy it
   → Save as: ANTHROPIC_API_KEY

---

## STEP 2 — Get your Clerk keys (auth)
1. Go to https://clerk.com → "Start building for free"
2. Create an app called "Loop Generator"
3. Enable: Google + Email
4. On the dashboard you'll see two keys immediately:
   → Save as: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY  (starts with pk_)
   → Save as: CLERK_SECRET_KEY                   (starts with sk_)

---

## STEP 3 — Get your Stripe keys (payments)
1. Go to https://stripe.com → create account
2. In the dashboard go to: Products → Add Product
   - Name: Loop Generator Pro
   - Price: $9.00 / month / recurring
   - Click Save
3. Click into the price you just made, copy the "Price ID"
   → Save as: STRIPE_PRO_PRICE_ID               (starts with price_)
4. Go to: Developers → API Keys
   → Save as: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (starts with pk_)
   → Save as: STRIPE_SECRET_KEY                  (starts with sk_)

---

## STEP 4 — Fill in your .env.local file
Copy .env.local.example to .env.local and paste all 8 keys.
Leave STRIPE_WEBHOOK_SECRET blank for now — you'll add it in Step 7.
Set NEXT_PUBLIC_APP_URL=http://localhost:3000 for now.

---

## STEP 5 — Run locally to test
```
npm install
npm run dev
```
Open http://localhost:3000
- Landing page should load
- Go to /app → sign up → generate a charter
- Go to /pricing → click Upgrade (will fail until webhook is set up, that's fine)

---

## STEP 6 — Deploy to Netlify
1. Push this folder to a GitHub repo:
   ```
   git init
   git add .
   git commit -m "init"
   git remote add origin https://github.com/YOUR_USERNAME/loopgen.git
   git push -u origin main
   ```
2. Go to https://app.netlify.com → "Add new site" → "Import from Git"
3. Select your repo → Deploy site
4. While it builds, go to: Site Configuration → Environment Variables
5. Add ALL variables from your .env.local (except change NEXT_PUBLIC_APP_URL to your Netlify URL e.g. https://loopgen.netlify.app)
6. Go to Deploys → Trigger deploy → Deploy site

Your site is now live.

---

## STEP 7 — Set up Stripe webhook (makes payments work)
1. Go to Stripe → Developers → Webhooks → Add endpoint
2. Endpoint URL: https://YOUR-SITE.netlify.app/api/webhook
3. Select events:
   - checkout.session.completed
   - customer.subscription.deleted
4. Click Add endpoint
5. Click "Reveal" on the Signing Secret
   → Save as: STRIPE_WEBHOOK_SECRET in Netlify env vars
6. Trigger a redeploy in Netlify

---

## STEP 8 — Update Clerk redirect URLs
1. Go to Clerk dashboard → Configure → Paths
2. Set:
   - Sign-in URL: /sign-in
   - Sign-up URL: /sign-up
   - After sign-in: /dashboard
   - After sign-up: /dashboard
3. Go to Clerk → Domains → Add your Netlify URL

---

## Done! Your site has:
- / ............. Landing page
- /app .......... The loop generator (3 free/day, unlimited on Pro)
- /pricing ...... Free vs Pro ($9/month)
- /dashboard .... User dashboard
- /sign-in ...... Login
- /sign-up ...... Register

## Test the full payment flow (use Stripe test card):
Card: 4242 4242 4242 4242
Expiry: any future date
CVC: any 3 digits

After "paying", the user should be upgraded to Pro automatically.

---

## Custom domain (optional)
Netlify → Site Configuration → Domain Management → Add custom domain
Then update NEXT_PUBLIC_APP_URL and Stripe webhook URL to match.
