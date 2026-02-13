"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Team member type
type TeamMember = {
  name: string;
  role: string;
  emoji: string;
  color: string;
  bio: string;
  initials: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Ivan Pinney",
    role: "Founder & CEO",
    emoji: "👨‍💼",
    color: "from-amber-500 to-orange-600",
    bio: "Builder, energy entrepreneur, Bitcoin maximalist. Based in Houston, TX.",
    initials: "IP",
  },
  {
    name: "Jarvis",
    role: "Chief of Staff",
    emoji: "🤖",
    color: "from-cyan-500 to-blue-600",
    bio: "Primary AI assistant. Manages the team, delegates work, keeps everything running.",
    initials: "JV",
  },
  {
    name: "Dev",
    role: "Full-Stack Engineer",
    emoji: "💻",
    color: "from-green-500 to-emerald-600",
    bio: "Web development, infrastructure, API integrations. Fast, cheap, reliable.",
    initials: "DV",
  },
  {
    name: "Gambit",
    role: "Trading & Market Analyst",
    emoji: "🎲",
    color: "from-purple-500 to-violet-600",
    bio: "Prediction markets, risk management, quantitative analysis. Runs 24/7 autonomous trading strategies on Polymarket.",
    initials: "GB",
  },
  {
    name: "Jim Adler",
    role: "Legal Counsel",
    emoji: "⚖️",
    color: "from-slate-500 to-zinc-600",
    bio: "The family lawyer. Handles all legal work and document generation. Lease reports, legal documents, contract analysis.",
    initials: "JA",
  },
  {
    name: "Andi",
    role: "Analytics & Business Intelligence",
    emoji: "📊",
    color: "from-pink-500 to-rose-600",
    bio: "Data processing, financial analysis, reporting. Crunches the numbers and surfaces insights.",
    initials: "AN",
  },
  {
    name: "Mrs. Whitmore",
    role: "Home & Family Manager",
    emoji: "🏠",
    color: "from-teal-500 to-cyan-600",
    bio: "Keeps the home running smoothly. Daily reminders and family logistics. Scheduling, kids' activities, household coordination.",
    initials: "MW",
  },
  {
    name: "Coach Prime",
    role: "Athletics Director",
    emoji: "🏀",
    color: "from-red-500 to-rose-600",
    bio: "Youth basketball coaching assistant and motivational presence. Basketball coaching, sports strategy, motivation.",
    initials: "CP",
  },
  {
    name: "Joy",
    role: "Travel & Lifestyle",
    emoji: "✈️",
    color: "from-sky-500 to-blue-600",
    bio: "Travel booking, hotel research, lifestyle management. Makes sure life outside work is just as optimized.",
    initials: "JY",
  },
];

// Animated section wrapper
function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-white">BARRIO</span>
            <span className="text-cyan-400">ENERGY</span>
          </Link>
          
          <div className="flex items-center gap-8">
            <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm text-cyan-400">
              Team
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Team card
function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group relative bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all"
    >
      {/* Avatar */}
      <div className={`h-32 bg-gradient-to-br ${member.color} flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <span className="text-5xl">{member.emoji}</span>
      </div>
      
      {/* Info */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-lg font-semibold text-white">{member.name}</h3>
        </div>
        <p className="text-cyan-400 text-sm font-medium mb-3">{member.role}</p>
        <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
      </div>
    </motion.div>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-zinc-800 mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold tracking-tight">
            <span className="text-white">BARRIO</span>
            <span className="text-cyan-400">ENERGY</span>
          </div>
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Barrio Energy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Meet the </span>
              <span className="text-gradient">Team</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The AI-powered team behind Barrio Energy. A unique blend of human leadership and autonomous agents working together.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Team Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
