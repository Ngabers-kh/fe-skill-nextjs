"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  getMessageFreeLanceFromApply,
  getMessageLearningFromApply,
  getAllReplyFreeLanceByUser,
} from "../../services/api"; // ganti sesuai path kamu

interface Message {
  id: number;
  subject?: string | null;
  message?: string | null;
  status?: string | null;
  created_at: string;
  boardTitle?: string;
  boardDescription?: string;
  organizer?: string;
  totalAmount?: number;
  paymentStatus?: string;
  link?: string;
  category: "Freelance" | "Learning" | "Reply";
}

export default function InboxPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const idUser = Number(Cookies.get("userId"));
        const token = Cookies.get("token");

        if (!idUser || !token) {
          console.error("idUser atau token tidak ada di cookies");
          setLoading(false);
          return;
        }

        // ambil semua data
        const freelance = await getMessageFreeLanceFromApply(idUser, token);
        const learning = await getMessageLearningFromApply(idUser, token);
        const replies = await getAllReplyFreeLanceByUser(idUser, token);

        // mapping freelance
        const freelanceMapped: Message[] = freelance.map((f: any) => ({
          ...f,
          category: "Freelance",
        }));

        // mapping learning
        const learningMapped: Message[] = learning.map((l: any) => ({
          ...l,
          subject: "Materi / Link Belajar",
          message: l.link,
          category: "Learning",
        }));

        // mapping replies (jawaban Accepted/Rejected)
        const replyMapped: Message[] = replies.map((r: any) => ({
          id: r.id,
          subject: r.subject,
          status: r.status,
          created_at: r.created_at,
          boardTitle: "Balasan Lamaran Freelance",
          organizer: "System",
          category: "Reply",
        }));

        // gabung semua + sort by created_at terbaru
        const allMessages = [
          ...freelanceMapped,
          ...learningMapped,
          ...replyMapped,
        ].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        setMessages(allMessages);
      } catch (err) {
        console.error("Gagal fetch pesan:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-600">Loading messages...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <h2 className="p-4 text-lg font-bold text-gray-800 border-b">Inbox</h2>

      <div className="divide-y">
        {messages.map((msg) => (
          <Link
            key={`${msg.category}-${msg.id}`} // unique key
            href={`/dashboard/inbox/${msg.id}/${msg.category.toLowerCase()}`}
            className="block p-4 hover:bg-gray-100"
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-800 font-semibold">
                {msg.subject || msg.boardTitle}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(msg.created_at).toLocaleDateString("id-ID")}
              </span>
            </div>
            <p className="text-sm text-gray-700">
              {msg.category}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {msg.boardDescription || msg.message || msg.status}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
