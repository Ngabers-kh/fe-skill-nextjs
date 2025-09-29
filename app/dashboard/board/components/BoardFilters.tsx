"use client";

import { Search, Filter } from "lucide-react";

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
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* Search */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search boards..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border bg-white border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
      </div>

      {/* Skill Filter */}
      <div className="relative">
        <select
          className="appearance-none px-4 py-3 pr-10 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 cursor-pointer"
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
        >
          <option value="">All Skills</option>
          {allSkills.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>
        <Filter className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>

      {/* Status Filter */}
      <div className="relative">
        <select
          className="appearance-none px-4 py-3 pr-10 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 cursor-pointer"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>
    </div>
  );
}
