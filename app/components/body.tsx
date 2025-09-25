import React from "react";
import Link from "next/link";

const Body = () => {
  return (
    <div id="about" className="w-full min-h-screen bg-[#F9FAFB] pb-16 pt-40">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Kiri atas */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Learning &
            <br />
            Career Growth
          </h2>
          <p className="text-gray-500 mb-6 max-w-md">
            To become a trusted platform that empowers learning and connects
            learners with organizers and the job market, creating a generation
            that is job-ready, competitive, and impactful for society.
          </p>
        </div>
        {/* Kanan atas */}
        <div className="flex justify-center items-center">
          <div className="w-[350px] h-[200px] bg-blue-200 rounded-lg opacity-60" />
        </div>
        {/* Kiri bawah */}
        <div className="flex justify-center items-center">
          {/* Lingkaran dengan dots */}
          <div className="relative w-[350px] h-[200px]"></div>
        </div>
        {/* Kanan bawah */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Work <span className="text-gray-700">together</span>
          </h2>
          <p className="text-gray-500 mb-6 max-w-md">
            To create a collaborative platform where learners and organizers
            work together through learning to build a job-ready, competitive,
            and impactful generation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Body;
