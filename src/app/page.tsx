import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <nav className="bg-barrio-navy text-white py-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-barrio-blue rounded flex items-center justify-center">
                <span className="text-white font-bold">B</span>
              </div>
              <span className="text-xl font-bold">Barrio Energy</span>
            </div>
            <div className="space-x-6">
              <a href="#services" className="hover:text-barrio-blue transition">
                Services
              </a>
              <a href="#about" className="hover:text-barrio-blue transition">
                About
              </a>
              <a href="#contact" className="hover:text-barrio-blue transition">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-barrio-navy to-barrio-navy/80 text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Energy Infrastructure for the Digital Age
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Powering innovation with reliable, scalable energy solutions for data centers
                and modern enterprises.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-barrio-blue hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition">
                  Get Started
                </button>
                <button className="border-2 border-barrio-blue text-barrio-blue hover:bg-barrio-blue hover:text-white font-semibold py-3 px-8 rounded-lg transition">
                  Learn More
                </button>
              </div>
            </div>
            <div className="hidden lg:block bg-barrio-blue/20 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <p className="text-barrio-blue text-2xl">Brand Asset Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-barrio-navy mb-4">
            Our Services
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Comprehensive energy infrastructure solutions tailored to your needs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Infrastructure Design",
                description: "Custom-engineered energy systems for data centers and facilities",
              },
              {
                title: "Energy Management",
                description: "Real-time monitoring and optimization of power distribution",
              },
              {
                title: "Renewable Integration",
                description: "Sustainable energy solutions with renewable power integration",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition border-l-4 border-barrio-blue"
              >
                <h3 className="text-xl font-semibold text-barrio-navy mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-barrio-blue/10 rounded-lg h-96 flex items-center justify-center">
              <p className="text-barrio-blue text-2xl">Team Photo Placeholder</p>
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-barrio-navy mb-6">
                About Barrio Energy
              </h2>
              <p className="text-gray-600 mb-4">
                We specialize in delivering innovative energy infrastructure solutions that power
                the digital economy. With years of experience in the energy sector, our team
                understands the critical needs of modern data centers and enterprises.
              </p>
              <p className="text-gray-600 mb-6">
                Our commitment is to provide reliable, efficient, and sustainable energy solutions
                that enable businesses to operate at their full potential.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <span className="text-barrio-blue mr-3">✓</span>
                  Industry Leading Expertise
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-barrio-blue mr-3">✓</span>
                  24/7 Technical Support
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-barrio-blue mr-3">✓</span>
                  Sustainable Solutions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="bg-barrio-navy text-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Transform Your Energy Infrastructure?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Get in touch with our team to discuss your energy infrastructure needs.
          </p>
          <button className="bg-barrio-blue hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition">
            Contact Us Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Team
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>Email: info@barrioenergy.com</li>
                <li>Phone: Coming Soon</li>
                <li>Location: Houston, TX</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p>&copy; 2025 Barrio Energy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
