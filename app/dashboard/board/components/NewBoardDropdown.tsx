"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

export default function NewBoardDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="relative inline-block text-left mb-3">
      <div>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm rounded-lg font-medium bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] text-white hover:opacity-90"
        >
          <Plus className="w-4 h-4" /> New Board
        </button>
      </div>

      {dropdownOpen && (
        <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black/5 z-10">
          <div className="py-1">
            <button
              onClick={() => {
                setDropdownOpen(false);
                router.push("/dashboard/board/add?type=freelance");
              }}
              className="cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              New Board Freelance
            </button>
            <button
              onClick={() => {
                setDropdownOpen(false);
                router.push("/dashboard/board/add?type=learning");
              }}
              className="cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              New Board Learning
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
