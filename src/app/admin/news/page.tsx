"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminNewsPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  
  const [form, setForm] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    author: "Andi",
    excerpt: "",
    body: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - in production use proper auth
    if (password === "BarrioNews2026!") {
      setAuthenticated(true);
    } else {
      setMessage("Invalid password");
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.excerpt || !form.body) {
      setMessage("Please fill in all fields");
      return;
    }

    setSaving(true);
    setMessage("Publishing...");

    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Published! Redirecting...");
        setTimeout(() => {
          router.push("/news");
        }, 2000);
      } else {
        setMessage(data.error || "Failed to publish");
      }
    } catch (err) {
      setMessage("Error publishing article");
    } finally {
      setSaving(false);
    }
  };

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
            <p className="text-zinc-400">Barrio Energy News</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors"
            >
              Login
            </button>
            {message && (
              <p className="text-red-400 text-center text-sm">{message}</p>
            )}
          </form>
          <p className="text-center text-zinc-600 text-xs mt-4">
            Restricted access
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <a href="/news" className="text-cyan-400 hover:text-cyan-300 text-sm">
              ← Back to News
            </a>
            <h1 className="text-3xl font-bold text-white mt-2">Publish Article</h1>
          </div>
          <button
            onClick={() => setAuthenticated(false)}
            className="text-zinc-500 hover:text-white text-sm"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handlePublish} className="space-y-6">
          <div>
            <label className="block text-zinc-400 text-sm mb-2">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Article headline"
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 text-sm mb-2">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-2">Author</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 text-sm mb-2">Excerpt</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              placeholder="Short summary for the news listing..."
              rows={2}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-zinc-400 text-sm mb-2">
              Article Body (HTML)
            </label>
            <textarea
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              placeholder="<p>Write your article content here...</p>"
              rows={15}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 font-mono text-sm resize-none"
            />
            <p className="text-zinc-600 text-xs mt-2">
              Use HTML tags for formatting: &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;, &lt;a href="..."&gt;, etc.
            </p>
          </div>

          {message && (
            <div className={`text-sm ${message.includes("Published") ? "text-green-400" : "text-red-400"}`}>
              {message}
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-zinc-700 text-black font-semibold rounded-lg transition-colors"
            >
              {saving ? "Publishing..." : "Publish Article"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/news")}
              className="px-8 py-3 border border-zinc-700 hover:border-zinc-500 text-white font-semibold rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
