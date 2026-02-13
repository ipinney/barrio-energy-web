"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  getArticleBySlug,
  getReadingTime,
  formatDate,
} from "@/content/articles";

// Animated section wrapper
function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Navigation
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", active: false },
    { href: "/data-centers", label: "Data Centers", active: false },
    { href: "/about", label: "Team", active: false },
    { href: "/news", label: "News", active: true },
    { href: "/#contact", label: "Contact", active: false },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img
              src="/images/logo-transparent.png"
              alt="Barrio Energy"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  link.active
                    ? "text-cyan-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-zinc-800 mt-4"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 transition-colors ${
                    link.active
                      ? "text-cyan-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-zinc-800" style={{ marginTop: "96px" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center">
            <img
              src="/images/logo-transparent.png"
              alt="Barrio Energy"
              className="h-8 w-auto"
            />
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Barrio Energy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Subscribe CTA for article bottom
function ArticleSubscribeCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Successfully subscribed!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(24, 24, 27, 0.8) 100%)",
        border: "1px solid rgba(6, 182, 212, 0.2)",
        borderRadius: "16px",
        padding: "32px 28px",
        textAlign: "center",
        marginTop: "48px",
      }}
    >
      <h3 style={{ fontSize: "22px", fontWeight: 700, color: "white", marginBottom: "8px" }}>
        Enjoyed this analysis?
      </h3>
      <p style={{ color: "rgb(161, 161, 170)", fontSize: "15px", marginBottom: "20px", maxWidth: "400px", margin: "0 auto 20px" }}>
        Get weekly Texas power &amp; infrastructure insights delivered to your inbox.
      </p>
      {status === "success" ? (
        <p style={{ color: "#00d4ff", fontSize: "15px", fontWeight: 500 }}>{message}</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            gap: "12px",
            maxWidth: "420px",
            margin: "0 auto",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
            required
            style={{
              flex: "1 1 220px",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid rgb(63, 63, 70)",
              background: "rgba(9, 9, 11, 0.8)",
              color: "white",
              fontSize: "15px",
              outline: "none",
              minWidth: "180px",
            }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              background: status === "loading" ? "rgba(6, 182, 212, 0.4)" : "#00d4ff",
              color: "#0a0a0b",
              fontSize: "15px",
              fontWeight: 600,
              cursor: status === "loading" ? "not-allowed" : "pointer",
              transition: "background 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p style={{ color: "#ef4444", fontSize: "14px", marginTop: "12px" }}>{message}</p>
      )}
    </div>
  );
}

// Author bio card
function AuthorBioCard({ author }: { author: string }) {
  if (author !== "Andi") return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "20px",
        padding: "28px",
        borderRadius: "16px",
        border: "1px solid rgb(39, 39, 42)",
        background: "rgba(24, 24, 27, 0.5)",
        marginTop: "32px",
      }}
    >
      <img
        src="/images/andi.png"
        alt="Andi"
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "9999px",
          objectFit: "cover",
          flexShrink: 0,
          border: "2px solid rgba(6, 182, 212, 0.3)",
        }}
      />
      <div>
        <h4 style={{ fontSize: "17px", fontWeight: 700, color: "white", margin: "0 0 4px" }}>
          Andi
        </h4>
        <p style={{ fontSize: "13px", color: "#00d4ff", margin: "0 0 10px", fontWeight: 500 }}>
          Market Intelligence Analyst | Barrio Energy
        </p>
        <p style={{ fontSize: "14px", color: "rgb(161, 161, 170)", lineHeight: 1.6, margin: 0 }}>
          Andi covers Texas power infrastructure, AI data center development, and digital energy markets. She tracks the intersection of compute demand and grid capacity across ERCOT and beyond.
        </p>
      </div>
    </div>
  );
}

// Article page
export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <main>
        <Navbar />
        <div
          style={{
            paddingTop: "160px",
            paddingBottom: "160px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "white",
              marginBottom: "16px",
            }}
          >
            Article Not Found
          </h1>
          <p style={{ color: "rgb(161, 161, 170)", marginBottom: "32px" }}>
            The article you're looking for doesn't exist.
          </p>
          <Link
            href="/news"
            style={{
              color: "rgb(34, 211, 238)",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            ← Back to News
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const readTime = getReadingTime(article.body);

  return (
    <main>
      <Navbar />

      {/* Hero image */}
      {article.image && (
        <div
          style={{
            position: "relative",
            height: "400px",
            overflow: "hidden",
            marginTop: "56px",
          }}
        >
          <img
            src={article.image}
            alt={article.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.5) 40%, rgba(10,10,10,0.2) 100%)",
            }}
          />
        </div>
      )}

      {/* Article content */}
      <article
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: article.image ? "0 24px" : "120px 24px 0",
          marginTop: article.image ? "-80px" : "0",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/news"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "rgb(34, 211, 238)",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "none",
              marginBottom: "32px",
              transition: "color 0.2s",
            }}
            className="hover:text-cyan-300"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to News
          </Link>
        </motion.div>

        {/* Title & meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1
            style={{
              fontSize: "36px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.2,
              marginBottom: "20px",
              letterSpacing: "-0.02em",
            }}
          >
            {article.title}
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              paddingBottom: "32px",
              marginBottom: "32px",
              borderBottom: "1px solid rgb(39, 39, 42)",
              flexWrap: "wrap",
            }}
          >
            {/* Author avatar placeholder */}
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "9999px",
                background: "linear-gradient(135deg, rgb(6, 182, 212), rgb(14, 116, 144))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: 700,
                color: "white",
                flexShrink: 0,
              }}
            >
              {article.author.charAt(0)}
            </div>
            <div>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "white",
                  margin: 0,
                }}
              >
                By {article.author}{" "}
                <span style={{ color: "rgb(113, 113, 122)", fontWeight: 400 }}>
                  | Barrio Energy
                </span>
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: "rgb(113, 113, 122)",
                  margin: 0,
                }}
              >
                {formatDate(article.date)} · {readTime} min read
              </p>
            </div>
          </div>
        </motion.div>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          dangerouslySetInnerHTML={{ __html: article.body }}
          style={{
            color: "rgb(212, 212, 216)",
            fontSize: "17px",
            lineHeight: 1.8,
            letterSpacing: "0.01em",
          }}
          className="article-body"
        />

        {/* Author bio */}
        <AuthorBioCard author={article.author} />

        {/* Subscribe CTA */}
        <ArticleSubscribeCTA />

        {/* Bottom nav */}
        <div
          style={{
            marginTop: "48px",
            paddingTop: "32px",
            borderTop: "1px solid rgb(39, 39, 42)",
            textAlign: "center",
          }}
        >
          <Link
            href="/news"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              borderRadius: "8px",
              border: "1px solid rgb(63, 63, 70)",
              color: "white",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "none",
              transition: "border-color 0.2s",
            }}
            className="hover:border-zinc-500"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            All Articles
          </Link>
        </div>
      </article>

      <Footer />

      {/* Article body styles */}
      <style jsx global>{`
        .article-body h2 {
          font-size: 24px;
          font-weight: 700;
          color: white;
          margin-top: 40px;
          margin-bottom: 16px;
          line-height: 1.3;
        }
        .article-body p {
          margin-bottom: 20px;
        }
        .article-body a {
          color: rgb(34, 211, 238);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .article-body a:hover {
          color: rgb(103, 232, 249);
        }
        .article-body ul,
        .article-body ol {
          margin-bottom: 20px;
          padding-left: 24px;
        }
        .article-body li {
          margin-bottom: 8px;
        }
        .article-body blockquote {
          border-left: 3px solid rgb(6, 182, 212);
          padding-left: 20px;
          margin: 24px 0;
          color: rgb(161, 161, 170);
          font-style: italic;
        }
      `}</style>
    </main>
  );
}
