"use client";
import React from "react";
import { BookOpen, Users, Briefcase } from "lucide-react";
import Link from "next/link";

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
      className="relative w-full min-h-screen bg-[#F9FAFB] py-30 overflow-hidden"
    >
      {/* Gradient Blob Background */}
      <div className="absolute top-32 left-20 w-72 h-72 bg-gradient-to-tr from-blue-500 via-[#043873] to-[rgb(2,44,92)] rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-tr from-[#043873] via-[rgb(2,44,92)] to-blue-500 rounded-full opacity-20 blur-3xl animate-pulse delay-200"></div>

      {/* Hero Section */}
      <div className="relative max-w-4xl mx-auto px-6 text-center mb-20">
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
      </div>

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
              <div
                className={`relative w-5/12 p-6 bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 ${
                  index % 2 === 0 ? "text-right" : "text-left"
                }`}
              >
                {/* bulatan ikon di garis */}
                {/* bulatan ikon di pojok card */}
                <div
                  className={`absolute top-0 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md
  ${index % 2 === 0 ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"}`}
                >
                  {step.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      {/* <div className="relative bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] py-16 mt-28">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-6">
            Ready to start your journey?
          </h3>
          <Link href="/register">
            <button className="bg-white text-[rgb(2,44,92)] font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-gray-100 transition">
              Get Started →
            </button>
          </Link>
        </div>
      </div> */}
    </div>
  );
};

export default Guide;
