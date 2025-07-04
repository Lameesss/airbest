
import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, Check, MapPin, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';

export type ShipmentStatus = 
  | 'Created' 
  | 'Collected' 
  | 'Departed' 
  | 'In Transit' 
  | 'Arrived at Destination' 
  | 'Out for Delivery' 
  | 'Delivered';

interface TrackingProgressProps {
  currentStatus: ShipmentStatus;
  progress: number;
  destination?: string;
  totalPieces?: number;
  weight?: string;
  onViewHistory: () => void;
}

const statusConfig = {
  'Created': { icon: Package, color: 'bg-gray-400 border-gray-400', textColor: 'text-gray-700', step: 1 },
  'Collected': { icon: Package, color: 'bg-blue-500 border-blue-500', textColor: 'text-blue-700', step: 2 },
  'Departed': { icon: Truck, color: 'bg-blue-600 border-blue-600', textColor: 'text-blue-700', step: 3 },
  'In Transit': { icon: Truck, color: 'bg-blue-700 border-blue-700', textColor: 'text-blue-700', step: 4 },
  'Arrived at Destination': { icon: MapPin, color: 'bg-green-500 border-green-500', textColor: 'text-green-700', step: 5 },
  'Out for Delivery': { icon: Truck, color: 'bg-green-600 border-green-600', textColor: 'text-green-700', step: 6 },
  'Delivered': { icon: Check, color: 'bg-green-700 border-green-700', textColor: 'text-green-700', step: 7 }
} as const;

const TrackingProgress = ({ 
  currentStatus, 
  progress, 
  destination = "Mumbai, India", 
  totalPieces = 1, 
  weight = "5.2 kg",
  onViewHistory 
}: TrackingProgressProps) => {
  const steps = Object.entries(statusConfig);
  const currentStep = statusConfig[currentStatus].step;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-4xl mx-auto my-8"
    >
      <Card className="bg-white shadow-md rounded-xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Shipment Progress</h3>
            <Button 
              onClick={onViewHistory}
              variant="outline" 
              className="flex items-center text-brand-maroon border-brand-maroon hover:bg-brand-maroon/10"
            >
              <Clock size={16} className="mr-2" />
              View History
            </Button>
          </div>

          <div className="mb-6">
            <Progress 
              value={progress} 
              className="h-2 bg-gray-100" 
              style={{
                '--progress-background': '#70030a',
              } as React.CSSProperties}
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {steps.map(([status, config], index) => {
              const isCompleted = config.step <= currentStep;
              const isActive = config.step === currentStep;
              const Icon = config.icon;
              
              return (
                <motion.div
                  key={status}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: config.step * 0.1 }}
                  className={`flex flex-col items-center p-3 rounded-lg ${
                    isActive ? 'bg-brand-beige' : isCompleted ? 'bg-gray-50' : 'opacity-50'
                  }`}
                >
                  <motion.div
                    animate={{
                      scale: isActive ? [1, 1.2, 1] : 1,
                      transition: { duration: 0.5, repeat: isActive ? Infinity : 0, repeatDelay: 3 }
                    }}
                    className={`p-3 rounded-full ${
                      isCompleted ? 'text-white ' + config.color : 'text-gray-400 bg-gray-100'
                    } shadow-md relative`}
                  >
                    {isCompleted && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: 0 }}
                      />
                    )}
                    <Icon size={24} className="relative z-10" />
                  </motion.div>
                  <p className={`mt-2 text-xs md:text-sm text-center ${
                    isCompleted ? config.textColor : 'text-gray-400'
                  } font-medium`}>
                    {status}
                  </p>
                  
                  {status === 'Created' && isActive && destination && (
                    <div className="mt-2 text-xs text-center text-gray-600 bg-gray-50 p-1 rounded w-full">
                      <span className="font-medium">Destination:</span><br />
                      {destination}
                    </div>
                  )}
                  
                  {status === 'Delivered' && isActive && (
                    <div className="mt-2 text-xs text-center text-gray-600 bg-gray-50 p-1 rounded w-full">
                      <div><span className="font-medium">Pieces:</span> {totalPieces}</div>
                      <div><span className="font-medium">Weight:</span> {weight}</div>
                      <div><span className="font-medium">Destination:</span><br />{destination}</div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Add the import for the Button component
import { Button } from "@/components/ui/button";

export default TrackingProgress;
