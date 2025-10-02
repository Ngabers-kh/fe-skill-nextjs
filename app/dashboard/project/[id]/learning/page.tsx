"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  getBoardLearningById,
  getBoardLearningSkills,
  getUser,
  createApplicationLearning,
  checkApplyBoardLearning,
} from "../../../../services/api";
import {
  ArrowLeft,
  User,
  Tag,
  Calendar,
  Clock,
  CreditCard,
  CheckCircle,
} from "lucide-react";

interface Skill {
  idSkill: number;
  nameSkill: string;
}

interface user {
  name: string;
  email: string;
}

interface BoardLearning {
  id: number;
  title: string;
  description: string;
  price: number;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  iduser: number;
  users?: { name: string };
}

export default function ProjectLearningDetailPage() {
  const router = useRouter();
  const params = useParams();
  const boardId = Number(params.id);

  const token = Cookies.get("token") || "";
  const idUser = Cookies.get("userId") || "";

  const [project, setProject] = useState<BoardLearning | null>(null);
  const [user, setUser] = useState<user | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  // === Load Snap.js Midtrans ===
  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_CLIENT || "";
    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // === Fetch data project + skills ===
  useEffect(() => {
    async function fetchData() {
      try {
        if (!boardId || !token) throw new Error("Token/ID tidak ditemukan");

        const [boardData, boardSkills, user] = await Promise.all([
          getBoardLearningById(boardId, token),
          getBoardLearningSkills(boardId, token),
          getUser(Number(idUser), token),
        ]);

        setProject(boardData);
        setSkills(boardSkills);
        setUser(user);
      } catch (err) {
        console.error("Gagal ambil detail project:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [boardId, token]);

  // === Cek apakah sudah daftar ===
  useEffect(() => {
    async function checkApplication() {
      try {
        if (!idUser || !boardId) return;

        const result = await checkApplyBoardLearning(
          {
            idUser: Number(idUser),
            idBoardLearning: boardId,
          },
          token
        );

        if (result.alreadyExist === true || result === true) {
          setAlreadyApplied(true);
        }
      } catch (err) {
        console.error("Gagal cek aplikasi:", err);
      }
    }

    checkApplication();
  }, [idUser, boardId, token]);

  if (loading)
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading project details...</p>
      </div>
    );

  if (!project)
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-semibold">Project not found</p>
      </div>
    );

  // === Checkout ke Midtrans ===
  const checkOut = async () => {
    try {
      const response = await fetch("/api/tokenizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: project.id,
          productName: project.title,
          price: project.price,
          quantity: 1,
          qusName: user?.name,
          qusEmail: user?.email,
        }),
      });

      const { token: snapToken } = await response.json();

      if (!snapToken) {
        alert("Gagal mendapatkan token Midtrans");
        return;
      }

      window.snap.pay(snapToken, {
        onSuccess: async (result) => {
          try {
            await createApplicationLearning(
              {
                idUser: Number(idUser),
                idBoardLearning: project.id,
                idTransaction: result.transaction_id,
                totalAmount: Number(result.gross_amount),
              },
              token
            );
            alert("Pembayaran berhasil & tersimpan ke Board Learning!");
            router.push("/dashboard/project");
          } catch (err) {
            console.error("Gagal simpan aplikasi:", err);
            alert("Pembayaran berhasil, tapi gagal simpan ke Board Learning.");
          }
        },
        onPending: (result) => {
          console.log("Pending:", result);
          alert("Pembayaran masih pending, silakan selesaikan.");
        },
        onError: (result) => {
          console.error("Error:", result);
          alert("Pembayaran gagal!");
        },
        onClose: () => {
          alert("Kamu menutup popup tanpa menyelesaikan pembayaran.");
        },
      });
    } catch (err) {
      console.error("Checkout gagal:", err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push("/dashboard/project")}
          className="flex items-center gap-2 mb-6 text-gray-700 hover:text-blue-600 font-medium transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </button>

        <div className="max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] p-8 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="px-4 py-1.5 text-sm font-semibold rounded-full bg-white/20 backdrop-blur-sm">
                    Learning
                  </span>
                  <span className="ml-3 px-3 py-1 text-xs font-medium rounded-full bg-white text-blue-700">
                    {project.status}
                  </span>
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-3">{project.title}</h1>
              <p className="text-blue-50 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Organizer */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <User className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Organizer</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {project.users
                        ? project.users.name
                        : `User ${project.iduser}`}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <CreditCard className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="text-lg font-semibold text-gray-800">
                      Rp {project.price?.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <Calendar className="w-6 h-6 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {project.date}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <Clock className="w-6 h-6 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {project.startTime} - {project.endTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Tag className="w-5 h-5 text-yellow-600" />
                  <h2 className="text-xl font-bold text-gray-800">
                    Skills You'll Learn
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {skills.length > 0 ? (
                    skills.map((skill) => (
                      <span
                        key={skill.idSkill}
                        className="px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg text-sm font-medium border border-yellow-200"
                      >
                        {skill.nameSkill}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">No skills</span>
                  )}
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-gray-200">
                {alreadyApplied ? (
                  <div className="flex items-center justify-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-700 font-semibold">
                      You're already registered for this learning session
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Total Payment
                      </p>
                      <p className="text-2xl font-bold text-gray-800">
                        Rp {project.price?.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <button
                      onClick={checkOut}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] hover:from-blue-700 hover:to-[rgb(2,44,92)] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
                    >
                      Checkout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
