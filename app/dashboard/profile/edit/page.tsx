"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  getUser,
  getUserSkill,
  updateUser,
  getAllSkills,
} from "../../../services/api";

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
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<number | "">("");
  const [loading, setLoading] = useState(true);

  const token = Cookies.get("token") || "";
  const userId = Cookies.get("userId") || "";

  useEffect(() => {
    async function fetchData() {
      try {
        if (!userId || !token) throw new Error("Token/userId tidak ditemukan");

        const [userData, skillData, masterSkills] = await Promise.all([
          getUser(Number(userId), token),
          getUserSkill(Number(userId), token),
          getAllSkills(token),
        ]);

        setForm(userData);
        setSkills(skillData);
        setAllSkills(masterSkills);
      } catch (err) {
        console.error("Gagal ambil data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId, token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // tambah skill dari select
  const handleAddSkill = () => {
    if (!selectedSkill) return;
    const skillObj = allSkills.find((s) => s.idSkill === Number(selectedSkill));
    if (!skillObj) return;

    // cek biar ga duplicate
    if (skills.some((s) => s.idSkill === skillObj.idSkill)) {
      alert("Skill sudah ada");
      return;
    }

    setSkills([...skills, skillObj]);
    setSelectedSkill("");
  };

  // hapus skill
  const handleRemoveSkill = (id: number) => {
    setSkills(skills.filter((s) => s.idSkill !== id));
  };

  // save
  const handleSave = async () => {
    try {
      if (!userId || !token) throw new Error("Token/userId tidak ada");

      await updateUser(Number(userId), token, {
        ...form,
        skillIds: skills.map((s) => s.idSkill), // kirim ID skill ke backend
      });

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
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center py-7 md:py-6">
      <div className="bg-white shadow-md rounded-2xl w-full max-w-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h1>

        <div className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name || ""}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={form.address || ""}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-500"
            />
          </div>

          {/* Job */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job
            </label>
            <input
              type="text"
              name="job"
              value={form.job || ""}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-500"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              name="bio"
              value={form.bio || ""}
              onChange={handleChange}
              rows={3}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-500"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Skills
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <span
                    key={skill.idSkill}
                    className="relative px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center"
                  >
                    {skill.nameSkill}
                    <button
                      onClick={() => handleRemoveSkill(skill.idSkill)}
                      className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full bg-red-500 text-white text-xs hover:bg-red-600"
                    >
                      -
                    </button>
                  </span>
                ))
              ) : (
                <p className="text-gray-500">Belum ada skill</p>
              )}
            </div>

            {/* Pilih skill dari dropdown */}
            <div className="flex mt-3 gap-2">
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value as any)}
                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-500"
              >
                <option value="">Pilih skill...</option>
                {allSkills.map((skill) => (
                  <option key={skill.idSkill} value={skill.idSkill}>
                    {skill.nameSkill}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAddSkill}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={() => router.push("/dashboard/profile")}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
