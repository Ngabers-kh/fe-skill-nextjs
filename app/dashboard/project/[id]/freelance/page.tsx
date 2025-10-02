"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  getBoardFreeLanceById,
  getBoardFreeLanceSkills,
  createApplicationFreeLance,
  checkApplyBoardFreeLance,
} from "../../../../services/api";

interface Skill {
  idSkill: number;
  nameSkill: string;
}

interface BoardFreeLance {
  id: number;
  title: string;
  description: string;
  price: number;
  quota: number;
  startDate: string;
  endDate: string;
  status: string;
  idUser: number;
  users?: { name: string };
}

export default function ProjectFreeLanceDetailPage() {
  const router = useRouter();
  const params = useParams();
  const boardId = Number(params.id);

  const token = Cookies.get("token") || "";
  const idUser = Number(Cookies.get("userId") || "");

  const [project, setProject] = useState<BoardFreeLance | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  // state modal
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ambil data detail board
  useEffect(() => {
    async function fetchData() {
      try {
        if (!boardId || !token) throw new Error("Token/ID tidak ditemukan");

        const [boardData, boardSkills] = await Promise.all([
          getBoardFreeLanceById(boardId, token),
          getBoardFreeLanceSkills(boardId, token),
        ]);

        setProject(boardData);
        setSkills(boardSkills);
      } catch (err) {
        console.error("Gagal ambil detail project:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [boardId, token]);

  // handle apply
  const handleApply = async () => {
    try {
      setSubmitting(true);

      // 1. cek apakah sudah daftar
      const check = await checkApplyBoardFreeLance(
        { idUser, idBoardFreeLance: boardId },
        token
      );

      if (check.alreadyExist || check === true) {
        alert("Anda sudah terdaftar pada freelance ini.");
        return;
      }

      // 2. kalau belum, buat aplikasi baru
      await createApplicationFreeLance(
        {
          idUser,
          idBoardFreeLance: boardId,
          idUserCreated: project?.idUser || 0,
          subject,
          message,
        },
        token
      );

      alert("Berhasil daftar freelance!");
      router.push("/dashboard/project");
    } catch (err) {
      console.error("Gagal apply freelance:", err);
      alert("Gagal apply freelance");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!project) return <p className="p-6">Project not found</p>;

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <button
        onClick={() => router.push("/dashboard/project")}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back to Projects
      </button>

      <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          {project.title}
        </h1>
        <p className="text-gray-600 mb-6">{project.description}</p>

        {/* Info detail */}
        <div className="space-y-3 mb-6">
          <p>
            <span className="font-semibold text-gray-700">Category:</span> FreeLance
          </p>
          <p>
            <span className="font-semibold text-gray-700">Organizer:</span>{" "}
            {project.users ? project.users.name : `User ${project.idUser}`}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Quota:</span>{" "}
            {project.quota}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Date:</span>{" "}
            {project.startDate} - {project.endDate}
          </p>

          <div>
            <span className="font-semibold text-gray-700">Skills:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <span
                    key={skill.idSkill}
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                  >
                    {skill.nameSkill}
                  </span>
                ))
              ) : (
                <span className="text-gray-500 text-sm">No skills</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
        >
          Start FreeLance
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Apply Freelance</h2>

            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full mb-3 px-3 py-2 border rounded-lg"
            />

            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full mb-3 px-3 py-2 border rounded-lg"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                disabled={submitting}
                className={`px-4 py-2 rounded-lg text-white ${
                  submitting
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {submitting ? "Submitting..." : "Apply"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
