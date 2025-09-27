"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getUser, getUserSkill } from "../../services/api";

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

  // ambil token & userId dari cookie
  const token = Cookies.get("token") || "";
  const userId = Cookies.get("userId") || "";

  useEffect(() => {
    async function fetchData() {
      try {
        if (!userId || !token) {
          throw new Error("Token atau userId tidak ditemukan di cookie");
        }

        // ambil data user & skill paralel
        const [userData, skillData] = await Promise.all([
          getUser(Number(userId), token),
          getUserSkill(Number(userId), token),
        ]);

        setUser(userData);
        setSkills(skillData);
        console.log("Data user:", userData);
        console.log("Data skill:", skillData);  
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
      <div className="w-full min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        User tidak ditemukan
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-8">
        {/* Foto dan Nama */}
        <div className="flex items-center gap-6 mb-6">
          <div className="w-24 h-24 rounded-full bg-red-500 flex items-center justify-center text-white text-lg font-bold">
            {user.photo ? (
              <img
                src={user.photo}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              user?.name?.charAt(0) || "?"
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {user?.name || "No Name"}
            </h1>
            <p className="text-gray-600">{user?.job || "No Job"}</p>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-3">
          <div>
            <h2 className="text-sm font-semibold text-gray-500">Address</h2>
            <p className="text-gray-800">{user?.address || "-"}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-500">Bio</h2>
            <p className="text-gray-800">{user?.bio || "-"}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-500">Skills</h2>
            <div className="flex flex-wrap gap-2 mt-1">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <span
                    key={skill.idSkill}
                    className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-700"
                  >
                    {skill.nameSkill}
                  </span>
                ))
              ) : (
                <p className="text-gray-600">Belum ada skill</p>
              )}
            </div>
          </div>
        </div>

        {/* Tombol Edit */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => router.push("/dashboard/profile/edit")}
            className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
