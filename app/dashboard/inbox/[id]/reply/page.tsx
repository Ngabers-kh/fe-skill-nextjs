"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  ArrowLeft,
  Mail,
  CheckCircle2,
  XCircle,
  Calendar,
  FileText,
  User,
} from "lucide-react";
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
  const router = useRouter();
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

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-[rgb(2,44,92)] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading reply...</p>
        </div>
      </div>
    );
  }

  if (!reply) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Reply Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The reply you're looking for doesn't exist.
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

  const isAccepted = reply.status === "Accepted";

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
            <div
              className={`p-8 text-white ${
                isAccepted
                  ? "bg-gradient-to-r from-green-600 to-emerald-700"
                  : "bg-gradient-to-r from-red-600 to-rose-700"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      {isAccepted ? (
                        <CheckCircle2 className="w-7 h-7 text-white" />
                      ) : (
                        <XCircle className="w-7 h-7 text-white" />
                      )}
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">Application Reply</h1>
                      <p className="text-sm opacity-90">
                        Freelance Project Response
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              {/* Status Card */}
              <div
                className={`rounded-xl p-6 mb-6 border-2 ${
                  isAccepted
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800">
                    Application Status
                  </h2>
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                      isAccepted
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {isAccepted ? "Accepted" : "Rejected"}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Dear{" "}
                  <span className="font-semibold">
                    {reply.idUserCreated.name}
                  </span>{" "}
                  ({reply.idUserCreated.email}),
                  <br />
                  <br />
                  {isAccepted
                    ? "Congratulations! Your application has been accepted for the following project."
                    : "Thank you for your interest. Unfortunately, your application was not accepted for this project."}
                </p>
              </div>

              {/* Reply Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Subject */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Subject</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {reply.subject}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Date */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Reply Date</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {new Date(reply.created_at).toLocaleDateString(
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
              </div>

              {/* Project Details */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-yellow-600" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Project Details
                  </h2>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Project Title</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {reply.idBoardFreeLance.title}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Description</p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {reply.idBoardFreeLance.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sender Info */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-[rgb(2,44,92)] rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 mb-2">Reply sent by</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {reply.idUserTarget.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {reply.idUserTarget.email}
                    </p>
                    <p className="text-xs text-gray-500 mt-3 italic">
                      Thank you for applying. We wish you success in your next
                      steps.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
