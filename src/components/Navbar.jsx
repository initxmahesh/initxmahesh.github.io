import { useState, useEffect } from 'react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Services' }, // Map Services to Skills section
    { id: 'contact', label: 'Resume' }, // Map Resume to Contact section
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-gray-800'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left - Terminal Prompt */}
          <div className="text-xl font-mono terminal-glow text-green-400">
            &gt;_initxmahesh
          </div>

          {/* Middle - Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-mono text-sm transition-colors ${
                  activeSection === item.id
                    ? 'text-blue-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                ~/{item.label}
              </button>
            ))}
          </div>

          {/* Right - Contact Me Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => scrollToSection('contact')}
              className="px-4 py-2 border border-blue-400 text-white rounded-md text-sm font-medium hover:bg-blue-400/10 transition-colors"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

