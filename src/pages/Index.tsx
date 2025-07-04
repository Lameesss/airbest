// src/pages/Index.tsx

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import OfferBanner from '../components/layout/OfferBanner';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/sections/HeroSection';
import OffersSection from '../components/sections/OffersSection';
import ServicesSection from '../components/sections/ServicesSection';
import TrackingSection from '../components/sections/TrackingSection';
import ReviewsSection from '../components/sections/ReviewsSection';
import Footer from '../components/layout/Footer';
import AOSInit from '../components/utils/AOSInit';
import OfferModal from '../components/OfferModal';
import WhatsappBranches from '../components/layout/WhatsappBranches';
import BranchesSection from '../components/sections/BranchesSection';



const Index = () => {
  useEffect(() => {
    // You can initialize animations or analytics here if needed
  }, []);

  return (
    <div className="min-h-screen bg-brand-beige">
      <AOSInit />
      <OfferModal /> {/* Timed modal for homepage */}
      <OfferBanner />
      <Navbar />

      <main>
        <HeroSection />
        <ServicesSection />
        <BranchesSection />
    
        <OffersSection />
        <TrackingSection />
        <ReviewsSection />

        {/* About Section */}
        <motion.section 
          id="about" 
          className="section-padding bg-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="container">
            <h2 className="section-title text-center">About Us</h2>
            <p className="section-subtitle text-center">
              Premium cargo and logistics services across the globe
            </p>
            <div className="mt-8 text-center">
              <Link to="/about" className="btn-primary">Learn More</Link>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          id="contact" 
          className="section-padding bg-brand-maroon text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="container">
            <h2 className="section-title text-white text-center">Contact Us</h2>
            <p className="section-subtitle text-white/80 text-center">
              Reach out to us for inquiries and bookings
            </p>
            <div className="mt-8 text-center">
              <Link to="/contact" className="btn-secondary">Get In Touch</Link>
            </div>
          </div>
        </motion.section>
      </main>

      <WhatsappBranches />
      <Footer />
    </div>
  );
};

export default Index;
