
import OfferBanner from '../components/layout/OfferBanner';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AOSInit from '../components/utils/AOSInit';
import { motion } from 'framer-motion';
import PageHeader from '../components/layout/PageHeader';
import { Building, Users, Globe, Award, CheckCircle } from 'lucide-react';

const About = () => {
  const stats = [
    { value: "5+", label: "Years Experience" },
    { value: "120+", label: "Countries Covered" },
    { value: "5000+", label: "Clients Worldwide" },
    { value: "400,000+", label: "Shipments Delivered" }
  ];
  
  const values = [
    { 
      title: "Reliability", 
      description: "We understand that consistency is crucial in logistics. Our reliable service ensures your cargo reaches its destination on time, every time.",
      icon: CheckCircle
    },
    { 
      title: "Integrity", 
      description: "We conduct business with utmost transparency and ethical standards, building trust with our clients and partners.",
      icon: Award
    },
    { 
      title: "Customer Focus", 
      description: "Our clients are at the heart of everything we do. We tailor our services to meet your unique requirements and exceed expectations.",
      icon: Users
    },
    { 
      title: "Global Reach", 
      description: "With extensive international partnerships, we provide seamless logistics solutions across borders and continents.",
      icon: Globe
    }
  ];

  const timeline = [
    { year: "2020", title: "Company Founded", description: "Airbest Express Cargo established in Dubai, UAE." },
    { year: "2021", title: "Regional Expansion", description: "Expanded operations to cover all GCC countries." },
    { year: "2022", title: "International Growth", description: "Launched international shipping services to Asia and Europe." },
    { year: "2023", title: "Technology Integration", description: "Implemented advanced tracking and logistics management systems." },
    { year: "2024", title: "Service Diversification", description: "Added specialized DG goods handling and express air freight services." },
    { year: "2025", title: "Global Network", description: "Established presence in over 120 countries worldwide." }
  ];

  return (
    <div className="min-h-screen bg-brand-beige">
      <AOSInit />
      <OfferBanner />
      <Navbar />
      
      <PageHeader title="About Us" subtitle="Delivering excellence in global logistics since 2010" />
      
      <main className="bg-white">
        {/* Company Introduction */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-brand-gray mb-4">Premium Cargo Solutions <br />for a Connected World</h2>
                <p className="text-gray-700 mb-6">
                  Airbest Express Cargo LLC is a leading provider of global logistics and transportation solutions, specializing in door-to-door, road, sea, and air shipments. Based in Dubai, UAE, we service clients worldwide with reliable, efficient, and cost-effective cargo solutions.
                </p>
                <p className="text-gray-700 mb-6">
                  Our dedication to excellence and customer satisfaction has established us as a trusted partner for businesses of all sizes, from small enterprises to multinational corporations. With a robust international network and cutting-edge technology, we ensure your cargo reaches its destination safely and on time.
                </p>
                <div className="flex items-center space-x-4">
                  <Building size={24} className="text-brand-maroon" />
                  <span className="font-medium">Headquarters: Dubai, United Arab Emirates</span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-brand-beige rounded-xl overflow-hidden shadow-xl"
              >
                <div className="p-1 bg-gradient-to-r from-brand-maroon via-brand-gold to-brand-maroon">
                  <img 
                    src="/lovable-uploads/241cbc50-7775-4954-b0ad-c629b544f5d4.png" 
                    alt="Airbest Express Cargo Operations" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 bg-brand-maroon text-white">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl lg:text-5xl font-bold text-brand-gold mb-2">{stat.value}</div>
                  <p className="text-white/80">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Company History */}
        <section className="py-16">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-brand-gray mb-4">Our Journey</h2>
              <p className="max-w-2xl mx-auto text-gray-700">
                From our humble beginnings to becoming a global logistics provider, we've been committed to excellence every step of the way.
              </p>
            </motion.div>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-1 bg-gray-200 hidden md:block"></div>
              
              <div className="space-y-12 md:space-y-0">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative md:flex items-center ${index % 2 === 0 ? 'md:justify-end' : ''}`}
                  >
                    <div className={`mb-8 md:mb-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8 text-right' : 'md:ml-auto md:pl-8'}`}>
                      <span className="inline-block bg-brand-maroon text-white px-3 py-1 rounded-full text-sm font-semibold mb-2">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-bold text-brand-gray mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                    
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 md:translate-y-0 w-8 h-8 bg-white border-4 border-brand-maroon rounded-full hidden md:block"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16 bg-brand-beige">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-brand-gray mb-4">Our Core Values</h2>
              <p className="max-w-2xl mx-auto text-gray-700">
                These principles guide our operations and shape our approach to serving our clients worldwide.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-xl shadow-lg flex items-start"
                >
                  <div className="bg-brand-maroon p-3 rounded-lg text-white mr-5">
                    <value.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-gray mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Global Network */}
        <section className="py-16">
          <div className="container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-brand-gray mb-4">Our Global Network</h2>
              <p className="max-w-2xl mx-auto text-gray-700 mb-8">
                With a presence spanning across continents, we connect businesses worldwide through our extensive logistics network.
              </p>
              <div className="bg-brand-beige p-8 rounded-xl">
                <div className="aspect-[16/9] bg-white rounded-lg shadow-md flex items-center justify-center">
                  <p className="text-gray-500">Interactive global network map will be integrated here</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
