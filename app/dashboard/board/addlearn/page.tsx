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

  // ambil token & userId dari cookie
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !token) {
      alert("Token atau User ID tidak ditemukan, silakan login ulang.");
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

      alert("Board Learning berhasil disimpan!");
      router.push("/dashboard/board");
    } catch (err: any) {
      console.error("Gagal simpan board:", err);
      alert("Gagal simpan board");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Tambah Board Learning
        </h1>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Judul Project
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-700"
            placeholder="Masukkan judul project"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deskripsi
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-700"
            placeholder="Tuliskan deskripsi singkat"
          />
        </div>

        {/* Price & date */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Harga
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 text-gray-700"
              placeholder="Masukkan harga"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 text-gray-700"
              placeholder="Masukkan Tanggal"
            />
          </div>
        </div>

        {/* Date */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jam Mulai
            </label>
            <input
              type="time"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jam Selesai
            </label>
            <input
              type="time"
              name="endTime"
              value={form.endTime}
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
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <button
                type="button"
                key={skill.idSkill}
                onClick={() => toggleSkill(skill.idSkill)}
                className={`px-3 py-1 rounded-full border text-sm ${
                  selectedSkills.includes(skill.idSkill)
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                }`}
              >
                {skill.nameSkill}
              </button>
            ))}
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
