import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeading from "./SectionHeading";
import { CheckCircle2 } from "lucide-react";

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences = [
    {
      company: "Airtel",
      role: "DevOps Engineer Intern",
      period: "Jan 2025 - April 2025",
      description:
        "Architected and streamlined production-grade monitoring and data pipelines using ELK Stack, Kafka, Zabbix, and Python on Linux, collaborating in agile sprints with twice-weekly scrum meetings.",
      achievements: [
        "Led the migration of 25+ production data pipelines from Redis to Kafka, improving real-time data throughput by 40%.",
        "Configured 10+ Logstash pipelines to transform and enrich log data using Grok and Mutate filters.",
        "Built and deployed a production-grade anomaly detection system for network traffic metrics using Python, Holt-Winters forecasting, and scikit-learn, reducing incident detection time by 60%.",
        "Enabled real-time anomaly alerts via Zabbix by comparing forecasted vs. observed values, enhancing monitoring accuracy and uptime.",
        "Automated OS patching for 50+ Linux servers using Red Hat Satellite, ensuring consistent monthly updates and reducing manual effort by approximately 80%.",
        "Provisioned a five-node Kafka cluster on Linux environments to evaluate its capacity for managing production-scale data, ensuring scalability and fault tolerance.",
      ],
      color: "border-primary-500 dark:border-primary-400",
    },
    {
      company: "Zemoso",
      role: "Fullstack Developer Intern",
      period: "Aug 2024 - Nov 2024",
      description:
        "Developed full-stack web applications using React, Node.js, and MongoDB while actively participating in daily scrum meetings within an agile team.",
      achievements: [
        "Crafted a responsive e-commerce UI using Material UI and integrated RESTful APIs to display real-time product and cart data.",
        "Leveraged pagination to reduce API payload size by over 90%, and integrated detailed error handling and input validation to enhance system stability and user experience.",
        "Introduced a debouncing mechanism to optimize product search functionality, reducing unnecessary API calls by over 70%.",
        "Implemented persistent user login, cart handling, and dynamic order summary section by using session storage and cookies.",
        "Integrated MongoDB to store and manage product catalog and order details, enabling efficient querying and scalability of data operations.",
      ],
      color: "border-secondary-500 dark:border-secondary-400",
    },
    {
      company: "MTX",
      role: "Salesforce Developer Intern",
      period: "Jan 2022 - June 2022",
      description:
        "Collaborated in an agile team to develop end-to-end CRM features on Salesforce, enhancing user experience and process automation.",
      achievements: [
        "Devised a banking environment with security implementations using the Salesforce CRM platform.",
        "Streamlined customer workflows by automating welcome emails, transaction alerts, and birthday greetings via Process Builder, reducing manual effort by approximately 80%.",
        "Automated a multi-step approval process for records that users can accept, deny, or recall.",
        "Engineered Apex Triggers to handle dynamic record validation, updates, and cascading changes across 4+ related Salesforce objects.",
        "Created custom Salesforce reports to extract and analyze account and contact data based on dynamic, criteria-driven filters.",
        "Built interactive Salesforce dashboards to visualize multi-account relationships and contact-level metrics, improving data interpretation for internal users.",
      ],
      color: "border-accent-500 dark:border-accent-400",
    },
  ];

  const activeExperiences = experiences.filter(
    (exp) => !exp.company.includes("/*")
  );
  const isSingleExperience = activeExperiences.length === 1;

  return (
    <section id="experience" className="py-16 md:py-24 px-4 md:px-0">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading
          title="Work Experience"
          subtitle="My professional journey and career highlights"
        />

        <div
          ref={ref}
          className={`space-y-12 relative ${
            isSingleExperience ? "max-w-4xl mx-auto" : ""
          }`}
        >
          {/* Timeline line - Only show when multiple experiences */}
          {!isSingleExperience && (
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-1 bg-gray-200 dark:bg-gray-700 hidden md:block"></div>
          )}

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              className={`flex flex-col md:flex-row relative ${
                isSingleExperience ? "md:justify-center" : ""
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Timeline dot - Only show when multiple experiences */}
              {!isSingleExperience && (
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -top-3 w-7 h-7 rounded-full bg-white dark:bg-gray-800 border-4 border-primary-500 dark:border-primary-400 z-10 hidden md:block"></div>
              )}

              {/* Content layout */}
              <div
                className={`${
                  isSingleExperience
                    ? "w-full md:w-3/4"
                    : `md:w-1/2 ${
                        index % 2 === 0
                          ? "md:pr-16 md:text-left md:self-end"
                          : "md:pl-16 md:ml-auto"
                      }`
                }`}
              >
                <div
                  className={`bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-soft border-l-4 ${exp.color}`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {exp.period}
                    </span>
                    <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                      {exp.role}
                    </h3>
                    <h4 className="text-lg font-medium mb-3 text-primary-600 dark:text-primary-400">
                      {exp.company}
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {exp.description}
                    </p>

                    <h5 className="text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
                      Key Achievements
                    </h5>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2
                            className="flex-shrink-0 text-green-500 dark:text-green-400 mr-2 mt-1"
                            size={16}
                          />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
