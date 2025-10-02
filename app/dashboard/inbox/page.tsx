"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  getMessageFreeLanceFromApply,
  getMessageLearningFromApply,
} from "../../services/api"; // ganti sesuai path kamu

interface Message {
  id: number;
  subject?: string | null;
  message?: string | null;
  status?: string | null;
  created_at: string;
  boardTitle: string;
  boardDescription: string;
  organizer: string;
  totalAmount?: number;
  paymentStatus?: string;
  link?: string;
  category: "Freelance" | "Learning";
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

        const freelance = await getMessageFreeLanceFromApply(idUser, token);
        const learning = await getMessageLearningFromApply(idUser, token);

        const freelanceMapped: Message[] = freelance.map((f: any) => ({
          ...f,
          category: "Freelance",
        }));

        const learningMapped: Message[] = learning.map((l: any) => ({
          ...l,
          subject: "Materi / Link Belajar",
          message: l.link,
          category: "Learning",
        }));

        setMessages([...freelanceMapped, ...learningMapped]);
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
            key={msg.id}
            href={`/dashboard/inbox/${msg.id}/${msg.category.toLowerCase()}`}
            className="block p-4 hover:bg-gray-100"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800">
                {msg.organizer} ({msg.category})
              </span>
              <span className="text-xs text-gray-500">
                {new Date(msg.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-gray-700 font-semibold">
              {msg.subject || msg.boardTitle}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {msg.boardDescription}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
