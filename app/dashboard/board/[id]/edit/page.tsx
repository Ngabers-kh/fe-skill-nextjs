"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditBoardPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  // --- Dummy data (sementara) ---
  const projects = [
    {
      id: 1,
      category: "Learning",
      title: "Build a Portfolio Website",
      description: "Belajar HTML, CSS, dan dasar desain web.",
      skills: ["Coding", "UI/UX"],
      status: "Ongoing",
      name: "Fauzan",
    },
    {
      id: 2,
      category: "Freelance",
      title: "Landing Page untuk Startup",
      description: "Buat landing page interaktif untuk client startup lokal.",
      skills: ["Coding", "Design"],
      status: "Open",
      name: "Riza",
    },
  ];

  const availableSkills = ["Coding", "UI/UX", "Design", "Marketing", "Content"];

  // --- State ---
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Learning");
  const [skills, setSkills] = useState<string[]>([]);
  const [status, setStatus] = useState("Not Started");
  const [name, setName] = useState("");

  // --- Ambil data project by id ---
  useEffect(() => {
    if (id) {
      const project = projects.find((p) => p.id === Number(id));
      if (project) {
        setTitle(project.title);
        setDescription(project.description);
        setCategory(project.category);
        setSkills(project.skills);
        setStatus(project.status);
        setName(project.name);
      }
    }
  }, [id]);

  const handleSkillChange = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedBoard = {
      id,
      title,
      description,
      category,
      skills,
      status,
      name,
    };

    console.log("Board di-update:", updatedBoard);

    // nanti ganti ke API PUT
    router.push("/dashboard/board");
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Board</h1>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Judul Project
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kategori
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-gray-700"
          >
            <option value="Learning">Learning</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skills
          </label>
          <div className="flex flex-wrap gap-2">
            {availableSkills.map((skill) => (
              <button
                type="button"
                key={skill}
                onClick={() => handleSkillChange(skill)}
                className={`px-3 py-1 rounded-full border text-sm ${
                  skills.includes(skill)
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 text-gray-700"
          >
            <option value="Not Started">Not Started</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Organizer */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Organizer
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 text-gray-700"
          />
        </div>

        {/* Actions */}
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
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
