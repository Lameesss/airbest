
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <section className="bg-gradient-to-r from-brand-maroon to-red-900 text-white py-16 md:py-24">
      <div className="container">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{title}</h1>
          {subtitle && <p className="text-xl text-white/80">{subtitle}</p>}
        </motion.div>
      </div>
      
      {/* Divider wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        
      </div>
    </section>
  );
};

export default PageHeader;
