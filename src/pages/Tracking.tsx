import { useState } from 'react';
import OfferBanner from '../components/layout/OfferBanner';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AOSInit from '../components/utils/AOSInit';
import { motion } from 'framer-motion';
import PageHeader from '../components/layout/PageHeader';
import { CheckCircle, Clock, ExternalLink } from 'lucide-react';
import Confetti from 'react-confetti';

const MILESTONES = [
  'Label Created',
  'Collected',
  'Departed',
  'Intransit',
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
  const [celebrationExiting, setCelebrationExiting] = useState(false);
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

        const afterShipCarrier = info.FWAgentCode?.toLowerCase() || info.Sector?.toLowerCase() || info.AgentCode?.toLowerCase();
        const afterShipLink = `https://www.aftership.com/track/${afterShipCarrier}/${info.AgentAwbNo}`;

        setTrackingData({
          id: info.AWBNo || trackingId.toUpperCase(),
          agentAwbNo: info.AgentAwbNo,
          agentCode: info.AgentCode?.toLowerCase(),
          status: lastStep?.label || 'InTransit',
          origin: info.Sender || '-',
          destination: info.Receiver || '-',
          lastUpdate: `${lastStep?.date || ''} - ${lastStep?.time || ''}`,
          pcs: info.Pcs || '-',
          weight: info.Weight || '-',
          timeline,
          afterShipLink,
          fullHistory: trackList,
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
    <div className="min-h-screen bg-brand-beige w-screen">
      <AOSInit />
      <OfferBanner />
      <Navbar />
      <PageHeader title="Track Your Shipment" subtitle="Follow the complete journey of your cargo with elegance and accuracy." />

      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: celebrationExiting ? 0 : 1, scale: celebrationExiting ? 0.7 : 1 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full"
          >
            <button
              onClick={() => {
                setCelebrationExiting(true);
                setTimeout(() => {
                  setShowCelebration(false);
                  setCelebrationExiting(false);
                }, 300);
              }}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
              aria-label="Close"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold text-green-600 mb-2">🎉 Congratulations!</h2>
            <p className="text-lg">Your shipment has been delivered successfully!</p>
            <p className="text-sm text-gray-600">Delivered on: {trackingData?.lastUpdate}</p>
          </motion.div>
        </div>
      )}

      <main className="py-16 bg-white">
        <div className="container max-w-screen mx-auto px-4">
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
                    <motion.div initial={{ x: 0 }} animate={{ x: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 1 }}>
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
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="w-full"
  >
    {/* ✅ Shipment Summary */}
    <div className="w-full bg-white border border-gray-200 p-6 rounded-xl shadow-md mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">Shipment Overview</h2>
          <p className="text-sm text-gray-500">Tracking Number: {trackingData.id}</p>
        </div>
        <button
          onClick={() => setShowFullDetails(true)}
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
        >
          View Full Details
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm text-gray-800">
        <p><span className="font-semibold">Origin:</span> {trackingData.origin}</p>
        <p><span className="font-semibold">Destination:</span> {trackingData.destination}</p>
        <p><span className="font-semibold">Pieces:</span> {trackingData.pcs}</p>
        <p><span className="font-semibold">Weight:</span> {trackingData.weight}</p>
        <p><span className="font-semibold">Agent AWB:</span> {trackingData.agentAwbNo}</p>
      </div>
    </div>

    {/* ✅ Timeline */}
    <div className="w-full bg-white border border-gray-200 p-6 rounded-xl shadow-sm mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipment Timeline</h3>
      <div className="relative border-l-2 border-gray-300 pl-6 space-y-8">
        {trackingData.timeline.map((step, index) => (
          <div key={index} className="relative">
            {/* Dot */}
            <div className={`absolute left-[-14px] top-1.5 w-3 h-3 rounded-full border-2 ${step.completed ? 'bg-green-500 border-green-500' : 'bg-gray-300 border-gray-300'}`} />
            
            {/* Content */}
            <div>
              <p className="font-medium text-gray-800">{step.label}</p>
              <p className="text-xs text-gray-500">{step.location} • {step.date} {step.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* ✅ External Link */}
    <div className="text-center mb-10">
     
      <a
        href={trackingData.afterShipLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 font-medium hover:underline inline-flex items-center gap-2"
      >
        View on AfterShip <ExternalLink size={16} />
      </a>
    </div>

    {/* ✅ Modal */}
    {showFullDetails && (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white max-w-3xl w-full rounded-lg shadow-xl p-6 relative"
        >
          <button
            onClick={() => setShowFullDetails(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>

          <h4 className="text-xl font-semibold mb-4">Full Shipment Details</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-700 mb-6">
            <p><strong>Status:</strong> {trackingData.status}</p>
            <p><strong>ID:</strong> {trackingData.id}</p>
            <p><strong>Origin:</strong> {trackingData.origin}</p>
            <p><strong>Destination:</strong> {trackingData.destination}</p>
            <p><strong>Pieces:</strong> {trackingData.pcs}</p>
            <p><strong>Weight:</strong> {trackingData.weight}</p>
            <p><strong>Agent AWB:</strong> {trackingData.agentAwbNo}</p>
          </div>

          <h5 className="text-md font-semibold mb-2">Tracking History</h5>
          <div className="max-h-64 overflow-y-auto space-y-3 text-sm">
            {trackingData.fullHistory.map((item, idx) => (
              <div key={idx} className="border-b pb-2">
                <p><strong>{item.MilestoneDesc}</strong> at {item.Location}</p>
                <p className="text-xs text-gray-500">{item.Transdate} {item.TransTime}</p>
                {item.Remarks && <p className="text-xs text-gray-400 italic">Remarks: {item.Remarks}</p>}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
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
