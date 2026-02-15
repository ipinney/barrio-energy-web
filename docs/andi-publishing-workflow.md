# Publishing Articles on Barrio Energy Website

This guide walks you through adding new articles to the Barrio Energy news page.

---

## Prerequisites

### 1. Get Access to the GitHub Repository

You'll need GitHub access to edit the articles file. If you don't have access:

1. Ask Ivan to add you to the `ipinney` GitHub account
2. Or request collaborator access to the `barrio-energy-web` repository

**Repository URL:** https://github.com/ipinney/barrio-energy-web

### 2. Install Required Tools

- **Git** - Version control system (usually pre-installed on Mac)
- **Code Editor** - VS Code recommended (free from https://code.visualstudio.com)

---

## Step-by-Step: Publishing a New Article

### Step 1: Clone the Repository

Open Terminal and run:

```bash
cd ~/Desktop
git clone https://github.com/ipinney/barrio-energy-web.git
cd barrio-energy-web
```

> **Tip:** You only need to do this once. After the first clone, just run `git pull origin main` to get the latest changes.

### Step 2: Create a New Branch (Recommended)

```bash
git checkout -b new-article-[title-slug]
```

Example: `git checkout -b new-article-february-update`

### Step 3: Edit the Articles File

Open the file `src/content/articles/index.ts` in your code editor.

**Adding a new article:**

Copy this template and fill in your content:

```typescript
{
  slug: "your-article-slug",
  title: "Your Article Title Here",
  date: "2026-02-15",
  author: "Andi",
  excerpt: "A brief 1-2 sentence summary for the article card...",
  readingTime: "5 min read",
  body: `
<p>Your first paragraph goes here...</p>

<h2>Second Section Heading</h2>

<p>More content...</p>

<hr style="border: none; border-top: 1px solid #3f3f46; margin: 40px 0;" />

<p><em>Barrio Energy provides independent analysis of Texas power markets, data center development, and digital infrastructure. This is not investment advice.</em></p>
  `,
},
```

**Important formatting rules:**

1. **Links:** Use this format for links:
   ```html
   <a href="https://example.com" target="_blank" style="color: #00d4ff;">link text</a>
   ```

2. **Headings:** Use `<h2>` for main sections:
   ```html
   <h2>Your Section Title</h2>
   ```

3. **Bold text:**
   ```html
   <strong>important text</strong>
   ```

4. **Place the NEW article at the TOP of the articles array** (it will appear first on the page)

5. **Date format:** YYYY-MM-DD (e.g., "2026-02-15")

### Step 4: Save and Commit Your Changes

```bash
git add -A
git commit -m "Add new article: Your Article Title"
```

### Step 5: Push to GitHub

```bash
git push origin main
```

**This automatically triggers a deployment to Vercel.** Your article will be live in 1-2 minutes.

### Step 6: Verify Your Article is Live

Visit: https://barrioenergy.com/news

Your new article should appear at the top of the list.

---

## Article Formatting Cheatsheet

### Links (Required Format)
```html
<a href="https://www.example.com" target="_blank" style="color: #00d4ff;">anchor text</a>
```

### Bold Text
```html
<strong>important concept</strong>
```

### Section Headings
```html
<h2>Section Title</h2>
```

### Horizontal Line (Between Sections)
```html
<hr style="border: none; border-top: 1px solid #3f3f46; margin: 40px 0;" />
```

### Italics/Emphasis
```html
<em>emphasized text</em>
```

---

## Troubleshooting

### "Permission Denied" When Pushing

Ask Ivan to add you as a collaborator to the GitHub repository.

### Deployment Didn't Trigger

1. Check that you pushed to `main` branch
2. Wait 2-3 minutes for Vercel to deploy
3. Check your email for any build failure notifications

### Article Not Showing

1. Make sure you placed the article at the TOP of the array
2. Check that the slug is unique (no duplicate slugs)
3. Verify the date format is correct (YYYY-MM-DD)

### Build Errors

If you see errors after running `npm run build`:

1. Check for missing commas between article objects
2. Ensure all quotes are matched
3. Make sure HTML tags are properly closed

---

## Quick Reference

| Task | Command |
|------|---------|
| Get latest changes | `git pull origin main` |
| Check current status | `git status` |
| See your changes | `git diff` |
| Undo last commit | `git reset --soft HEAD~1` |

---

## Need Help?

If you run into issues:
1. Check the GitHub repository for error messages
2. Ask Ivan for assistance
3. The deployment typically takes 1-2 minutes after pushing

---

**Note:** The website is hosted on Vercel and automatically deploys from the main branch of this repository. You don't need to log into Vercel directly — just pushing to GitHub is enough.
