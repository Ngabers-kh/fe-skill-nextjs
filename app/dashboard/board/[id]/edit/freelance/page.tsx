"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Cookies from "js-cookie";
import { fetchBoardFreeLanceById, updateBoardFreeLance } from "../../../../../services/api";

export default function EditFreelancePage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    quota: 0,
    startDate: "",
    endDate: "",
    status: "open",
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    // ambil token dari localStorage
    const token = Cookies.get("token") || "";

    // fetch board data by id
    const fetchData = async () => {
      try {
        const data = await fetchBoardFreeLanceById(Number(id), token);
        console.log("Data board freelance:", id);
        setForm({
          title: data.title,
          description: data.description,
          price: data.price,
          quota: data.quota,
          startDate: data.startDate,
          endDate: data.endDate,
          status: data.status,
        });
        setSkills(data.skills || []);
      } catch (err) {
        console.error("Gagal ambil data board:", err);
      }
    };

    if (id && token) fetchData();
  }, [id]);

  // handle change form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // hapus skill
  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  // tambah skill baru
  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  // submit update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBoardFreeLance(Number(id), { ...form, skills }, token);
      router.push("/dashboard/board");
    } catch (err) {
      console.error("Gagal update board:", err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Edit Board Freelance
        </h1>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Judul Project
          </label>
          <input
            type="text"
            name="title"
            value={form.title || ""}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deskripsi
          </label>
          <textarea
            name="description"
            value={form.description || ""}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
        </div>

        {/* Price & Quota */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Harga
            </label>
            <input
              type="number"
              name="price"
              value={form.price || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kuota
            </label>
            <input
              type="number"
              name="quota"
              value={form.quota || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
            />
          </div>
        </div>

        {/* Date */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Mulai
            </label>
            <input
              type="date"
              name="startDate"
              value={form.startDate || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Selesai
            </label>
            <input
              type="date"
              name="endDate"
              value={form.endDate || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
            />
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skills
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300"
              placeholder="Tambah skill baru"
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Tambah
            </button>
          </div>
        </div>

        {/* Action */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/dashboard/board")}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
