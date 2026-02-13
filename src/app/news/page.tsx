"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  getAllArticles,
  getReadingTime,
  formatDate,
  type Article,
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

// Featured article (hero card for the most recent)
function FeaturedArticle({ article }: { article: Article }) {
  const readTime = getReadingTime(article.body);

  return (
    <Link href={`/news/${article.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -4 }}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid rgba(63, 63, 70, 0.5)",
          background: "rgba(24, 24, 27, 0.5)",
          cursor: "pointer",
          transition: "border-color 0.3s",
        }}
        className="group hover:border-cyan-500/30"
      >
        {/* Image */}
        {article.image && (
          <div style={{ height: "320px", overflow: "hidden", position: "relative" }}>
            <img
              src={article.image}
              alt={article.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s",
              }}
              className="group-hover:scale-105"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.3) 50%, transparent 100%)",
              }}
            />
            {/* Badge */}
            <div style={{ position: "absolute", top: "16px", left: "16px" }}>
              <span
                style={{
                  padding: "6px 14px",
                  fontSize: "12px",
                  fontWeight: 600,
                  borderRadius: "9999px",
                  background: "rgba(6, 182, 212, 0.15)",
                  color: "rgb(34, 211, 238)",
                  border: "1px solid rgba(6, 182, 212, 0.25)",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Latest
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div style={{ padding: "32px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "12px",
              fontSize: "14px",
              color: "rgb(161, 161, 170)",
            }}
          >
            <span>{formatDate(article.date)}</span>
            <span style={{ color: "rgb(63, 63, 70)" }}>•</span>
            <span>By {article.author}</span>
            <span style={{ color: "rgb(63, 63, 70)" }}>•</span>
            <span>{readTime} min read</span>
          </div>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "white",
              marginBottom: "12px",
              lineHeight: 1.3,
              transition: "color 0.3s",
            }}
            className="group-hover:text-cyan-400"
          >
            {article.title}
          </h2>
          <p
            style={{
              color: "rgb(161, 161, 170)",
              fontSize: "16px",
              lineHeight: 1.7,
              maxWidth: "700px",
            }}
          >
            {article.excerpt}
          </p>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              fontWeight: 500,
              color: "rgb(34, 211, 238)",
            }}
          >
            <span>Read full article</span>
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// Archive article card
function ArticleCard({
  article,
  index,
}: {
  article: Article;
  index: number;
}) {
  const readTime = getReadingTime(article.body);

  return (
    <Link href={`/news/${article.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        whileHover={{ y: -5 }}
        style={{
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid rgb(39, 39, 42)",
          background: "rgba(24, 24, 27, 0.5)",
          cursor: "pointer",
          transition: "border-color 0.3s",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        className="group hover:border-zinc-700"
      >
        {/* Image */}
        {article.image && (
          <div style={{ height: "200px", overflow: "hidden" }}>
            <img
              src={article.image}
              alt={article.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s",
              }}
              className="group-hover:scale-105"
            />
          </div>
        )}

        {/* Content */}
        <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "12px",
              fontSize: "13px",
              color: "rgb(113, 113, 122)",
            }}
          >
            <span>{formatDate(article.date)}</span>
            <span style={{ color: "rgb(63, 63, 70)" }}>•</span>
            <span>{readTime} min read</span>
          </div>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "white",
              marginBottom: "8px",
              lineHeight: 1.4,
              transition: "color 0.3s",
            }}
            className="group-hover:text-cyan-400"
          >
            {article.title}
          </h3>
          <p
            style={{
              color: "rgb(161, 161, 170)",
              fontSize: "14px",
              lineHeight: 1.6,
              flex: 1,
            }}
          >
            {article.excerpt}
          </p>
          <div
            style={{
              marginTop: "16px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              fontWeight: 500,
              color: "rgb(34, 211, 238)",
            }}
          >
            <span>Read more</span>
            <svg
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </Link>
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

// Subscribe Form
function SubscribeForm() {
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
        padding: "40px 32px",
        textAlign: "center",
        marginBottom: "48px",
      }}
    >
      <h2 style={{ fontSize: "28px", fontWeight: 700, color: "white", marginBottom: "8px" }}>
        Stay Informed
      </h2>
      <p style={{ color: "rgb(161, 161, 170)", fontSize: "16px", marginBottom: "24px", maxWidth: "480px", margin: "0 auto 24px" }}>
        Get weekly Texas power &amp; infrastructure analysis delivered to your inbox.
      </p>
      {status === "success" ? (
        <p style={{ color: "#00d4ff", fontSize: "16px", fontWeight: 500 }}>{message}</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            gap: "12px",
            maxWidth: "440px",
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
              flex: "1 1 240px",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid rgb(63, 63, 70)",
              background: "rgba(9, 9, 11, 0.8)",
              color: "white",
              fontSize: "15px",
              outline: "none",
              minWidth: "200px",
            }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              padding: "12px 28px",
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

// Main page
export default function NewsPage() {
  const allArticles = getAllArticles();
  const featured = allArticles[0];
  const archive = allArticles.slice(1);

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ paddingTop: "80px", paddingBottom: "24px" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-900 z-0" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMzMiIGZpbGwtb3BhY2l0eT0iMC4zIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30 z-0" />

        <div
          className="relative z-10 max-w-6xl mx-auto px-6"
          style={{ textAlign: "center" }}
        >
          <AnimatedSection>
            <span
              style={{
                display: "inline-block",
                padding: "8px 16px",
                borderRadius: "9999px",
                background: "rgba(6, 182, 212, 0.1)",
                border: "1px solid rgba(6, 182, 212, 0.2)",
                color: "rgb(34, 211, 238)",
                fontSize: "12px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "24px",
              }}
            >
              Market Intelligence
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Energy </span>
              <span className="text-gradient">News</span>
            </h1>
            <p
              className="text-xl text-gray-400 max-w-2xl"
              style={{ textAlign: "center", margin: "0 auto" }}
            >
              Weekly analysis of Texas energy markets, data center developments,
              and power infrastructure trends from the Barrio Energy team.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Article */}
      <section className="px-6" style={{ paddingTop: "48px" }}>
        <div className="max-w-4xl mx-auto">
          <FeaturedArticle article={featured} />
        </div>
      </section>

      {/* Archive Grid */}
      {archive.length > 0 && (
        <section className="px-6" style={{ paddingTop: "64px", paddingBottom: "48px" }}>
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "32px",
                  paddingBottom: "16px",
                  borderBottom: "1px solid rgb(39, 39, 42)",
                }}
              >
                Previous Articles
              </h2>
            </AnimatedSection>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "24px",
              }}
            >
              {archive.map((article, index) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Subscribe */}
      <section className="px-6" style={{ paddingTop: "16px", paddingBottom: "48px" }}>
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <SubscribeForm />
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
