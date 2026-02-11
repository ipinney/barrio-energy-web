import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <nav className="bg-barrio-navy text-white py-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-barrio-blue rounded flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-2xl font-bold">Barrio Energy</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="hover:text-barrio-blue transition font-medium">
                About
              </a>
              <a href="#services" className="hover:text-barrio-blue transition font-medium">
                Services
              </a>
              <a href="#projects" className="hover:text-barrio-blue transition font-medium">
                Projects
              </a>
              <a href="#contact" className="hover:text-barrio-blue transition font-medium">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Stats Banner */}
      <section className="bg-gradient-to-r from-barrio-navy to-barrio-navy/90 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="border-r border-white/20 last:border-r-0">
              <div className="text-5xl font-bold text-barrio-blue mb-2">6</div>
              <div className="text-lg uppercase tracking-wider text-gray-300">Facilities</div>
            </div>
            <div className="border-r border-white/20 last:border-r-0">
              <div className="text-5xl font-bold text-barrio-blue mb-2">64 MW</div>
              <div className="text-lg uppercase tracking-wider text-gray-300">Power Capacity</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-barrio-blue mb-2">24.2</div>
              <div className="text-lg uppercase tracking-wider text-gray-300">Acres Site Capacity</div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-barrio-navy mb-8 text-center">
            Welcome to Barrio Energy
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
            Barrio Energy is an innovative organization committed to the procurement of industrial scale 
            energy properties and offering unparalleled advisory services to our clientele. Grounded in 
            the principles of honesty and openness, our commitment is to generate value in diverse areas 
            of the energy and real estate industries.
          </p>
        </div>
      </section>

      {/* Services Section - Data Centers */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-barrio-blue uppercase tracking-wide font-semibold mb-2">
              Services of Barrio Energy
            </p>
            <h2 className="text-3xl font-bold text-barrio-navy">
              BUILDING A BETTER TOMORROW
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {/* Data Centers */}
            <div className="bg-white p-10 rounded-lg shadow-lg border-t-4 border-barrio-blue">
              <h3 className="text-2xl font-bold text-barrio-navy mb-4">Data Centers</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Barrio Energy specializes in acquiring, developing, and leasing industrial commercial 
                properties that cater to large-scale energy users, including data centers, battery energy 
                storage, and other industrial loads within the Texas ERCOT market.
              </p>
              <p className="text-gray-600 italic">
                Number of different properties in our portfolio that meet the needs of most industrial 
                energy users.
              </p>
            </div>

            {/* Energy Advisory */}
            <div className="bg-white p-10 rounded-lg shadow-lg border-t-4 border-barrio-blue">
              <h3 className="text-2xl font-bold text-barrio-navy mb-4">Energy Advisory</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                At Barrio Energy, we offer a wide range of services to support our clients' needs, from 
                energy advisory, engineering consulting, data center development, and solar and battery 
                energy storage projects.
              </p>
              <p className="text-gray-600 italic">
                Barrio Energy can procure your power at the lowest possible rates to meet your 
                organization's requirements.
              </p>
            </div>
          </div>

          {/* Data Enabled Energy Management */}
          <div className="text-center mb-12">
            <p className="text-barrio-blue uppercase tracking-wide font-semibold mb-2">
              Services of Barrio Energy
            </p>
            <h2 className="text-3xl font-bold text-barrio-navy">
              DATA ENABLED ENERGY MANAGEMENT
            </h2>
          </div>

          <div className="bg-white p-12 rounded-lg shadow-lg max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              Through our partners, we provide 24/7 monitoring of different assets. We participate in 
              various demand response programs to meet client needs.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-barrio-blue uppercase tracking-wide font-semibold mb-2">
              Recent Projects
            </p>
            <h2 className="text-3xl font-bold text-barrio-navy">
              Our Latest Case Studies
            </h2>
          </div>

          <div className="bg-gray-50 p-12 rounded-lg text-center">
            <p className="text-gray-600 italic">
              Case studies coming soon. Contact us to learn about our recent projects.
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="bg-gradient-to-br from-barrio-navy to-barrio-navy/80 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
          <p className="text-xl text-gray-300 mb-8">
            Ready to discuss your energy infrastructure needs? Get in touch with our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@barrioenergy.com"
              className="bg-barrio-blue hover:bg-blue-600 text-white font-semibold py-4 px-10 rounded-lg transition inline-block"
            >
              Email Us
            </a>
            <a
              href="tel:+1234567890"
              className="border-2 border-barrio-blue text-barrio-blue hover:bg-barrio-blue hover:text-white font-semibold py-4 px-10 rounded-lg transition inline-block"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-white transition">
                    Projects
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Services</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#services" className="hover:text-white transition">
                    Data Centers
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition">
                    Energy Advisory
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition">
                    Energy Management
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#projects" className="hover:text-white transition">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    News
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Contact</h3>
              <ul className="space-y-2">
                <li>info@barrioenergy.com</li>
                <li>Houston, Texas</li>
                <li>ERCOT Market</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Barrio Energy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
