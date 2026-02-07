# 🚀 Deployment Guide

This guide covers deploying your SaaS CRM application to production. Since this is a monorepo with separate frontend and backend, they'll be deployed to different services.

---

## 📊 Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Users' Browsers                         │
└────────────┬────────────────────────────────────────┬────────┘
             │                                        │
      ┌──────▼──────────┐                   ┌────────▼────────┐
      │  Vercel CDN     │                   │  Vercel API     │
      │ (Frontend)      │                   │  (if using      │
      │ React + Vite    │                   │   serverless)   │
      └─────────┬────────┘                   └────────┬────────┘
                │                                    │
                │                    ┌───────────────┘
                │                    │
         ┌──────▼────────────────────▼──────────┐
         │    Your Backend Service              │
         │  (Railway/Render/Heroku)             │
         │  Node.js + Express + MongoDB         │
         └──────────────────────────────────────┘
```

---

## 🎯 Part 1: Deploy Frontend to Vercel

### Step 1: Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select "Import Git Repository"
4. Choose your GitHub repo: `lavanitha/SaaS-CRM-enterprise-dashboard`

### Step 2: Configure Vercel Project

| Setting | Value | Notes |
|---------|-------|-------|
| **Project Name** | saas-crm-dashboard | Can be any name |
| **Framework** | Vite | Auto-detected |
| **Root Directory** | ./ | Leave as default |
| **Build Command** | `npm run build` | Vite build |
| **Output Directory** | `dist` | Vite output folder |
| **Install Command** | `npm install` | Default |

### Step 3: Add Environment Variables

In Vercel Project Settings → Environment Variables:

```
VITE_API_BASE_URL = https://your-backend-domain.com/api
```

**Important**: Replace `your-backend-domain.com` with your actual backend URL (see Part 2).

### Step 4: Deploy

Click "Deploy" and wait for the build to complete. Vercel will assign you a URL like:
```
https://saas-crm-dashboard.vercel.app
```

---

## 🎯 Part 2: Deploy Backend

### Option A: Railway (Recommended - Easiest)

#### Step 1: Prepare Backend

```bash
cd crm-backend
# Ensure package.json has "start" script
# It already has: "start": "node src/server.js"
```

#### Step 2: Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Railway will auto-detect the Node.js backend in `crm-backend/`
5. Add environment variables:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/crm_saas?retryWrites=true&w=majority
   PORT=3000
   ```

#### Step 3: Get Backend URL

After deployment, Railway provides a public URL:
```
https://saas-crm-backend-prod.up.railway.app
```

---

### Option B: Render (Good Alternative)

1. Go to [render.com](https://render.com)
2. Create new "Web Service"
3. Connect your GitHub repository
4. Configuration:
   - **Build Command**: `npm install`
   - **Start Command**: `cd crm-backend && npm start`
   - **Environment**: Node
5. Add environment variables (same as Railway)

---

### Option C: Heroku (Legacy, Still Works)

```bash
# Install Heroku CLI
brew tap heroku/brew && brew install heroku

# Login
heroku login

# Create app
heroku create your-crm-backend

# Set environment variables
heroku config:set MONGO_URI=mongodb+srv://...
heroku config:set PORT=3000

# Deploy
git push heroku main
```

---

## 🗄️ Part 3: Setup Production MongoDB

### Option A: MongoDB Atlas (Cloud - Recommended)

1. Go to [mongodb.com/cloud](https://mongodb.com/cloud)
2. Create free M0 cluster
3. Create database user with strong password
4. Get connection string:
   ```
   mongodb+srv://username:password@cluster0.xyz.mongodb.net/crm_saas?retryWrites=true&w=majority
   ```
5. Use this as `MONGO_URI` in your backend

### Option B: Local MongoDB (Not recommended for production)

```bash
# This only works if your backend is on the same machine
MONGO_URI=mongodb://localhost:27017/crm_saas
```

---

## 🔗 Part 4: Connect Frontend to Backend

Once both are deployed:

1. Get your backend URL from Railway/Render/Heroku
2. Update Vercel environment variable:
   ```
   VITE_API_BASE_URL = https://your-backend-url/api
   ```
3. Redeploy frontend (Vercel auto-redeploys on environment changes)

---

## ✅ Verification Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Railway/Render/Heroku  
- [ ] MongoDB Atlas database set up
- [ ] Environment variables configured in Vercel
- [ ] Environment variables configured in backend service
- [ ] Frontend can connect to backend (check browser console for errors)
- [ ] Dashboard loads real data from MongoDB
- [ ] All API endpoints working

---

## 🐛 Troubleshooting

### "CORS Error" or API fails to load

**Cause**: Backend CORS settings don't allow your Vercel domain

**Fix**: Update backend `app.js`:
```javascript
import cors from "cors";

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://saas-crm-dashboard.vercel.app"  // Add your Vercel URL
  ],
  credentials: true
}));
```

### "Cannot find module" errors

**Cause**: Missing dependencies in production

**Fix**: Ensure all dependencies are in `package.json`, not `devDependencies`

### Blank page or 404 on deployed site

**Cause**: Build output directory misconfigured

**Fix**: Verify in Vercel:
- Output Directory: `dist` (for Vite projects)
- Build Command: `npm run build`

### Backend returning "Cannot POST /api/..."

**Cause**: Routes not properly mounted in Express

**Fix**: Check `crm-backend/src/app.js` has:
```javascript
app.use("/api/dashboard", dashboardRoutes);
```

---

## 📈 Performance Optimization

### Frontend (Vercel)
- ✅ Automatic CDN distribution
- ✅ Edge caching enabled by default
- ✅ Image optimization available

### Backend
- Use database indexes for frequent queries
- Implement request caching headers
- Monitor memory usage on Railway/Render

---

## 🔐 Security Best Practices

1. **Never commit secrets** - Use environment variables
2. **Use HTTPS** - Both Vercel and Railway provide SSL by default
3. **Database authentication** - Use strong passwords in MongoDB Atlas
4. **Rate limiting** - Consider adding on backend
5. **CORS whitelist** - Only allow your domain

---

## 💰 Costs

| Service | Free Tier | Notes |
|---------|-----------|-------|
| **Vercel** | 100 GB/month bandwidth | Perfect for most projects |
| **Railway** | $5/month credit | No auto-scaling on free tier |
| **Render** | Limited hours/month | Good for testing |
| **MongoDB Atlas** | 512MB storage | Sufficient for MVP |
| **Total** | ≈ $0-5/month | Very affordable! |

---

## 🚀 Quick Deploy Checklist

```bash
# 1. Commit changes
git add .
git commit -m "chore: prepare for production deployment"
git push origin main

# 2. Frontend: Already auto-deploying via Vercel
# 3. Backend: Deploy to Railway/Render
# 4. Update Vercel environment variables
# 5. Test at: https://saas-crm-dashboard.vercel.app
```

---

## 📚 Additional Resources

- [Vercel CLI](https://vercel.com/docs/cli): Deploy from terminal
- [Railway Docs](https://docs.railway.app): Detailed Railway setup
- [Render Docs](https://render.com/docs): Render deployment guide
- [MongoDB Atlas](https://docs.atlas.mongodb.com): Database setup
- [Express CORS](https://expressjs.com/en/resources/middleware/cors.html): CORS configuration

---

## 🆘 Need Help?

- Check Vercel deployment logs: Project → Deployments → View logs
- Check backend logs: Railway/Render dashboard → Logs tab
- Monitor errors: Vercel → Analytics → Web Vitals
- Database errors: MongoDB Atlas → Logs

---

**Happy Deploying! 🎉**
