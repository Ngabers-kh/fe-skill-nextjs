"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["home", "about", "guide", "testimoni", "contact"];
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollBottom = window.scrollY + windowHeight;

      // Paksa contact kalau udah nyampe bawah
      if (scrollBottom >= documentHeight - 10) {
        setActiveSection("contact");
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          const offsetTop = rect.top + window.scrollY;
          const offsetBottom = offsetTop + rect.height;

          // Cek apakah bagian atas section sudah masuk viewport
          if (window.scrollY + 100 >= offsetTop) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // trigger awal pas load
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const smoothScrollTo = (targetId: string) => {
    const target = document.getElementById(targetId);
    if (target) {
      const navbarHeight = 50; // Approximate navbar height
      const targetPosition = target.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }

    // Close mobile menu if open
    setIsOpen(false);
  };

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "guide", label: "Guide" },
    { id: "testimoni", label: "Testimoni" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-[rgb(2,44,92)]/95 backdrop-blur-lg border-b border-white/10 shadow-2xl"
          : "py-4 bg-[rgb(2,44,92)]"
      }`}
    >
      <div className="max-w-7xl px-7 mx-auto flex justify-between items-center">
        {/* Logo with modern styling */}
        <div
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => smoothScrollTo("home")}
        >
          <div className="relative">
            <Image src="/logo.png" alt="Logo" width={50} height={50} />
          </div>
          <h1 className="text-2xl text-white font-black tracking-tight group-hover:text-yellow-300 transition-colors duration-300">
            Skillearn
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 items-center">
          {menuItems.map((item) => (
            <li key={item.id} className="relative group">
              <button
                onClick={() => smoothScrollTo(item.id)}
                className={`relative text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-yellow-300"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
                {/* Animated underline */}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-yellow-300 to-yellow-400 transition-all duration-300 ${
                    activeSection === item.id
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>

                {/* Active indicator dot */}
                {activeSection === item.id && (
                  <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-300 rounded-full animate-pulse"></span>
                )}
              </button>
              {/* Hover glow effect */}
              <div className="absolute -inset-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </li>
          ))}

          {/* Modern Login Button */}
          <li>
            <button className="group relative overflow-hidden bg-[#ffe600] text-[#043873] px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/30 active:scale-95 cursor-pointer">
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10 flex items-center gap-2">
                Login
                <div className="w-1.5 h-1.5 bg-[#043873] rounded-full group-hover:animate-bounce"></div>
              </span>
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden relative p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="relative w-6 h-6">
            <Menu
              size={24}
              className={`absolute transition-all duration-300 ${
                isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              }`}
            />
            <X
              size={24}
              className={`absolute transition-all duration-300 ${
                isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu with enhanced styling */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[rgb(2,44,92)]/98 backdrop-blur-lg border-t border-white/10 px-6 py-6 space-y-1 cursor-pointer">
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => smoothScrollTo(item.id)}
              className={`group flex items-center gap-3 p-3 w-full text-left rounded-xl transition-all duration-300 transform hover:translate-x-2 cursor-pointer ${
                activeSection === item.id
                  ? "text-yellow-300 bg-white/10"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="font-medium">{item.label}</span>
              <div
                className={`ml-auto w-2 h-2 rounded-full transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-yellow-300 opacity-100"
                    : "bg-yellow-300 opacity-0 group-hover:opacity-100"
                }`}
              ></div>
            </button>
          ))}

          <div className="pt-4 mt-4 border-t border-white/20">
            <button
              onClick={() => router.push("/auth")}
              className="w-full group relative overflow-hidden bg-[#ffe600] text-[#043873] px-6 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/30"
            >
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span>Login</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
