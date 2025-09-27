"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import { getAllBoardFreeLance, getAllBoardLearning } from "../../services/api";

type BoardFreeLance = {
  id: number;
  title: string;
  description: string;
  price: number;
  quota: number;
  skills: string[];
  status: string;
  startDate: string;
  endDate: string;
  iduser: number;
};

type BoardLearning = {
  id: number;
  title: string;
  description: string;
  price: number;
  skills: string[];
  status: string;
  startDate: string;
  endDate: string;
  date: string;
  iduser: number;
};

type UnifiedBoard = {
  id: number;
  category: "Learning" | "Freelance";
  title: string;
  description: string;
  skills: string[];
  status: string;
  organizer: string;
};

export default function BoardPage() {
  const router = useRouter();

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [skillFilter, setSkillFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const token = Cookies.get("token") || "";
  const [boards, setBoards] = useState<UnifiedBoard[]>([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const dataFreeLance: BoardFreeLance[] = await getAllBoardFreeLance(token);
        const dataLearning: BoardLearning[] = await getAllBoardLearning(token);

        const mappedFL: UnifiedBoard[] = dataFreeLance.map((b) => ({
          id: b.id,
          category: "Freelance",
          title: b.title,
          description: b.description,
          skills: b.skills || [],
          status: b.status,
          organizer: `User ${b.iduser}`, // sementara pake iduser
        }));

        const mappedL: UnifiedBoard[] = dataLearning.map((b) => ({
          id: b.id,
          category: "Learning",
          title: b.title,
          description: b.description,
          skills: b.skills || [],
          status: b.status,
          organizer: `User ${b.iduser}`,
        }));

        setBoards([...mappedFL, ...mappedL]);
      } catch (err) {
        console.error("Error fetch Boards:", err);
      }
    };
    if (token) fetchBoards();
  }, [token]);

  // Ambil semua unique skills
  const allSkills = useMemo(
    () => Array.from(new Set(boards.flatMap((b) => b.skills))),
    [boards]
  );

  // Filter
  const filteredProjects = boards.filter((b) => {
    const categoryMatch =
      categoryFilter === "All" || b.category === categoryFilter;
    const skillMatch = skillFilter === "All" || b.skills.includes(skillFilter);
    return categoryMatch && skillMatch;
  });

  // Pagination
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
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
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-500"
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
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm text-gray-700 focus:ring-2 focus:ring-green-500"
          >
            <option value="All">All Skills</option>
            {allSkills.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>

        {/* Tambah Board */}
        <button
          onClick={() => router.push("/dashboard/board/add")}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium shadow"
        >
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
              Organizer: {project.organizer}
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
              <button
                onClick={() =>
                  router.push(`/dashboard/board/${project.id}/edit`)
                }
                className="px-3 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg font-medium"
              >
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
