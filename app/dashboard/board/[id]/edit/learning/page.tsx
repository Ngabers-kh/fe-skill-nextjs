"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { updateBoardLearning } from "../../../../../services/api";

export default function EditLearningPage() {
  const { id } = useParams();
  const router = useRouter();
  const token = Cookies.get("token") || "";

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    skills: "",
    status: "Open",
    startDate: "",
    endDate: "",
    date: "",
  });

  // TODO: fetch data learning by id untuk prefill form
  useEffect(() => {
    // fetchBoardLearningById(id, token).then(setForm)
  }, [id, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBoardLearning(Number(id), {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()),
      }, token);
      alert("Board Learning berhasil diupdate!");
      router.push("/dashboard/board");
    } catch (err) {
      console.error("Error update Learning:", err);
      alert("Gagal update board Learning");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Learning Board</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Skills (pisahkan dengan koma)"
          value={form.skills}
          onChange={(e) => setForm({ ...form, skills: e.target.value })}
          className="border p-2 rounded"
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="Open">Open</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Closed">Closed</option>
        </select>
        <input
          type="date"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={form.endDate}
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
