"use client";

import { useEffect, useState, use } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { getMessageLearningFromById } from "../../../../services/api";

// Interface untuk detail pesan Learning
interface MessageLearningDetail {
  id: number;
  totalAmount: number;
  paymentStatus: string;
  created_at: string;
  boardTitle: string;
  boardDescription: string;
  link?: string | null;
  date: string;
  startTime: string;
  endTime: string;
  organizer: string;
}

export default function LearningMessageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: messageId } = use(params);

  const [message, setMessage] = useState<MessageLearningDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) return;

        const data = await getMessageLearningFromById(Number(messageId), token);

        // pastikan kalau API return array, ambil index 0
        const detail: MessageLearningDetail = Array.isArray(data)
          ? data[0]
          : data;

        setMessage(detail);
        console.log("Detail pesan learning:", detail);
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

  // Format Rupiah
  const formatRupiah = (num: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);

  // Format Jam (biar HH:mm aja)
  const formatTime = (time: string) => (time ? time.slice(0, 5) : "");

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        {/* Tombol Back */}
        <div className="mb-6">
          <Link
            href="/dashboard/inbox"
            className="inline-block text-sm text-blue-600 hover:underline"
          >
            ← Kembali ke Inbox
          </Link>
        </div>

        {/* Header Ucapan Terima Kasih */}
        <div className="text-center border-b pb-6 mb-6">
          <h1 className="text-3xl font-bold text-green-600 mb-2">
            Terima Kasih
          </h1>
          <p className="text-gray-600">
            Anda berhasil mendaftar di kelas{" "}
            <span className="font-semibold">{message.boardTitle}</span>.  
            Mari belajar bersama dan tingkatkan skill Anda
          </p>
        </div>

        {/* Detail Pembayaran */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Detail Pembayaran
          </h2>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <p>
              <span className="font-medium">Status: </span>
              <span
                className={
                  message.paymentStatus === "Success"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {message.paymentStatus}
              </span>
            </p>
            <p>
              <span className="font-medium">Total: </span>
              {formatRupiah(message.totalAmount)}
            </p>
            <p>
              <span className="font-medium">Tanggal Transaksi: </span>
              {new Date(message.created_at).toLocaleString("id-ID", {
                dateStyle: "full",
                timeStyle: "short",
              })}
            </p>
          </div>
        </div>

        {/* Detail Kelas */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Detail Kelas
          </h2>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <p>
              <span className="font-medium">Judul: </span>
              {message.boardTitle}
            </p>
            <p>
              <span className="font-medium">Deskripsi: </span>
              {message.boardDescription}
            </p>
            <p>
              <span className="font-medium">Tanggal Kelas: </span>
              {new Date(message.date).toLocaleDateString("id-ID", {
                dateStyle: "full",
              })}
            </p>
            <p>
              <span className="font-medium">Waktu: </span>
              {formatTime(message.startTime)} - {formatTime(message.endTime)} WIB
            </p>
            <p>
              <span className="font-medium">Organizer: </span>
              {message.organizer}
            </p>
          </div>
        </div>

        {/* Link Materi */}
        {message.link && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Link Pertemuan
            </h2>
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

        {/* Footer Ucapan */}
        <div className="text-center border-t pt-6">
          <p className="text-gray-700 font-medium">
            Selamat belajar Semoga sukses dan ilmunya bermanfaat!
          </p>
        </div>
      </div>
    </div>
  );
}
