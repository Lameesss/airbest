
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Calendar, Package } from 'lucide-react';
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

export interface TrackingEvent {
  status: string;
  date: string;
  time: string;
  location: string;
  completed: boolean;
}

interface TrackingTimelineProps {
  events: TrackingEvent[];
  isOpen: boolean;
}

const TrackingTimeline = ({ events, isOpen }: TrackingTimelineProps) => {
  return (
    <Collapsible open={isOpen} className="w-full max-w-3xl mx-auto">
      <CollapsibleContent>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md p-6 mt-4 mb-8"
            >
              <div className="flex items-center mb-6">
                <Calendar className="text-brand-maroon mr-2 h-5 w-5" />
                <h3 className="text-lg font-semibold text-gray-800">Tracking History</h3>
              </div>

              <div className="relative space-y-8">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

                {events.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative flex items-start ml-8"
                  >
                    <div className={`absolute left-0 -ml-[19px] mt-1.5 w-7 h-7 rounded-full border-2 flex items-center justify-center ${
                      event.completed ? 'bg-brand-maroon border-brand-maroon' : 'bg-white border-gray-300'
                    }`}>
                      {event.completed ? (
                        <Clock size={14} className="text-white" />
                      ) : (
                        <div className="w-2 h-2 bg-gray-300 rounded-full" />
                      )}
                    </div>

                    <div className="ml-8 bg-gray-50 p-4 rounded-lg w-full shadow-sm">
                      <div className={`text-base font-semibold ${
                        event.completed ? 'text-brand-gray' : 'text-gray-400'
                      }`}>
                        {event.status}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-2">
                        <MapPin size={14} className="mr-1 flex-shrink-0" />
                        <span>{event.location}</span>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <Clock size={14} className="mr-1 flex-shrink-0" />
                        {event.date}, {event.time}
                      </div>
                      
                      {event.status.includes('Departed') && (
                        <motion.div 
                          className="mt-2"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          <Truck size={18} className="text-blue-500" />
                        </motion.div>
                      )}
                      
                      {event.status.includes('Created') && (
                        <motion.div 
                          className="mt-2"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          <Package size={18} className="text-gray-500" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CollapsibleContent>
    </Collapsible>
  );
};

// Add the missing Truck import
import { Truck } from 'lucide-react';

export default TrackingTimeline;
