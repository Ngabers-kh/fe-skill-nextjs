"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import {
  deleteBoardFreeLance,
  deleteBoardLearning,
  getAllBoardFreeLanceByUserId,
  getAllBoardLearningByuserId,
} from "../../services/api";
import {
  Plus,
  Filter,
  Search,
  Calendar,
  User,
  Edit3,
  Trash2,
  Eye,
  BookOpen,
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

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
  startDate: string;
  endDate: string;
  date: string;
  iduser: number;
  users?: { name: string };
};

type UnifiedBoard = {
  id: string; // format: "freelance-12" / "learning-7"
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
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const token = Cookies.get("token") || "";
  const UserId = Cookies.get("userId") || "";
  const [boards, setBoards] = useState<UnifiedBoard[]>([]);

  const fetchBoards = async () => {
    setLoading(true);
    try {
      const dataFreeLance: BoardFreeLance[] =
        await getAllBoardFreeLanceByUserId(Number(UserId), token);
      const dataLearning: BoardLearning[] = await getAllBoardLearningByuserId(
        Number(UserId),
        token
      );

      const mappedFL: UnifiedBoard[] = dataFreeLance.map((b) => ({
        id: `freelance-${b.id}`,
        category: "Freelance",
        title: b.title,
        description: b.description,
        skills: b.skills || [],
        status: b.status,
        organizer: b.users ? b.users.name : `User ${b.iduser}`,
      }));

      const mappedL: UnifiedBoard[] = dataLearning.map((b) => ({
        id: `learning-${b.id}`,
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

  // Ambil semua unique skills
  const allSkills = useMemo(
    () => Array.from(new Set(boards.flatMap((b) => b.skills))),
    [boards]
  );

  // Filter dengan search
  const filteredProjects = boards.filter((b) => {
    const categoryMatch =
      categoryFilter === "All" || b.category === categoryFilter;
    const skillMatch = skillFilter === "All" || b.skills.includes(skillFilter);
    const searchMatch =
      searchQuery === "" ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.organizer.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && skillMatch && searchMatch;
  });

  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Delete handler
  const handleDelete = async (board: UnifiedBoard) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${board.title}"?`
    );
    if (!confirmDelete) return;

    setDeleting(board.id);
    try {
      const [prefix, rawId] = board.id.split("-");
      const realId = Number(rawId);

      if (prefix === "freelance") {
        await deleteBoardFreeLance(realId, token);
      } else {
        await deleteBoardLearning(realId, token);
      }

      // Success notification
      const notification = document.createElement("div");
      notification.className =
        "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-transform duration-300";
      notification.innerHTML = `
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          Board deleted successfully!
        </div>
      `;
      document.body.appendChild(notification);

      setTimeout(() => notification.remove(), 3000);

      fetchBoards();
    } catch (err) {
      console.error("Error delete board:", err);
      alert("Failed to delete board. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "closed":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800 border-green-200";
      case "closed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[rgb(2,44,92)] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium text-lg">
            Loading your boards...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100">
      <div className="container mx-auto px-4 pt-8 py-2">
        {/* Header Section */}
        <div className="mb-3">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-[rgb(2,44,92)] rounded-2xl flex items-center justify-center">
              <MoreHorizontal className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">My Boards</h1>
              <p className="text-gray-600 text-lg">
                Manage boards you created.
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <MoreHorizontal className="w-6 h-6 text-[rgb(2,44,92)]" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    Total Boards
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {boards.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[rgb(2,44,92)]" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Learning</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {boards.filter((b) => b.category === "Learning").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-[rgb(2,44,92)]" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Freelance</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {boards.filter((b) => b.category === "Freelance").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[rgb(2,44,92)]" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Open</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {boards.filter((b) => b.status === "open").length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-3">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search boards, descriptions..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 text-gray-700"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 text-gray-700 bg-white appearance-none cursor-pointer min-w-[160px]"
                >
                  <option value="All">All Categories</option>
                  <option value="Learning">Learning</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>

              {/* Skills Filter */}
              <select
                value={skillFilter}
                onChange={(e) => {
                  setSkillFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 focus:outline-none transition-all duration-200 text-gray-700 bg-white cursor-pointer min-w-[160px]"
              >
                <option value="All">All Skills</option>
                {allSkills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>

            {/* Add Board Button */}
            <button
              onClick={() => router.push("/dashboard/board/add")}
              className="cursor-pointer flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] text-white rounded-xl font-semibold hover:from-[rgb(2,44,92)] hover:to-blue-600 transform hover:scale-105 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Create New Board
            </button>
          </div>
        </div>

        {/* Boards Grid */}
        {paginatedProjects.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MoreHorizontal className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              No boards found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || categoryFilter !== "All" || skillFilter !== "All"
                ? "Try adjusting your filters or search terms"
                : "Create your first board to get started"}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
            {paginatedProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl border border-gray-200 hover:shadow-sm transition-all duration-300 overflow-hidden group flex flex-col h-full"
              >
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    {/* Kiri: Icon + Category */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-100">
                        {project.category === "Learning" ? (
                          <BookOpen className="w-5 h-5 text-[rgb(2,44,92)]" />
                        ) : (
                          <Briefcase className="w-5 h-5 text-[rgb(2,44,92)]" />
                        )}
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-[rgb(2,44,92)]">
                        {project.category}
                      </span>
                    </div>

                    {/* Kanan: Status */}
                    <div
                      className={`flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {getStatusIcon(project.status)}
                      {project.status}
                    </div>
                  </div>

                  <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors">
                    {project.title}
                  </h2>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-full border border-blue-200 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {project.skills.length > 3 && (
                      <span className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full font-medium">
                        +{project.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 bg-gray-50 flex items-center justify-between mt-auto">
                  <button
                    onClick={() => console.log("View details for:", project.id)}
                    className="cursor-pointer flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 text-sm font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const [prefix, rawId] = project.id.split("-");
                        if (prefix === "freelance") {
                          router.push(
                            `/dashboard/board/${rawId}/edit/freelance`
                          );
                        } else {
                          router.push(
                            `/dashboard/board/${rawId}/edit/learning`
                          );
                        }
                      }}
                      className="cursor-pointer flex items-center gap-1 px-3 py-2 text-orange-600 hover:text-white hover:bg-orange-500 rounded-lg transition-all duration-200 text-sm font-medium"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(project)}
                      disabled={deleting === project.id}
                      className={`cursor-pointer flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                        deleting === project.id
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-red-600 hover:text-white hover:bg-red-500"
                      }`}
                    >
                      {deleting === project.id ? (
                        <>
                          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="rounded-2xl p-6 ">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Page Info */}
              <div className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold">
                  {Math.min(
                    currentPage * itemsPerPage,
                    filteredProjects.length
                  )}
                </span>{" "}
                of{" "}
                <span className="font-semibold">{filteredProjects.length}</span>{" "}
                results
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="cursor-pointer flex items-center gap-1 px-4 py-2 rounded-xl text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, idx) => {
                    const pageNum = idx + 1;
                    const isCurrentPage = currentPage === pageNum;

                    // Show first page, last page, current page, and pages around current page
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={idx}
                          onClick={() => goToPage(pageNum)}
                          className={`cursor-pointer w-10 h-10 rounded-xl font-semibold transition-all duration-200 ${
                            isCurrentPage
                              ? "text-blue-600 hover:text-blue-400"
                              : "text-gray-600 hover:text-blue-400"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    } else if (
                      (pageNum === currentPage - 2 && currentPage > 3) ||
                      (pageNum === currentPage + 2 &&
                        currentPage < totalPages - 2)
                    ) {
                      return (
                        <span key={idx} className="px-2 text-gray-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="cursor-pointer flex items-center gap-1 px-4 py-2rounded-xl text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
