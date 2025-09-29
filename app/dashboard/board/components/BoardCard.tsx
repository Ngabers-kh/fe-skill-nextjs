"use client";

import { Trash2, User, Tag } from "lucide-react";
import { UnifiedBoard } from "../hooks/useBoard";

export default function BoardCard({
  board,
  deleting,
  onDelete,
}: {
  board: UnifiedBoard;
  deleting: string | null;
  onDelete: (board: UnifiedBoard) => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <span
            className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium mb-1.5 ${
              board.category === "Learning"
                ? "bg-green-100 text-green-800"
                : "bg-purple-100 text-purple-800"
            }`}
          >
            {board.category}
          </span>
          <h3 className="text-base font-semibold text-gray-800">
            {board.title}
          </h3>
        </div>
        <button
          onClick={() => onDelete(board)}
          disabled={deleting === board.id}
          className="p-1.5 rounded-md hover:bg-red-50 text-red-500 disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <p className="text-gray-600 text-sm mt-1.5 line-clamp-2">
        {board.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-2">
        {board.skills.map((skill) => (
          <span
            key={skill}
            className="flex items-center gap-1 px-2 py-0.5 text-[11px] bg-blue-50 text-blue-700 rounded-md"
          >
            <Tag className="w-3 h-3" />
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <User className="w-3.5 h-3.5" />
          {board.organizer}
        </div>
        <span
          className={`px-2.5 py-0.5 text-[11px] font-medium rounded-full ${
            board.status === "open"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {board.status}
        </span>
      </div>
    </div>
  );
}
