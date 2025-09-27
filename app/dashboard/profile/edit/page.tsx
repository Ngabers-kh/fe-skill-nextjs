"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getUser, getUserSkill, updateUser } from "../../../services/api";

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

export default function EditProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState<User>({
    name: "",
    address: "",
    job: "",
    bio: "",
    photo: null,
  });
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

        const [userData, skillData] = await Promise.all([
          getUser(Number(userId), token),
          getUserSkill(Number(userId), token),
        ]);

        setForm(userData);
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

  // handle perubahan input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle save (PATCH API)
  const handleSave = async () => {
    try {
      if (!userId || !token) {
        throw new Error("Token atau userId tidak ada");
      }

      const updated = await updateUser(Number(userId), token, {
        name: form.name,
        address: form.address,
        job: form.job,
        bio: form.bio,
        photo: form.photo,
      });

      console.log("User berhasil diupdate:", updated);
      alert("Profile updated!");
      router.push("/dashboard/profile");
    } catch (err) {
      console.error("Gagal update user:", err);
      alert("Gagal update profile");
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-8">
        <h1 className="text-xl font-bold text-gray-800 mb-6">Edit Profile</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name || ""}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={form.address || ""}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Job
            </label>
            <input
              type="text"
              name="job"
              value={form.job || ""}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Bio
            </label>
            <textarea
              name="bio"
              value={form.bio || ""}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md text-gray-600"
              rows={3}
            />
          </div>

          {/* Skills (readonly dulu) */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Skills
            </label>
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

        {/* Tombol aksi */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => router.push("/dashboard/profile")}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
