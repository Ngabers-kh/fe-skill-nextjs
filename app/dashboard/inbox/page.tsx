"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Mail, Inbox, Calendar, Tag, ChevronRight } from "lucide-react";
import {
  getMessageFreeLanceFromApply,
  getMessageLearningFromApply,
  getAllReplyFreeLanceByUser,
} from "../../services/api";

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
  const [filter, setFilter] = useState("All");

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

  // Filter messages
  const filteredMessages = messages.filter((msg) => {
    if (filter === "All") return true;
    return msg.category === filter;
  });

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-[rgb(2,44,92)] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100">
      <div className="container mx-auto px-4 pt-8 py-2">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-[rgb(2,44,92)] rounded-2xl flex items-center justify-center">
              <Inbox className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Inbox</h1>
              <p className="text-gray-600 text-sm">
                All your messages and notifications
              </p>
            </div>
          </div>

          {/* Stats */}
          {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 shadow-sm">
              <p className="text-xs text-gray-600 mb-1">Total Messages</p>
              <p className="text-2xl font-bold text-gray-800">
                {messages.length}
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 shadow-sm">
              <p className="text-xs text-gray-600 mb-1">Freelance</p>
              <p className="text-2xl font-bold text-green-600">
                {messages.filter((m) => m.category === "Freelance").length}
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 shadow-sm">
              <p className="text-xs text-gray-600 mb-1">Learning</p>
              <p className="text-2xl font-bold text-blue-600">
                {messages.filter((m) => m.category === "Learning").length}
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 shadow-sm">
              <p className="text-xs text-gray-600 mb-1">Replies</p>
              <p className="text-2xl font-bold text-purple-600">
                {messages.filter((m) => m.category === "Reply").length}
              </p>
            </div>
          </div> */}
        </div>

        {/* Filter */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-6 border border-gray-200/50 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            <div className="flex gap-2">
              {["All", "Freelance", "Learning", "Reply"].map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`cursor-pointer px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    filter === category
                      ? "bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] text-white shadow-sm"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm overflow-hidden mb-4">
          {filteredMessages.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredMessages.map((msg) => (
                <Link
                  key={`${msg.category}-${msg.id}`}
                  href={`/dashboard/inbox/${
                    msg.id
                  }/${msg.category.toLowerCase()}`}
                  className="block p-4 hover:bg-blue-50/50 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Left Section */}
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {/* Icon */}
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          msg.category === "Freelance"
                            ? "bg-green-100"
                            : msg.category === "Learning"
                            ? "bg-blue-100"
                            : "bg-purple-100"
                        }`}
                      >
                        <Mail
                          className={`w-5 h-5 ${
                            msg.category === "Freelance"
                              ? "text-green-600"
                              : msg.category === "Learning"
                              ? "text-blue-600"
                              : "text-purple-600"
                          }`}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          {/* Left - Title + Category */}
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-gray-800 truncate transition-colors">
                              {msg.subject || msg.boardTitle}
                            </h3>
                            <span
                              className={`px-2 py-0.5 text-xs font-medium rounded flex-shrink-0 ${
                                msg.category === "Freelance"
                                  ? "bg-green-100 text-green-700"
                                  : msg.category === "Learning"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-purple-100 text-purple-700"
                              }`}
                            >
                              {msg.category}
                            </span>
                          </div>

                          {/* Right - Date + Status */}
                          <div className="flex items-center gap-2 text-xs">
                            {msg.status && (
                              <span
                                className={`px-2 py-0.5 rounded text-xs font-medium ${
                                  msg.status === "Accepted"
                                    ? "bg-green-50 text-green-700 border border-green-200"
                                    : msg.status === "Rejected"
                                    ? "bg-red-50 text-red-700 border border-red-200"
                                    : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                                }`}
                              >
                                {msg.status}
                              </span>
                            )}
                            <div className="flex items-center gap-1 text-gray-500">
                              <Calendar className="w-3 h-3" />
                              <span>
                                {new Date(msg.created_at).toLocaleDateString(
                                  "id-ID",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                          {msg.boardDescription || msg.message || msg.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <Inbox className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">No messages found</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
