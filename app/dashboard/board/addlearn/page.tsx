"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { createBoardLearning, getAllSkills } from "../../../services/api";

type Skill = {
  idSkill: number;
  nameSkill: string;
};

export default function AddBoardLearningPage() {
  const router = useRouter();

  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  const [organizer, setOrganizer] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    date: "",
    startTime: "",
    endTime: "",
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
      await createBoardLearning(
        {
          idUser: Number(userId),
          title: form.title,
          description: form.description,
          price: form.price,
          date: form.date,
          startTime: form.startTime,
          endTime: form.endTime,
          skills: selectedSkills,
        },
        token
      );

      showNotification("Board Learning berhasil disimpan!", "success");
      setTimeout(() => router.push("/dashboard/board"), 1500);
    } catch (err: any) {
      console.error("Gagal simpan board:", err);
      showNotification("Gagal simpan board.", "error");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl shadow-indigo-100 border border-white/20"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] bg-clip-text text-transparent mb-2">
            Create Learning Board
          </h1>
          <p className="text-sm text-slate-500">
            Create new learning sessions and share your knowledge
          </p>
        </div>

        {/* Title */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Learning Title
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none text-sm text-slate-800 bg-white transition-all duration-200 hover:border-slate-300"
            placeholder="Example: Workshop React untuk Pemula"
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none text-sm text-slate-800 bg-white resize-none transition-all duration-200 hover:border-slate-300"
            placeholder="Explain the material to be studied, target participants, and benefits to be gained..."
          />
        </div>

        {/* Price & Date */}
        <div className="mb-5 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Price (Rp)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                Rp
              </span>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none text-sm text-slate-800 bg-white transition-all duration-200 hover:border-slate-300"
                placeholder="0"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none text-sm text-slate-700 bg-white transition-all duration-200 hover:border-slate-300"
            />
          </div>
        </div>

        {/* Time Range */}
        <div className="mb-5 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Start Time
            </label>
            <input
              type="time"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none text-sm text-slate-700 bg-white transition-all duration-200 hover:border-slate-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Start Time
            </label>
            <input
              type="time"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none text-sm text-slate-700 bg-white transition-all duration-200 hover:border-slate-300"
            />
          </div>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Skills Outcomes
          </label>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <button
                type="button"
                key={skill.idSkill}
                onClick={() => toggleSkill(skill.idSkill)}
                className={`cursor-pointer px-4 py-2 rounded-full border-2 text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                  selectedSkills.includes(skill.idSkill)
                    ? "bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] text-white border-transparent shadow-lg shadow-indigo-200"
                    : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50"
                }`}
              >
                {skill.nameSkill}
              </button>
            ))}
          </div>
        </div>

        {/* Action */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => router.push("/dashboard/board")}
            className="cursor-pointer px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="cursor-pointer px-6 py-3 bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] hover:from-blue-700 hover:to-blue-800 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transform hover:-translate-y-0.5"
          >
            Create Learning
          </button>
        </div>
      </form>
    </div>
  );
}
