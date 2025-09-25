import React from "react";
import Link from "next/link";

const Body = () => {
  return (
    <div
      id="about"
      className="relative w-full min-h-screen bg-[#F9FAFB] pb-16 pt-32 overflow-hidden"
    >
      {/* Gradient Blob Background */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-tr from-blue-500 via-[#043873] to-[rgb(2,44,92)] rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-30 right-10 w-72 h-72 bg-gradient-to-tr from-[#043873] via-[rgb(2,44,92)] to-blue-500 rounded-full opacity-20 blur-3xl animate-pulse delay-200"></div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left Top */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Learning & <br />
            <span className="bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] bg-clip-text text-transparent">
              Career Growth
            </span>
          </h2>
          <p className="text-gray-600 mb-6 max-w-md text-lg">
            A trusted platform that empowers learning and connects learners with
            organizers and opportunities, shaping a generation that is
            job-ready, competitive, and impactful for society.
          </p>
        </div>

        {/* Right Top */}
        <div className="flex justify-center items-center">
          <div className="w-[350px] h-[220px] bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-xl flex items-center justify-center hover:scale-105 transition-transform duration-300">
            <span className="text-lg font-semibold text-gray-700">
              🚀 Modern Design
            </span>
          </div>
        </div>

        {/* Left Bottom */}
        <div className="flex justify-center items-center">
          <div className="w-[350px] h-[220px] bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] rounded-2xl shadow-lg flex items-center justify-center hover:rotate-3 transition-transform duration-300">
            <span className="text-white font-bold text-xl">✨ Gen Z Vibes</span>
          </div>
        </div>

        {/* Right Bottom */}
        <div className="flex flex-col justify-center">
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
        </div>
      </div>
    </div>
  );
};

export default Body;
