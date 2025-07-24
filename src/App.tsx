import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollMeter from "./components/ScrollMeter";

import { motion } from "framer-motion";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    // Add smooth scrolling behavior
    window.document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      window.document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className={`${theme} transition-colors duration-300`}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
        <Navbar />
        <ScrollMeter />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
          <Footer />
        </motion.div>
      </div>
    </div>
  );
}

export default App;
