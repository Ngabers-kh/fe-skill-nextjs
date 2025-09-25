"use client";
import React from "react";
import { BookOpen, Users, Briefcase } from "lucide-react";
import Link from "next/link";

const Guide = () => {
  const steps = [
    {
      icon: <BookOpen size={28} className="text-blue-600" />,
      title: "Learn",
      desc: "Access curated courses and resources to build your skills.",
    },
    {
      icon: <Users size={28} className="text-blue-600" />,
      title: "Connect",
      desc: "Engage with organizers and peers in a collaborative community.",
    },
    {
      icon: <Briefcase size={28} className="text-blue-600" />,
      title: "Work",
      desc: "Apply your skills directly to real-world projects and jobs.",
    },
  ];

  return (
    <div id="guide" className="w-full min-h-screen bg-[#F9FAFB] pt-40">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Your Guide to <span className="text-blue-600">Success</span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Follow these simple steps to grow your skills, build connections, and
          unlock career opportunities.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto px-6">
        {/* garis tengah */}
        <div className="absolute left-1/2 top-0 h-full w-1 bg-gray-200 transform -translate-x-1/2"></div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center w-full ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`relative w-5/12 p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition ${
                  index % 2 === 0 ? "text-right" : "text-left"
                }`}
              >
                {/* ikon bulat di garis */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-50 py-12 mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to start your journey?
          </h3>
          <Link href="/register">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition">
              Get Started →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Guide;
