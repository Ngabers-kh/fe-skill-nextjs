"use client";

import { useEffect, useState, use } from "react";
import Cookies from "js-cookie";
import { getMessageLearningFromById } from "../../../../services/api";

export default function LearningMessageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: messageId} = use(params);

  const [message, setMessage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) return;

        const data = await getMessageLearningFromById(Number(messageId), token);
        setMessage(data);
      } catch (err) {
        console.error("Gagal ambil pesan learning:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessage();
  }, [messageId]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!message) return <p className="p-6">Pesan tidak ditemukan</p>;

  // Helper untuk format rupiah
  const formatRupiah = (num: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      {/* Judul & Deskripsi Board */}
      <h1 className="text-2xl font-bold mb-2">{message.boardTitle}</h1>
      <p className="text-gray-600 mb-6">{message.boardDescription}</p>

      {/* Detail Card */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <p>
          <span className="font-semibold">Organizer:</span>{" "}
          {message.organizer}
        </p>
        <p>
          <span className="font-semibold">Payment:</span>{" "}
          {message.paymentStatus} - {formatRupiah(message.totalAmount)}
        </p>
        <p>
          <span className="font-semibold">Tanggal:</span>{" "}
          {new Date(message.created_at).toLocaleString("id-ID", {
            dateStyle: "full",
            timeStyle: "short",
          })}
        </p>

        {/* Link materi */}
        {message.link && (
          <div className="pt-4 border-t">
            <p className="font-semibold mb-1">Link Materi:</p>
            <a
              href={message.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-words"
            >
              {message.link}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
