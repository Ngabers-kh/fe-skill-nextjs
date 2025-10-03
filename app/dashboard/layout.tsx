"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  FolderOpen,
  Layout,
  FileText,
  UserCircle,
  Inbox,
  LogOut,
} from "lucide-react";
import { getUser } from "../services/api";

// Define the sidebar width for use in Tailwind CSS and calculations
const DESKTOP_SIDEBAR_WIDTH = "w-80"; // w-80 is 320px

interface User {
  id?: number;
  name?: string;
  email?: string;
  address?: string;
  job?: string;
  bio?: string;
  role?: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const token = Cookies.get("token") || "";
  const userId = Cookies.get("userId") || "";
  const [loading, setLoading] = useState(true);

  // NOTE: This state is key for client-only rendering portions like motion.div
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setDropdownOpen(false);
    // You might also want to close the mobile sidebar on navigation
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
      async function fetchData() {
        try {
          if (!userId || !token) {
            throw new Error("Token atau userId tidak ditemukan di cookie");
          }
  
          const userData= await getUser(Number(userId), token);
  
          setUser(userData);
        } catch (err) {
          console.error("Gagal ambil data:", err);
        } finally {
          setLoading(false);
        }
      }
  
      fetchData();
    }, [userId, token]);

  const menus = [
    {
      name: "Projects",
      path: "/dashboard/project",
      icon: FolderOpen,
      description: "Explore projects from organizer",
    },
    {
      name: "My Board",
      path: "/dashboard/board",
      icon: Layout,
      description: "Create and manage the projects you organize.",
    },
    {
      name: "Applications",
      path: "/dashboard/application",
      icon: FileText,
      description: "Job applications",
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: UserCircle,
      description: "Personal settings",
    },
    {
      name: "Messages",
      path: "/dashboard/inbox",
      icon: Inbox,
      description: "Communications",
    },
  ];

  const handleLogout = () => {
    // NOTE: This check ensures localStorage is only accessed on the client.
    if (typeof window !== "undefined") {
      Cookies.remove("token");
      Cookies.remove("userId"); 
      router.push("/auth");
    }
  };

  const SidebarContent = ({ isMobile = false }) => (
    // This div needs to be consistent between server and client
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className={`flex items-start ${
          isMobile ? "justify-between" : "justify-between"
        } mb-8 pb-6 border-b border-white/10`}
      >
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-xl font-bold text-white">Skillearn</h2>
            <p className="text-blue-200 text-xs">Learning Platform</p>
          </div>
        </div>
        {isMobile && (
          <button
            onClick={() => setIsOpen(false)}
            className="relative z-50 p-2 hover:bg-white/10 rounded-lg transition-colors pointer-events-auto"
          >
            <X size={20} className="text-white" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto">
        <div className="px-2">
          <p className="text-blue-200 text-xs font-semibold uppercase tracking-wider mb-3">
            Navigation
          </p>
          {menus.map((menu) => {
            const Icon = menu.icon;
            const isActive = pathname === menu.path;

            return (
              <Link
                key={menu.path}
                href={menu.path}
                onClick={() => isMobile && setIsOpen(false)}
                className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative overflow-hidden ${
                  isActive
                    ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                }`}
              >
                {/* Active indicator (ONLY rendered on client when isClient is true) */}
                {isClient && isActive && (
                  <motion.div
                    suppressHydrationWarning
                    className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Icon */}
                <div
                  className={`p-2 rounded-lg transition-colors ${
                    isActive ? "bg-white/20" : "group-hover:bg-white/10"
                  }`}
                >
                  <Icon size={18} />
                </div>

                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{menu.name}</p>
                  <p
                    className={`text-xs transition-colors ${
                      isActive
                        ? "text-blue-100"
                        : "text-blue-300 group-hover:text-blue-200"
                    }`}
                  >
                    {menu.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="mt-auto pt-6 border-t border-white/10">
        {/* User info card */}
        <div className="bg-white/10 rounded-xl p-4 mb-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white text-sm truncate">
                {user?.name || "No Name"}
              </p>
              <p className="text-blue-200 text-xs">{user?.role || "No Name"}</p>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="relative w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:text-white hover:bg-red-500/20 rounded-xl transition-all duration-200 group cursor-pointer"
        >
          <div className="p-2 rounded-lg group-hover:bg-red-500/20 transition-colors">
            <LogOut size={18} />
          </div>
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    // 1. Removed 'flex' from the top-level div
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar (FIXED) */}
      <aside
        // 2. Added 'lg:fixed', 'lg:inset-y-0', 'lg:left-0', 'h-screen'
        className={`hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex ${DESKTOP_SIDEBAR_WIDTH} h-screen bg-gradient-to-br bg-[rgb(2,44,92)] text-white flex-col p-6 shadow-2xl relative overflow-hidden z-20`}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        <SidebarContent isMobile={false} />
      </aside>

      {/* Mobile Sidebar Overlay (Unchanged) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.aside
              className="fixed top-0 left-0 w-80 h-full bg-gradient-to-br bg-[rgb(2,44,92)] text-white flex flex-col p-6 z-50 shadow-2xl lg:hidden overflow-hidden"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
              <SidebarContent isMobile={true} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Container */}
      {/* 3. Added 'lg:ml-80' to account for the fixed sidebar's width */}
      <main className={`lg:ml-80 flex-1 flex flex-col min-h-screen`}>
        {/* Top Nav (Mobile) */}{" "}
        <header className="lg:hidden sticky top-0 z-30 bg-[rgb(2,44,92)] backdrop-blur-md border-b border-gray-200/80 shadow-sm">
          {" "}
          <div className="flex items-center justify-between px-4 py-3">
            {" "}
            <div className="flex items-center gap-4">
              {" "}
              <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-white/95 hover:bg-white/10 rounded-xl transition-colors active:scale-95"
              >
                {" "}
                <TwoLineHamburger />{" "}
              </button>{" "}
              <h1 className="font-bold text-white/95 text-lg">
                Skillearn
              </h1>{" "}
            </div>{" "}
            <div className="flex items-center gap-3">
              {" "}
              <div className="relative">
                {" "}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  {" "}
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                    {" "}
                    <User size={16} className="text-white" />{" "}
                  </div>{" "}
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>{" "}
                </button>{" "}
                <AnimatePresence>
                  {" "}
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100/80 overflow-hidden z-50"
                    >
                      {" "}
                      <div className="bg-gradient-to-r bg-[rgb(2,44,92)] px-4 py-3">
                        {" "}
                        <div className="flex items-center gap-3">
                          {" "}
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            {" "}
                            <User size={18} className="text-white" />{" "}
                          </div>{" "}
                          <div>
                            {" "}
                            <p className="font-medium text-white text-sm">
                              {" "}
                              {user?.name || "No Name"}{" "}
                            </p>{" "}
                            <p className="text-blue-200 text-xs">
                              {" "}
                              {user?.email || "No Email"}{" "}
                            </p>{" "}
                          </div>{" "}
                        </div>{" "}
                      </div>{" "}
                      <div className="p-2">
                        {" "}
                        <Link
                          href="/dashboard/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 hover:bg-blue-100 rounded-xl transition-colors text-gray-700"
                        >
                          {" "}
                          <UserCircle size={18} />{" "}
                          <span className="text-sm font-medium">
                            {" "}
                            View Profile{" "}
                          </span>{" "}
                        </Link>{" "}
                        <hr className="my-2 border-gray-100" />{" "}
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            handleLogout();
                          }}
                          className="relative w-full flex items-center gap-3 px-3 py-2.5 hover:bg-red-50 rounded-xl transition-colors text-red-600"
                        >
                          {" "}
                          <LogOut size={18} />{" "}
                          <span className="text-sm font-medium">Logout</span>{" "}
                        </button>{" "}
                      </div>{" "}
                    </motion.div>
                  )}{" "}
                </AnimatePresence>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </header>
        {/* Page Content */}
        {/* Removed overflow-auto from this div as the scroll is naturally on the body/main content */}
        <div className="flex-1">
          <div className="min-h-full">{children}</div>
        </div>
      </main>
    </div>
  );
}

function TwoLineHamburger({
  size = 24,
  strokeWidth = 2,
  color = "currentColor",
}) {
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
      <line x1="4" y1={(2 * size) / 3} x2={size - 11} y2={(2 * size) / 3} />
    </svg>
  );
}
