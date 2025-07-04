
import { useEffect, useState } from 'react';
import OfferBanner from '../components/layout/OfferBanner';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AOSInit from '../components/utils/AOSInit';
import { motion } from 'framer-motion';
import PageHeader from '../components/layout/PageHeader';
import { CheckCircle, Clock } from 'lucide-react';

const Offers = () => {
  const [activeTab, setActiveTab] = useState('current');
  
  // Offers data
  const offers = {
    current: [
      {
        title: "10.99 Air Cargo & 4.99 Sea Cargo Shipments",
        description: "Special discount on all door-to-door shipments from UAE to India.",
        code: "DOOR15",
        expiryDate: "May 30, 2025",
        conditions: ["Minimum 30kg shipment", "Valid for new and existing customers", "Cannot be combined with other offers"],
        highlight: true
      },
      {
        title: "Free Pickup in UAE",
        description: "Schedule your shipment and we'll collect it from your location within UAE at no extra cost.",
        code: "FREEPICKUP",
        expiryDate: "Ongoing",
        conditions: ["Valid for All shipments only", "24-hour advance booking required", "Subject to location availability"],
        highlight: false
      },
      {
        title: "9.99 AED only to UK",
        description: "Special discount on all dangerous goods shipments to UK destinations.",
        code: "DGINDIA15",
        expiryDate: "June 15, 2025",
        conditions: ["Valid documentation required", "Applicable on select categories of DG goods", "Subject to regulatory approval"],
        highlight: false
      },
      {
        title: "Priority Air Cargo Handling",
        description: "Get expedited processing and handling when you book air freight services.",
        code: "PRIORITY",
        expiryDate: "Ongoing",
        conditions: ["Available on request", "Subject to capacity availability", "Premium service fee applies"],
        highlight: false
      }
    ],
    upcoming: [
      {
        title: "Summer Special  Offer",
        description: "Upcoming summer promotion with greater discounts on all international shipments.",
        launchDate: "June 1, 2025",
        highlight: true
      },
      {
        title: "Bulk Shipment Discount",
        description: "New tiered discount structure for high-volume shippers.",
        launchDate: "July 15, 2025",
        highlight: false
      }
    ]
  };

  return (
    <div className="min-h-screen bg-brand-beige">
      <AOSInit />
      <OfferBanner />
      <Navbar />
      
      <PageHeader title="Special Offers" subtitle="Take advantage of our limited-time promotions and exclusive deals" />
      
      <main className="py-16 bg-white">
        <div className="container">
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              <button 
                onClick={() => setActiveTab('current')} 
                className={`px-6 py-2 rounded-md transition-all ${activeTab === 'current' ? 'bg-brand-maroon text-white' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                Current Offers
              </button>
              <button 
                onClick={() => setActiveTab('upcoming')} 
                className={`px-6 py-2 rounded-md transition-all ${activeTab === 'upcoming' ? 'bg-brand-maroon text-white' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                Upcoming Offers
              </button>
            </div>
          </div>
          
          <div className="mt-10">
            {activeTab === 'current' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {offers.current.map((offer, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`rounded-xl overflow-hidden shadow-lg ${offer.highlight ? 'ring-4 ring-brand-gold' : ''}`}
                  >
                    <div className={`p-6 ${offer.highlight ? 'bg-gradient-to-r from-brand-maroon to-red-800 text-white' : 'bg-white border-b'}`}>
                      {offer.highlight && <span className="inline-block bg-brand-gold text-brand-gray text-xs font-semibold px-2 py-1 rounded-full mb-2">FEATURED OFFER</span>}
                      <h3 className={`text-2xl font-bold ${offer.highlight ? 'text-white' : 'text-brand-maroon'}`}>{offer.title}</h3>
                      <p className={`mt-2 ${offer.highlight ? 'text-white/90' : 'text-gray-600'}`}>{offer.description}</p>
                    </div>
                    <div className="bg-white p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="bg-brand-beige px-4 py-2 rounded-md">
                          <span className="text-xs text-gray-600">PROMO CODE</span>
                          <div className="font-mono font-bold text-lg text-brand-maroon">{offer.code}</div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-600">VALID UNTIL</span>
                          <div className="flex items-center font-medium">
                            <Clock size={16} className="mr-1 text-brand-maroon" />
                            <span>{offer.expiryDate}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Conditions:</p>
                        <ul className="space-y-1">
                          {offer.conditions.map((condition, idx) => (
                            <li key={idx} className="flex items-start text-sm">
                              <CheckCircle size={16} className="mr-2 mt-0.5 text-brand-maroon flex-shrink-0" />
                              <span>{condition}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button className="w-full mt-6 btn-primary">Redeem Offer</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            {activeTab === 'upcoming' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {offers.upcoming.map((offer, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`rounded-xl overflow-hidden shadow-lg bg-white border-t-4 ${offer.highlight ? 'border-brand-gold' : 'border-gray-200'}`}
                  >
                    <div className="p-6">
                      {offer.highlight && <span className="inline-block bg-brand-gold text-white text-xs font-semibold px-2 py-1 rounded-full mb-2">COMING SOON</span>}
                      <h3 className="text-2xl font-bold text-brand-gray">{offer.title}</h3>
                      <p className="mt-2 text-gray-600">{offer.description}</p>
                    </div>
                    <div className="bg-brand-beige p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-xs text-gray-600">LAUNCHING</span>
                          <div className="flex items-center font-medium">
                            <Clock size={16} className="mr-1 text-brand-maroon" />
                            <span>{offer.launchDate}</span>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-white text-brand-maroon font-medium rounded-md hover:bg-gray-50">Notify Me</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          
          <motion.div 
            className="mt-16 p-8 bg-brand-beige rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-brand-gray">Subscribe for Exclusive Offers</h2>
            <p className="mt-2 text-gray-600">Be the first to know about new promotions and receive exclusive deals.</p>
            <form className="mt-6 flex flex-col md:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-maroon"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">Subscribe Now</button>
            </form>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Offers;
