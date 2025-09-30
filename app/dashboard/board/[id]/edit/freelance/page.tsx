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
        if (!boardId || !token) throw new Error("Token/boardId tidak ditemukan");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        skills: selectedSkills,
      };

      await updateBoardFreeLance(Number(boardId), payload, token);

      router.push("/dashboard/board"); // tetap di url ini
    } catch (err) {
      console.error("Gagal update board:", err);
      alert("Gagal update board!");
    }
  };

  if (loading) return <p>Loading...</p>;

  const addedSkills = selectedSkills.filter((id) => !oldSkills.includes(id));
  const removedSkills = oldSkills.filter((id) => !selectedSkills.includes(id));

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Edit Board Freelance</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Judul"
          className="border p-2 w-full"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Deskripsi"
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Harga"
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="quota"
          value={form.quota}
          onChange={handleChange}
          placeholder="Kuota"
          className="border p-2 w-full"
        />
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        {/* Checklist skill */}
        <div>
          <p className="font-semibold mb-2">Pilih Skill:</p>
          {allSkills.map((skill) => (
            <label key={skill.idSkill} className="block">
              <input
                type="checkbox"
                checked={selectedSkills.includes(skill.idSkill)}
                onChange={() => handleSkillToggle(skill.idSkill)}
              />
              <span className="ml-2">{skill.nameSkill}</span>
            </label>
          ))}
        </div>

        {/* Info perubahan skill */}
        <div className="mt-4">
          {addedSkills.length > 0 && (
            <div className="text-green-600">
              <p className="font-semibold">Skill akan ditambahkan:</p>
              <ul className="list-disc ml-5">
                {addedSkills.map((id) => {
                  const skill = allSkills.find((s) => s.idSkill === id);
                  return <li key={id}>{skill?.nameSkill}</li>;
                })}
              </ul>
            </div>
          )}
          {removedSkills.length > 0 && (
            <div className="text-red-600 mt-2">
              <p className="font-semibold">Skill akan dihapus:</p>
              <ul className="list-disc ml-5">
                {removedSkills.map((id) => {
                  const skill = allSkills.find((s) => s.idSkill === id);
                  return <li key={id}>{skill?.nameSkill}</li>;
                })}
              </ul>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
