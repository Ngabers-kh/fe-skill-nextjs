"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getUser, getUserSkill } from "../../services/api";
import Image from "next/image";

interface User {
  id?: number;
  name?: string;
  address?: string;
  job?: string;
  bio?: string;
  photo?: string | null;
}

interface Skill {
  idSkill: number;
  nameSkill: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  const token = Cookies.get("token") || "";
  const userId = Cookies.get("userId") || "";

  useEffect(() => {
    async function fetchData() {
      try {
        if (!userId || !token) {
          throw new Error("Token atau userId tidak ditemukan di cookie");
        }

        const [userData, skillData] = await Promise.all([
          getUser(Number(userId), token),
          getUserSkill(Number(userId), token),
        ]);

        setUser(userData);
        setSkills(skillData);
      } catch (err) {
        console.error("Gagal ambil data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId, token]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-6 border-2 border-[rgb(2,44,92)] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-sm">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg
              className="w-6 h-6 text-red-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            User tidak ditemukan
          </h2>
          <p className="text-gray-600 text-sm">
            Silakan coba lagi atau hubungi administrator
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100">
      <div className="container mx-auto px-3 py-6">
        <div className="max-w-5xl mx-auto">
          {/* Main Profile Card */}
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100/50 backdrop-blur-sm">
            {/* Header Section with Cover */}
            <div className="relative">
              <div className="h-32 md:h-36 bg-gradient-to-br bg-[rgb(2,44,92)] relative overflow-hidden">
                <div className="absolute top-2 right-2 w-12 h-12 bg-white/10 rounded-full blur-lg"></div>
                <div className="absolute bottom-4 right-4 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
              </div>

              {/* Profile Info Overlay */}
              <div className="absolute -bottom-10 left-4 md:left-8 flex flex-col md:flex-row items-start md:items-end gap-3">
                {/* Profile Picture */}
                <div className="relative">
                  <div className="md:w-24 md:h-24 w-20 h-20 rounded-full border-2 border-white shadow-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                    {user.photo ? (
                      <Image
                        src={user.photo}
                        alt="Profile"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-gray-600">
                        {user?.name?.charAt(0)?.toUpperCase() || "?"}
                      </span>
                    )}
                  </div>
                  <div className="absolute md:bottom-1.5 md:right-1.5 bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow"></div>
                </div>

                {/* Name and Job */}
                <div className="text-white mb-4">
                  <h1 className="text-xl md:text-2xl font-bold mb-1 drop-shadow">
                    {user?.name || "No Name"}
                  </h1>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-[rgb(2,44,92)] rounded-full"></div>
                    <p className="text-[rgb(2,44,92)] text-sm font-medium">
                      {user?.job || "No Job"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="md:pt-16 pt-12 pb-6 px-4 md:px-8 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Address */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center shadow-sm">
                      <svg
                        className="w-4.5 h-4.5 text-[rgb(2,44,92)]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        {" "}
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />{" "}
                      </svg>
                    </div>
                    <h2 className="text-base font-semibold text-gray-800">
                      Address
                    </h2>
                  </div>
                  <div className="bg-gray-50/50 rounded-lg p-3 border border-gray-100">
                    <p className="text-gray-700 text-sm">
                      {user?.address || (
                        <span className="text-gray-400 italic">
                          No address provided
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center shadow-sm">
                      <svg
                        className="w-4.5 h-4.5 text-[rgb(2,44,92)]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        {" "}
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />{" "}
                      </svg>
                    </div>
                    <h2 className="text-base font-semibold text-gray-800">
                      About Me
                    </h2>
                  </div>
                  <div className="bg-gray-50/50 rounded-lg p-3 border border-gray-100">
                    <p className="text-gray-700 text-sm">
                      {user?.bio || (
                        <span className="text-gray-400 italic">
                          No bio provided
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center shadow-sm">
                    <svg
                      className="w-4.5 h-4.5 text-[rgb(2,44,92)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {" "}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />{" "}
                    </svg>
                  </div>
                  <h2 className="text-base font-semibold text-gray-800">
                    Skills
                  </h2>
                </div>

                <div className="bg-gray-50/50 rounded-lg p-3 border border-gray-100">
                  {skills.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {skills.map((skill) => (
                        <div
                          key={skill.idSkill}
                          className="flex items-center gap-2 p-2 bg-white rounded-md border border-blue-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-[rgb(2,44,92)] rounded-full"></div>
                          <span className="text-gray-700 text-sm font-medium">
                            {skill.nameSkill}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500 font-medium mb-1 text-sm">
                        No skills added yet
                      </p>
                      <p className="text-gray-400 text-xs">
                        Add your skills to showcase your expertise
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Section */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 px-4 md:px-8 py-4 border-t border-gray-100">
              <div className="flex justify-end">
                <button
                  onClick={() => router.push("/dashboard/profile/edit")}
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r to-[rgb(2,44,92)] from-blue-800 text-white rounded-md text-sm font-medium shadow hover:shadow-md hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300"
                >
                  <svg
                    className="w-4.5 h-4.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {" "}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />{" "}
                  </svg>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
