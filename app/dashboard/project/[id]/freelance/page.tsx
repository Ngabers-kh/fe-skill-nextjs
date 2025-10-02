"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  ArrowLeft,
  User,
  Tag,
  Calendar,
  Users,
  X,
  Send,
  CreditCard,
} from "lucide-react";
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

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-[rgb(2,44,92)] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">
            Loading project freelance details...
          </p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Project Freelaance Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The project freelance you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.push("/dashboard/project")}
            className="cursor-pointer flex items-center gap-2 mb-6 px-4 py-2 rounded-xl 
             text-gray-700 hover:text-white hover:bg-gradient-to-r 
             hover:from-blue-600 hover:to-[rgb(2,44,92)] font-medium 
             transition-all duration-300 shadow-sm hover:shadow-md group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm">Back to Projects</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push("/dashboard/project")}
          className="cursor-pointer flex items-center gap-2 mb-6 px-4 py-2 rounded-xl 
             text-gray-700 hover:text-white hover:bg-gradient-to-r 
             hover:from-blue-600 hover:to-[rgb(2,44,92)] font-medium 
             transition-all duration-300 shadow-sm hover:shadow-md group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm">Back to Projects</span>
        </button>

        <div className="max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] p-8 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="px-4 py-1.5 text-sm font-semibold rounded-full bg-white/20 backdrop-blur-sm">
                    Freelance
                  </span>
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-3">{project.title}</h1>
              <p className="text-blue-50 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Content Section */}
            <div className="p-8">
              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Organizer */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Organizer</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {project.users
                        ? project.users.name
                        : `User ${project.idUser}`}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Paid</p>
                    <p className="text-lg font-semibold text-gray-800">
                      Rp {project.price?.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>

                {/* Date Range */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Project Duration
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {formatDate(project.startDate!)} -{" "}
                      {formatDate(project.endDate!)}
                    </p>
                  </div>
                </div>

                {/* Quota */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Available Quota
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {project.quota} positions
                    </p>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 md:col-span-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Tag className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xl font-bold text-gray-600 mb-2">
                      Required Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {skills.length > 0 ? (
                        skills.map((skill) => (
                          <span
                            key={skill.idSkill}
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200"
                          >
                            {skill.nameSkill}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500 text-sm">
                          No skills required
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Ready to start working?
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="cursor-pointer px-8 py-3 bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] hover:from-blue-700 hover:to-blue-800 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-[rgb(2,44,92)] rounded-full flex items-center justify-center">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-sm font-semibold text-gray-800">
                  Apply for Freelance
                </h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6 cursor-pointer " />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g., Web Development Specialist"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Tell us why you're a great fit for this project..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <button
                onClick={() => setShowModal(false)}
                className="cursor-pointer px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                disabled={submitting || !subject.trim() || !message.trim()}
                className={`cursor-pointer px-6 py-2.5 rounded-lg text-white font-medium transition-all disabled:cursor-not-allowed ${
                  submitting || !subject.trim() || !message.trim()
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg"
                }`}
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </span>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const formatDate = (dateStr: string) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr));
