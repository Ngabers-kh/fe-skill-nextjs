"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  ArrowLeft,
  Mail,
  User,
  Calendar,
  FileText,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  getMessageFreeLanceFromById,
  updateBoardFeedBack,
} from "../../../../services/api";

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

  const handleFeedback = async (status: "Accepted" | "Rejected") => {
    try {
      setSubmitting(true);
      const token = Cookies.get("token");
      if (!token) return;

      await updateBoardFeedBack(
        {
          id: message!.id,
          idUserCreated: idUser,
          idBoardFreeLance: message!.idBoardFreeLance!,
          idUserTarget: message!.idUserTarget!,
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

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-[rgb(2,44,92)] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading message...</p>
        </div>
      </div>
    );
  }

  if (!message) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Message Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The message you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.push("/dashboard/inbox")}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Back to Inbox
          </button>
        </div>
      </div>
    );
  }

  const isPending = message.status === "pending";
  const isAccepted = message.status === "Accepted";

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push("/dashboard/inbox")}
          className="flex items-center gap-2 mb-6 text-gray-700 hover:text-blue-600 font-medium transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Inbox
        </button>

        <div className="max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] p-8 text-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">
                    Freelance Application Letter
                  </h1>
                  <p className="text-sm opacity-90">
                    Submitted for board{" "}
                    <span className="font-semibold">{message.boardTitle}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              {/* Letter Content */}
              <div className="mb-6">
                <p className="text-sm text-gray-700 leading-relaxed mb-6">
                  Dear <span className="font-semibold">Organizer</span>,
                  <br />
                  <br />I am submitting my freelance application for the board{" "}
                  <span className="font-semibold">{message.boardTitle}</span>.
                </p>

                {/* Application Details */}
                <div className="space-y-4">
                  {/* Subject */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-600 mb-1">Subject</p>
                        <p className="text-sm font-semibold text-gray-800">
                          {message.subject}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="text-xs text-gray-600 mb-2">
                      Application Letter
                    </p>
                    <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                      {message.message}
                    </p>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Date */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">
                            Submitted On
                          </p>
                          <p className="text-sm font-semibold text-gray-800">
                            {new Date(message.created_at).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Organizer */}
                    {message.organizer && (
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-1">
                              Organizer
                            </p>
                            <p className="text-sm font-semibold text-gray-800">
                              {message.organizer}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Section */}
              {!isPending ? (
                <div
                  className={`rounded-xl p-6 border-2 ${
                    isAccepted
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isAccepted ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                    <p
                      className={`text-sm font-semibold ${
                        isAccepted ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      This message has been replied:{" "}
                      {isAccepted
                        ? "Application Accepted"
                        : "Application Rejected"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-4">
                    Please respond to this application:
                  </p>
                  <div className="flex gap-3">
                    <button
                      disabled={submitting}
                      onClick={() => handleFeedback("Rejected")}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Processing..." : "Reject"}
                    </button>
                    <button
                      disabled={submitting}
                      onClick={() => handleFeedback("Accepted")}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Processing..." : "Accept"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
