"use client";

import { useState, useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import {
  deleteBoardFreeLance,
  deleteBoardLearning,
  getAllBoardFreeLanceByUserId,
  getAllBoardLearningByuserId,
} from "../../../services/api";

export type BoardFreeLance = {
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

export type BoardLearning = {
  id: number;
  title: string;
  description: string;
  price: number;
  skills: string[];
  status: string;
  startTime: string;
  endTime: string;
  date: string;
  iduser: number;
  users?: { name: string };
};

export type UnifiedBoard = {
  id: string; // format: "freelance-12" / "learning-7"
  category: "Learning" | "Freelance";
  title: string;
  description: string;
  skills: string[];
  status: string;
  organizer: string;
  price: number;

  // freelance specific
  startDate?: string;
  endDate?: string;
  quota?: number;

  // learning specific
  date?: string;
  startTime?: string;
  endTime?: string;
};

export function useBoards() {
  const token = Cookies.get("token") || "";
  const UserId = Cookies.get("userId") || "";

  const [boards, setBoards] = useState<UnifiedBoard[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

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
        price: b.price,
        startDate: b.startDate,
        endDate: b.endDate,
        quota: b.quota,
      }));

      const mappedL: UnifiedBoard[] = dataLearning.map((b) => ({
        id: `learning-${b.id}`,
        category: "Learning",
        title: b.title,
        description: b.description,
        skills: b.skills || [],
        status: b.status,
        organizer: b.users ? b.users.name : `User ${b.iduser}`,
        price: b.price,
        date: b.date,
        startTime: b.startTime,
        endTime: b.endTime,
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

  const showNotification = (message: string, type: "success" | "error") => {
    const notif = document.createElement("div");
    notif.className = `
      fixed top-4 right-4 w-fit min-w-[250px] flex items-center gap-2 
      text-white px-5 py-3 rounded-lg shadow-lg z-50 
      transform translate-x-full opacity-0 transition-all duration-300
      ${type === "success" ? "bg-green-500" : "bg-red-500"}
    `;

    notif.innerHTML = `
      <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        ${
          type === "success"
            ? '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>'
            : '<path fill-rule="evenodd" d="M18 10A8 8 0 11.001 10a8 8 0 0117.998 0zM9 13a1 1 0 102 0V9a1 1 0 10-2 0v4zm1-6a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" clip-rule="evenodd"/>'
        }
      </svg>
      <span>${message}</span>
    `;

    document.body.appendChild(notif);

    // animasi masuk
    requestAnimationFrame(() => {
      notif.classList.remove("translate-x-full", "opacity-0");
      notif.classList.add("translate-x-0", "opacity-100");
    });

    // auto close
    setTimeout(
      () => {
        notif.classList.remove("translate-x-0", "opacity-100");
        notif.classList.add("translate-x-full", "opacity-0");
        setTimeout(() => notif.remove(), 300);
      },
      type === "success" ? 2000 : 2500
    );
  };

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

      fetchBoards();
      showNotification(`"${board.title}" successfully deleted!`, "success");
    } catch (err) {
      console.error("Error delete board:", err);
      showNotification("Failed to delete board!", "error");
    } finally {
      setDeleting(null);
    }
  };

  return { boards, loading, deleting, allSkills, handleDelete };
}
