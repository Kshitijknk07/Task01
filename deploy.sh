#!/bin/bash

echo "🚀 Building Leaderboard Web App for deployment..."

# Build frontend
echo "📦 Building frontend..."
cd frontend
pnpm run build
cd ..

echo "✅ Build completed successfully!"
echo ""
echo "🌐 Next steps for deployment:"
echo ""
echo "1. Frontend (Netlify):"
echo "   - Go to https://netlify.com"
echo "   - Click 'New site from Git'"
echo "   - Connect your GitHub repository"
echo "   - Set build command: cd frontend && pnpm install && pnpm run build"
echo "   - Set publish directory: frontend/dist"
echo ""
echo "2. Backend (Render/Railway):"
echo "   - Deploy backend to Render or Railway"
echo "   - Set MONGO_URI environment variable"
echo "   - Update frontend VITE_API_URL with backend URL"
echo ""
echo "3. MongoDB Atlas:"
echo "   - Create MongoDB Atlas cluster"
echo "   - Get connection string"
echo "   - Update backend environment variables"
echo ""
echo "📁 Build files are ready in: frontend/dist/" 