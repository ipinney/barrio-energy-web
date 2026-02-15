import { NextRequest, NextResponse } from "next/server";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const ARTICLES_PATH = "src/content/articles/index.ts";
const REPO_PATH = process.cwd();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, date, author, excerpt, body: articleBody } = body;

    if (!title || !excerpt || !articleBody) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .substring(0, 60);

    // Read current articles file
    const filePath = path.join(REPO_PATH, ARTICLES_PATH);
    let content = fs.readFileSync(filePath, "utf-8");

    // Build new article entry
    const newArticle = `  {
    slug: "${slug}",
    title: ${JSON.stringify(title)},
    date: "${date}",
    author: "${author}",
    excerpt: ${JSON.stringify(excerpt)},
    readingTime: "${Math.ceil(articleBody.split(" ").length / 200)} min read",
    body: ${JSON.stringify(articleBody)},
  },`;

    // Insert new article at the beginning (after the opening bracket)
    const insertPoint = content.indexOf("export const articles: Article[] = [");
    if (insertPoint === -1) {
      return NextResponse.json(
        { error: "Could not find articles array" },
        { status: 500 }
      );
    }

    const insertPosition = content.indexOf("[", insertPoint) + 1;
    content =
      content.slice(0, insertPosition) +
      "\n" +
      newArticle +
      "\n" +
      content.slice(insertPosition);

    // Write the file
    fs.writeFileSync(filePath, content);

    // Commit to GitHub using gh CLI
    const commitMessage = `Add article: ${title}`;
    
    try {
      // Configure git user if not set
      execSync('git config user.email "admin@barrioenergy.com"', { 
        cwd: REPO_PATH, 
        stdio: 'ignore' 
      });
      execSync('git config user.name "Barrio Admin"', { 
        cwd: REPO_PATH, 
        stdio: 'ignore' 
      });

      // Stage the file
      execSync(`git add ${ARTICLES_PATH}`, { cwd: REPO_PATH });
      
      // Commit
      execSync(`git commit -m ${JSON.stringify(commitMessage)}`, { cwd: REPO_PATH });
      
      // Push to trigger Vercel deployment
      execSync("git push origin main", { cwd: REPO_PATH });
      
      return NextResponse.json({ 
        success: true, 
        slug,
        message: "Article published and deployed!" 
      });
    } catch (gitError: any) {
      // If git fails, still return success but note the issue
      console.error("Git error:", gitError.message);
      return NextResponse.json({ 
        success: true, 
        slug,
        warning: "Article saved but could not auto-deploy. Please push manually.",
        error: gitError.message
      });
    }
  } catch (error: any) {
    console.error("Publish error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to publish article" },
      { status: 500 }
    );
  }
}
