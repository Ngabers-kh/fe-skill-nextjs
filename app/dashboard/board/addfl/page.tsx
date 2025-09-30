"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { createBoardFreeLance, getAllSkills } from "../../../services/api";

type Skill = {
  idSkill: number;
  nameSkill: string;
};

export default function AddBoardFreelancePage() {
  const router = useRouter();

  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    quota: 0,
    startDate: "",
    endDate: "",
  });

  const token = Cookies.get("token") || "";
  const userId = Cookies.get("userId") || "";

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getAllSkills(token);
        setSkills(data);
      } catch (err) {
        console.error("Error fetch skills:", err);
      }
    };
    if (token) fetchSkills();
  }, [token]);

  const toggleSkill = (id: number) => {
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quota" ? Number(value) : value,
    }));
  };

  const showNotification = (message: string, type: "success" | "error") => {
    const notif = document.createElement("div");
    notif.className = `fixed top-4 right-4 ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    } text-white px-6 py-3 rounded-lg z-50 transform transition-transform duration-300`;
    notif.innerHTML = `
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          ${
            type === "success"
              ? '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>'
              : '<path fill-rule="evenodd" d="M18 10A8 8 0 11.001 10a8 8 0 0117.998 0zM9 13a1 1 0 102 0V9a1 1 0 10-2 0v4zm1-6a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" clip-rule="evenodd"/>'
          }
        </svg>
        ${message}
      </div>
    `;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), type === "success" ? 1500 : 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !token) {
      showNotification(
        "Token atau User ID tidak ditemukan, silakan login ulang.",
        "error"
      );
      return;
    }

    try {
      await createBoardFreeLance(
        {
          idUser: Number(userId),
          title: form.title,
          description: form.description,
          price: form.price,
          quota: form.quota,
          startDate: form.startDate,
          endDate: form.endDate,
          skills: selectedSkills,
        },
        token
      );

      showNotification("Board Freelance berhasil disimpan!", "success");
      setTimeout(() => router.push("/dashboard/board"), 1500);
    } catch (err: any) {
      console.error("Gagal simpan board:", err);
      showNotification("Gagal simpan board.", "error");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200"
      >
        <h1 className="text-xl font-bold text-slate-800 mb-5">
          Tambah Board Freelance
        </h1>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-slate-600 mb-1.5">
            Judul Project
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-400 focus:outline-none text-sm text-slate-800 bg-white"
            placeholder="Masukkan judul project"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-slate-600 mb-1.5">
            Deskripsi
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-400 focus:outline-none text-sm text-slate-800 bg-white resize-none"
            placeholder="Tuliskan deskripsi singkat"
          />
        </div>

        {/* Price & Quota */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Harga
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-400 focus:outline-none text-sm text-slate-800 bg-white"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Kuota
            </label>
            <input
              type="number"
              name="quota"
              value={form.quota}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-400 focus:outline-none text-sm text-slate-800 bg-white"
              placeholder="0"
            />
          </div>
        </div>

        {/* Date Range */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Tanggal Mulai
            </label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-400 focus:outline-none text-sm text-slate-700 bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Tanggal Selesai
            </label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-400 focus:outline-none text-sm text-slate-700 bg-white"
            />
          </div>
        </div>

        {/* Skills */}
        <div className="mb-5">
          <label className="block text-xs font-medium text-slate-600 mb-2">
            Skills
          </label>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <button
                type="button"
                key={skill.idSkill}
                onClick={() => toggleSkill(skill.idSkill)}
                className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                  selectedSkills.includes(skill.idSkill)
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                }`}
              >
                {skill.nameSkill}
              </button>
            ))}
          </div>
        </div>

        {/* Action */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => router.push("/dashboard/board")}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
