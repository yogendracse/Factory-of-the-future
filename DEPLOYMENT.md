# Vercel Deployment Checklist

## ✅ Pre-Deployment Checklist (All Done!)

- [x] Build tested successfully (`npm run build`)
- [x] `vercel.json` configuration file created
- [x] `.env.example` template created
- [x] `.gitignore` updated to exclude `.vercel` directory
- [x] README updated with deployment instructions
- [x] All changes committed and pushed to GitHub

## 🚀 Deploy to Vercel (Follow These Steps)

### Quick Deploy (Recommended)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/new
   - Sign in with your GitHub account

2. **Import Repository**
   - Click "Add New Project"
   - Select: `yogendracse/Factory-of-the-future`
   - Click "Import"

3. **Configure Project**
   - Framework Preset: **Vite** (should auto-detect)
   - Build Command: `npm run build` (should auto-fill)
   - Output Directory: `dist` (should auto-fill)
   - Install Command: `npm install` (should auto-fill)

4. **Add Environment Variable**
   - Click "Environment Variables"
   - Add:
     - **Name:** `GEMINI_API_KEY`
     - **Value:** `AIzaSyB7TQaSQqqpU8Kj6hIE65V9wnwr73CZXV0`
   - Select all environments (Production, Preview, Development)

5. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes for deployment to complete
   - Your app will be live at: `https://your-project-name.vercel.app`

## 🔄 Automatic Deployments

After the initial setup:
- Every push to `main` branch = automatic production deployment
- Every pull request = automatic preview deployment
- No manual steps needed!

## 📊 Post-Deployment

1. **Test the deployed app:**
   - Click on different factory zones
   - Verify AI simulations are working
   - Test scenario simulations

2. **Custom Domain (Optional):**
   - Go to Project Settings → Domains
   - Add your custom domain

3. **Monitor Usage:**
   - Check Vercel Analytics
   - Monitor Gemini API usage at: https://aistudio.google.com/app/apikey

## 🆓 Free Tier Limits

Vercel Free Tier includes:
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth per month
- ✅ Automatic HTTPS
- ✅ Preview deployments for PRs
- ✅ Edge Network (CDN)

This is more than enough for this application!

## 🐛 Troubleshooting

**Build fails:**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify `npm run build` works locally

**AI features not working:**
- Verify `GEMINI_API_KEY` is set in Vercel environment variables
- Check Gemini API quota at https://aistudio.google.com/app/apikey
- Look at Function logs in Vercel dashboard

**App not loading:**
- Check deployment status in Vercel dashboard
- Verify build completed successfully
- Check browser console for errors

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Gemini API Docs: https://ai.google.dev/docs
- GitHub Issues: https://github.com/yogendracse/Factory-of-the-future/issues

