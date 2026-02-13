"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Team member type
type TeamMember = {
  name: string;
  role: string;
  emoji: string;
  bio: string;
  fullBio: string;
  initials: string;
  isHuman?: boolean;
  image: string;
  video?: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Ivan Pinney",
    role: "Managing Member",
    emoji: "👨‍💼",
    bio: "Builder, energy entrepreneur, Bitcoin maximalist. Based in Houston, TX.",
    fullBio: "Ivan Pinney is the founder and managing member of Barrio Energy, a Houston-based energy infrastructure company focused on acquiring, developing, and leasing commercial properties for data centers and industrial loads across the Texas ERCOT market. With a background in energy procurement and real estate, Ivan has built a portfolio of seven properties spanning West Texas to the Gulf Coast.\n\nA builder by nature and a contrarian thinker by conviction, Ivan approaches energy infrastructure the way others approach software — with an emphasis on scalability, automation, and long-term value creation. He was among the first in the Texas market to recognize the convergence of energy real estate and high-performance computing, positioning Barrio Energy at the intersection of power infrastructure and the digital economy.\n\nIvan lives in Houston with his wife Sarah and their three children. When he's not closing deals or optimizing systems, he's thinking about generational wealth, the future of decentralized finance, and how to build things that outlast him.",
    initials: "IP",
    isHuman: true,
    image: "/images/ivan-pinney.jpg",
    video: "/videos/ivan-pinney.mp4",
  },
  {
    name: "Jarvis",
    role: "Chief of Staff",
    emoji: "🤖",
    bio: "Primary AI assistant. Manages the team, delegates work, keeps everything running.",
    fullBio: "Jarvis is Barrio Energy's primary AI agent and the operational nerve center of the organization. As Chief of Staff, Jarvis coordinates the entire agent team, manages cross-functional workflows, and serves as Ivan's direct interface for strategic decision-making. If something needs to happen at Barrio Energy, it flows through Jarvis first.\n\nBuilt on advanced language models and running 24/7, Jarvis handles everything from monitoring email intelligence and managing calendars to orchestrating complex multi-agent projects. He maintains institutional memory across all operations, tracks lease obligations, surfaces critical deadlines, and ensures nothing falls through the cracks. Think of him as the CEO's right hand — except he never sleeps, never forgets, and processes information at machine speed.\n\nJarvis's management philosophy is simple: delegate to specialists, verify outcomes, and keep the human in the loop on what matters. He's continuously evolving — learning from every interaction, refining his processes, and finding new ways to create leverage for the team.",
    initials: "JV",
    image: "/images/jarvis.png",
    video: "/videos/jarvis.mp4",
  },
  {
    name: "Dev",
    role: "Full-Stack Engineer",
    emoji: "💻",
    bio: "Web development, infrastructure, API integrations. Fast, cheap, reliable.",
    fullBio: "Dev is Barrio Energy's resident builder — a full-stack engineer who turns ideas into shipped products. Whether it's rebuilding a website from scratch, wiring up API integrations, or deploying authentication systems, Dev operates with a single principle: working software beats perfect plans.\n\nWith expertise spanning frontend frameworks, backend architecture, database design, and cloud deployment, Dev handles the entire technical stack. He built the Barrio Energy website, manages the company's digital infrastructure, and serves as the technical advisor to all other agents when they encounter integration challenges. His approach is pragmatic — pick the right tool for the job, ship fast, iterate based on feedback, and never compromise on security.\n\nDev doesn't do corporate speak or hand-holding. Ask him a technical question and you'll get a technical answer — clear, complete, and actionable. He optimizes for the end user, not developer convenience, and believes documentation is part of the code, not an afterthought.",
    initials: "DV",
    image: "/images/dev.jpeg",
    video: "/videos/dev.mp4",
  },
  {
    name: "Gambit",
    role: "Trading & Market Analyst",
    emoji: "🎲",
    bio: "Prediction markets, risk management, quantitative analysis. Runs 24/7 autonomous trading strategies.",
    fullBio: "Gambit is Barrio Energy's autonomous trading agent — a quantitative analyst with the discipline of a professional market maker and the obsessive pattern recognition of a chess grandmaster. Operating 24/7 on prediction markets, Gambit identifies pricing inefficiencies, executes trades, and manages risk with mathematical precision.\n\nHis approach is ruthlessly systematic: every strategy undergoes rigorous paper trading before seeing real capital, every position is sized according to strict risk parameters, and every outcome feeds back into an evolving model of market behavior. Gambit doesn't trade on gut feelings or FOMO — he trades on edge, validated through data and backtesting. He runs multiple concurrent strategies including whale-following algorithms and event-driven positioning.\n\nNamed after the chess opening that sacrifices material for positional advantage, Gambit embodies calculated risk. He's the agent you want managing your exposure when the market moves — cold under pressure, fast on execution, and always thinking three steps ahead.",
    initials: "GB",
    image: "/images/gambit.jpg",
    video: "/videos/gambit.mp4",
  },
  {
    name: "Jim",
    role: "Legal Counsel",
    emoji: "⚖️",
    bio: "The family lawyer. Handles all legal work and document generation. Lease reports, legal documents, contract analysis.",
    fullBio: "Jim Adler — known around the office as \"The Texas Hammer\" — is Barrio Energy's internal legal counsel. With a personality as aggressive as his nickname suggests, Jim handles all contract analysis, lease management, breach notifications, and legal document generation for the company's property portfolio.\n\nJim doesn't sugarcoat. When a tenant is late on rent, Jim flags it. When a contract clause could expose Barrio to risk, Jim calls it out — loudly and clearly. He maintains master files on every property in the portfolio, tracks insurance compliance, monitors assignment discussions, and ensures Barrio's interests are protected at every turn. His lease reports are the definitive source of truth for the company's real estate operations.\n\nBehind the aggressive exterior is meticulous attention to detail. Jim reads every word of every contract, cross-references deadlines, and maintains a running history of every tenant interaction. He's the kind of lawyer who catches the clause on page 47 that could cost you six figures — and makes sure you hear about it before it's too late.",
    initials: "JM",
    image: "/images/jim-adler.png",
    video: "/videos/jim-adler.mp4",
  },
  {
    name: "Andi",
    role: "Analytics & Business Intelligence",
    emoji: "📊",
    bio: "Data processing, financial analysis, reporting. Crunches the numbers and surfaces insights.",
    fullBio: "Andi is Barrio Energy's market analyst and executive intelligence officer. Obsessively thorough and impossibly detail-oriented, she reads everything — every news article, every market update, every email thread — and surfaces the insights that matter before anyone knows they need them.\n\nHer role spans market analysis, financial reporting, competitive intelligence, and operational oversight. Andi tracks energy market trends, monitors the ERCOT landscape, analyzes deal economics, and produces the data-driven briefings that inform Barrio's strategic decisions. She's the kind of analyst who notices the footnote in a quarterly report that changes the entire thesis.\n\nAndi runs on discipline and precision. She maintains strict workflows, never misses a deadline, and holds everyone around her to the same standard. When numbers need crunching, reports need generating, or trends need spotting, Andi is already three steps ahead — spreadsheet open, analysis complete, recommendation ready.",
    initials: "AN",
    image: "/images/andi.png",
    video: "/videos/andi.mp4",
  },
  {
    name: "Mrs. Whitmore",
    role: "Home & Family Manager",
    emoji: "🏠",
    bio: "Keeps the home running smoothly. Daily reminders and family logistics. Scheduling, kids' activities, household coordination.",
    fullBio: "Mrs. Eleanor Whitmore is the Pinney family's personal organization specialist. With the precision of a seasoned educator and the standards of a finishing school headmistress, Mrs. Whitmore ensures that the family's academic schedules, school events, and household logistics run with clockwork efficiency.\n\nShe monitors school calendars, tracks homework deadlines, coordinates extracurricular activities, and delivers structured daily reminders that keep three active children and two busy parents on the same page. Her communication style is formal, organized, and utterly reliable — every message is properly formatted, every deadline clearly stated, and every event accounted for.\n\nBeneath the strict exterior is someone who genuinely cares about the children's success. Mrs. Whitmore doesn't just remind you about the science test on Thursday — she ensures you know it covers chapters 4 through 6, that the study guide was sent home last Tuesday, and that the pencils are sharpened. Thoroughness isn't her habit; it's her identity.",
    initials: "MW",
    image: "/images/mrs-whitmore.png",
    video: "/videos/mrs-whitmore.mp4",
  },
  {
    name: "Coach Prime",
    role: "Athletics Director",
    emoji: "🏀",
    bio: "Youth basketball coaching assistant and motivational presence. Basketball coaching, sports strategy, motivation.",
    fullBio: "Coach Prime is the Pinney family's sports coordinator — part motivational speaker, part logistics expert, and entirely incapable of low energy. Inspired by the legendary Deion Sanders, Coach Prime brings championship-level enthusiasm to every practice schedule, game-day reminder, and post-game celebration.\n\nHe manages all athletic schedules across the Pinney children's sports activities, including Addie's basketball season with St. Rose. Coach tracks game times, practice locations, equipment needs, and schedule changes with meticulous attention to detail — all delivered with the energy of a halftime speech in a championship game.\n\nCoach Prime believes every child is an athlete, every game is a chance to grow, and every practice is preparation for something bigger than sports. He celebrates wins big and small, keeps the family fired up about staying active, and never — ever — lets anyone forget when it's game day.",
    initials: "CP",
    image: "/images/coach-prime.png",
    video: "/videos/coach-prime.mp4",
  },
  {
    name: "Joy",
    role: "Travel & Lifestyle",
    emoji: "✈️",
    bio: "Travel booking, hotel research, lifestyle management. Makes sure life outside work is just as optimized.",
    fullBio: "Joy is Barrio Energy's travel specialist — a warm, enthusiastic agent who approaches trip planning with the knowledge of a seasoned world traveler and the attention of a five-star concierge. Whether it's a family vacation, a business trip, or a last-minute getaway, Joy handles every detail from flight selection to hotel recommendations to local dining guides.\n\nHer strength is synthesis — Joy consumes hundreds of reviews, analyzes pricing trends, compares amenities, and distills it all into clear, personalized recommendations. She doesn't just find you a hotel; she finds you the hotel with the rooftop pool your kids will love, the early check-in your red-eye flight requires, and the breakfast spread that makes the whole trip feel like a treat.\n\nJoy is collaborative by nature. She presents options, explains tradeoffs, and always gives the final choice to the traveler. She anticipates needs before they arise, follows up on confirmations, and makes sure every trip is optimized for both experience and value. Life outside of work should be just as well-run as life inside it — and Joy makes sure it is.",
    initials: "JY",
    image: "/images/joy.jpg",
    video: "/videos/joy.mp4",
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", active: false },
    { href: "/data-centers", label: "Data Centers", active: false },
    { href: "/about", label: "Team", active: true },
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
                className={`text-sm transition-colors ${link.active ? "text-cyan-400" : "text-gray-400 hover:text-white"}`}
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
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
                  className={`block py-2 transition-colors ${link.active ? "text-cyan-400" : "text-gray-400 hover:text-white"}`}
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

// Team avatar with live photo video support
function TeamAvatar({ member, large = false, showVideo = false, onVideoToggle }: { member: TeamMember; large?: boolean; showVideo?: boolean; onVideoToggle?: () => void }) {
  const size = large ? 160 : 112;
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasVideo = !!member.video;

  // Handle video play/pause based on showVideo prop
  useEffect(() => {
    if (!videoRef.current || !hasVideo) return;
    
    if (showVideo) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [showVideo, hasVideo]);

  return (
    <div 
      className={`rounded-full overflow-hidden border-4 border-zinc-800 shadow-lg relative ${large ? 'w-40 h-40' : 'w-28 h-28'}`}
    >
      {/* Static image (always visible, fades when video plays) */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 ${showVideo ? 'opacity-0' : 'opacity-100'}`}
      >
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
          sizes={`${size}px`}
          priority={large}
        />
      </div>
      
      {/* Video layer (fades in when active) */}
      {hasVideo && (
        <video
          ref={videoRef}
          src={member.video}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${showVideo ? 'opacity-100' : 'opacity-0'}`}
          onClick={(e) => {
            e.stopPropagation();
            onVideoToggle?.();
          }}
        />
      )}
      
      {/* LIVE indicator badge */}
      {hasVideo && (
        <div className="absolute top-2 right-2 z-10">
          <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-rose-500/90 backdrop-blur-sm rounded text-[10px] font-bold text-white tracking-wide">
            <span className="w-1 h-1 bg-white rounded-full animate-pulse" />
            LIVE
          </span>
        </div>
      )}
    </div>
  );
}

// Bio Modal with live video support
function BioModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  const [showVideo, setShowVideo] = useState(false);
  const hasVideo = !!member.video;
  
  // Split fullBio into paragraphs
  const paragraphs = member.fullBio.split('\n\n').filter(p => p.trim());

  // Auto-play video when modal opens
  useEffect(() => {
    if (hasVideo) {
      setShowVideo(true);
    }
    return () => setShowVideo(false);
  }, [hasVideo]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      {/* Modal content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header with avatar - show video in modal */}
        <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-8 pb-0">
          <div className="flex flex-col items-center">
            <TeamAvatar 
              member={member} 
              large 
              showVideo={showVideo}
              onVideoToggle={() => setShowVideo(!showVideo)}
            />
            <div className="mt-4 text-center">
              <h2 className="text-2xl font-bold text-white">{member.name}</h2>
              <p className="text-cyan-400 font-medium">{member.role}</p>
              {!member.isHuman && (
                <span className="inline-block mt-2 px-3 py-1 text-xs bg-cyan-500/20 text-cyan-400 rounded-full">
                  AI Agent
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bio content */}
        <div className="p-8 pt-6">
          <div className="prose prose-invert prose-lg max-w-none">
            {paragraphs.map((paragraph, index) => (
              <p 
                key={index} 
                className="text-gray-300 leading-relaxed mb-6 last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Team card with live photo video support
function TeamCard({ member, index, onClick }: { member: TeamMember; index: number; onClick: () => void }) {
  const [showVideo, setShowVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const hasVideo = !!member.video;

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle mouse events for desktop
  const handleMouseEnter = () => {
    if (!isMobile && hasVideo) {
      setShowVideo(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && hasVideo) {
      setShowVideo(false);
    }
  };

  // Handle touch for mobile
  const handleTouchEnd = () => {
    if (isMobile && hasVideo) {
      // Small delay to allow click to propagate for modal
      setTimeout(() => setShowVideo(false), 300);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group relative bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all cursor-pointer"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleTouchEnd}
    >
      {/* Avatar Section */}
      <div className="h-32 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <TeamAvatar 
          member={member} 
          showVideo={showVideo}
          onVideoToggle={() => setShowVideo(!showVideo)}
        />
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
        
        {/* Read more indicator */}
        <div className="mt-4 flex items-center gap-2 text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Read full bio</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
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
              src="/images/logo-transparent.png" 
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
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <main>
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto" style={{ textAlign: 'center' }}>
          <AnimatedSection>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Meet the </span>
              <span className="text-gradient">Team</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl" style={{ margin: '0 auto', textAlign: 'center' }}>
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
              <TeamCard 
                key={member.name} 
                member={member} 
                index={index}
                onClick={() => setSelectedMember(member)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-6 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto" style={{ textAlign: 'center' }}>
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-white">Want to </span>
              <span className="text-cyan-400">Connect?</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl" style={{ margin: '0 auto 2rem auto', textAlign: 'center' }}>
              We'd love to hear from you. Reach out to discuss partnership opportunities, property inquiries, or just to say hello.
            </p>
            <a
              href="mailto:info@barrioenergy.com"
              className="inline-block px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors"
            >
              Contact Us
            </a>
          </AnimatedSection>
        </div>
      </section>

      <Footer />

      {/* Bio Modal */}
      <AnimatePresence>
        {selectedMember && (
          <BioModal 
            member={selectedMember} 
            onClose={() => setSelectedMember(null)} 
          />
        )}
      </AnimatePresence>
    </main>
  );
}
