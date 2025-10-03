"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import { Search, Grid3x3, Tag, User } from "lucide-react";
import { getAllBoardFreeLance, getAllBoardLearning } from "../../services/api";
import DropdownFilters from "../board/components/DropdownFilters";

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
  users?: { name: string };
};

type BoardLearning = {
  id: number;
  title: string;
  description: string;
  price: number;
  skills: string[];
  status: string;
  date: string;
  startTime: string;
  endTime: string;
  iduser: number;
  users?: { name: string };
};

type UnifiedBoard = {
  id: string;
  realId: number;
  category: "Learning" | "Freelance";
  title: string;
  description: string;
  skills: string[];
  status: string;
  organizer: string;
};

export default function ProjectBoardPage() {
  const router = useRouter();

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [skillFilter, setSkillFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const token = Cookies.get("token") || "";
  const [boards, setBoards] = useState<UnifiedBoard[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBoards = async () => {
    try {
      const dataFreeLance: BoardFreeLance[] = await getAllBoardFreeLance(token);
      const dataLearning: BoardLearning[] = await getAllBoardLearning(token);

      const mappedFL: UnifiedBoard[] = dataFreeLance.map((b) => ({
        id: `freelance-${b.id}`,
        realId: b.id,
        category: "Freelance",
        title: b.title,
        description: b.description,
        skills: b.skills || [],
        status: b.status,
        organizer: b.users ? b.users.name : `User ${b.iduser}`,
      }));

      const mappedL: UnifiedBoard[] = dataLearning.map((b) => ({
        id: `learning-${b.id}`,
        realId: b.id,
        category: "Learning",
        title: b.title,
        description: b.description,
        skills: b.skills || [],
        status: b.status,
        organizer: b.users ? b.users.name : `User ${b.iduser}`,
      }));

      setBoards([...mappedFL, ...mappedL]);
    } catch (err) {
      console.error("Error fetch Boards:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchBoards();
  }, [token]);

  const allSkills = useMemo(
    () => Array.from(new Set(boards.flatMap((b) => b.skills))),
    [boards]
  );

  // Filter dengan search query
  const filteredProjects = boards.filter((b) => {
    const categoryMatch =
      categoryFilter === "All" || b.category === categoryFilter;
    const skillMatch = skillFilter === "All" || b.skills.includes(skillFilter);
    const searchMatch = b.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return categoryMatch && skillMatch && searchMatch;
  });

  // Pagination
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-[rgb(2,44,92)] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100">
      <div className="container mx-auto px-4 pt-8 py-2">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-[rgb(2,44,92)] rounded-2xl flex items-center justify-center">
              <Grid3x3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Project Board
              </h1>
              <p className="text-gray-600 text-md">
                Discover and join available projects.
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border bg-white border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm"
            />
          </div>

          {/* Filters kanan */}
          <div className="flex gap-3 w-full md:w-auto">
            {/* Category Filter */}
            <DropdownFilters
              label="All Categories"
              value={categoryFilter}
              onChange={(val) => {
                setCategoryFilter(val);
                setCurrentPage(1);
              }}
              options={[
                { label: "All Category", value: "All" },
                { label: "Freelance", value: "Freelance" },
                { label: "Learning", value: "Learning" },
              ]}
            />

            {/* Skill Filter */}
            <DropdownFilters
              label="All Skills"
              value={skillFilter}
              onChange={(val) => {
                setSkillFilter(val);
                setCurrentPage(1);
              }}
              options={[
                { label: "All Skill", value: "All" },
                ...allSkills.map((s) => ({ label: s, value: s })),
              ]}
            />
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {paginatedProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col group"
            >
              {/* Category Badge */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium mb-1.5 ${
                    project.category === "Learning"
                      ? "bg-green-100 text-green-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {project.category}
                </span>
              </div>

              <h2 className="text-base font-semibold text-gray-800">
                {project.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                {project.description}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.skills.slice(0, 3).map((skill, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-1 px-2 py-0.5 text-[11px] bg-blue-50 text-blue-700 rounded-md"
                  >
                    <Tag className="w-3 h-3" />
                    {skill}
                  </span>
                ))}
                {project.skills.length > 3 && (
                  <span className="px-2.5 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                    +{project.skills.length - 3}
                  </span>
                )}
              </div>

              {/* Organizer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-sm text-gray-600">
                    <User className="w-3.5 h-3.5 text-gray-500" />
                  </span>{" "}
                  {project.organizer}
                </div>
                <button
                  onClick={() => {
                    if (project.category === "Freelance") {
                      router.push(
                        `/dashboard/project/${project.realId}/freelance`
                      );
                    } else {
                      router.push(
                        `/dashboard/project/${project.realId}/learning`
                      );
                    }
                  }}
                  className="cursor-pointer px-3.5 py-1.5 text-sm bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] hover:from-blue-700 hover:to-[rgb(2,44,92)] text-white rounded-lg font-medium transition-all shadow-sm hover:shadow"
                >
                  View Detail
                </button>
              </div>
            </div>
          ))}

          {paginatedProjects.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No projects found.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mb-4">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="cursor-pointer px-3 h-8 flex items-center justify-center rounded-full text-sm font-medium border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ‹
            </button>

            {[...Array(totalPages)].map((_, idx) => {
              const pageNum = idx + 1;
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <button
                    key={idx}
                    onClick={() => goToPage(pageNum)}
                    className={`cursor-pointer w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors duration-200 ${
                      currentPage === pageNum
                        ? "bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] text-white shadow-sm"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              } else if (
                pageNum === currentPage - 2 ||
                pageNum === currentPage + 2
              ) {
                return (
                  <span key={idx} className="px-2 text-gray-400">
                    ...
                  </span>
                );
              }
              return null;
            })}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="cursor-pointer px-3 h-8 flex items-center justify-center rounded-full text-sm font-medium border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
