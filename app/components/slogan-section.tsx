import React from "react";

export default function ServiceSection() {
  return (
    <div
      className="bg-[#022C5C] mx-auto items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bgRegister.png')" }}
    >
      <div className="max-w-7xl mx-auto px-7">
        <div className="flex flex-col items-center justify-center py-30">
          <h1 className="text-6xl py-4 font-bold text-white text-center">
            Your skills, everywhere you grow
          </h1>
          <p className="text-center py-4 text-white max-w-3xl">
            Access learning programs and job opportunities from your computer,
            phone, or tablet by connecting with trusted organizers. SkillSight
            is available anytime, anywhere—helping you learn, upskill, and apply
            for jobs seamlessly across platforms.
          </p>
          <a
            href="#"
            className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-3 rounded-md font-medium mt-10"
          >
            Try Taskey →
          </a>
        </div>
      </div>
    </div>
  );
}
