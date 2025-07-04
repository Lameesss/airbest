import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Link } from 'react-scroll';

export default function HeroSection() {
  const stats = [
    { value: 31, label: 'Deliveries Made', suffix: 'M+' },
    { value: 1.5, label: 'Clients Served', suffix: 'M+' },
    { value: 150, label: 'Countries Covered', suffix: '+' }
  ];

  const videos = [
    'Airbestvideo1.mov',
    'Airbestvideo2.mp4',
    'Airbestvideo1.mov'
  ];

  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 5000); // change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {videos.map((video, index) => (
          <video
            key={index}
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentVideo ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black opacity-30" />
      </div>

      {/* Foreground Content */}
      <div className="container relative z-10 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Fast, Reliable, Worldwide Logistics
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Expert cargo solutions tailored to your business needs. From door-to-door delivery to international freight, we handle it all with precision.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="tracking" smooth={true} duration={500} offset={-100} className="btn-primary">
                Track Shipment
              </Link>
              <Link to="contact" smooth={true} duration={500} offset={-100} className="btn-outline">
                Get Quote
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white text-black rounded-2xl shadow-xl p-8 transform rotate-2 hover:rotate-0 transition-all duration-500"
          >
            <img src="/airbest-logo.png" alt="Airbest Express Cargo" className="h-20 mb-6 mx-auto" />
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-3xl lg:text-4xl font-bold text-brand-maroon">
                    <CountUp end={stat.value} duration={3} separator="," />
                    {stat.suffix}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
