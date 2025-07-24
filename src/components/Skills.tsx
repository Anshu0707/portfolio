import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeading from "./SectionHeading";

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = [
    { name: "HTML", image: "/images/skills/html.png" },
    { name: "CSS", image: "/images/skills/css.png" },
    { name: "JavaScript", image: "/images/skills/js.png" },
    { name: "TypeScript", image: "/images/skills/ts.png" },
    { name: "React", image: "/images/skills/react.png" },
    { name: "Next.js", image: "/images/skills/nextjs.png" },
    { name: "Material UI", image: "/images/skills/materialui.png" },
    { name: "Tailwind CSS", image: "/images/skills/tailwind.png" },
    { name: "Java", image: "/images/skills/java.png" },
    { name: "Spring", image: "/images/skills/Springboot.png" },
    { name: "Node.js", image: "/images/skills/node.png" },
    { name: "Express", image: "/images/skills/express-js.png" },
    { name: "Python", image: "/images/skills/Python.png" },
    { name: "MongoDB", image: "/images/skills/mongo.png" },
    { name: "MySql", image: "/images/skills/MySql.png" },
    { name: "Salesforce", image: "/images/skills/Salesforce.png" },
    { name: "Kafka", image: "/images/skills/Kafka.png" },
    { name: "ELK", image: "/images/skills/elastic.png" },
    { name: "Zabbix", image: "/images/skills/Zabbix.png" },
    { name: "Linux", image: "/images/skills/Linux.png" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1],
      },
    },
  };

  return (
    <section id="skills" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="Technologies I Work With"
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4
                hover:border-primary-500/50 dark:hover:border-primary-400/50 transition-all duration-300 shadow-sm
                hover:shadow-md dark:shadow-gray-900/20 dark:hover:shadow-gray-900/30"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-800 dark:text-white font-medium">
                  {skill.name}
                </span>
                <img
                  src={skill.image}
                  alt={skill.name}
                  className="w-6 h-6 opacity-60 group-hover:opacity-100 
                    transition-opacity duration-300"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-8 text-center text-gray-400">
          + Other modern frontend libraries
        </p>
      </div>
    </section>
  );
};

export default Skills;
