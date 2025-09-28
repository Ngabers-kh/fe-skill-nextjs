"use client";
import React from "react";
import { BookOpen, Users, Briefcase } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const Guide = () => {
  const steps = [
    {
      icon: <BookOpen size={22} />,
      title: "Learn",
      desc: "Access curated courses and resources to build your skills.",
    },
    {
      icon: <Users size={22} />,
      title: "Connect",
      desc: "Engage with organizers and peers in a collaborative community.",
    },
    {
      icon: <Briefcase size={22} />,
      title: "Work",
      desc: "Apply your skills directly to real-world projects and jobs.",
    },
  ];

  return (
    <div
      id="guide"
      className="relative w-full min-h-screen bg-[#F9FAFB] py-15 overflow-hidden flex-col items-center justify-center"
    >
      {/* Gambar kiri atas */}
      <Image
        src="/garis.png"
        alt="Garis dekorasi"
        width={300}
        height={300}
        className="absolute top-20 -left-10 opacity-40 animate-pulse"
      />

      {/* Gambar tengah */}
      <Image
        src="/garis-panjang.png"
        alt="Garis dekorasi"
        width={1920}
        height={200}
        className="absolute left-1/2 -translate-x-1/2 top-1/3 w-2/3 md:w-full opacity-40 animate-pulse delay-200"
      />

      {/* Gambar kanan bawah */}
      <Image
        src="/garis.png"
        alt="Garis dekorasi"
        width={300}
        height={300}
        className="absolute bottom-20 -right-10 opacity-40 animate-pulse delay-200"
      />

      {/* Hero Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.2 }}
        className="relative max-w-4xl mx-auto px-6 text-center mb-20"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Your Guide to{" "}
          <span className="bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] bg-clip-text text-transparent">
            Success
          </span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Follow these simple steps to grow your skills, build connections, and
          unlock career opportunities.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto px-6">
        {/* gradient line tengah */}
        <div className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-blue-500 via-[#043873] to-[rgb(2,44,92)] transform -translate-x-1/2"></div>

        <div className="space-y-20 relative z-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center w-full ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <motion.div
                variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                initial="hidden"
                whileInView="show"
                viewport={{ amount: 0.2 }}
                className={`relative w-5/12 p-6 bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-100 hover:-translate-y-1 ${
                  index % 2 === 0 ? "text-right" : "text-left"
                }`}
              >
                {/* bulatan ikon di pojok card */}
                <div
                  className={`absolute top-0 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md
          ${
            index % 2 === 0
              ? "right-0 translate-x-1/2"
              : "left-0 -translate-x-1/2"
          }`}
                >
                  {step.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Guide;
