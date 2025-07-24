import { useState, useEffect, useRef } from "react";
import { Moon, Sun, Menu, X, SkipBack, SkipForward, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import Lottie from "lottie-react";
import waveAnimation from "../assets/lottie/Wave-Animation-2.json";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

const tracks = [
  "/audio/Portfolio-Song-1.mp3",
  "/audio/Portfolio-Song-2.mp3",
  "/audio/Portfolio-Song-3.mp3",
  "/audio/Portfolio-Song-4.mp3",
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = tracks[currentTrack];
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [currentTrack]);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => setIsPlaying(false));
    }
    setIsPlaying((prev) => !prev);
  };

  const playTrack = (index: number) => {
    const next = (index + tracks.length) % tracks.length;
    setCurrentTrack(next);
    setIsPlaying(true);
  };

  const playPrev = () => playTrack(currentTrack - 1);
  const playNext = () => playTrack(currentTrack + 1);
  const toggleMenu = () => setMobileMenuOpen((open) => !open);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 shadow-soft backdrop-blur-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            className="text-xl font-bold text-primary-600 dark:text-primary-400 font-mono tracking-tight relative group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400 bg-clip-text text-transparent">
              This is Anshuman
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400 transition-all duration-300 group-hover:w-full"></span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* Audio Controls */}
            <motion.div
              className="flex items-center space-x-2 mr-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={playPrev}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Previous track"
              >
                <SkipBack size={18} />
              </button>

              <motion.button
                onClick={toggleAudio}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                whileTap={{ scale: 0.95 }}
                aria-label="Play/Pause"
              >
                {isPlaying ? (
                  <motion.div
                    style={{
                      transform: "scale(2.5)",
                      transformOrigin: "center",
                    }}
                  >
                    <Lottie
                      animationData={waveAnimation}
                      loop
                      autoplay
                      style={{
                        width: 30,
                        height: 20,
                        pointerEvents: "none",
                      }}
                    />
                  </motion.div>
                ) : (
                  <Play size={20} />
                )}
              </motion.button>

              <button
                onClick={playNext}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Next track"
              >
                <SkipForward size={18} />
              </button>
            </motion.div>

            {/* Nav Links */}
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                {link.name}
              </motion.a>
            ))}

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden">
            <motion.button
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>

            <button
              onClick={toggleMenu}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <audio ref={audioRef} hidden preload="auto" />

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden bg-white dark:bg-gray-900 shadow-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-3">
            {/* 🎵 Mobile Audio Controls */}
            <div className="flex justify-center items-center space-x-4 pb-4">
              <button
                onClick={playPrev}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Previous track"
              >
                <SkipBack size={20} />
              </button>

              <motion.button
                onClick={toggleAudio}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                whileTap={{ scale: 0.95 }}
                aria-label="Play/Pause"
              >
                {isPlaying ? (
                  <motion.div
                    style={{
                      transform: "scale(2)",
                      transformOrigin: "center",
                    }}
                  >
                    <Lottie
                      animationData={waveAnimation}
                      loop
                      autoplay
                      style={{ width: 30, height: 20, pointerEvents: "none" }}
                    />
                  </motion.div>
                ) : (
                  <Play size={20} />
                )}
              </motion.button>

              <button
                onClick={playNext}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Next track"
              >
                <SkipForward size={20} />
              </button>
            </div>

            {/* 🧭 Mobile Nav Links */}
            <nav className="flex flex-col space-y-4 py-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-medium py-2 text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
