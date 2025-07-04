import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Plane,
  Package,
  Ship,
  Truck,
  Warehouse,
  Car
} from 'lucide-react';

const services = [
  {
    title: "Air Freight",
    description: "Fast, secure air cargo solutions connecting global destinations—ideal for urgent shipments with full tracking.",
    icon: Plane,
    color: "text-orange-500",
    anchor: "airfreight",
    image: "/IMG_8715.JPEG.jpg"
  },
  {
    title: "International Courier Services",
    description: "Reliable courier delivery for documents, parcels, and cargo worldwide, with fast transit and secure handling.",
    icon: Package,
    color: "text-orange-500",
    anchor: "courier",
    image: "/global-online-shopping-transportation-and-fulfillm-2024-09-19-01-51-56-utc.jpg"
  },
  {
    title: "Sea Freight",
    description: "Cost-effective shipping for heavy and bulk cargo, connecting you to global ports with reliable delivery.",
    icon: Ship,
    color: "text-orange-500",
    anchor: "seafreight",
    image: "/IMG_8717.JPEG.jpg"
  },
  {
    title: "Road Freight",
    description: "Dependable road transport across the UAE and GCC, ensuring timely and safe delivery via our wide network.",
    icon: Truck,
    color: "text-orange-500",
    anchor: "roadfreight",
    image: "/truck-on-a-highway-through-the-grasslands-area-of-2025-04-05-05-02-19-utc.jpg"
  },
  {
    title: "Warehousing",
    description: "Secure, well-located facilities offering storage, inventory control, and streamlined distribution.",
    icon: Warehouse,
    color: "text-orange-500",
    anchor: "warehousing",
    image: "/huge-distribution-warehouse-with-high-shelves-vie-2024-10-31-01-43-55-utc.jpg"
  },
  {
    title: "Vehicle Movements",
    description: "Secure, professional transport of vehicles within the UAE and internationally.",
    icon: Car,
    color: "text-orange-500",
    anchor: "vehicles",
    image: "/auto-transport-carrying-new-fiat-cars-in-european-2025-02-24-14-30-47-utc.jpg"
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Comprehensive logistics solutions to meet your business needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden group"
            >
              {/* Background Image with blackish opacity overlay */}
              <div className="absolute inset-0">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 p-6 h-full flex flex-col">
                <div className="mb-4">
                  <div className="w-14 h-14 bg-orange-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
                    <service.icon className={`w-7 h-7 ${service.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white leading-tight">{service.title}</h3>
                  <p className="text-white leading-relaxed">{service.description}</p>
                </div>
                <div className="mt-auto pt-4">
                  <Button
                    variant="outline"
                    className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300 w-full group-hover:shadow-md"
                    asChild
                  >
                    <Link to={`/services#${service.anchor}`} className="flex items-center justify-center">
                      Learn More
                      <svg
                        className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

}
  