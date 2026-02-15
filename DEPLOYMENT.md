# Deployment Guide

## GitHub Pages Deployment

This app is configured for automatic deployment to GitHub Pages.

### Prerequisites

1. **GitHub Repository**: Your code must be in a GitHub repository
2. **Repository Name**: Update `vite.config.ts` if your repo name is different from `geography-quiz`

### One-Time Setup

#### Step 1: Push to GitHub

If you haven't already pushed to GitHub:

```bash
# Create a new repository on GitHub (https://github.com/new)
# Then run:

git remote add origin https://github.com/YOUR_USERNAME/geography-quiz.git
git branch -M master
git push -u origin master
```

#### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select:
   - Source: **GitHub Actions**

#### Step 3: Configure Base Path (if needed)

If your repository name is **not** `geography-quiz`:

1. Open `vite.config.ts`
2. Change the `base` value to match your repo name:
   ```ts
   base: '/YOUR-REPO-NAME/',
   ```
3. Commit and push the change

### Automatic Deployment

Once set up, the app will automatically deploy when you push to the `master` branch:

```bash
git add .
git commit -m "Your changes"
git push
```

The GitHub Action will:
1. ✅ Install dependencies
2. ✅ Build the production bundle
3. ✅ Deploy to GitHub Pages

**Deployment takes ~2-3 minutes**

### Accessing Your App

After deployment completes, your app will be available at:

```
https://YOUR_USERNAME.github.io/geography-quiz/
```

### Manual Deployment

You can also trigger deployment manually:

1. Go to **Actions** tab in your GitHub repository
2. Click **Deploy to GitHub Pages** workflow
3. Click **Run workflow** → **Run workflow**

### Monitoring Deployment

To check deployment status:

1. Go to **Actions** tab in your repository
2. Click on the latest workflow run
3. Watch the build and deploy steps

### Troubleshooting

#### ❌ Build fails

**Check the Actions log for errors:**
- TypeScript errors: Run `npm run build` locally to see errors
- Missing dependencies: Ensure `package-lock.json` is committed

#### ❌ Page shows 404

**Possible fixes:**
1. Verify GitHub Pages is enabled in Settings
2. Check that `base` in `vite.config.ts` matches your repo name
3. Wait 2-3 minutes for DNS propagation

#### ❌ Page loads but assets fail (404 errors)

**Base path mismatch:**
- The `base` in `vite.config.ts` must match your repository name exactly
- Example: If repo is `my-quiz`, base should be `/my-quiz/`

#### ❌ localStorage data seems to persist strangely

**Different domains = different storage:**
- Localhost and GitHub Pages use different localStorage
- Data won't transfer between environments

### Local Preview of Production Build

To test the production build locally:

```bash
npm run build
npm run preview
```

This will serve the production build at `http://localhost:4173/geography-quiz/`

### Updating the Deployed App

Just commit and push your changes:

```bash
git add .
git commit -m "Update: your changes"
git push
```

GitHub Actions will automatically rebuild and redeploy.

### Environment-Specific Configuration

If you need different configs for production vs development:

```ts
// vite.config.ts
export default defineConfig({
  base: process.env.NODE_ENV === 'production'
    ? '/geography-quiz/'
    : '/',
})
```

### Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to `/public/` with your domain
2. Configure DNS to point to `YOUR_USERNAME.github.io`
3. In GitHub Settings → Pages, add your custom domain

### Deployment Checklist

Before first deployment:

- [ ] Repository pushed to GitHub
- [ ] GitHub Pages enabled with "GitHub Actions" source
- [ ] `base` in `vite.config.ts` matches repo name
- [ ] Local build works (`npm run build`)
- [ ] `.github/workflows/deploy.yml` committed

### Performance Notes

**GitHub Pages Limits:**
- ✅ 1 GB repo size limit (you're well under)
- ✅ 100 GB bandwidth/month (more than enough)
- ✅ 10 builds/hour limit
- ✅ Free for public repositories

**Caching:**
- Country data will still cache in user's localStorage
- API calls go directly to REST Countries API
- No backend needed

### Security Notes

- All data stored in user's browser (localStorage)
- No sensitive data transmitted
- API calls to REST Countries (public API)
- No authentication or user accounts

---

## Alternative Deployment Options

### Netlify

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### Vercel

```bash
npm install -g vercel
vercel --prod
```

### Cloudflare Pages

1. Connect your GitHub repo
2. Build command: `npm run build`
3. Output directory: `dist`

All of these will work out of the box with this app!
