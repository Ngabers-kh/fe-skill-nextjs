// components/Footer.tsx
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#022C5C] text-white py-12">
      <div className="max-w-7xl mx-auto px-7 md:px-12">
        {/* Top Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Try Whitepace today</h2>
          <p className="text-gray-200 mb-6">
            Get started for free. <br />
            Add your whole team as your needs grow.
          </p>
          <a className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-4 rounded-md font-medium">
            Try Taskey free →
          </a>
          <p className="mt-6 text-gray-200">
            On a big team?{" "}
            <a href="#" className="underline">
              Contact sales
            </a>
          </p>

          {/* Platform Icons */}
          <div className="flex justify-center gap-6 mt-6 text-3xl">
            <span>🍎</span> {/* Replace with proper Apple icon if needed */}
            <span>🪟</span> {/* Windows */}
            <span>🤖</span> {/* Android */}
          </div>
        </div>

        <hr className="border-gray-600 mb-8" />

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
