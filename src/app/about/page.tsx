"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Team member type
type TeamMember = {
  name: string;
  role: string;
  emoji: string;
  bio: string;
  initials: string;
  isHuman?: boolean;
  image: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Ivan Pinney",
    role: "Managing Member",
    emoji: "👨‍💼",
    bio: "Builder, energy entrepreneur, Bitcoin maximalist. Based in Houston, TX.",
    initials: "IP",
    isHuman: true,
    image: "/images/ivan-pinney.jpg",
  },
  {
    name: "Jarvis",
    role: "Chief of Staff",
    emoji: "🤖",
    bio: "Primary AI assistant. Manages the team, delegates work, keeps everything running.",
    initials: "JV",
    image: "/images/jarvis.png",
  },
  {
    name: "Dev",
    role: "Full-Stack Engineer",
    emoji: "💻",
    bio: "Web development, infrastructure, API integrations. Fast, cheap, reliable.",
    initials: "DV",
    image: "/images/dev.jpeg",
  },
  {
    name: "Gambit",
    role: "Trading & Market Analyst",
    emoji: "🎲",
    bio: "Prediction markets, risk management, quantitative analysis. Runs 24/7 autonomous trading strategies on Polymarket.",
    initials: "GB",
    image: "/images/gambit.jpg",
  },
  {
    name: "Jim Adler",
    role: "Legal Counsel",
    emoji: "⚖️",
    bio: "The family lawyer. Handles all legal work and document generation. Lease reports, legal documents, contract analysis.",
    initials: "JM",
    image: "/images/jim-adler.png",
  },
  {
    name: "Andi",
    role: "Analytics & Business Intelligence",
    emoji: "📊",
    bio: "Data processing, financial analysis, reporting. Crunches the numbers and surfaces insights.",
    initials: "AN",
    image: "/images/andi.png",
  },
  {
    name: "Mrs. Whitmore",
    role: "Home & Family Manager",
    emoji: "🏠",
    bio: "Keeps the home running smoothly. Daily reminders and family logistics. Scheduling, kids' activities, household coordination.",
    initials: "MW",
    image: "/images/mrs-whitmore.png",
  },
  {
    name: "Coach Prime",
    role: "Athletics Director",
    emoji: "🏀",
    bio: "Youth basketball coaching assistant and motivational presence. Basketball coaching, sports strategy, motivation.",
    initials: "CP",
    image: "/images/coach-prime.png",
  },
  {
    name: "Joy",
    role: "Travel & Lifestyle",
    emoji: "✈️",
    bio: "Travel booking, hotel research, lifestyle management. Makes sure life outside work is just as optimized.",
    initials: "JY",
    image: "/images/joy.jpg",
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
      <div className="max-w-6xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img 
              src="/images/logo-main.jpg" 
              alt="Barrio Energy" 
              className="h-10 w-auto"
            />
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

// Team avatar with circular crop using next/image
function TeamAvatar({ member }: { member: TeamMember }) {
  return (
    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-zinc-800 shadow-lg relative">
      <Image
        src={member.image}
        alt={member.name}
        fill
        className="object-cover"
        sizes="112px"
      />
    </div>
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
      {/* Avatar Section */}
      <div className="h-32 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <TeamAvatar member={member} />
      </div>
      
      {/* Info */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-lg font-semibold text-white">{member.name}</h3>
          {!member.isHuman && (
            <span className="px-2 py-0.5 text-xs bg-cyan-500/20 text-cyan-400 rounded-full">
              AI
            </span>
          )}
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
          <div className="flex items-center">
            <img 
              src="/images/logo-main.jpg" 
              alt="Barrio Energy" 
              className="h-8 w-auto"
            />
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
