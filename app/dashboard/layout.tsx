"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const menus = [
    { name: "Project", path: "/dashboard/project" },
    { name: "My Board", path: "/dashboard/board" },
    { name: "My Application", path: "/dashboard/application" },
    { name: "Profile", path: "/dashboard/profile" },
    { name: "Inbox", path: "/dashboard/inbox" },
  ];

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      router.push("/login");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar untuk desktop */}
      <aside className="hidden md:flex w-64 bg-[rgb(2,44,92)] text-white flex-col p-6">
        <div className="flex-1 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-8">Skillearn</h2>
          <nav className="flex flex-col gap-3">
            {menus.map((menu) => (
              <Link
                key={menu.path}
                href={menu.path}
                className={`px-4 py-2 rounded-md transition ${
                  pathname === menu.path ? "bg-[#0A468B]" : "hover:bg-gray-700"
                }`}
              >
                {menu.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Sticky Logout */}
        <div className="sticky bottom-0 bg-gray-800 pb-4">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Sidebar mobile (drawer) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            {/* Drawer */}
            <motion.aside
              className="fixed top-0 left-0 w-64 h-full bg-[rgb(2,44,92)] text-white flex flex-col p-6 z-50"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Skillearn</h2>
                <button onClick={() => setIsOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-3 flex-1 overflow-y-auto">
                {menus.map((menu) => (
                  <Link
                    key={menu.path}
                    href={menu.path}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-2 rounded-md transition ${
                      pathname === menu.path
                        ? "bg-[#0A468B]"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    {menu.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto bg-gray-800 pb-4">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 bg-[#F9FAFB]">
        {/* Topbar (mobile) */}
        <div className="md:hidden mt-[-0.5px] fixed top-0 left-0 right-0 flex items-center justify-between px-4 py-3.5 bg-[rgb(2,44,92)] text-white shadow z-30">
          {/* Hamburger */}
          <button onClick={() => setIsOpen(true)}>
            <TwoLineHamburger size={24} />
          </button>

          {/* Title */}
          <h2 className="text-lg font-bold">Skillearn</h2>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-white"
            >
              <User size={20} className="text-white" />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg z-50"
                >
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Konten di bawah topbar */}
        <div className="pt-13 px-3">{children}</div>
      </main>
    </div>
  );
}

function TwoLineHamburger({
  size = 24,
  strokeWidth = 2,
  color = "currentColor",
}) {
  const gap = size * 0.3;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" y1={size / 3} x2={size - 4} y2={size / 3} />
      <line x1="4" y1={(2 * size) / 3} x2={size - 10} y2={(2 * size) / 3} />
    </svg>
  );
}
