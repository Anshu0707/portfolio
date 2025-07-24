import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import projects from "../data/projects";

const Projects = () => {
  const categories = ["All", "MERN", "Python", "Java", "Salesforce"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [showNavButtons, setShowNavButtons] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const sliderRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projects.filter((project) =>
    project.category.includes(activeCategory)
  );

  useEffect(() => {
    if (sliderRef.current) {
      const { current } = sliderRef;
      setShowNavButtons(current.scrollWidth > current.clientWidth);
    }
  }, [filteredProjects]);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { current } = sliderRef;
      const scrollAmount =
        direction === "left"
          ? -current.offsetWidth / 2
          : current.offsetWidth / 2;

      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      id="projects"
      className="py-16 md:py-24 px-4 md:px-0  bg-gray-50 dark:bg-gray-800/50"
    >
      <div className="container mx-auto max-w-6xl">
        <SectionHeading
          title="My Projects"
          subtitle="Check out some of my recent work"
        />

        {/* Project Categories */}
        <motion.div
          className="flex flex-wrap justify-center mb-8 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Slider */}
        <div className="relative">
          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div
              ref={sliderRef}
              className="flex overflow-x-auto pb-8 -mx-2 px-2 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="px-2 min-w-[85%] sm:min-w-[45%] lg:min-w-[30%] snap-start"
                  style={{ minWidth: "350px", maxWidth: "350px" }}
                >
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Navigation Arrows */}
          {showNavButtons && (
            <>
              <button
                onClick={() => scroll("left")}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 z-10 hidden md:block"
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={() => scroll("right")}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 z-10 hidden md:block"
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;

const style = document.createElement("style");
style.textContent = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;
document.head.appendChild(style);
