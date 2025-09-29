"use client";

import { Search } from "lucide-react";
import DropdownFilters from "./DropdownFilters";

export default function BoardFilters({
  searchQuery,
  setSearchQuery,
  selectedSkill,
  setSelectedSkill,
  selectedStatus,
  setSelectedStatus,
  allSkills,
}: {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedSkill: string;
  setSelectedSkill: (s: string) => void;
  selectedStatus: string;
  setSelectedStatus: (s: string) => void;
  allSkills: string[];
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      {/* Search kiri panjang */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search boards..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border bg-white border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
      </div>

      {/* Filters kanan */}
      <div className="flex gap-3 w-full md:w-auto">
        <DropdownFilters
          label="All Skills"
          value={selectedSkill}
          onChange={setSelectedSkill}
          options={[
            { label: "All Skills", value: "" },
            ...allSkills.map((s) => ({ label: s, value: s })),
          ]}
        />

        <DropdownFilters
          label="All Status"
          value={selectedStatus}
          onChange={setSelectedStatus}
          options={[
            { label: "All Status", value: "" },
            { label: "Open", value: "open" },
            { label: "Closed", value: "closed" },
          ]}
        />
      </div>
    </div>
  );
}
