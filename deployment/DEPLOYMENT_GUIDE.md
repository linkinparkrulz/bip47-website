# 🚀 Deployment Guide: Railway + Vercel

This guide will help you deploy your BIP47 & Paynym Showcase to production with stable URLs for auth47 testing.

## 📋 Prerequisites

- GitHub account with your project pushed
- Railway account (free tier available)
- Vercel account (free tier available)

## 🛤️ Step 1: Deploy Backend to Railway

### 1.1 Connect Railway to GitHub

1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Click "Deploy Now"

### 1.2 Configure Railway Environment

1. Once deployed, go to your project settings
2. Click on "Variables" tab
3. Add these environment variables:

```bash
NODE_ENV=production
PORT=3001
JWT_SECRET=your-super-secure-jwt-secret-change-this-in-production-please
CALLBACK_URL=https://your-app-name.railway.app/api/auth/authenticate
DB_PATH=/data/database.sqlite
FRONTEND_URL=https://your-frontend-name.vercel.app
```

### 1.3 Get Your Railway URL

After deployment, Railway will give you a URL like:
`https://your-app-name.up.railway.app`

**Note this URL** - you'll need it for Vercel configuration.

## 🎨 Step 2: Deploy Frontend to Vercel

### 2.1 Connect Vercel to GitHub

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select the `frontend` directory as root directory
5. Click "Deploy"

### 2.2 Configure Vercel Environment

1. After deployment, go to project settings
2. Click on "Environment Variables"
3. Add these variables:

```bash
NEXT_PUBLIC_API_URL=https://your-app-name.up.railway.app
```

### 2.3 Update Vercel Configuration

Copy `deployment/vercel.json` to your `frontend/` directory:

```bash
cp deployment/vercel.json frontend/
```

## 🔧 Step 3: Configure CORS and URLs

### 3.1 Update Backend CORS

In `backend/server.js`, update the CORS configuration:

```javascript
app.use(cors({
  origin: ['https://your-frontend-name.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

### 3.2 Update Frontend API URL

In your frontend code, make sure it uses the production API URL:

```javascript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
```

## 🔄 Step 4: Redeploy for Updates

### Railway

1. Push changes to GitHub
2. Railway will automatically redeploy
3. Or click "Manual Deploy" in Railway dashboard

### Vercel

1. Push changes to GitHub
2. Vercel will automatically redeploy
3. Or click "Redeploy" in Vercel dashboard

## 🧪 Step 5: Test Production URLs

### Test Backend

```bash
curl https://your-app-name.up.railway.app/api/health
```

### Test Auth47 Challenge

```bash
curl https://your-app-name.up.railway.app/api/auth/challenge
```

### Test Frontend

Visit `https://your-frontend-name.vercel.app/auth`

## 📱 Step 6: Test with Sparrow Wallet

1. Go to your Vercel frontend URL
2. Generate an auth47 URI
3. Sign it in Sparrow Wallet
4. The callback will now work reliably with your Railway URL!

## 🔍 Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure FRONTEND_URL is set correctly in Railway
2. **Database Issues**: Railway persists data in `/data` directory
3. **Environment Variables**: Double-check all variables are set
4. **Build Failures**: Check logs in Railway/Vercel dashboards

### Debug Commands

```bash
# Check Railway logs
railway logs

# Check Vercel logs
vercel logs

# Test API endpoints
curl -X GET https://your-app-name.up.railway.app/api/auth/challenge
```

## 🌟 Production Features

- ✅ **HTTPS by default** on both platforms
- ✅ **Automatic SSL certificates**
- ✅ **Custom domains** (optional)
- ✅ **Automatic deployments** from Git
- ✅ **Environment variable management**
- ✅ **Build logs and monitoring**

## 💰 Cost

- **Railway**: Free tier ($0/month) - 500 hours/month
- **Vercel**: Free tier ($0/month) - 100GB bandwidth/month
- **Total**: $0/month for hobby usage!

## 🎯 Next Steps

1. Deploy both services
2. Test auth47 flow with real wallets
3. Optionally add custom domains
4. Monitor usage in dashboards
5. Scale up if needed

**You now have a production-ready auth47 implementation with stable URLs!** 🚀
