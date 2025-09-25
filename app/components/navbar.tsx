"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-4 bg-[rgb(2,44,92)]">
      <div className="max-w-7xl px-7 mx-auto flex justify-between items-center">
        <h1 className="text-2xl text-white font-bold">Logo</h1>
        <ul className="hidden md:flex gap-6 items-center">
          <li>
            <a
              href="#home"
              className="text-white  hover:text-yellow-300 transition-colors"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="text-white hover:text-yellow-300 transition-colors"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#guide"
              className="text-white hover:text-yellow-300 transition-colors"
            >
              Guide
            </a>
          </li>
          <li>
            <a
              href="#testimoni"
              className="text-white hover:text-yellow-300 transition-colors"
            >
              Testimoni
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-white hover:text-yellow-300 transition-colors"
            >
              Contact
            </a>
          </li>
          <li>
            <button className="bg-[#ffe600] border-2 text-[#043873] px-4 py-2 rounded-full font-bold hover:bg-white hover:text-[rgb(2,44,92)] transition-colors">
              Login
            </button>
          </li>
        </ul>

        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[rgb(2,44,92)] px-6 pt-4 pb-6 space-y-4">
          <a
            href="#"
            className="block text-white hover:text-yellow-300 transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="block text-white hover:text-yellow-300 transition-colors"
          >
            About
          </a>
          <a
            href="#"
            className="block text-white hover:text-yellow-300 transition-colors"
          >
            Contact
          </a>
          <button className="w-full bg-[#ffe600] border-2 text-[#043873] px-4 py-2 rounded-full font-bold hover:bg-white hover:text-[rgb(2,44,92)] transition-colors">
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
