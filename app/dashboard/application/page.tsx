"use client";
import { useState } from "react";

export default function ApplicationPage() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [skillFilter, setSkillFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const applications = [
    {
      id: 1,
      category: "Learning",
      title: "Build a Portfolio Website",
      description: "Belajar HTML, CSS, dan dasar desain web.",
      skills: ["Coding", "UI/UX"],
      name: "Fauzan",
      appliedDate: "2025-09-10",
      status: "Pending",
    },
    {
      id: 2,
      title: "Landing Page untuk Startup",
      description: "Buat landing page interaktif untuk client startup lokal.",
      category: "Freelance",
      skills: ["Coding", "Design"],
      name: "Riza",
      appliedDate: "2025-09-10",
      status: "Pending",
    },
    {
      id: 3,
      title: "Mobile App UI Design",
      description: "Pelajari cara mendesain aplikasi mobile modern.",
      category: "Learning",
      skills: ["UI/UX", "Design"],
      name: "Aisyah",
      appliedDate: "2025-09-12",
      status: "Accepted",
    },
    {
      id: 4,
      title: "Social Media Campaign",
      description: "Kelola konten sosial media untuk brand fashion.",
      category: "Freelance",
      skills: ["Marketing", "Content"],
      name: "Adinda",
      appliedDate: "2025-09-15",
      status: "Rejected",
    },
  ];

  const allSkills = Array.from(new Set(applications.flatMap((a) => a.skills)));

  const filteredProjects = applications.filter((a) => {
    const categoryMatch =
      categoryFilter === "All" || a.category === categoryFilter;
    const skillMatch = skillFilter === "All" || a.skills.includes(skillFilter);
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Application</h1>

      {/* Filter Row */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Dropdown Kategori */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Categories</option>
          <option value="Learning">Learning</option>
          <option value="Freelance">Freelance</option>
        </select>

        {/* Dropdown Skill */}
        <select
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
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

      {/* Application Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProjects.map((application) => (
          <div
            key={application.id}
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition flex flex-col"
          >
            {/* Title + Category */}
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              {application.title}
            </h2>
            <p className="text-gray-600 mb-3">{application.description}</p>
            <p className="text-sm text-gray-500 mb-3">{application.category}</p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-1">
              {application.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Organizer */}
            <span className="text-sm font-medium text-gray-500 mb-1">
              Organizer:{" "}
              <span className="text-gray-700">{application.name}</span>
            </span>

            {/* Applied Date */}
            <span className="text-sm font-medium text-gray-500 mb-1">
              Applied:{" "}
              <span className="text-gray-700">{application.appliedDate}</span>
            </span>

            {/* Status */}
            <span className="text-sm font-medium text-gray-500 mb-4">
              Status:{" "}
              <span
                className={`${
                  application.status === "Pending"
                    ? "text-blue-600"
                    : application.status === "Accepted"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {application.status}
              </span>
            </span>

            {/* Action Button */}
            {application.status === "Pending" && (
              <button className="mt-auto px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium">
                Cancel Application
              </button>
            )}

            {application.status === "Accepted" && (
              <button className="mt-auto px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium">
                View Detail
              </button>
            )}

            {application.status === "Rejected" && (
              <button className="mt-auto px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg font-medium">
                Try Another Project
              </button>
            )}
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
