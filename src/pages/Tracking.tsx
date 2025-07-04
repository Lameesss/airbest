import { useState, useEffect } from 'react';
import OfferBanner from '../components/layout/OfferBanner';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AOSInit from '../components/utils/AOSInit';
import { motion } from 'framer-motion';
import PageHeader from '../components/layout/PageHeader';
import { CheckCircle, Clock, ExternalLink, Plane } from 'lucide-react';
import Confetti from 'react-confetti';

const MILESTONES = [
  'Created',
  'Collected',
  'Departed',
  'In transit',
  'Arrived at destination',
  'Out for delivery',
  'Delivered'
];

export default function Tracking() {
  const [trackingId, setTrackingId] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [trackingResult, setTrackingResult] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [animatePlane, setAnimatePlane] = useState(false);

  const handleTracking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setTrackingResult('loading');
    setTrackingData(null);
    setShowCelebration(false);
    setAnimatePlane(true);

    try {
      const response = await fetch('https://airbestcargo.com/proxy.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          TrackingNo: trackingId,
          AccountNo: 'tr123',
          AccountPWD: 'tr@123',
          ActiveDataBase: 'integraontrack'
        })
      });

      const data = await response.json();

      if (data.code === '101') {
        const info = data.TrackInfo.ShipmentInformation;
        const trackList = data.TrackInfo.trackList || [];

        let latestMilestoneIndex = -1;
        for (let i = 0; i < MILESTONES.length; i++) {
          const milestone = MILESTONES[i];
          if (trackList.some((item: any) => item.MilestoneDesc.toLowerCase() === milestone.toLowerCase())) {
            latestMilestoneIndex = i;
          }
        }

        const timeline = MILESTONES.map((milestone, index) => {
          const match = trackList.find((item: any) => item.MilestoneDesc.toLowerCase() === milestone.toLowerCase());
          return {
            label: milestone,
            date: match?.Transdate || '-',
            time: match?.TransTime || '-',
            location: match?.Location || '-',
            completed: index <= latestMilestoneIndex
          };
        });

        const lastStep = timeline[latestMilestoneIndex];

        if (lastStep?.label === 'Delivered') setShowCelebration(true);

        setTrackingData({
          id: info.AWBNo || trackingId.toUpperCase(),
          agentAwbNo: info.AgentAwbNo,
          agentCode: info.AgentCode?.toLowerCase(),
          status: lastStep?.label || 'In Transit',
          origin: info.Sender || '-',
          destination: info.Receiver || '-',
          lastUpdate: `${lastStep?.date || ''} - ${lastStep?.time || ''}`,
          pcs: info.Pcs || '-',
          weight: info.Weight || '-',
          timeline,
          afterShipLink: `https://www.aftership.com/track/${info.AgentCode?.toLowerCase()}/${info.AgentAwbNo}`,
          fullHistory: trackList
        });

        setTrackingResult('success');
      } else {
        setTrackingResult('error');
        setAnimatePlane(false);
      }
    } catch (error) {
      console.error(error);
      setTrackingResult('error');
      setAnimatePlane(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-beige">
      <AOSInit />
      <OfferBanner />
      <Navbar />
      <PageHeader title="Track Your Shipment" subtitle="Follow the complete journey of your cargo with elegance and accuracy." />

      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-2">🎉 Congratulations!</h2>
            <p className="text-lg">Your shipment has been delivered successfully!</p>
            <p className="text-sm text-gray-600">Delivered on: {trackingData?.lastUpdate}</p>
          </div>
        </div>
      )}

      <main className="py-16 bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white rounded-xl shadow-xl p-8">
            <form onSubmit={handleTracking} className="mb-8">
              <div className="flex gap-4 items-center">
                <input
                  className="flex-grow px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-maroon"
                  placeholder="Enter Tracking ID"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-brand-maroon text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition-all flex items-center gap-2"
                  disabled={trackingResult === 'loading'}
                >
                  {trackingResult === 'loading' && animatePlane ? (
                    <motion.div
                      initial={{ x: 0 }}
                      animate={{ x: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      <img src="/LOGO.png" alt="Airbest Logo" width={24} height={24} />
                    </motion.div>
                  ) : null}
                  {trackingResult === 'loading' ? 'Tracking...' : 'Track'}
                </button>
              </div>
            </form>

            {trackingResult === 'error' && (
              <p className="text-red-600 font-medium">Tracking failed. Please check the ID or try again later.</p>
            )}

            {trackingResult === 'success' && trackingData && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-brand-gray">Shipment #{trackingData.id}</h3>
                    <p className="text-sm text-gray-500">Last update: {trackingData.lastUpdate}</p>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 overflow-x-auto">
                    {trackingData.timeline.map((step: any, index: number) => (
                      <div key={index} className="text-center min-w-[100px]">
                        <div className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center text-white transition-all duration-500 ${step.completed ? 'bg-green-500' : 'bg-gray-300'}`}>
                          {step.completed ? <CheckCircle size={16} /> : <Clock size={16} />}
                        </div>
                        <p className="text-xs mt-2 text-gray-600">{step.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <a
                      href={trackingData.afterShipLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline transition"
                    >
                      View Full Tracking on AfterShip <ExternalLink size={16} />
                    </a>
                  </div>
                </div>

                {!showFullDetails && (
                  <div className="text-center">
                    <button
                      onClick={() => setShowFullDetails(true)}
                      className="text-brand-maroon underline font-medium"
                    >
                      View Tracking History
                    </button>
                  </div>
                )}

                {showFullDetails && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="bg-gray-100 p-6 rounded-lg border">
                    <h4 className="text-lg font-semibold mb-4">Shipment Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
                      <p><strong>Status:</strong> {trackingData.status}</p>
                      <p><strong>Tracking ID:</strong> {trackingData.id}</p>
                      <p><strong>Origin:</strong> {trackingData.origin}</p>
                      <p><strong>Destination:</strong> {trackingData.destination}</p>
                      <p><strong>No. of Pieces:</strong> {trackingData.pcs}</p>
                      <p><strong>Weight:</strong> {trackingData.weight}</p>
                      <p><strong>Agent AWB:</strong> {trackingData.agentAwbNo}</p>
                    </div>
                    <h5 className="text-md font-semibold mb-2">Full Tracking Events</h5>
                    <ul className="space-y-2 text-sm">
                      {trackingData.fullHistory.map((item: any, idx: number) => (
                        <li key={idx} className="border-b pb-2">
                          <strong>{item.MilestoneDesc}</strong> at {item.Location} on {item.Transdate} {item.TransTime}
                          {item.Remarks && <p className="text-xs text-gray-500">Remarks: {item.Remarks}</p>}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
