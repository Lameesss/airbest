
import { useState } from 'react';
import OfferBanner from '../components/layout/OfferBanner';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AOSInit from '../components/utils/AOSInit';
import { motion } from 'framer-motion';
import PageHeader from '../components/layout/PageHeader';
import { Briefcase, MapPin, Clock, ChevronDown, ChevronUp, Upload, CheckCircle } from 'lucide-react';

const Careers = () => {
  const [openings, setOpenings] = useState([
    {
      id: 1,
      title: "Accountant (Cargo & Courier)",
      department: "Accounts",
      location: "Dubai, UAE",
      type: "Full-time",
      isExpanded: false,
      description: "We are seeking a skilled Accountant with experience in the cargo and courier sector to manage financial transactions and reporting..",
      responsibilities: [
        "Handle accounts receivable and payable",
        "Prepare and maintain financial reports",
        "Reconcile financial discrepancies",
        "Ensure compliance with accounting standards specific to the cargo industry",
      ],
      requirements: [
        "Minimum 2 years of experience in cargo & courier accounting",
        "Must be based in the UAE",
        "Proficient in English and Hindi",
        "Willingness to work in a physical and fast-paced environment",
        "Knowledge of international shipping regulations"
      ]
    },
    {
      id: 1,
      title: " Counter Sales & Billing Executive",
      department: "Sales & Customer Service",
      location: "Dubai, UAE",
      type: "Full-time",
      isExpanded: false,
      description: "Represent Airbest Express Cargo at the front desk, assisting customers and generating accurate billing..",
      responsibilities: [
        "Attend to walk-in customers and address their inquiries",
        "Prepare invoices and process payments",
        "Maintain records of daily transactions",
        "Support customer service and sales operations",
      ],
      requirements: [
        "Proficient in English and Hindi",
        "Must be based in the UAE",
        "Proficient in English and Hindi",
        "Experience in cargo/billing is a plus",
        "Willingness to work in a physical and fast-paced environment",
        "Knowledge of international shipping regulations"
      ]
    },
   
    {
      id: 1,
      title: "Cargo Courier Helper / Packing Staff",
      department: "Operations",
      location: "Dubai, UAE",
      type: "Full-time",
      isExpanded: false,
      description: "Join our dynamic logistics team to assist with courier handling and packing operations at Airbest Express Cargo LLC.",
      responsibilities: [
        "Assist in packaging shipments securely",
        "Load and unload cargo",
        "Ensure accurate labelling and dispatch of items",
        "Maintain cleanliness and safety in the packing area",
      ],
      requirements: [
        "Proficient in English and Hindi",
        "Must be based in the UAE",
        "Under 35 years of age",
        "Willingness to work in a physical and fast-paced environment",
        "Knowledge of international shipping regulations"
      ]
    },
    
    
    {
      id: 4,
      title: "Customer Service Representative",
      department: "Customer Support",
      location: "Remote",
      type: "Full-time",
      isExpanded: false,
      description: "We're seeking a Customer Service Representative to handle inquiries, provide shipment updates, and ensure customer satisfaction. This role is crucial for maintaining our reputation for excellent service.",
      responsibilities: [
        "Handle customer inquiries via phone, email, and chat",
        "Provide shipment tracking information and updates",
        "Process orders and coordinate with operations team",
        "Resolve customer complaints and escalate as needed",
        "Maintain customer records and documentation",
        "Identify opportunities to improve customer experience"
      ],
      requirements: [
        "1+ years of experience in customer service",
        "Excellent communication skills in English (additional languages a plus)",
        "Strong problem-solving abilities",
        "Proficiency in CRM software",
        "Ability to multitask and work in a fast-paced environment",
        "Customer-oriented mindset"
      ]
    },
    {
      id: 5,
      title: "Warehouse Supervisor",
      department: "Operations",
      location: "Sharjah, UAE",
      type: "Full-time",
      isExpanded: false,
      description: "We are looking for an experienced Warehouse Supervisor to oversee daily warehouse operations, including inventory management, staff supervision, and safety compliance. This role is essential for maintaining efficient warehouse operations.",
      responsibilities: [
        "Oversee daily warehouse operations and activities",
        "Manage inventory levels and ensure accuracy",
        "Supervise warehouse staff and assign tasks",
        "Implement safety procedures and ensure compliance",
        "Coordinate shipment receipts and dispatches",
        "Optimize warehouse layout and processes for efficiency"
      ],
      requirements: [
        "2+ years of experience in warehouse management",
        "Knowledge of inventory management systems",
        "Strong leadership and people management skills",
        "Experience with warehouse equipment and technologies",
        "Understanding of safety regulations and procedures",
        "Ability to work in a physically demanding environment"
      ]
    }
  ]);
  
  const [filters, setFilters] = useState({
    department: 'all',
    location: 'all'
  });
  
  const [applicationForm, setApplicationForm] = useState({
    jobId: null,
    name: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
    isSubmitting: false,
    isSubmitted: false
  });
  
  // Toggle job opening expanded state
  const toggleExpand = (id: number) => {
    setOpenings(openings.map(job => 
      job.id === id ? { ...job, isExpanded: !job.isExpanded } : job
    ));
  };
  
  // Apply filters
  const filteredOpenings = openings.filter(job => {
    return (filters.department === 'all' || job.department === filters.department) &&
           (filters.location === 'all' || job.location === filters.location);
  });
  
  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
  
  // Collect available filter options
  const departments = [...new Set(openings.map(job => job.department))];
  const locations = [...new Set(openings.map(job => job.location))];
  
  // Handle application form
  const openApplicationForm = (jobId: number) => {
    setApplicationForm({ ...applicationForm, jobId });
  };
  
  const handleApplicationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplicationForm({ ...applicationForm, [name]: value });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setApplicationForm({ ...applicationForm, resume: e.target.files[0] });
    }
  };
  
  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationForm({ ...applicationForm, isSubmitting: true });
    
    // Simulate form submission
    setTimeout(() => {
      setApplicationForm({
        ...applicationForm,
        isSubmitting: false,
        isSubmitted: true,
        name: '',
        email: '',
        phone: '',
        resume: null,
        coverLetter: ''
      });
      
      // Reset submitted state after a delay
      setTimeout(() => {
        setApplicationForm({ ...applicationForm, isSubmitted: false, jobId: null });
      }, 3000);
    }, 1500);
  };
  
  const closeApplicationForm = () => {
    setApplicationForm({ ...applicationForm, jobId: null });
  };

  return (
    <div className="min-h-screen bg-brand-beige">
      <AOSInit />
      <OfferBanner />
      <Navbar />
      
      <PageHeader title="Careers" subtitle="Join our team and grow your career in global logistics" />
      
      
      <main className="py-16 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-brand-gray mb-4">Grow With Us</h2>
            <p className="text-gray-700 mb-6">
              At Airbest Express Cargo, we're always looking for talented individuals who are passionate about logistics and committed to excellence. Join our diverse team and be part of a company that values innovation, integrity, and exceptional service.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="flex items-center text-brand-maroon">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Competitive Salary</span>
              </div>
              <div className="flex items-center text-brand-maroon">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Growth Opportunities</span>
              </div>
              <div className="flex items-center text-brand-maroon">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Global Exposure</span>
              </div>
            </div>
          </motion.div>
          
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-brand-gray mb-6">Current Openings</h3>
            
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    id="department"
                    name="department"
                    value={filters.department}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-maroon"
                  >
                    <option value="all">All Departments</option>
                    {departments.map((dept, index) => (
                      <option key={index} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <select
                    id="location"
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-maroon"
                  >
                    <option value="all">All Locations</option>
                    {locations.map((loc, index) => (
                      <option key={index} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredOpenings.length === 0 ? (
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">No job openings match your current filters. Please try different criteria.</p>
                </div>
              ) : (
                filteredOpenings.map((job) => (
                  <motion.div 
                    key={job.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div 
                      className="flex flex-col md:flex-row md:items-center justify-between p-6 cursor-pointer bg-white hover:bg-gray-50 transition-colors"
                      onClick={() => toggleExpand(job.id)}
                    >
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center">
                          <Briefcase className="text-brand-maroon mr-2" size={20} />
                          <h4 className="text-lg font-semibold text-brand-gray">{job.title}</h4>
                        </div>
                        <div className="mt-2 flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <span className="bg-brand-beige px-2 py-1 rounded-md">{job.department}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-1" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock size={16} className="mr-1" />
                            <span>{job.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button className="mr-4 text-brand-maroon font-medium">
                          {job.isExpanded ? 'View Less' : 'View More'}
                        </button>
                        {job.isExpanded ? (
                          <ChevronUp size={20} className="text-gray-400" />
                        ) : (
                          <ChevronDown size={20} className="text-gray-400" />
                        )}
                      </div>
                    </div>
                    
                    {job.isExpanded && (
                      <div className="p-6 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-700 mb-6">{job.description}</p>
                        
                        <div className="mb-6">
                          <h5 className="text-lg font-semibold text-brand-gray mb-3">Responsibilities:</h5>
                          <ul className="space-y-2">
                            {job.responsibilities.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <svg className="w-5 h-5 text-brand-maroon mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="mb-6">
                          <h5 className="text-lg font-semibold text-brand-gray mb-3">Requirements:</h5>
                          <ul className="space-y-2">
                            {job.requirements.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <svg className="w-5 h-5 text-brand-maroon mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex justify-end">
                          <button 
                            onClick={() => openApplicationForm(job.id)}
                            className="bg-brand-maroon text-white py-2 px-6 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))
              )}
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
              <h2 className="text-2xl font-bold text-brand-gray mb-4">Don't See a Perfect Match?</h2>
              <p className="text-gray-600 mb-8">
                We're always on the lookout for exceptional talent. Send us your resume, and we'll consider you for future opportunities.
              </p>
              <button 
                onClick={() => openApplicationForm(0)} // 0 means general application
                className="inline-flex items-center bg-brand-maroon text-white py-3 px-8 rounded-lg font-medium transition-all hover:shadow-lg transform hover:-translate-y-1"
              >
                Send Your Resume
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </main>
      
      {/* Application Form Modal */}
      {applicationForm.jobId !== null && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-brand-gray">
                {applicationForm.jobId === 0 
                  ? "General Application" 
                  : `Apply for ${openings.find(job => job.id === applicationForm.jobId)?.title}`}
              </h3>
              <button onClick={closeApplicationForm} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            {applicationForm.isSubmitted ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-500 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-brand-gray mb-2">Application Submitted!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for applying. We will review your application and contact you if there's a match.
                </p>
                <button 
                  onClick={closeApplicationForm} 
                  className="inline-flex items-center bg-brand-maroon text-white py-2 px-6 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form 
  action="https://formsubmit.co/it@airbestcargo.com" 
  method="POST" 
  encType="multipart/form-data" 
  className="p-6"
>
  {/* Hidden inputs for customization */}
  <input type="hidden" name="_subject" value="New Career Application from Website" />
  <input type="hidden" name="_captcha" value="false" />
  <input type="hidden" name="_next" value="https://yourdomain.com/thank-you" />

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
      <input
        type="text"
        id="name"
        name="name"
        required
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-maroon"
        placeholder="Your full name"
      />
    </div>
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
      <input
        type="email"
        id="email"
        name="email"
        required
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-maroon"
        placeholder="your@email.com"
      />
    </div>
  </div>

  <div className="mb-6">
    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
    <input
      type="tel"
      id="phone"
      name="phone"
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-maroon"
      placeholder="Your phone number"
    />
  </div>

  <div className="mb-6">
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">Resume/CV *</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg px-6 py-10 text-center">
                    <div className="flex flex-col items-center">
                      <Upload className="text-gray-400 mb-4" size={32} />
                      <p className="text-sm text-gray-500 mb-4">
                        {applicationForm.resume 
                          ? applicationForm.resume.name 
                          : "Drag and drop your resume here, or click to browse"}
                      </p>
                      <input
                        type="file"
                        id="resume"
                        accept=".pdf,.doc,.docx"
                        required
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label 
                        htmlFor="resume" 
                        className="bg-brand-beige text-brand-maroon py-2 px-4 rounded-lg cursor-pointer font-medium transition-colors hover:bg-brand-beige/80"
                      >
                        Select File
                      </label>
                      <p className="mt-2 text-xs text-gray-500">PDF, DOC, or DOCX (Max. 5MB)</p>
                    </div>
                  </div>
                </div>

  <div className="mb-6">
    <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label>
    <textarea
      id="coverLetter"
      name="coverLetter"
      rows={4}
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-maroon"
      placeholder="Tell us why you're interested in this position and what makes you a good fit."
    ></textarea>
  </div>

  <div className="flex justify-end">
    <button 
      type="submit"
      className="bg-brand-maroon text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center min-w-[120px]"
    >
      Submit Application
    </button>
  </div>
</form>

            )}
          </motion.div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Careers;
