"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Property data
type Property = {
  name: string;
  location: string;
  mw: string;
  tenant: string;
  status: "Leased" | "Available" | "Option Pending";
  acreage: string;
  rent: string;
  description: string;
};

const properties: Property[] = [
  {
    name: "Monahans",
    location: "Monahans, TX",
    mw: "12 MW",
    tenant: "Alteri Enterprise Inc.",
    status: "Leased",
    acreage: "10.0",
    rent: "$6,000/mo",
    description: "Prime location in the Permian Basin with established infrastructure.",
  },
  {
    name: "Lolita",
    location: "Lolita, TX",
    mw: "7.5 MW",
    tenant: "Northern Immersion, LLC",
    status: "Leased",
    acreage: "5.0",
    rent: "$7,500/mo",
    description: "Strategic positioning near major transmission lines.",
  },
  {
    name: "George West",
    location: "George West, TX",
    mw: "TBD",
    tenant: "Digital Energy Partners TX05",
    status: "Leased",
    acreage: "1.0",
    rent: "$750/MW",
    description: "Flexible site ready for custom development.",
  },
  {
    name: "Tyler",
    location: "Tyler, TX",
    mw: "12 MW",
    tenant: "Exacore, LLC",
    status: "Leased",
    acreage: "0.561",
    rent: "$900/MW",
    description: "High-density urban location with excellent connectivity.",
  },
  {
    name: "Blackcat",
    location: "Bay City, TX",
    mw: "10 MW",
    tenant: "Satokie Partners, LLC",
    status: "Leased",
    acreage: "4.051",
    rent: "$2,000+/mo",
    description: "Premium coastal location with robust grid infrastructure.",
  },
  {
    name: "Pavlov",
    location: "Bay City, TX",
    mw: "12 MW",
    tenant: "Digital Energy Partners TX09",
    status: "Option Pending",
    acreage: "3.0",
    rent: "$1,035/MW",
    description: "Expansion opportunity in established energy corridor.",
  },
  {
    name: "Euler",
    location: "Goliad, TX",
    mw: "TBD",
    tenant: "*Available*",
    status: "Available",
    acreage: "2.0",
    rent: "Contact Us",
    description: "Shovel-ready site in growing Texas market.",
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
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/data-centers" className="text-sm text-cyan-400">
              Data Centers
            </Link>
            <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
              Team
            </Link>
            <Link href="/#contact" className="text-sm text-gray-400 hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Property Card
function PropertyCard({ property, index }: { property: Property; index: number }) {
  const isAvailable = property.status === "Available";
  const isOptionPending = property.status === "Option Pending";
  
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
      {/* Background Image */}
      <div className="h-48 overflow-hidden relative">
        <img 
          src={index % 2 === 0 ? "/images/landscape-datacenter-2.jpg" : "/images/landscape-datacenter-3.jpg"} 
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
            isAvailable 
              ? "bg-cyan-500 text-black" 
              : isOptionPending
              ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
              : "bg-green-500/20 text-green-400 border border-green-500/30"
          }`}>
            {property.status}
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
        
        {/* Tenant */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Tenant</p>
          <p className={`text-sm ${isAvailable ? "text-cyan-400 font-semibold" : "text-gray-300"}`}>
            {property.tenant}
          </p>
        </div>
        
        {/* Rent */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Monthly Rent</p>
          <p className="text-white font-semibold">{property.rent}</p>
        </div>
        
        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed border-t border-zinc-800 pt-4">
          {property.description}
        </p>
        
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
    { value: "24.2", label: "Acres" },
    { value: "Texas ERCOT", label: "Market" },
  ];

  return (
    <div className="bg-zinc-900/50 border-y border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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

export default function DataCentersPage() {
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
          className="relative z-20 text-center px-6 max-w-4xl"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs tracking-widest uppercase mb-6">
            Texas ERCOT Market
          </span>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-white">Our </span>
            <span className="text-gradient">Portfolio</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Premium data center properties across Texas. Strategically positioned for maximum grid connectivity and growth potential.
          </p>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <StatsBar />

      {/* Properties Grid */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">Property </span>
              <span className="text-cyan-400">Portfolio</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore our collection of data center-ready properties across Texas.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, index) => (
              <PropertyCard key={property.name} property={property} index={index} />
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
            <p className="text-gray-400 mb-12 max-w-xl mx-auto">
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
    </main>
  );
}
