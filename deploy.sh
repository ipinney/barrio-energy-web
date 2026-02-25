#!/bin/bash
# Barrio Energy - Local Dev & Deploy Helper
# Usage: ./deploy.sh [command]

set -e

PORT=${PORT:-8000}
SITE_DIR="$(cd "$(dirname "$0")" && pwd)"

case "${1:-serve}" in
    serve)
        echo "🚀 Starting local server at http://localhost:$PORT"
        echo "   Press Ctrl+C to stop"
        echo ""
        cd "$SITE_DIR"
        if command -v python3 &> /dev/null; then
            python3 -m http.server "$PORT"
        elif command -v npx &> /dev/null; then
            npx serve -l "$PORT" .
        elif command -v php &> /dev/null; then
            php -S "localhost:$PORT"
        else
            echo "❌ No server found. Install Python3, Node.js, or PHP."
            exit 1
        fi
        ;;
    check)
        echo "🔍 Checking for missing images..."
        MISSING=0
        for img in logo-transparent.png landscape-datacenter-1.jpg landscape-datacenter-3.jpg \
                   datacenter-west-texas.jpg tyler-property.jpg monahans-property.jpg \
                   monahans-property-5.jpg lolita-property.jpg george-west-property.jpg \
                   baycity-property.jpg; do
            if [ ! -f "$SITE_DIR/images/$img" ]; then
                echo "   ❌ Missing: images/$img"
                MISSING=$((MISSING + 1))
            else
                echo "   ✅ Found: images/$img"
            fi
        done
        if [ "$MISSING" -eq 0 ]; then
            echo ""
            echo "✅ All images present! Ready to deploy."
        else
            echo ""
            echo "⚠️  $MISSING image(s) missing. See README.md for how to get them."
        fi
        ;;
    zip)
        echo "📦 Creating deployment zip..."
        cd "$SITE_DIR/.."
        ZIPNAME="barrioenergy-$(date +%Y%m%d-%H%M%S).zip"
        zip -r "$ZIPNAME" "$(basename "$SITE_DIR")" -x "*.sh" "*.git*"
        echo "✅ Created: $ZIPNAME"
        ;;
    deploy)
        echo "🚀 Deploying to Vercel (production)..."
        ENV_FILE="$SITE_DIR/.env.deploy"
        if [ ! -f "$ENV_FILE" ]; then
            echo "❌ Missing .env.deploy — need VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID"
            exit 1
        fi
        # Load env vars
        set -a
        source "$ENV_FILE"
        set +a
        if [ -z "$VERCEL_TOKEN" ] || [ -z "$VERCEL_ORG_ID" ] || [ -z "$VERCEL_PROJECT_ID" ]; then
            echo "❌ .env.deploy must set VERCEL_TOKEN, VERCEL_ORG_ID, and VERCEL_PROJECT_ID"
            exit 1
        fi
        cd "$SITE_DIR"
        echo "   Project dir: $SITE_DIR"
        echo "   Org ID:      $VERCEL_ORG_ID"
        echo "   Project ID:  $VERCEL_PROJECT_ID"
        echo ""
        VERCEL_ORG_ID="$VERCEL_ORG_ID" VERCEL_PROJECT_ID="$VERCEL_PROJECT_ID" \
            npx vercel --prod --yes --token "$VERCEL_TOKEN"
        echo ""
        echo "✅ Deploy complete! Site: https://barrioenergy.com"
        ;;
    *)
        echo "Usage: ./deploy.sh [serve|check|zip|deploy]"
        echo "  serve   - Start local dev server (default)"
        echo "  check   - Verify all images are present"
        echo "  zip     - Create deployment zip"
        echo "  deploy  - Deploy to Vercel production"
        ;;
esac
