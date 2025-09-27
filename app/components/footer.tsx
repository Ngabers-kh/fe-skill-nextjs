"use client";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#022C5C] text-white py-12">
      <div className="max-w-7xl mx-auto px-7 md:px-12">
        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          {/* Desc */}
          <div>
            <h3 className="text-lg font-bold mb-2">Skillearn</h3>
            <p className="text-gray-300">
              Skillearn was created to support the way we learn and grow. We
              connect learners with trusted providers to build skills.
            </p>
          </div>
          {/* Contact Info */}
          <div className="md:ml-35">
            <h4 className="font-semibold mb-2">Contact</h4>
            <ul className="space-y-1 text-gray-300">
              <li>Email: nbdg03@gmail.com</li>
              <li>Phone: +62 858-7164-1398</li>
              <li>Location: Bandung, Indonesia</li>
            </ul>
          </div>
          {/* Quick Links */}
          <div className="md:ml-35">
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1 text-gray-300">
              <li>
                <a href="#home">Get started</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#guide">How to use</a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-600 mt-8 mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-300 text-sm gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Globe size={16} />
              <span>English</span>
            </div>
            <a>Terms & privacy</a>
            <a>Security</a>
            <a>Status</a>
            <p>©2025 Ngabers Bandung</p>
          </div>

          {/* Social Icons */}
          {/* <div className="flex gap-4 text-lg">
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaLinkedinIn />
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
