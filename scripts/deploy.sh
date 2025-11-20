#!/bin/bash

# Vercel Deployment Script
# This script helps with local deployment verification and Vercel setup

set -e

echo "🚀 Vercel Deployment Script"
echo "=========================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install npm first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js and npm are installed${NC}"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
fi

# Run linting
echo -e "${YELLOW}🔍 Running linting...${NC}"
npm run lint
echo -e "${GREEN}✅ Linting passed${NC}"

# Build the project
echo -e "${YELLOW}🏗️ Building project...${NC}"
npm run build
echo -e "${GREEN}✅ Build successful${NC}"

# Run smoke tests
echo -e "${YELLOW}🧪 Running smoke tests...${NC}"
if [ -d ".next" ] && [ -f ".next/BUILD_ID" ]; then
    echo -e "${GREEN}✅ Build directory and BUILD_ID found${NC}"
else
    echo -e "${RED}❌ Smoke tests failed${NC}"
    exit 1
fi

# Check if Vercel CLI is installed
if command -v vercel &> /dev/null; then
    echo -e "${GREEN}✅ Vercel CLI is installed${NC}"
    
    # Ask if user wants to deploy
    echo -e "${YELLOW}🚀 Ready to deploy to Vercel?${NC}"
    read -p "Deploy now? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}🚀 Deploying to Vercel...${NC}"
        vercel
        echo -e "${GREEN}✅ Deployment completed!${NC}"
    else
        echo -e "${YELLOW}💡 To deploy manually, run: vercel${NC}"
    fi
else
    echo -e "${YELLOW}💡 Install Vercel CLI: npm install -g vercel${NC}"
    echo -e "${YELLOW}💡 Then run: vercel${NC}"
fi

echo -e "${GREEN}🎉 Project is ready for deployment!${NC}"
echo -e "${YELLOW}📖 For detailed instructions, see: DEPLOYMENT.md${NC}"