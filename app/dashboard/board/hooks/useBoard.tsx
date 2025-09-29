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
  startDate: string;
  endDate: string;
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

  const allSkills = useMemo(
    () => Array.from(new Set(boards.flatMap((b) => b.skills))),
    [boards]
  );

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
    } catch (err) {
      console.error("Error delete board:", err);
      alert("Failed to delete board. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  return { boards, loading, deleting, allSkills, handleDelete };
}
