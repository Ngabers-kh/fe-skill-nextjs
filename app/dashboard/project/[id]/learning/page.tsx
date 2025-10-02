"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  getBoardLearningById,
  getBoardLearningSkills,
  getUser,
  createApplicationLearning,
  checkApplyBoardLearning
} from "../../../../services/api";
import { data } from "framer-motion/client";

interface Skill {
  idSkill: number;
  nameSkill: string;
}

interface user {
  name: string,
  email: string,
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

  if (loading) return <p className="p-6">Loading...</p>;
  if (!project) return <p className="p-6">Project not found</p>;

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
          console.log("Success:", result);

          try {
            // Panggil API simpan ke boardLearningApplications
            await createApplicationLearning(
              {
                idUser: Number(idUser),
                idBoardLearning: project.id,
                idTransaction: result.transaction_id, // ambil dari Midtrans
                totalAmount: Number(result.gross_amount), // nominal bayar
              },
              token
            );

            console.log(data);

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
            <span className="font-semibold text-gray-700">Category:</span>{" "}
            Learning
          </p>
          <p>
            <span className="font-semibold text-gray-700">Organizer:</span>{" "}
            {project.users ? project.users.name : `User ${project.iduser}`}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Date:</span>{" "}
            {project.date}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Time:</span>{" "}
            {project.startTime} - {project.endTime}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Price:</span>{" "}
            Rp {project.price?.toLocaleString("id-ID")}
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

        {/* Action Button → Checkout */}
        {alreadyApplied ? (
          <p className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium text-center">
            Anda sudah terdaftar pada learning ini
          </p>
        ) : (
          <button
            onClick={checkOut}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
          >
            Checkout
          </button>
        )}

      </div>
    </div>
  );
}
