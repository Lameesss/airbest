
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const offers = [
  "🔥 Special Offer on All Door-to-Door Shipments! 🔥",
  "⚡ Free pickup in UAE for all  shipments! ⚡",
  "🌟 Flat OFFER on DG goods ! 🌟",
  "✈️ Priority handling for All cargo bookings! ✈️"
];

export default function OfferBanner() {
  const [currentOffer, setCurrentOffer] = useState(0);

  // Auto rotate offers every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-brand-maroon text-white py-2 sticky top-0 z-50">
      <div className="container">
        <motion.div
          key={currentOffer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center font-medium text-sm md:text-base"
        >
          {offers[currentOffer]}
        </motion.div>
      </div>
    </div>
  );
}
