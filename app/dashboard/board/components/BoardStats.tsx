"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  BookOpen,
  Briefcase,
  Clock,
  ChevronDown,
} from "lucide-react";
import { UnifiedBoard } from "../hooks/useBoard";
import { JSX } from "react";

export default function BoardStats({ boards }: { boards: UnifiedBoard[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-3">
      {/* Header untuk mobile */}
      <div
        className="flex md:hidden items-center justify-between px-4 py-2 bg-white rounded-xl border cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="font-medium text-gray-700">Board Stats</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Stats */}
      <div
        className={`grid grid-cols-1 md:grid-cols-4 gap-3 transition-all duration-300 overflow-hidden ${
          open ? "max-h-[1000px] mt-3" : "max-h-0 md:max-h-full"
        }`}
      >
        <StatCard
          icon={<MoreHorizontal className="w-5 h-5 text-[rgb(2,44,92)]" />}
          label="Total Boards"
          value={boards.length}
        />
        <StatCard
          icon={<BookOpen className="w-5 h-5 text-[rgb(2,44,92)]" />}
          label="Learning"
          value={boards.filter((b) => b.category === "Learning").length}
        />
        <StatCard
          icon={<Briefcase className="w-5 h-5 text-[rgb(2,44,92)]" />}
          label="Freelance"
          value={boards.filter((b) => b.category === "Freelance").length}
        />
        <StatCard
          icon={<Clock className="w-5 h-5 text-[rgb(2,44,92)]" />}
          label="Open"
          value={boards.filter((b) => b.status === "open").length}
        />
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: JSX.Element;
  label: string;
  value: number;
}) {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-gray-500 text-xs font-medium">{label}</p>
          <p className="text-lg font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
}
