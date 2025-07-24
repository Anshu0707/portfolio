import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollMeter = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const totalScroll = docHeight - winHeight;
      const scrolled = totalScroll > 0 ? (scrollTop / totalScroll) * 100 : 0;
      setScrollPercent(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Convert scrollPercent to radians
  const percent = Math.max(0, Math.min(scrollPercent, 100));
  const angle = (percent / 100) * 360;
  const r = 32;
  const cx = 32;
  const cy = 32;

  const radians = (angle - 90) * (Math.PI / 180);
  const x = cx + r * Math.cos(radians);
  const y = cy + r * Math.sin(radians);
  const largeArcFlag = angle > 180 ? 1 : 0;

  const pathData = `M ${cx} ${cy} L ${cx} ${
    cy - r
  } A ${r} ${r} 0 ${largeArcFlag} 1 ${x} ${y} Z`;

  return (
    <AnimatePresence>
      {percent > 1 && percent < 99 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-[10%] right-6 md:right-10 z-50"
        >
          <div className="relative w-16 h-16 rounded-full bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-gray-300 dark:border-gray-700 shadow-soft flex items-center justify-center">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              className="absolute z-0"
            >
              <path d={pathData} fill="url(#scrollFill)" />
              <defs>
                <linearGradient id="scrollFill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
            <span className="relative z-10 text-xs font-bold text-gray-800 dark:text-white">
              {Math.round(percent)}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollMeter;
