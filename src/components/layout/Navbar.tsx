
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'Services', to: '/services' },
  { name: 'Offers', to: '/offers' },
  { name: 'Tracking', to: '/tracking' },
  { name: 'Careers', to: '/careers' },
  { name: 'Reviews', to: '/reviews' },
  { name: 'About Us', to: '/about' },
  { name: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <nav 
      className={`py-4 transition-all duration-300 sticky top-8 z-40 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img 
              src="/LOGO.png" 
              alt="Airbest Express Cargo" 
              className="h-10 md:h-12"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to || 
                             (link.to !== '/' && location.pathname.startsWith(link.to));
            
            return (
              <Link
                key={link.name}
                to={link.to}
                className={`font-medium transition-colors ${
                  isActive 
                    ? 'text-brand-maroon font-semibold' 
                    : 'text-brand-gray hover:text-brand-maroon'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="h-1 bg-brand-maroon rounded-full mt-1"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          
          <Link
            to="/tracking"
            className="btn-primary ml-4"
          >
            Track Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-brand-gray focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white shadow-lg"
          >
            <div className="container py-4 flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to || 
                                (link.to !== '/' && location.pathname.startsWith(link.to));
                
                return (
                  <Link
                    key={link.name}
                    to={link.to}
                    className={`py-2 font-medium ${
                      isActive 
                        ? 'text-brand-maroon font-semibold' 
                        : 'text-brand-gray hover:text-brand-maroon'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-mobile-indicator"
                        className="h-0.5 bg-brand-maroon rounded-full mt-1 max-w-[40px]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
              <Link
                to="/tracking"
                className="btn-primary text-center"
              >
                Track Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
