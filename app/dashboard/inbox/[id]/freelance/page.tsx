"use client";

import { useEffect, useState, use } from "react";
import Cookies from "js-cookie";
import {
  getMessageFreeLanceFromById,
  updateBoardFeedBack,
} from "../../../../services/api";
import { useRouter } from "next/navigation";

// Interface detail Freelance message
interface MessageFreeLanceDetail {
  id: number;
  subject: string;
  message: string;
  created_at: string;
  status: string;
  boardTitle: string;
  idUserTarget?: number;
  idBoardFreeLance?: number;
  organizer?: string;
}

export default function FreelanceMessageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: messageId } = use(params);
  const router = useRouter();

  const [message, setMessage] = useState<MessageFreeLanceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const idUser = Number(Cookies.get("userId"));
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        if (!idUser || !token) return;
        const data = await getMessageFreeLanceFromById(
          Number(messageId),
          token
        );
        console.log(data);
        const detail: MessageFreeLanceDetail = Array.isArray(data)
          ? data[0]
          : data;
        setMessage(detail || null);

      } catch (err) {
        console.error("Gagal ambil pesan freelance:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessage();
  }, [messageId]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!message) return <p className="p-6">Pesan tidak ditemukan</p>;

  // Handler update feedback
  const handleFeedback = async (status: "Accepted" | "Rejected") => {
    try {
      setSubmitting(true);
      const token = Cookies.get("token");
      if (!token) return;

      await updateBoardFeedBack(
        {
          id: message.id,
          idUserCreated: idUser,
          idBoardFreeLance: message.idBoardFreeLance!,
          idUserTarget: message.idUserTarget!,
          status,
          subject:
            status === "Accepted"
              ? "Selamat, lamaran kamu diterima!"
              : "Mohon maaf, lamaran kamu ditolak.",
        },
        token
      );

      alert(`Lamaran berhasil di-${status}`);
      router.push("/dashboard/inbox");
    } catch (err) {
      console.error("Gagal update feedback:", err);
      alert("Gagal mengirim feedback");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center border-b pb-6 mb-6">
          <h1 className="text-2xl font-bold text-blue-600 mb-2">
            Detail Surat Lamaran
          </h1>
          <p className="text-gray-600">
            Dikirim untuk board{" "}
            <span className="font-semibold">{message.boardTitle}</span>
          </p>
        </div>

        {/* Isi Surat */}
        <div className="mb-6 space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Kepada Yth. <span className="font-semibold">Organizer</span>, <br />
            <br />
            Dengan hormat, saya mengajukan lamaran freelance untuk board{" "}
            <span className="font-semibold">{message.boardTitle}</span>.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 space-y-3 border">
            <p>
              <span className="font-medium">Subjek: </span>
              {message.subject}
            </p>
            <p className="whitespace-pre-line">
              <span className="font-medium">Isi Lamaran: </span>
              {message.message}
            </p>
            <p>
              <span className="font-medium">Dikirim pada: </span>
              {new Date(message.created_at).toLocaleString("id-ID", {
                dateStyle: "full",
                timeStyle: "short",
              })}
            </p>
            {message.organizer && (
              <p>
                <span className="font-medium">Organizer: </span>
                {message.organizer}
              </p>
            )}
          </div>
        </div>

        {/* Status Feedback */}
        {message.status !== "pending" ? (
          <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-200 text-center">
            <p className="font-medium text-blue-700">
              Pesan ini sudah dibalas:{" "}
              {message.status === "Accepted" ? (
                <span className="text-green-600">Lamaran Diterima ✅</span>
              ) : (
                <span className="text-red-600">Lamaran Ditolak ❌</span>
              )}
            </p>
          </div>
        ) : (
          <div className="flex justify-between items-center border-t pt-6">
            <button
              disabled={submitting}
              onClick={() => handleFeedback("Rejected")}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
            >
              Tolak
            </button>
            <button
              disabled={submitting}
              onClick={() => handleFeedback("Accepted")}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
            >
              Terima
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
