"use client";

import { useEffect, useState, use } from "react";
import Cookies from "js-cookie";
import { getReplyFreeLanceById } from "../../../../services/api";

interface ReplyDetail {
  id: number;
  subject: string;
  status: string;
  created_at: string;
  idBoardFreeLance: {
    title: string;
    description: string;
  };
  idUserTarget: {
    name: string;
    email: string;
  };
  idUserCreated: {
    name: string;
    email: string;
  };
}

export default function FreelanceReplyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: replyId } = use(params);
  const [reply, setReply] = useState<ReplyDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReply = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) return;

        const data = await getReplyFreeLanceById(Number(replyId), token);
        setReply(data || null);
      } catch (err) {
        console.error("Gagal ambil reply freelance:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReply();
  }, [replyId]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!reply) return <p className="p-6">Reply tidak ditemukan</p>;

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center border-b pb-6 mb-6">
          <h1 className="text-2xl font-bold text-blue-600 mb-2">
            Balasan Lamaran Freelance
          </h1>
          <p className="text-gray-600">
            Surat balasan untuk board{" "}
            <span className="font-semibold">{reply.idBoardFreeLance.title}</span>
          </p>
        </div>

        {/* Isi Balasan */}
        <div className="mb-6 space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Kepada Yth.{" "}
            <span className="font-semibold">{reply.idUserCreated.name}</span>, (
            {reply.idUserCreated.email}) <br />
            <br />
            Dengan hormat, berikut adalah balasan dari lamaran Anda untuk
            proyek:
          </p>

          <div className="bg-gray-50 rounded-lg p-4 space-y-3 border">
            <p>
              <span className="font-medium">Subjek Balasan: </span>
              {reply.subject}
            </p>
            <p>
              <span className="font-medium">Status Lamaran: </span>
              {reply.status === "Accepted" ? (
                <span className="text-green-600 font-semibold">
                  Diterima ✅
                </span>
              ) : (
                <span className="text-red-600 font-semibold">Ditolak ❌</span>
              )}
            </p>
            <p>
              <span className="font-medium">Tanggal Balasan: </span>
              {new Date(reply.created_at).toLocaleString("id-ID", {
                dateStyle: "full",
                timeStyle: "short",
              })}
            </p>
          </div>

          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Detail Proyek
            </h2>
            <p>
              <span className="font-medium">Judul: </span>
              {reply.idBoardFreeLance.title}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {reply.idBoardFreeLance.description}
            </p>
          </div>
        </div>

        {/* Footer info pengirim */}
        <div className="border-t pt-6 mt-6 text-sm text-gray-600">
          <p>
            Balasan ini dikirim oleh{" "}
            <span className="font-semibold">{reply.idUserTarget.name}</span> (
            {reply.idUserTarget.email}).
          </p>
          <p className="mt-2">
            Terima kasih telah melamar, semoga sukses untuk langkah berikutnya.
          </p>
        </div>
      </div>
    </div>
  );
}
