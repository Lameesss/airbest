
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock } from "lucide-react";

const OFFERS = [
  { title: " OFFER on All Shipments", desc: "Save big on all sea shipments this week!" },
  { title: "Free Pickup in UAE", desc: "Enjoy complimentary pickup for every shipment." },
  { title: "Priority Air Cargo", desc: "Book now for priority handling & fast delivery!" },
];

const MODAL_DURATION = 30; // seconds

function setModalSessionSeen() {
  try {
    sessionStorage.setItem("airbest_offer_modal_shown", "true");
  } catch (e) { /* fallback: ignore for now */ }
}
function getModalSessionSeen() {
  try {
    return sessionStorage.getItem("airbest_offer_modal_shown") === "true";
  } catch (e) {
    return false;
  }
}

export default function OfferModal() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(MODAL_DURATION);
  const [offerIdx, setOfferIdx] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const offerRotator = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (getModalSessionSeen()) return;
    
    // Delay popup slightly to simulate entrance after page visible
    const timeout = setTimeout(() => setOpen(true), 600);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!open) return;

    setCount(MODAL_DURATION);

    timer.current = setInterval(() => {
      setCount((c) => c - 1);
    }, 1000);

    // Rotate offer every ~4s if more than one offer
    offerRotator.current = setInterval(() => {
      setOfferIdx((idx) => (idx + 1) % OFFERS.length);
    }, 4000);

    return () => {
      if (timer.current) clearInterval(timer.current);
      if (offerRotator.current) clearInterval(offerRotator.current);
    };
  }, [open]);

  useEffect(() => {
    if (count <= 0 && open) {
      setOpen(false);
      setModalSessionSeen();
    }
  }, [count, open]);

  function closeModal() {
    setOpen(false);
    setModalSessionSeen();
  }

  // Prevent background scroll when modal open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, [open]);

  return (
    <AnimatePresence>
  {open && (
    <motion.div className="fixed inset-0 z-[1000] flex items-center justify-center">
      {/* 🎥 Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
      >
        <source src="public\Air best 2....mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dimmed overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0"
        onClick={closeModal}
        aria-label="Dismiss offer"
      />

          
          {/* Modal Box */}
          <motion.div
            className="
              relative z-10 max-w-[94vw] w-full sm:max-w-md md:max-w-lg 
              rounded-2xl shadow-2xl bg-white 
              p-6 md:p-9 border-4 border-brand-maroon
              flex flex-col items-center animate-[fade-in_0.5s_ease]
            "
            style={{
              fontFamily: "'Poppins', 'Inter', sans-serif",
            }}
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.55 }}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
          >
            <button
              className="absolute right-5 top-4 text-brand-maroon hover:text-brand-gold transition"
              aria-label="Close"
              onClick={closeModal}
            >
              <X size={28} />
            </button>
            <div className="flex flex-col items-center gap-1">
              <img
                src="/airbest-logo.png"
                alt="Airbest Express Cargo"
                className="mb-1 h-12 md:h-16"
                draggable={false}
                style={{ userSelect: "none" }}
              />
              <h2 className="text-brand-maroon font-bold text-2xl md:text-3xl mb-2 mt-2 text-center tracking-tight"
                  style={{ fontFamily: "'Poppins', 'Inter', sans-serif"}}>
                Limited-Time Offer!
              </h2>
              <motion.div
                key={offerIdx}
                className="w-full"
                initial={{ opacity: 0.3, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.36 }}
              >
                <div className="font-extrabold text-xl md:text-2xl text-brand-gold mb-1 text-center drop-shadow-lg">
                  {OFFERS[offerIdx].title}
                </div>
                <div className="text-gray-600 text-base text-center mb-2">{OFFERS[offerIdx].desc}</div>
              </motion.div>
              {/* Countdown */}
              <div className="flex items-center gap-2 bg-brand-beige rounded-xl px-4 py-2 mt-3 mb-2 shadow-md border">
                <Clock className="text-brand-maroon h-5 w-5 animate-pulse" />
                <span className="text-lg font-semibold text-brand-maroon">
                  This offer ends in{" "}
                  <span className="font-bold tabular-nums">
                    {count.toString().padStart(2, "0")}
                  </span>{" "}
                  seconds
                </span>
              </div>
              <a
                href="/offers"
                className="btn-primary font-semibold text-base mt-3 w-full max-w-xs text-center shadow-lg"
                onClick={() => setModalSessionSeen()}
              >
                Claim Offer
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
