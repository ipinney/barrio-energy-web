"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSubscribersPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [emailList, setEmailList] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "BarrioNews2026!") {
      setAuthenticated(true);
      loadSubscribers();
    }
  };

  const loadSubscribers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/subscribers");
      if (res.ok) {
        const data = await res.json();
        setSubscribers(data.subscribers || []);
      }
    } catch (err) {
      console.error("Error loading subscribers:", err);
    } finally {
      setLoading(false);
    }
  };

  const sendConfirmation = async (email: string) => {
    try {
      const res = await fetch("/api/subscribe", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (data.mailto) {
        window.location.href = data.mailto;
      }
    } catch (err) {
      console.error("Error sending confirmation:", err);
    }
  };

  const handleCopyEmails = () => {
    const confirmed = subscribers
      .filter((s: any) => s.status === "confirmed")
      .map((s: any) => s.email)
      .join(", ");
    setEmailList(confirmed);
  };

  const handleSendTest = () => {
    const confirmedEmails = subscribers
      .filter((s: any) => s.status === "confirmed")
      .map((s: any) => s.email);
    
    if (confirmedEmails.length === 0) {
      alert("No confirmed subscribers yet!");
      return;
    }

    const subject = encodeURIComponent("Barrio Energy Newsletter");
    const body = encodeURIComponent(`Hi there!

Here is the latest from Barrio Energy.

- The Barrio Energy Team`);
    
    window.location.href = `mailto:?bcc=${confirmedEmails.join(",")}&subject=${subject}&body=${body}`;
  };

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
            <p className="text-zinc-400">Subscriber Management</p>
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
          </form>
        </div>
      </main>
    );
  }

  const confirmedCount = subscribers.filter((s: any) => s.status === "confirmed").length;
  const pendingCount = subscribers.filter((s: any) => s.status === "pending").length;
  const unsubscribedCount = subscribers.filter((s: any) => s.status === "unsubscribed").length;

  return (
    <main className="min-h-screen bg-zinc-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <a href="/news" className="text-cyan-400 hover:text-cyan-300 text-sm">
              ← Back to News
            </a>
            <h1 className="text-3xl font-bold text-white mt-2">Subscribers</h1>
          </div>
          <button
            onClick={() => setAuthenticated(false)}
            className="text-zinc-500 hover:text-white text-sm"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-cyan-400">{confirmedCount}</div>
            <div className="text-zinc-400 text-sm">Confirmed</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-yellow-400">{pendingCount}</div>
            <div className="text-zinc-400 text-sm">Pending</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-red-400">{unsubscribedCount}</div>
            <div className="text-zinc-400 text-sm">Unsubscribed</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={handleCopyEmails}
            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-lg transition-colors"
          >
            Copy Confirmed Emails
          </button>
          <button
            onClick={handleSendTest}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors"
          >
            Email Subscribers
          </button>
        </div>

        {/* Pending Section - Send Confirmations */}
        {pendingCount > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-yellow-400 mb-4">Pending Confirmations</h2>
            <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
              <p className="text-yellow-200 text-sm mb-4">
                These subscribers need to confirm their email. Click "Send Confirmation" to email them directly.
              </p>
              <div className="space-y-2">
                {subscribers.filter((s: any) => s.status === "pending").map((sub: any, i: number) => (
                  <div key={i} className="flex items-center justify-between bg-zinc-900/50 rounded-lg px-4 py-2">
                    <span className="text-white">{sub.email}</span>
                    <button
                      onClick={() => sendConfirmation(sub.email)}
                      className="px-4 py-1 bg-yellow-600 hover:bg-yellow-500 text-white text-sm font-medium rounded transition-colors"
                    >
                      Send Confirmation
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Email list output */}
        {emailList && (
          <div className="mb-8">
            <label className="block text-zinc-400 text-sm mb-2">Email List (copy & paste)</label>
            <textarea
              value={emailList}
              onChange={(e) => setEmailList(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-sm font-mono"
            />
          </div>
        )}

        {/* Subscriber list */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-zinc-800">
              <tr>
                <th className="text-left px-4 py-3 text-zinc-400 text-sm font-semibold">Email</th>
                <th className="text-left px-4 py-3 text-zinc-400 text-sm font-semibold">Status</th>
                <th className="text-left px-4 py-3 text-zinc-400 text-sm font-semibold">Subscribed</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-zinc-500">
                    Loading...
                  </td>
                </tr>
              ) : subscribers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-zinc-500">
                    No subscribers yet
                  </td>
                </tr>
              ) : (
                subscribers.map((sub: any, i: number) => (
                  <tr key={i} className="border-b border-zinc-800/50">
                    <td className="px-4 py-3 text-white">{sub.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                          sub.status === "confirmed"
                            ? "bg-cyan-500/20 text-cyan-400"
                            : sub.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-400 text-sm">
                      {new Date(sub.subscribedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
