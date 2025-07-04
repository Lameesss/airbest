import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function TrackingSection() {
  const navigate = useNavigate();

  const handleTrackClick = () => {
    navigate('/tracking'); // Navigate to tracking page
  };

  return (
    <section id="tracking" className="section-padding bg-gradient-to-r from-brand-maroon to-brand-gray text-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="section-title text-white">Track Your Shipment</h2>
          <p className="section-subtitle text-white/80">
            Click below to check the status of your courier
          </p>
        </motion.div>

        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="btn-secondary px-8 py-3 text-lg"
            onClick={handleTrackClick}
          >
            Track Now
          </motion.button>
        </div>
      </div>
    </section>
  );
}
