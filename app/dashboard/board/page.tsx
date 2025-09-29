"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { MoreHorizontal, Plus } from "lucide-react";
import { useBoards } from "./hooks/useBoard";
import BoardStats from "./components/BoardStats";
import BoardFilters from "./components/BoardFilters";
import BoardCard from "./components/BoardCard";
import Pagination from "./components/Pagination";
import NewBoardDropdown from "./components/NewBoardDropdown";

export default function BoardPage() {
  const router = useRouter();
  const { boards, loading, deleting, allSkills, handleDelete } = useBoards();

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Apply filters
  const filteredBoards = useMemo(() => {
    return boards.filter((board) => {
      const matchSearch = board.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchSkill = selectedSkill
        ? board.skills.includes(selectedSkill)
        : true;
      const matchStatus = selectedStatus
        ? board.status === selectedStatus
        : true;
      return matchSearch && matchSkill && matchStatus;
    });
  }, [boards, searchQuery, selectedSkill, selectedStatus]);

  // Pagination calc
  const totalPages = Math.ceil(filteredBoards.length / itemsPerPage);
  const paginatedBoards = filteredBoards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100">
      <div className="container mx-auto px-4 pt-8 py-2">
        {/* Header */}
        <div className="mb-3">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-[rgb(2,44,92)] rounded-2xl flex items-center justify-center">
              <MoreHorizontal className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">My Boards</h1>
              <p className="text-gray-600 text-md">
                Manage boards you created.
              </p>
            </div>
          </div>
          <BoardStats boards={boards} />
        </div>

        {/* Action */}
        <NewBoardDropdown />

        {/* Filters */}
        <BoardFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedSkill={selectedSkill}
          setSelectedSkill={setSelectedSkill}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          allSkills={allSkills}
        />

        {/* Board List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedBoards.map((board) => (
            <BoardCard
              key={board.id}
              board={board}
              deleting={deleting}
              onDelete={handleDelete}
            />
          ))}
          {paginatedBoards.length === 0 && (
            <p className="text-gray-500 col-span-full text-center py-10">
              No boards found.
            </p>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
