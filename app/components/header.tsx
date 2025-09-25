"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();
  return (
    <div
      id="home"
      className="mx-auto pt-40 pb-20 items-center bg-cover bg-center relative overflow-hidden "
      style={{ backgroundImage: "url('/bgRegister.png')" }}
    >
      {/* <div className="absolute inset-0 bg-black/20"></div> */}
      {/* Floating geometric shapes for Gen Z aesthetic */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-30 left-10 w-20 h-20 bg-yellow-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-yellow-200/30 rounded-lg rotate-45 blur-lg animate-bounce"></div>
      </div>

      <div className="max-w-7xl px-7 mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10">
        {/* Left Column */}
        <div className="flex-1 text-center lg:text-start text-white mb-12 lg:mb-0 space-y-6">
          {/* Badge/Tag */}
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-yellow-200 rounded-full mr-2 animate-pulse"></span>
            Start Your Learning Journey
          </div>

          {/* Main heading with gradient text */}
          <h1 className="text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
              Skillearn
            </span>
            <span className="text-4xl lg:text-5xl">!</span>
          </h1>

          {/* Description with better typography */}
          <p className="mb-8 text-lg lg:text-xl leading-relaxed text-white/90 max-w-lg mx-auto lg:mx-0">
            Skillearn helps you grow through learning providers.{" "}
            <span className="font-semibold text-yellow-200">
              Master new skills
            </span>
            , prove your abilities, and directly apply for your{" "}
            <span className="font-semibold text-yellow-200">dream job</span>.
          </p>

          {/* Modern button group */}
          <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
            <button
              onClick={() => router.push("/auth")}
              className="group relative overflow-hidden bg-[#ffe600] text-[#043873] px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-200/50 active:scale-95"
            >
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10 group-hover:text-[#043873] transition-colors duration-300">
                Try Now ✨
              </span>
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 flex justify-center lg:justify-end relative">
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-yellow-200/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-white/20 to-transparent rounded-full blur-2xl"></div>

          {/* Main image with modern styling */}
          <div className="relative group">
            {/* Glassmorphism card wrapper */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl transform group-hover:scale-105 transition-transform duration-500 z-10"></div>

            {/* Floating badges (z-30 biar paling atas) */}
            <div className="absolute -top-4 -left-4 bg-yellow-200 text-[#043873] px-3 py-2 rounded-xl font-bold text-sm shadow-lg animate-bounce z-30">
              🚀 New!
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-3 py-2 rounded-xl font-medium text-sm shadow-lg z-30 animate-pulse">
              💯 Success Rate
            </div>

            {/* Image */}
            <img
              src="/bg-right-register.png"
              alt="Gambar Header"
              className="relative z-20 rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent"></div>
    </div>
  );
};

export default Header;
