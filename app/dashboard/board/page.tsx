"use client";
import { useState } from "react";

export default function BoardPage() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [skillFilter, setSkillFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

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
    {
      id: 3,
      category: "Learning",
      title: "Mobile App UI Design",
      description: "Pelajari cara mendesain aplikasi mobile modern.",
      skills: ["UI/UX", "Design"],
      status: "Not Started",
      name: "Aisyah",
    },
    {
      id: 4,
      category: "Freelance",
      title: "Social Media Campaign",
      description: "Kelola konten sosial media untuk brand fashion.",
      skills: ["Marketing", "Content"],
      status: "Closed",
      name: "Adinda",
    },
    {
      id: 5,
      category: "Learning",
      title: "React Project",
      description: "Belajar React untuk frontend development.",
      skills: ["Coding"],
      status: "Ongoing",
      name: "Budi",
    },
    {
      id: 6,
      category: "Freelance",
      title: "Company Profile Website",
      description: "Membangun website profile perusahaan.",
      skills: ["UI/UX", "Design"],
      status: "Open",
      name: "Siti",
    },
  ];

  const allSkills = Array.from(new Set(projects.flatMap((p) => p.skills)));

  const filteredProjects = projects.filter((p) => {
    const categoryMatch =
      categoryFilter === "All" || p.category === categoryFilter;
    const skillMatch = skillFilter === "All" || p.skills.includes(skillFilter);
    return categoryMatch && skillMatch;
  });

  // --- Pagination ---
  const itemsPerPage = 12; // jumlah card per halaman
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Board</h1>

      {/* Filter + Tambah Board */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Dropdown Kategori */}
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Categories</option>
            <option value="Learning">Learning</option>
            <option value="Freelance">Freelance</option>
          </select>

          {/* Dropdown Skill */}
          <select
            value={skillFilter}
            onChange={(e) => {
              setSkillFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="All">All Skills</option>
            {allSkills.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>

        <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium shadow">
          + Tambah Board
        </button>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProjects.map((project) => (
          <div
            key={project.id}
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition flex flex-col"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {project.title}
            </h2>
            <p className="text-gray-600 mb-3">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-3">
              {project.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>

            <span className="text-sm font-medium text-gray-500 mb-1">
              Organizer: {project.name}
            </span>

            <span className="text-sm font-medium text-gray-500 mb-4">
              Status:{" "}
              <span
                className={`${
                  project.status === "Ongoing"
                    ? "text-blue-600"
                    : project.status === "Open"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {project.status}
              </span>
            </span>

            {/* Action Buttons */}
            <div className="mt-auto flex justify-end gap-2">
              <button className="px-3 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg font-medium">
                Edit
              </button>
              <button className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium">
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToPage(idx + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === idx + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
