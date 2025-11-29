#!/bin/bash

# 🚀 Quick Deployment Script for BIP47 & Paynym Showcase
# This script helps you deploy to Railway + Vercel quickly

echo "🚀 BIP47 & Paynym Showcase Deployment Script"
echo "=============================================="

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -d "backend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Copy deployment files
echo "📋 Copying deployment files..."
cp deployment/railway.toml backend/
cp deployment/vercel.json frontend/

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "🔧 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: BIP47 & Paynym Showcase with auth47 authentication"
else
    echo "📝 Git repository already exists"
fi

# Check if remote is set
if ! git remote get-url origin >/dev/null 2>&1; then
    echo "🌐 Please set up a GitHub repository and run:"
    echo "   git remote add origin <your-github-repo-url>"
    echo "   git push -u origin master"
    echo ""
    echo "Then come back and continue with deployment!"
    exit 1
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git add .
git commit -m "Add deployment configuration for Railway + Vercel"
git push origin master

echo ""
echo "✅ Setup complete! Now follow these steps:"
echo ""
echo "🛤️  1. Deploy Backend to Railway:"
echo "   • Go to https://railway.app"
echo "   • Click 'Start a New Project' → 'Deploy from GitHub repo'"
echo "   • Select your repository and deploy"
echo "   • Set environment variables (see deployment/DEPLOYMENT_GUIDE.md)"
echo ""
echo "🎨  2. Deploy Frontend to Vercel:"
echo "   • Go to https://vercel.com"
echo "   • Click 'New Project' → Import your GitHub repo"
echo "   • Select 'frontend' directory as root"
echo "   • Set NEXT_PUBLIC_API_URL environment variable"
echo ""
echo "🧪  3. Test your deployment:"
echo "   • Visit your Vercel frontend URL"
echo "   • Test auth47 flow with Sparrow Wallet"
echo ""
echo "📖 For detailed instructions, see: deployment/DEPLOYMENT_GUIDE.md"
echo ""
echo "🎉 You'll have stable URLs for auth47 testing!"
