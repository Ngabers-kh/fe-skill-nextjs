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
      <div className="w-full min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-gray-600">
        User tidak ditemukan
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F9FAFB] flex items-center justify-center py-7 md:py-6 overflow-y-auto">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-6xl">
        {/* Header Section */}
        <div className="relative h-32 bg-gradient-to-l to-blue-600 from-[rgb(2,44,92)]">
          <div className="absolute -bottom-12 left-6 md:left-12 flex items-center gap-4">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center overflow-hidden">
              {user.photo ? (
                <Image
                  src={user.photo}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="object-cover rounded-full"
                />
              ) : (
                <span className="text-2xl font-bold text-gray-700">
                  {user?.name?.charAt(0) || "?"}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-100 pb-2">
                {user?.name || "No Name"}
              </h1>
              <p className="text-gray-600 pb-2">{user?.job || "No Job"}</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="pt-16 px-6 md:px-40 pb-8 space-y-6">
          {/* Address */}
          <div>
            <h2 className="text-sm font-semibold text-gray-500">Address</h2>
            <p className="text-gray-800">{user?.address || "-"}</p>
          </div>

          {/* Bio */}
          <div>
            <h2 className="text-sm font-semibold text-gray-500">Bio</h2>
            <p className="text-gray-800">{user?.bio || "-"}</p>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-sm font-semibold text-gray-500">Skills</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <span
                    key={skill.idSkill}
                    className="px-3 py-1 bg-blue-100 text-[rgb(2,44,92)] rounded-full text-sm font-medium"
                  >
                    {skill.nameSkill}
                  </span>
                ))
              ) : (
                <p className="text-gray-600">Belum ada skill</p>
              )}
            </div>
          </div>

          {/* Edit Button */}
          <div className="flex justify-end">
            <button
              onClick={() => router.push("/dashboard/profile/edit")}
              className="px-5 py-2.5 bg-[rgb(2,44,92)] text-white rounded-lg shadow-md hover:bg-blue-800 transition cursor-pointer"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
