"use client";

import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Animated section wrapper
function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Service card
function ServiceCard({ title, description, icon, delay, image }: { title: string; description: string; icon: string; delay: number; image?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group relative bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-colors"
    >
      {/* Background Image */}
      {image && (
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-8">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-cyan-400 transition-colors">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

// Navigation
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/data-centers", label: "Data Centers" },
    { href: "/about", label: "Team" },
    { href: "/#contact", label: "Contact" },
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
                className="text-sm text-gray-400 hover:text-white transition-colors"
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
                  className="block py-2 text-gray-400 hover:text-white transition-colors"
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

// Hero section
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster="/images/landscape-datacenter-1.jpg"
      >
        <source src="/images/hero-video.mp4" type="video/mp4" />
      </video>
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      
      {/* Background grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMzMiIGZpbGwtb3BhY2l0eT0iMC4zIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30 z-10" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl z-10" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl z-10" />

      <motion.div style={{ y, opacity }} className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs tracking-widest uppercase">
            Texas ERCOT Market
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
        >
          <span className="text-white">Powering the</span>
          <br />
          <span className="text-gradient">Future of Energy</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-gray-400 mb-12 max-w-2xl"
          style={{ margin: '0 auto 3rem auto', textAlign: 'center' }}
        >
          Acquiring, developing, and leasing industrial commercial properties for data centers, battery storage, and industrial loads.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#services"
            className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors"
          >
            Our Services
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-zinc-700 hover:border-zinc-500 text-white font-semibold rounded-lg transition-colors"
          >
            Contact Us
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-zinc-700 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-zinc-500 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// About section
function About() {
  const sitePhotos = [
    "/images/site-photo-1.jpg",
    "/images/site-photo-2.jpg", 
    "/images/site-photo-3.jpg",
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-white">Building the </span>
              <span className="text-cyan-400">Foundation</span>
              <br />
              <span className="text-white">of Tomorrow</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Barrio Energy is an innovative organization committed to the procurement of industrial 
              scale energy properties and offering unparalleled advisory services to our clientele.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Grounded in the principles of honesty and openness, our commitment is to generate 
              value in diverse areas of the energy and real estate industries.
            </p>
          </AnimatedSection>
          
          <AnimatedSection className="relative">
            <div className="grid grid-cols-2 gap-3">
              {sitePhotos.map((photo, i) => (
                <div 
                  key={i} 
                  className={`aspect-square rounded-xl overflow-hidden border border-zinc-800 ${
                    i === 0 ? "row-span-2" : ""
                  }`}
                >
                  <img 
                    src={photo} 
                    alt={`Barrio Energy facility ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// Services section
function Services() {
  const services = [
    {
      title: "Data Centers",
      description: "Acquiring, developing, and leasing industrial commercial properties for data centers, battery storage, and industrial loads in Texas ERCOT.",
      icon: "🏢",
      image: "/images/tyler-property.jpg",
    },
    {
      title: "Energy Advisory",
      description: "Power procurement, engineering consulting, solar and battery energy storage projects. We procure power at the lowest possible rates.",
      icon: "💡",
      image: "/images/monahans-property-5.jpg",
    },
    {
      title: "24/7 Monitoring",
      description: "Data-enabled energy management with 24/7 monitoring of assets. We participate in various demand response programs.",
      icon: "📊",
      image: "/images/lolita-property.jpg",
    },
  ];

  return (
    <section id="services" className="py-24 px-6 bg-zinc-900/30">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Our </span>
            <span className="text-cyan-400">Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl" style={{ margin: '0 auto', textAlign: 'center' }}>
            Comprehensive energy solutions tailored to your needs.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} {...service} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact section
function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto" style={{ textAlign: 'center' }}>
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-white">Ready to </span>
            <span className="text-cyan-400">Get Started?</span>
          </h2>
          <p className="text-gray-400 mb-12 max-w-xl" style={{ margin: '0 auto 3rem auto', textAlign: 'center' }}>
            Contact us to discuss your energy infrastructure needs. Our team is ready to help you find the right solution.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="mailto:info@barrioenergy.com"
              className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors"
            >
              Email Us
            </a>
            <div className="px-8 py-4 border border-zinc-800 rounded-lg text-gray-400">
              Houston, Texas
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-800">
            <p className="text-cyan-400 font-semibold">info@barrioenergy.com</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-zinc-800">
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

// Main page
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
