
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Package } from 'lucide-react';
import { motion } from 'framer-motion';

interface TrackingSearchProps {
  onSearch: (trackingNumber: string) => void;
  isLoading: boolean;
}

const TrackingSearch = ({ onSearch, isLoading }: TrackingSearchProps) => {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      onSearch(trackingNumber.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6"
    >
      <div className="flex items-center mb-4">
        <Package className="text-brand-maroon mr-2 h-6 w-6" />
        <h2 className="text-xl font-semibold text-gray-800">Track Your Shipment</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Enter your tracking number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="pl-10 pr-4 py-3 h-12 border-2 border-gray-200 focus:border-brand-maroon rounded-lg shadow-sm"
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-brand-maroon hover:bg-brand-maroon/90 text-white px-6 h-12 rounded-lg shadow-md transition-all hover:shadow-lg"
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">⭮</span>
                Tracking...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Track
              </>
            )}
          </Button>
        </div>
        <p className="mt-3 text-sm text-gray-500">
          Try demo tracking number: DEMO123
        </p>
      </form>
    </motion.div>
  );
};

export default TrackingSearch;
