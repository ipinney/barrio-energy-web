# Barrio Energy - Local Site Repository

> **Scraped & reconstructed** from `barrioenergy.com` on Feb 18, 2026.

## 📁 Repo Structure

```
barrioenergy.com/
├── index.html            # Homepage
├── data-centers.html     # Property portfolio
├── about.html            # Team page
├── news.html             # News & press releases
├── css/
│   └── style.css         # Main stylesheet
├── js/
│   └── main.js           # Navigation, animations, scroll effects
└── images/               # ⚠️ NEEDS YOUR IMAGES (see below)
    ├── logo-transparent.png
    ├── landscape-datacenter-1.jpg
    ├── landscape-datacenter-3.jpg
    ├── datacenter-west-texas.jpg
    ├── tyler-property.jpg
    ├── monahans-property.jpg
    ├── monahans-property-5.jpg
    ├── lolita-property.jpg
    ├── george-west-property.jpg
    ├── baycity-property.jpg
    └── hero-video.mp4     (optional)
```

## ⚠️ IMPORTANT: Images Required

I was unable to download the actual images from the live site (SSL/network restrictions). You'll need to:

1. **Option A** - Copy images from your hosting panel:
   - Log into your hosting provider
   - Download the `/images/` folder
   - Drop them into this repo's `images/` directory

2. **Option B** - Pull from live site manually:
   - Visit `barrioenergy.com` in a browser
   - Right-click → "Save Image As" for each image
   - Save to the `images/` folder using the filenames listed above

3. **Option C** - Use browser DevTools:
   - Open the site → F12 → Network tab → Filter by Images
   - Reload the page → Download all images

## 🚀 Quick Start (Local Dev)

Just open `index.html` in your browser, or run a local server:

```bash
# Python
python3 -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 🔄 Deploying

Since you mentioned 3rd party hosting, here are common options:

### Netlify (drag & drop)
1. Go to [app.netlify.com](https://app.netlify.com)
2. Drag this entire folder onto the page
3. Done — live URL in seconds

### Cloudflare Pages
1. Push to any git repo (GitHub, GitLab, etc.)
2. Connect to Cloudflare Pages
3. Deploy

### Manual (FTP/SFTP)
1. Connect to your host via FTP
2. Upload all files to `public_html/` or `www/`

## 📝 Pages Recovered

| Page | Status | Source |
|------|--------|--------|
| Homepage (`/`) | ✅ Full content | Scraped from live site |
| Data Centers (`/data-centers`) | ✅ Full content | Scraped from live site |
| About / Team (`/about`) | ⚠️ Partial | Reconstructed from public info |
| News (`/news`) | ✅ Press releases | Links to PRNewswire originals |
| EPC Services | ❌ 404 on live site | Old page, no longer active |
| Energy Advisory | ❌ 404 on live site | Old page, no longer active |
| Resources | ❌ 404 on live site | Old page, no longer active |
| Contact Us | ❌ 404 on live site | Merged into homepage |

## 🔧 Tech Stack

- **Pure HTML/CSS/JS** — no framework, no build step
- **Google Fonts** — Inter + Space Grotesk
- **Responsive** — mobile-first breakpoints
- **Dark theme** — matching the current live site aesthetic
