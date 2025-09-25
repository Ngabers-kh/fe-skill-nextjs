// components/Footer.tsx
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#022C5C] text-white py-12">
      <div className="max-w-7xl mx-auto px-7 md:px-12">
        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          {/* Logo & Desc */}
          <div>
            <h3 className="text-lg font-bold mb-2">whitepace</h3>
            <p className="text-gray-300">
              whitepace was created for the new ways we live and work. We make a
              better workspace around the world
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-2">Product</h4>
            <ul className="space-y-1 text-gray-300">
              <li>
                <a href="#">Overview</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">Customer stories</a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-2">Resources</h4>
            <ul className="space-y-1 text-gray-300">
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Guides & tutorials</a>
              </li>
              <li>
                <a href="#">Help center</a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <ul className="space-y-1 text-gray-300">
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Media kit</a>
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
            <a href="#">Terms & privacy</a>
            <a href="#">Security</a>
            <a href="#">Status</a>
            <p>©2021 Whitepace LLC.</p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 text-lg">
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
