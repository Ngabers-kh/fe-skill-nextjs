"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1 } },
};

export default function ServiceSection() {
  const router = useRouter();
  return (
    <div
      className="relative bg-[#022C5C] mx-auto items-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/bgRegister.png')" }}
    >
      {/* Floating shapes for Gen Z vibe */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-[120px] w-40 h-40 bg-blue-400/30 rounded-full blur-3xl animate-pulse mix-blend-screen"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-yellow-200/20 rounded-lg rotate-45 blur-2xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-7 z-20">
        <div className="flex flex-col items-center justify-center py-15 md:py-28 text-center">
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.2 }}
            className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg ">
              Your skills,
            </span>{" "}
            <span className="text-white/90">everywhere you grow</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.2 }}
            className="text-white/90 max-w-3xl text-lg leading-relaxed"
          >
            Access learning programs and job opportunities from your computer,
            phone, or tablet by connecting with trusted organizers. SkillSight
            is available anytime, anywhere—helping you learn, upskill, and apply
            for jobs seamlessly across platforms.
          </motion.p>

          {/* Call to Action */}
          <motion.a
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.2 }}
            onClick={() => router.push("/auth")}
            className="mt-10 px-8 py-4 rounded-2xl font-bold text-lg text-[#022C5C] bg-gradient-to-r from-yellow-200 to-yellow-400 shadow-lg hover:scale-105 hover:shadow-yellow-200/50 cursor-pointer"
          >
            Try Taskey →
          </motion.a>
        </div>
      </div>

      {/* Bottom wave decoration biar nyambung sama header */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#022C5C] to-transparent"></div>
    </div>
  );
}
