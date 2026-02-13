"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Property data
type Property = {
  name: string;
  location: string;
  mw: string;
  status: "Leased" | "Available" | "Option Pending";
  acreage: string;
  lat: number;
  lng: number;
  photos: string[];
  hideMap?: boolean;
};

const properties: Property[] = [
  {
    name: "Monahans",
    location: "Monahans, TX",
    mw: "12 MW",
    status: "Leased",
    acreage: "10.0",
    lat: 31.5891,
    lng: -102.8862,
    photos: ["/images/monahans-property.jpg", "/images/monahans-property-2.jpg", "/images/monahans-property-3.jpg", "/images/monahans-property-4.jpg", "/images/monahans-property-5.jpg"],
  },
  {
    name: "Lolita",
    location: "Lolita, TX",
    mw: "7.5 MW",
    status: "Leased",
    acreage: "5.0",
    lat: 28.8378,
    lng: -96.5433,
    photos: [
      "/images/lolita-property.jpg",
      "/images/lolita-property-2.jpg",
      "/images/lolita-property-3.jpg",
      "/images/lolita-property-4.jpg",
    ],
  },
  {
    name: "George West",
    location: "George West, TX",
    mw: "13 MW",
    status: "Leased",
    acreage: "1.0",
    lat: 28.3318,
    lng: -98.1172,
    photos: ["/images/george-west-property.jpg", "/images/george-west-property-2.jpg", "/images/george-west-property-3.jpg", "/images/george-west-property-4.jpg", "/images/george-west-property-5.jpg"],
  },
  {
    name: "Tyler",
    location: "Tyler, TX",
    mw: "12 MW",
    status: "Leased",
    acreage: "1.923",
    lat: 32.3508,
    lng: -95.3125,
    photos: ["/images/tyler-property.jpg", "/images/tyler-property-2.jpg"],
  },
  {
    name: "Blackcat",
    location: "Bay City, TX",
    mw: "10 MW",
    status: "Leased",
    acreage: "4.051",
    lat: 28.9828,
    lng: -95.9694,
    photos: ["/images/baycity-property.jpg", "/images/baycity-property-2.jpg", "/images/baycity-property-3.jpg"],
  },
  {
    name: "Pavlov",
    location: "Bay City, TX",
    mw: "12 MW",
    status: "Option Pending",
    acreage: "3.0",
    lat: 28.9828,
    lng: -95.9694,
    hideMap: true,
    photos: ["/images/baycity-property.jpg", "/images/baycity-property-2.jpg", "/images/baycity-property-3.jpg"],
  },
  {
    name: "Euler",
    location: "Goliad, TX",
    mw: "TBD",
    status: "Available",
    acreage: "2.0",
    lat: 28.6468,
    lng: -97.4380,
    hideMap: true,
    photos: ["/images/landscape-datacenter-3.jpg", "/images/landscape-datacenter-1.jpg"],
  },
];

// Lightbox component
function Lightbox({
  photos,
  propertyName,
  onClose,
}: {
  photos: string[];
  propertyName: string;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white z-10 p-2"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 text-white/70 text-sm">
        {currentIndex + 1} / {photos.length}
      </div>

      {/* Main image */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="relative max-w-5xl max-h-[80vh] w-full px-16 mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photos[currentIndex]}
          alt={`${propertyName} - Photo ${currentIndex + 1}`}
          className="w-full h-full object-contain max-h-[80vh] rounded-lg"
        />
      </motion.div>

      {/* Navigation arrows */}
      {photos.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </motion.div>
  );
}

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
    { href: "/data-centers", label: "Data Centers", active: true },
    { href: "/about", label: "Team", active: false },
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

// Property Card
function PropertyCard({ property, index, onPhotoClick }: { property: Property; index: number; onPhotoClick: (photos: string[], name: string) => void }) {
  const isAvailable = property.status === "Available";
  const isOptionPending = property.status === "Option Pending";
  const mapUrl = `https://www.google.com/maps?q=${property.lat},${property.lng}`;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className={`group relative bg-zinc-900/50 border rounded-2xl overflow-hidden transition-all ${
        isAvailable 
          ? "border-cyan-500/50 hover:border-cyan-400 shadow-lg shadow-cyan-500/10" 
          : isOptionPending
          ? "border-amber-500/30 hover:border-amber-500/50"
          : "border-zinc-800 hover:border-zinc-700"
      }`}
    >
      {/* Background Image - Clickable for gallery */}
      <div 
        className="h-48 overflow-hidden relative cursor-pointer"
        onClick={() => onPhotoClick(property.photos, property.name)}
      >
        <img 
          src={property.photos[0]} 
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
        
        {/* Gallery overlay hint */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white text-sm px-3 py-1 rounded-full">
            View Photos
          </span>
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
            isAvailable 
              ? "bg-cyan-500 text-black" 
              : isOptionPending
              ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
              : "bg-green-500/20 text-green-400 border border-green-500/30"
          }`}>
            {property.status === "Leased" ? "Leased ✅" : property.status === "Available" ? "Available 🔵" : "Option Pending 🟡"}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-1">{property.name}</h3>
        <p className="text-gray-400 text-sm mb-4">{property.location}</p>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-zinc-800/50 rounded-lg p-3">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Capacity</p>
            <p className="text-white font-semibold">{property.mw}</p>
          </div>
          <div className="bg-zinc-800/50 rounded-lg p-3">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Acreage</p>
            <p className="text-white font-semibold">{property.acreage} ac</p>
          </div>
        </div>
        
        {/* Map Link */}
        {!property.hideMap && (
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors mb-4"
          >
            <span>📍</span>
            <span>View on Map</span>
          </a>
        )}
        
        {/* CTA for Available property */}
        {isAvailable && (
          <a
            href="mailto:info@barrioenergy.com"
            className="mt-4 block w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg text-center transition-colors"
          >
            Inquire Now
          </a>
        )}
      </div>
    </motion.div>
  );
}

// Stats Bar
function StatsBar() {
  const stats = [
    { value: "7", label: "Properties" },
    { value: "64+", label: "MW Capacity" },
    { value: "25.6", label: "Acres" },
    { value: "Texas ERCOT", label: "Market" },
  ];

  return (
    <div className="bg-zinc-900/50 border-y border-zinc-800">
      <div className="max-w-6xl px-6 py-8" style={{ margin: '0 auto', textAlign: 'center' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6" style={{ margin: '0 auto' }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-cyan-400">{stat.value}</p>
              <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
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

export default function DataCentersPage() {
  const [lightbox, setLightbox] = useState<{ photos: string[]; name: string } | null>(null);

  const handlePhotoClick = (photos: string[], name: string) => {
    setLightbox({ photos, name });
  };

  const closeLightbox = () => {
    setLightbox(null);
  };

  return (
    <main>
      <Navbar />
      
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/landscape-datacenter-1.jpg" 
            alt="Data Center Portfolio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70 z-10" />
        </div>
        
        {/* Background grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMzMiIGZpbGwtb3BhY2l0eT0iMC4zIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30 z-10" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center px-6 max-w-4xl mx-auto"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs tracking-widest uppercase mb-6">
            Texas ERCOT Market
          </span>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-white">Our </span>
            <span className="text-gradient">Portfolio</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mb-12" style={{ margin: "0 auto", textAlign: "center" }}>
            Premium data center properties across Texas. Strategically positioned for maximum grid connectivity and growth potential.
          </p>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <StatsBar />

      {/* Properties Grid */}
      <section className="px-6" style={{ paddingTop: '80px', paddingBottom: '96px' }}>
        <div className="max-w-6xl mx-auto">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-white">Property </span>
                <span className="text-cyan-400">Portfolio</span>
              </h2>
              <p className="text-gray-400 max-w-2xl" style={{ margin: "0 auto", paddingBottom: "48px", textAlign: "center" }}>
                Explore our collection of data center-ready properties across Texas.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, index) => (
              <PropertyCard key={property.name} property={property} index={index} onPhotoClick={handlePhotoClick} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-white">Don't see what you're </span>
              <span className="text-cyan-400">looking for?</span>
            </h2>
            <p className="text-gray-400 mb-12 max-w-xl" style={{ margin: "0 auto 3rem auto", textAlign: "center" }}>
              We continuously acquire new properties to meet growing demand. Contact us to discuss custom solutions for your needs.
            </p>

            <a
              href="mailto:info@barrioenergy.com"
              className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors"
            >
              Contact Us
            </a>
          </AnimatedSection>
        </div>
      </section>

      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            photos={lightbox.photos}
            propertyName={lightbox.name}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
