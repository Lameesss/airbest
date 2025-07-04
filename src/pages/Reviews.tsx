
import { useState } from 'react';
import OfferBanner from '../components/layout/OfferBanner';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AOSInit from '../components/utils/AOSInit';
import { motion } from 'framer-motion';
import PageHeader from '../components/layout/PageHeader';
import { Star, StarHalf, User, MessageSquare, ExternalLink } from 'lucide-react';

const Reviews = () => {
  const [filter, setFilter] = useState('all');
  
  // Mock review data
  const reviews = [
    {
      id: 1,
      name: " Shahbax 1122",
      date: "April 15, 2025",
      rating: 5,
      comment: "I have been using ( Air Best Express Cargo LLC) service for the last Two years to ship my goods from Dubai to Germany and the USA .The entire process was seamless and efficient. Their customer service team was responsive and helpful, keeping me informed every step of the way.The goods arrived safely and on time, which was a huge relief. I was impressed by the company's attention to detail and commitment to delivering exceptional service.I highly recommend ( Air Best Express Cargo LLC) to anyone looking for a reliable and trustworthy shipping partner. Thank you for a job well done",

      service: "door-to-door",
      verified: true
    },
    {
      id: 2,
      name: "Kyaw Myint",
      date: "April 10, 2025",
      rating: 5,
      comment: "I recently received four packages, and I am extremely satisfied with the service. Each package arrived in perfect condition, and the entire process was seamless from start to finish. The delivery was timely, and the updates on tracking were accurate and reassuring. The handling was careful, showing a high level of professionalism from the team. I highly recommend this cargo service for their efficiency, reliability, and attention to detail. Excellent experience overall and thank you Air Best Cargo Deira",
      service: "sea",
      verified: true
    },
    {
      id: 3,
      name: "Mordiyah Awayewaserere",
      date: "March 28, 2025",
      rating: 4,
      comment: "I have been using this services for the past 3 years in shipping abaya orders worldwide and they always deliver, no single failed delivery. I also love that they update with tracking numbers easily and settle any concerns very fast whenever the need arises. Thanks to all the team at their London hotel office area,Deira.",
      service: "air",
      verified: true
    },
    {
      id: 4,
      name: "impelia dcosta",
      date: "March 22, 2025",
      rating: 5,
      comment: "One of the best courier service to send parcels to our loved ones . I was worried to send my parcel from Dubai to Goa India but this courier people helped me out . It was last minute I contacted them to send my courier and without any hassle they did my job fast. Loved the service. Highly recommended",
      service: "dg-goods",
      verified: true
    },
    {
      id: 5,
      name: "David Chen",
      date: "March 15, 2025",
      rating: 4.5,
      comment: "Very pleased with their door-to-door service from Dubai to Singapore. The shipment arrived within the promised timeframe, and everything was intact. Their staff was courteous and professional throughout the process.",
      service: "door-to-door",
      verified: true
    },
    {
      id: 6,
      name: "Aisha Hassan",
      date: "March 8, 2025",
      rating: 3.5,
      comment: "The service was good but could be better. My goods arrived safely but the delivery was delayed by a day. Communication could have been better about the delay. Otherwise, reasonable pricing and good handling of the items.",
      service: "road",
      verified: false
    },
    {
      id: 7,
      name: "John Smith",
      date: "February 27, 2025",
      rating: 5,
      comment: "I've tried several cargo companies for my imports from China to UAE, and Airbest is by far the most reliable. Their customs clearance process is smooth, and they keep you informed at every stage. Great value for money!",
      service: "import-export",
      verified: true
    },
    {
      id: 8,
      name: "Priya Sharma",
      date: "February 20, 2025",
      rating: 4,
      comment: "Airbest helped me ship personal belongings from Dubai to Mumbai. The process was straightforward, and their team was helpful in guiding me through the paperwork. Competitive pricing too!",
      service: "sea",
      verified: true
    }
  ];
  
  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(review => review.service === filter);
  
  // Rendering stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="fill-brand-gold text-brand-gold" size={18} />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="fill-brand-gold text-brand-gold" size={18} />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-gray-300" size={18} />);
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen bg-brand-beige">
      <AOSInit />
      <OfferBanner />
      <Navbar />
      
      <PageHeader title="Customer Reviews" subtitle="See what our customers say about our services" />
      
      <main className="py-16 bg-white">
        <div className="container">
          <div className="mb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-brand-gray">Customer Testimonials</h2>
                <p className="text-gray-600">Read authentic reviews from our valued customers</p>
              </div>
              
              <div>
                <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Service</label>
                <select 
                  id="filter" 
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-maroon"
                >
                  <option value="all">All Services</option>
                  <option value="door-to-door">Door to Door</option>
                  <option value="road">Road Cargo</option>
                  <option value="sea">Sea Shipments</option>
                  <option value="air">Air Shipments</option>
                  <option value="dg-goods">DG Goods</option>
                  <option value="import-export">Import/Export</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredReviews.map((review, index) => (
                <motion.div 
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <div className="bg-brand-beige p-2 rounded-full mr-3">
                          <User className="text-brand-maroon" size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-brand-gray">{review.name}</h3>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      {review.verified && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                          Verified
                        </span>
                      )}
                    </div>
                    
                    <div className="flex mb-3">
                      {renderStars(review.rating)}
                      <span className="ml-2 text-gray-600 text-sm">{review.rating}</span>
                    </div>
                    
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                  
                  <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
                    <span className="text-sm text-gray-600 capitalize">{review.service.replace('-', ' ')} Service</span>
                    <button className="text-brand-maroon flex items-center text-sm font-medium hover:underline">
                      <MessageSquare size={16} className="mr-1" />
                      Reply
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-brand-beige p-8 rounded-xl text-center"
          >
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-brand-gray mb-4">Share Your Experience</h2>
              <p className="text-gray-600 mb-8">Your feedback helps us improve our services and assists other customers in making informed decisions.</p>
              
              <a 
                href="https://www.google.com/search?sca_esv=a2fccd0347a25b28&sxsrf=AHTn8zq3KJJjOu71cxm6UOOLixH8WvOQaw:1745413415171&q=Airbest+Express+Cargo+LLC+reviews&uds=ABqPDvztZD_Nu18FR6tNPw2cK_RR2ajvbcBzxzfVHtLI7QPj92_gSebeYxh2i9hoRZU_Nv-KJWXwehZ3Ajp4ECnG9w1Optxhy8ixsut8vgioEfAaqoqvRqXeqQtBLDFLHBFtKb_S_oojQ4sVIDqEdWLnXotm_6e9j_hYZdOetwYX8DDqJPd2J72MUm2vF7YTJN2RW8QcNcthU9tN3UAaKhRwXo2BL9FGTrhqY-e-VKnMwnmKc4xoRfsEJalV8wxYtwtT-X34c7C0&sa=X&ved=2ahUKEwj-vePUm-6MAxUl_7sIHcEYHBMQxKsJegQIDxAB&ictx=0&biw=1536&bih=695&dpr=1.25&lqi=CiFBaXJiZXN0IEV4cHJlc3MgQ2FyZ28gTExDIHJldmlld3MiAjgBSLOI-qqcuYCACFo3EAAQARACEAMYABgBGAIYAyIZYWlyYmVzdCBleHByZXNzIGNhcmdvIGxsYyoKCAIQABABEAIQA5IBEWxvZ2lzdGljc19zZXJ2aWNlqgFBEAEyHhABIhq_eC8tSYP4XYdGBv4jKvTnvtYuUq0YhMy_BDIdEAIiGWFpcmJlc3QgZXhwcmVzcyBjYXJnbyBsbGM#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center bg-brand-maroon text-white py-3 px-8 rounded-lg font-medium transition-all hover:shadow-lg transform hover:-translate-y-1"
              >
                Leave a Google Review
                <ExternalLink className="ml-2" size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reviews;
