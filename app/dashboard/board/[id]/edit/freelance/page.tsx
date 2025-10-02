"use client";

import React, { use } from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  getBoardFreeLanceById,
  getAllSkills,
  updateBoardFreeLance,
  getBoardFreeLanceSkills,
} from "../../../../../services/api";

interface Skill {
  idSkill: number;
  nameSkill: string;
}

interface BoardFreeLance {
  id: number;
  title: string;
  description: string;
  price: number;
  quota: number;
  skills: Skill[];
  status: string;
  startDate: string;
  endDate: string;
  iduser: number;
}

export default function EditBoardFreeLancePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id: boardId } = use(params);

  const [form, setForm] = useState<BoardFreeLance>({
    id: 0,
    title: "",
    description: "",
    price: 0,
    quota: 0,
    skills: [],
    status: "",
    startDate: "",
    endDate: "",
    iduser: 0,
  });

  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  const [oldSkills, setOldSkills] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const token = Cookies.get("token") || "";

  useEffect(() => {
    async function fetchData() {
      try {
        if (!boardId || !token)
          throw new Error("Token/boardId tidak ditemukan");

        const [boardData, masterSkills, boardSkills] = await Promise.all([
          getBoardFreeLanceById(Number(boardId), token),
          getAllSkills(token),
          getBoardFreeLanceSkills(Number(boardId), token),
        ]);

        setForm(boardData);
        setAllSkills(masterSkills);

        const skillIds = Array.isArray(boardSkills)
          ? boardSkills.map((s: Skill) => s.idSkill)
          : boardSkills.skills?.map((s: Skill) => s.idSkill) || [];

        setSelectedSkills(skillIds);
        setOldSkills(skillIds);
      } catch (err) {
        console.error("Gagal ambil data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [boardId, token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSkillToggle = (id: number) => {
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
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
    try {
      const payload = {
        ...form,
        skills: selectedSkills,
      };

      await updateBoardFreeLance(Number(boardId), payload, token);

      showNotification("Board Freelance berhasil diupdate!", "success");
      setTimeout(() => router.push("/dashboard/board"), 1500);
    } catch (err) {
      console.error("Gagal update board:", err);
      showNotification("Gagal update board!", "error");
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex justify-center items-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-slate-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  const addedSkills = selectedSkills.filter((id) => !oldSkills.includes(id));
  const removedSkills = oldSkills.filter((id) => !selectedSkills.includes(id));

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-xl shadow-indigo-100 border border-white/20"
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] bg-clip-text text-transparent mb-1">
            Edit Board Freelance
          </h1>
          <p className="text-xs text-slate-500">
            Perbarui informasi proyek freelance Anda
          </p>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Judul Project
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Masukkan judul project"
            className="w-full px-3 py-2 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none text-sm text-slate-800 bg-white transition-all duration-200"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Deskripsi
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Tuliskan deskripsi"
            rows={3}
            className="w-full px-3 py-2 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none text-sm text-slate-800 bg-white resize-none transition-all duration-200"
          />
        </div>

        {/* Price & Quota */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Harga (Rp)
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="0"
              className="w-full px-3 py-2 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none text-sm text-slate-800 bg-white transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Kuota
            </label>
            <input
              type="number"
              name="quota"
              value={form.quota}
              onChange={handleChange}
              placeholder="0"
              className="w-full px-3 py-2 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none text-sm text-slate-800 bg-white transition-all duration-200"
            />
          </div>
        </div>

        {/* Date Range */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tanggal Mulai
            </label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none text-sm text-slate-700 bg-white transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tanggal Selesai
            </label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none text-sm text-slate-700 bg-white transition-all duration-200"
            />
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Skills yang Dibutuhkan
          </label>
          <div className="flex flex-wrap gap-2">
            {allSkills.map((skill) => (
              <button
                type="button"
                key={skill.idSkill}
                onClick={() => handleSkillToggle(skill.idSkill)}
                className={`px-3 py-1.5 rounded-full border-2 text-xs font-medium transition-all duration-200 ${
                  selectedSkills.includes(skill.idSkill)
                    ? "bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] text-white border-transparent shadow-md shadow-indigo-200"
                    : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
                }`}
              >
                {skill.nameSkill}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Changes Info */}
        {(addedSkills.length > 0 || removedSkills.length > 0) && (
          <div className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
            {addedSkills.length > 0 && (
              <div className="mb-2">
                <p className="text-xs font-semibold text-green-600 mb-1">
                  ✓ Skill akan ditambahkan:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {addedSkills.map((id) => {
                    const skill = allSkills.find((s) => s.idSkill === id);
                    return (
                      <span
                        key={id}
                        className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs"
                      >
                        {skill?.nameSkill}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
            {removedSkills.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-red-600 mb-1">
                  ✕ Skill akan dihapus:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {removedSkills.map((id) => {
                    const skill = allSkills.find((s) => s.idSkill === id);
                    return (
                      <span
                        key={id}
                        className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs"
                      >
                        {skill?.nameSkill}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => router.push("/dashboard/board")}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-all duration-200"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] hover:from-blue-700 hover:to-blue-800 text-white rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg shadow-indigo-200"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
