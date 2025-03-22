import React from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, BarChart, FileText } from "lucide-react";
import { Link } from "react-router-dom";

// Define the feature type
type Feature = {
  title: string;
  description: string;
  icon: JSX.Element;
};

// Feature data
const features: Feature[] = [
  {
    title: "Easy Data Input",
    description: "Upload your fund data using our simple CSV template.",
    icon: <LayoutDashboard className="w-12 h-12 text-blue-500" />,
  },
  {
    title: "Dynamic Visualization",
    description: "Automatically generate charts and metrics for your fund.",
    icon: <BarChart className="w-12 h-12 text-green-500" />,
  },
  {
    title: "Professional Output",
    description: "Download pixel-perfect factsheets ready for distribution.",
    icon: <FileText className="w-12 h-12 text-purple-500" />,
  },
];

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <motion.h1
          className="text-4xl font-extrabold text-gray-900 md:text-5xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Fund Factsheet Generator
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Create professional, pixel-perfect fund factsheets with comprehensive
          data visualization and customizable templates.
        </motion.p>
      </section>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-xl rounded-2xl p-6 text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-center">{feature.icon}</div>
            <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <Link to="/index">
      <div className="flex justify-center mt-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="px-6 py-3 text-lg font-semibold bg-blue-500 text-white rounded-full shadow-lg"
        >
          Get Started
        </motion.button>
      </div>
      </Link>
    </div>
  );
};

export default LandingPage;
