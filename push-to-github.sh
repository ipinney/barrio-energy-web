#!/bin/bash
# Push the current static website to GitHub, replacing the old Next.js repo
# Run this from inside the barrio-energy/website/ folder on your Mac
#
# Usage: bash push-to-github.sh

set -e

echo "=== Barrio Energy Website → GitHub Push ==="
echo ""

# Safety check - make sure we're in the right folder
if [ ! -f "index.html" ] || [ ! -f "vercel.json" ]; then
    echo "ERROR: Run this from the barrio-energy/website/ folder"
    echo "       (should contain index.html, vercel.json, etc.)"
    exit 1
fi

# Remove any existing .git folder (clean slate)
if [ -d ".git" ]; then
    echo "Removing existing .git folder..."
    rm -rf .git
fi

# Initialize fresh git repo
echo "Initializing fresh git repo..."
git init
git checkout -b main

# Configure git user for this repo
git config user.name "Ivan Pinney"
git config user.email "ivan.pinney@gmail.com"

# Add all files (respecting .gitignore)
echo "Adding all files..."
git add -A

# Show what we're about to commit
echo ""
echo "Files to be committed:"
git status --short | head -30
echo "... (and more)"
echo ""

# Commit
git commit -m "Replace Next.js site with current static HTML website

Complete website redesign: pure static HTML/CSS/JS replacing the
old Next.js architecture. This is the live production site deployed
via Vercel CLI.

Pages: index, about, data-centers, energy-advisory, news
Internal: btc-v1-trading, gambit, polymarket dashboards
Stack: HTML, CSS, vanilla JS, Google Fonts (Inter + Space Grotesk)"

# Add remote
echo "Setting remote to ipinney/barrio-energy-web..."
git remote add origin https://github.com/ipinney/barrio-energy-web.git

# Force push (replaces everything on GitHub)
echo ""
echo "Force pushing to GitHub (this replaces ALL old content)..."
git push --force origin main

echo ""
echo "=== DONE! ==="
echo "Check: https://github.com/ipinney/barrio-energy-web"
echo ""
echo "You can delete this script now: rm push-to-github.sh"
