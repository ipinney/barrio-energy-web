import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <nav className="bg-white text-gray-800 py-4 fixed top-0 w-full z-50 shadow-sm">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Image 
                src="/Asset-3@300x.png" 
                alt="Barrio Energy" 
                width={200} 
                height={77}
                className="h-12 w-auto"
              />
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="font-heading text-sm font-semibold text-gray-700 hover:text-barrio-blue transition uppercase tracking-wide">
                Home
              </a>
              <a href="#services" className="font-heading text-sm font-semibold text-gray-700 hover:text-barrio-blue transition uppercase tracking-wide">
                Data Centers
              </a>
              <a href="#advisory" className="font-heading text-sm font-semibold text-gray-700 hover:text-barrio-blue transition uppercase tracking-wide">
                Energy Advisory
              </a>
              <a href="#contact" className="font-heading text-sm font-semibold text-barrio-blue hover:text-blue-700 transition uppercase tracking-wide">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Video Background */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/WEBSITE-Video.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl">
          <h1 className="font-heading text-6xl md:text-7xl font-bold mb-6 uppercase tracking-wider">
            Unlocking Value in Energy
          </h1>
          <p className="font-body text-xl md:text-2xl font-light tracking-wide">
            Driven by Integrity, Transparency, and Trusted Partnerships
          </p>
        </div>

        {/* Scroll Arrow */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-barrio-blue text-white py-16">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="font-heading text-6xl font-bold mb-3">6</div>
              <div className="font-heading text-lg uppercase tracking-widest font-semibold">Facilities</div>
            </div>
            <div>
              <div className="font-heading text-6xl font-bold mb-3">64 MW</div>
              <div className="font-heading text-lg uppercase tracking-widest font-semibold">Power Capacity</div>
            </div>
            <div>
              <div className="font-heading text-6xl font-bold mb-3">24.2</div>
              <div className="font-heading text-lg uppercase tracking-widest font-semibold">Acres Site Capacity</div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/pexels-pixabay-236060.jpg"
                alt="Energy Infrastructure"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-heading text-5xl font-bold text-barrio-navy mb-8 leading-tight">
                Welcome to<br />Barrio Energy
              </h2>
              <div className="space-y-5">
                <p className="font-body text-lg text-gray-700 leading-relaxed">
                  Barrio Energy is an innovative organization committed to the procurement of industrial 
                  scale energy properties and offering unparalleled advisory services to our clientele.
                </p>
                <p className="font-body text-lg text-gray-700 leading-relaxed">
                  Grounded in the principles of honesty and openness, our commitment is to generate 
                  value in diverse areas of the energy and real estate industries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-barrio-light">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-heading text-barrio-blue uppercase tracking-widest font-bold text-xs mb-3 letter-spacing-2">
              Services of Barrio Energy
            </p>
            <h2 className="font-heading text-5xl font-bold text-barrio-navy uppercase tracking-wide">
              Building a Better Tomorrow
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Data Centers Card */}
            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-96">
                <Image
                  src="/IMG_8190-scaled.jpg"
                  alt="Data Center Infrastructure"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="font-heading text-3xl font-bold mb-4">Data Centers</h3>
                <p className="font-body text-base leading-relaxed mb-2 text-gray-100">
                  Barrio Energy specializes in acquiring, developing, and leasing industrial commercial 
                  properties that cater to large-scale energy users, including data centers, battery energy 
                  storage, and other industrial loads within the Texas ERCOT market.
                </p>
                <p className="font-body text-sm text-gray-300 italic">
                  Number of different properties in our portfolio that meet the needs of most industrial 
                  energy users.
                </p>
              </div>
            </div>

            {/* Energy Advisory Card */}
            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-96">
                <Image
                  src="/land.jpg"
                  alt="Energy Advisory Services"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="font-heading text-3xl font-bold mb-4">Energy Advisory</h3>
                <p className="font-body text-base leading-relaxed mb-2 text-gray-100">
                  At Barrio Energy, we offer a wide range of services to support our clients' needs, from 
                  energy advisory, engineering consulting, data center development, and solar and battery 
                  energy storage projects.
                </p>
                <p className="font-body text-sm text-gray-300 italic">
                  Barrio Energy can procure your power at the lowest possible rates to meet your 
                  organization's requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Enabled Energy Management */}
      <section id="advisory" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-heading text-barrio-blue uppercase tracking-widest font-bold text-xs mb-3">
            Services of Barrio Energy
          </p>
          <h2 className="font-heading text-5xl font-bold text-barrio-navy mb-12 uppercase tracking-wide">
            Data Enabled Energy Management
          </h2>
          <div className="bg-barrio-light p-12 rounded-lg shadow-sm">
            <p className="font-body text-xl text-gray-700 leading-relaxed">
              Through our partners, we provide <span className="font-bold text-barrio-navy">24/7 monitoring</span> of 
              different assets. We participate in various demand response programs to meet client needs.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-barrio-light">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-heading text-barrio-blue uppercase tracking-widest font-bold text-xs mb-3">
              Recent Projects
            </p>
            <h2 className="font-heading text-5xl font-bold text-barrio-navy uppercase tracking-wide">
              Our Latest Case Studies
            </h2>
          </div>

          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/IMG_8200-scaled.jpg"
              alt="Project Case Study"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-barrio-navy/90 to-transparent flex items-center">
              <div className="max-w-2xl p-12 text-white">
                <h3 className="font-heading text-4xl font-bold mb-4">Featured Projects</h3>
                <p className="font-body text-xl mb-6">
                  Explore our portfolio of successful energy infrastructure developments across Texas.
                </p>
                <button className="font-heading bg-barrio-blue hover:bg-blue-700 text-white font-bold py-3 px-8 rounded transition uppercase text-sm tracking-wide">
                  View Case Studies
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-barrio-navy"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 text-white">
          <h2 className="font-heading text-5xl font-bold mb-6 uppercase tracking-wide">Contact Us</h2>
          <p className="font-body text-xl mb-12 font-light">
            Ready to discuss your energy infrastructure needs? Get in touch with our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="mailto:info@barrioenergy.com"
              className="font-heading bg-barrio-blue hover:bg-blue-700 text-white font-bold py-4 px-10 rounded transition text-sm uppercase tracking-wide"
            >
              Email Us
            </a>
            <a
              href="#contact"
              className="font-heading border-2 border-white text-white hover:bg-white hover:text-barrio-navy font-bold py-4 px-10 rounded transition text-sm uppercase tracking-wide"
            >
              Schedule a Call
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <Image
                src="/Asset-3@300x.png"
                alt="Barrio Energy"
                width={150}
                height={58}
                className="mb-6 brightness-0 invert opacity-60"
              />
              <p className="font-body text-sm leading-relaxed">
                Innovative energy solutions for the Texas ERCOT market.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-white font-bold mb-4 text-base uppercase tracking-wide">Company</h3>
              <ul className="font-body space-y-3 text-sm">
                <li><a href="#home" className="hover:text-white transition">About</a></li>
                <li><a href="#services" className="hover:text-white transition">Services</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-white font-bold mb-4 text-base uppercase tracking-wide">Services</h3>
              <ul className="font-body space-y-3 text-sm">
                <li><a href="#services" className="hover:text-white transition">Data Centers</a></li>
                <li><a href="#advisory" className="hover:text-white transition">Energy Advisory</a></li>
                <li><a href="#advisory" className="hover:text-white transition">Energy Management</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-white font-bold mb-4 text-base uppercase tracking-wide">Contact</h3>
              <ul className="font-body space-y-3 text-sm">
                <li>info@barrioenergy.com</li>
                <li>Houston, Texas</li>
                <li>ERCOT Market</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="font-body text-sm">&copy; {new Date().getFullYear()} Barrio Energy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
