"use client";

import {
  Trash2,
  User,
  Tag,
  Pencil,
  DollarSign,
  Calendar,
  Users,
  Clock,
} from "lucide-react";
import { UnifiedBoard } from "../hooks/useBoard";

export default function BoardCard({
  board,
  deleting,
  onDelete,
  onEdit,
}: {
  board: UnifiedBoard;
  deleting: string | null;
  onDelete: (board: UnifiedBoard) => void;
  onEdit: (board: UnifiedBoard) => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition flex flex-col">
      {/* Header */}
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

        <div className="flex items-center gap-1">
          {/* Tombol Edit */}
          <button
            onClick={() => onEdit(board)}
            className="cursor-pointer p-1.5 rounded-md hover:bg-blue-50 text-blue-500"
          >
            <Pencil className="w-4 h-4" />
          </button>

          {/* Tombol Delete */}
          <button
            onClick={() => onDelete(board)}
            disabled={deleting === board.id}
            className="cursor-pointer p-1.5 rounded-md hover:bg-red-50 text-red-500 disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Deskripsi */}
      <p className="text-gray-600 text-sm mt-1.5 line-clamp-2 flex-grow">
        {board.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-2">
        {" "}
        {board.skills.map((skill) => (
          <span
            key={skill}
            className="flex items-center gap-1 px-2 py-0.5 text-[11px] bg-blue-50 text-blue-700 rounded-md"
          >
            {" "}
            <Tag className="w-3 h-3" /> {skill}{" "}
          </span>
        ))}{" "}
      </div>

      {/* Info Section */}
      <div className="mt-3 relative">
        <div className="space-y-1 text-xs text-gray-600 pr-20">
          {board.category === "Freelance" ? (
            <>
              <div className="flex items-center gap-1">
                <span>{formatRupiah(board.price)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gray-500" />
                <span>
                  {formatDate(board.startDate!)} - {formatDate(board.endDate!)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-gray-500" />
                <span>{board.quota} quota</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1">
                <span>{formatRupiah(board.price)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gray-500" />
                <span>{formatDate(board.date!)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                <span>
                  {formatTime(board.startTime!)} - {formatTime(board.endTime!)}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Status Badge di pojok kanan */}
        <span
          className={`absolute bottom-0 right-0 px-2.5 py-0.5 text-[11px] font-medium rounded-full ${
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

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

const formatDate = (dateStr: string) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr));

const formatTime = (timeStr: string) => {
  if (!timeStr) return "";
  const [hour, minute] = timeStr.split(":");
  return `${hour}:${minute} WIB`;
};
