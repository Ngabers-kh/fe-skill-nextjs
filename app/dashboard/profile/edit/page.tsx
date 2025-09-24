"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditProfilePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "Fauzan",
    address: "Bandung, Indonesia",
    job: "Fullstack Developer",
    bio: "Saya suka belajar dan membuat aplikasi berbasis web dan IoT.",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // nanti bisa simpan ke backend
    console.log("Updated profile:", form);
    router.push("/profile"); // balik ke halaman profile
  };

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
              value={form.name}
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
              value={form.address}
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
              value={form.job}
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
              value={form.bio}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md text-gray-600"
              rows={3}
            />
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
