"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const Body = () => {
  return (
    <div
      id="about"
      className="relative w-full min-h-screen bg-[#F9FAFB] pb-7 pt-15 md:pt-32 overflow-hidden"
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
        className="absolute left-1/2 -translate-x-1/2 top-1/3 w-full opacity-40 animate-pulse delay-200"
      />

      {/* Gambar kanan bawah */}
      <Image
        src="/garis.png"
        alt="Garis dekorasi"
        width={300}
        height={300}
        className="absolute bottom-20 -right-10 opacity-40 animate-pulse delay-200"
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left Top */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.2 }}
          className="flex flex-col justify-center"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Learning & <br />
            <span className="bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] bg-clip-text text-transparent">
              Career Growth
            </span>
          </h2>
          <p className="text-gray-600 mb-0 md:mb-6 max-w-md text-lg">
            A trusted platform that empowers learning and connects learners with
            organizers and opportunities, shaping a generation that is
            job-ready, competitive, and impactful for society.
          </p>
        </motion.div>

        {/* Right Top */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.2 }}
          className="flex justify-center items-center"
        >
          <div className="w-[350px] h-[220px] bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-xl flex items-center justify-center hover:scale-105 transition-transform duration-300">
            <span className="text-lg font-semibold text-gray-700">
              🚀 Modern Design
            </span>
          </div>
        </motion.div>

        {/* Left Bottom */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.2 }}
          className="flex justify-center items-center"
        >
          <Image
            src="/work-together.png"
            alt="Work Together"
            width={290}
            height={160}
            className="object-contain hover:rotate-3 transition-transform duration-300"
          />
        </motion.div>

        {/* Right Bottom */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.2 }}
          className="flex flex-col justify-center"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Work{" "}
            <span className="bg-gradient-to-r from-[rgb(2,44,92)] to-blue-600 bg-clip-text text-transparent">
              Together
            </span>
          </h2>
          <p className="text-gray-600 mb-6 max-w-md text-lg">
            A collaborative hub where learners and organizers build meaningful
            connections, fostering innovation and collective growth.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Body;
