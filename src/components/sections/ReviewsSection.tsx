
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReviewsSection = () => {
  // Mock review data
  const reviews = [
    {
      id: 1,
      name: "Mohammed Al-Farsi",
      comment: "Exceptional service! My shipment arrived ahead of schedule and in perfect condition. Will definitely use again.",
      rating: 5,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      comment: "I've been using Airbest for all my business shipments for the past 2 years. Highly recommended!",
      rating: 5,
    },
    {
      id: 3,
      name: "Rajesh Patel",
      comment: "Good service overall. The packaging was excellent and delivery was on time.",
      rating: 4,
    }
  ];
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        className={`${index < rating ? "fill-brand-gold text-brand-gold" : "text-gray-300"}`} 
        size={16} 
      />
    ));
  };

  return (
    <section id="reviews" className="section-padding bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Customer Reviews</h2>
          <p className="section-subtitle">
            Don't just take our word for it, see what our customers have to say
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-brand-beige p-6 rounded-xl shadow-md"
            >
              <div className="flex mb-3">
                {renderStars(review.rating)}
              </div>
              <p className="mb-4 text-gray-700">{review.comment}</p>
              <div className="border-t pt-4">
                <p className="font-medium text-brand-gray">{review.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <Link 
            to="/reviews" 
            className="flex items-center text-brand-maroon font-medium hover:underline"
          >
            View All Reviews
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
