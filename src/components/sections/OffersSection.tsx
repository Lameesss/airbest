import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const offers = [
  {
    title: "Free pickup in UAE for all  shipments!",
    description: "Schedule your shipment and we'll collect it from your location at no extra cost.",
    
  },
  {
    title: "Flat off on DG goods to India!",
    description: "Special discount on all dangerous goods shipments to India destinations.",
    
  },
  {
    title: "Priority handling for All bookings!",
    description: "Get expedited processing and handling when you book air freight services.",
    
  },
  {
    title: "Special discount on bulk shipments",
    description: "Save big when you send multiple packages or large volume freight.",
  
  }
];

export default function OffersSection() {
  return (
    <section id="offers" className="relative section-padding text-white overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/video1522.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-brand-maroon/90 z-0"></div>

      {/* Content */}
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="section-title text-white">Special Offers</h2>
          <p className="section-subtitle text-white/80">
            Take advantage of our limited-time promotions and save on your shipping needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 card-hover flex flex-col justify-between"
            >
              <div>
                
                <h3 className="text-xl font-semibold mb-3">{offer.title}</h3>
                <p className="text-white/80">{offer.description}</p>
              </div>
              <div className="mt-4">
                <Button
                  variant="ghost"
                  className="text-brand-gold hover:bg-white/10 hover:text-brand-gold w-full justify-start px-0"
                  asChild
                >
                  <Link to="/offers">
                    Learn More
                    <svg
                      className="ml-2 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
