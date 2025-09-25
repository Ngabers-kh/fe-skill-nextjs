"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();
  return (
    <div
      id="home"
      className="mx-auto pt-40 pb-20"
      style={{ backgroundImage: "url('/bgRegister.png')" }}
    >
      <div className="max-w-7xl px-7 mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Kolom kiri */}
        <div className="flex-1 text-center md:text-start text-white mb-8 md:mb-0">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to <span className="text-yellow-200">Skillearn</span>!
          </h1>
          <p className="mb-6 text-lg">
            SkillMatch connects you with learning providers and companies.
            Master new skills, prove your abilities, and directly apply for your
            dream job.
          </p>
          <button onClick={() => router.push("/auth")}>
            <a className="bg-[#ffe600] text-[#043873] px-6 py-3 rounded-full font-bold hover:bg-white hover:text-[rgb(2,44,92)] transition-colors">
              Try Now
            </a>
          </button>
        </div>
        {/* Kolom kanan */}
        <div className="flex-1 flex justify-center md:justify-end">
          <img
            src="https://placehold.co/500x400?text=Gambar"
            alt="Gambar Header"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
