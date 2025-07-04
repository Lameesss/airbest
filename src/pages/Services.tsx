import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import OfferBanner from '../components/layout/OfferBanner';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AOSInit from '../components/utils/AOSInit';
import { motion } from 'framer-motion';
import { 
  Plane, 
  Package, 
  Ship, 
  Truck, 
  MapPin, 
  Warehouse, 
  Building, 
  Heart, 
  Car, 
  Route, 
  Navigation, 
  FileText, 
  Zap, 
  Anchor 
} from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';

const Services = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('');

  const services = [
    {
      id: 'airfreight',
      title: "Air Freight",
      description: "Experience the fastest and most secure air cargo solutions connecting global destinations. Our air freight services are ideal for urgent shipments that require time-sensitive delivery. We provide comprehensive tracking systems, customs clearance assistance, and expert handling to ensure your cargo reaches its destination safely and on time. With partnerships across major airlines and cargo carriers worldwide, we offer competitive rates and reliable scheduling for both import and export shipments.",
      icon: Plane,
      gradient: "bg-gradient-to-br from-sky-500 to-indigo-600"
    },
    {
      id: 'courier',
      title: "International Courier Services", 
      description: "Our reliable courier delivery network spans the globe, offering secure handling for documents, parcels, and cargo worldwide. We specialize in fast transit times with comprehensive tracking and insurance options. Whether you're sending important business documents or valuable packages, our courier services ensure safe delivery with real-time updates. Our network covers over 200 countries with express, standard, and economy delivery options to meet your budget and timeline requirements.",
      icon: Package,
      gradient: "bg-gradient-to-br from-orange-500 to-red-600"
    },
    {
      id: 'seafreight',
      title: "Sea Freight",
      description: "Cost-effective shipping solutions for heavy and bulk cargo, connecting you to major global ports with reliable delivery schedules. Our sea freight services offer both FCL (Full Container Load) and LCL (Less than Container Load) options, making it perfect for businesses of all sizes. We handle everything from booking and documentation to customs clearance and final delivery. With extensive experience in handling various cargo types including hazardous materials, oversized equipment, and temperature-sensitive goods.",
      icon: Ship,
      gradient: "bg-gradient-to-br from-blue-600 to-cyan-700"
    },
    {
      id: 'roadfreight',
      title: "Road Freight",
      description: "Dependable road transport solutions across the UAE and GCC region, ensuring timely and safe delivery through our extensive network. Our modern fleet of vehicles is equipped with GPS tracking, temperature control, and security systems. We offer both FTL (Full Truck Load) and LTL (Less than Truck Load) services, providing flexible solutions for various cargo sizes. Our experienced drivers are trained in handling specialized cargo and follow strict safety protocols for hazardous materials.",
      icon: Truck,
      gradient: "bg-gradient-to-br from-emerald-500 to-teal-700"
    },
    {
      id: 'forwarding',
      title: "Freight Forwarding",
      description: "Comprehensive end-to-end logistics management from origin to destination with expert coordination and execution. Our freight forwarding services include cargo consolidation, documentation, customs clearance, insurance, and final delivery. We act as your single point of contact, managing multiple carriers and service providers to ensure seamless transportation. Our team of logistics experts optimizes routes and methods to provide cost-effective solutions while maintaining quality service standards.",
      icon: MapPin,
      gradient: "bg-gradient-to-br from-purple-500 to-indigo-700"
    },
    {
      id: 'warehousing',
      title: "Warehousing",
      description: "Secure, strategically located facilities offering comprehensive storage, inventory control, and streamlined distribution services. Our warehouses are equipped with modern security systems, climate control, and advanced inventory management software. We provide value-added services including pick and pack, labeling, quality control, and cross-docking. Our facilities are strategically located near major ports and airports to minimize transportation costs and delivery times.",
      icon: Warehouse,
      gradient: "bg-gradient-to-br from-amber-500 to-orange-600"
    },
    {
      id: 'projectcargo',
      title: "Project Cargo Movement Services",
      description: "Expert handling of oversized, heavy, or complex cargo with detailed planning and guaranteed on-time delivery. Our project cargo specialists have extensive experience in managing challenging shipments including industrial equipment, construction machinery, and infrastructure components. We provide comprehensive project management including route surveys, permit acquisition, specialized equipment arrangement, and risk assessment to ensure successful delivery of your critical cargo.",
      icon: Building,
      gradient: "bg-gradient-to-br from-slate-600 to-gray-800"
    },
    {
      id: 'petrelocation',
      title: "Pet Relocation Services",
      description: "Safe and stress-free pet transport services, ensuring comfort and full compliance throughout their journey. Our pet relocation specialists handle all aspects of international pet travel including health certificates, quarantine arrangements, and customs clearance. We provide comfortable travel crates, 24/7 monitoring during transit, and personalized care for your beloved pets. Our services comply with international regulations including IATA Live Animal Regulations and destination country requirements.",
      icon: Heart,
      gradient: "bg-gradient-to-br from-pink-500 to-rose-600"
    },
    {
      id: 'vehicles',
      title: "Vehicle Movements",
      description: "Secure, professional transport of vehicles within the UAE and internationally with comprehensive insurance coverage. We handle all types of vehicles including cars, motorcycles, boats, and commercial vehicles. Our specialized car carriers and container shipping services ensure your vehicle arrives in pristine condition. We manage all documentation including customs clearance, registration transfers, and compliance with local regulations at the destination.",
      icon: Car,
      gradient: "bg-gradient-to-br from-red-500 to-pink-600"
    },
    {
      id: 'seaair',
      title: "Sea-Air Cargo Movements",
      description: "Innovative hybrid shipping that combines sea and air transport for faster, cost-effective global delivery solutions. This multimodal approach offers the cost benefits of sea freight with the speed advantages of air transport. By optimizing the combination of transportation modes, we reduce overall transit time while maintaining competitive pricing. Ideal for time-sensitive cargo that doesn't require express air freight but needs faster delivery than traditional sea freight.",
      icon: Route,
      gradient: "bg-gradient-to-br from-teal-500 to-blue-600"
    },
    {
      id: 'transit',
      title: "Transit Cargo Movements",
      description: "Smooth handling of cargo through UAE hubs with swift customs clearance and efficient onward routing. Our transit services take advantage of the UAE's strategic location as a global logistics hub, offering fast and efficient cargo movement to final destinations. We handle all transit documentation, temporary storage if required, and coordinate with multiple carriers to ensure seamless cargo flow. Our expertise in UAE customs procedures ensures minimal delays and maximum efficiency.",
      icon: Navigation,
      gradient: "bg-gradient-to-br from-cyan-500 to-blue-700"
    },
    {
      id: 'customs',
      title: "Customs Broker Services",
      description: "Expert customs support to ensure full compliance and efficient shipment clearance across all jurisdictions. Our licensed customs brokers have extensive knowledge of international trade regulations, tariff classifications, and documentation requirements. We handle duty calculations, permit applications, and liaison with customs authorities to expedite clearance processes. Our services include trade compliance consulting, classification rulings, and duty optimization strategies to minimize costs and delays.",
      icon: FileText,
      gradient: "bg-gradient-to-br from-violet-500 to-purple-700"
    },
    {
      id: 'express',
      title: "Express Delivery & Parcels",
      description: "Rapid, fully tracked door-to-door delivery for urgent documents and packages with guaranteed delivery times. Our express services offer same-day, next-day, and 48-hour delivery options across major cities and regions. Each shipment is tracked in real-time with SMS and email notifications for complete visibility. We handle time-critical shipments including medical supplies, legal documents, spare parts, and emergency cargo with the highest priority and care.",
      icon: Zap,
      gradient: "bg-gradient-to-br from-yellow-500 to-orange-600"
    },
    {
      id: 'shipping',
      title: "Sea Shipping Line Agents",
      description: "Authorized agents for major shipping lines, offering comprehensive bookings, documentation, and full cargo support services. As official representatives of leading container shipping lines, we provide direct access to vessel schedules, competitive rates, and priority booking status. Our services include bill of lading issuance, container tracking, demurrage management, and detention handling. We maintain strong relationships with carriers to ensure space availability during peak seasons.",
      icon: Anchor,
      gradient: "bg-gradient-to-br from-navy-600 to-blue-800"
    }
  ];

  // Handle scroll to section when URL has hash
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  // Track active section for navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = services.map(service => document.getElementById(service.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(services[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <AOSInit />
      <OfferBanner />
      <Navbar />
      
      <PageHeader title="Our Services" subtitle="Comprehensive logistics solutions tailored to your business needs" />
      
      {/* Sticky Navigation */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => scrollToSection(service.id)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeSection === service.id
                    ? 'bg-brand-maroon text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-brand-maroon hover:text-white'
                }`}
              >
                {service.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Sections */}
      <main className="py-12">
        {services.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className="py-16 scroll-mt-24"
          >
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className={`rounded-2xl overflow-hidden ${service.gradient} text-white mb-8`}
              >
                <div className="p-8 md:p-12">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mr-6">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">{service.title}</h2>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="max-w-4xl"
              >
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <button className="bg-brand-maroon text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-maroon/90 transition-colors">
                    Get Quote
                  </button>
                  <button className="border-2 border-brand-maroon text-brand-maroon px-6 py-3 rounded-lg font-medium hover:bg-brand-maroon hover:text-white transition-colors">
                    Learn More
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Divider */}
            {index < services.length - 1 && (
              <div className="container mt-16">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              </div>
            )}
          </section>
        ))}
      </main>

      {/* Call to Action Section */}
      <section className="py-16 bg-brand-maroon text-white">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Ship with Us?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get started with our comprehensive logistics solutions today. Contact our experts for a customized quote.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="bg-white text-brand-maroon px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Quote Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-brand-maroon transition-colors">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;