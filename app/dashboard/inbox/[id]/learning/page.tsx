"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Calendar,
  Clock,
  User,
  FileText,
  ExternalLink,
} from "lucide-react";
import { getMessageLearningFromById } from "../../../../services/api";

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
  const router = useRouter();

  const [message, setMessage] = useState<MessageLearningDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) return;

        const data = await getMessageLearningFromById(Number(messageId), token);
        const detail: MessageLearningDetail = Array.isArray(data)
          ? data[0]
          : data;

        setMessage(detail);
      } catch (err) {
        console.error("Gagal ambil pesan learning:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessage();
  }, [messageId]);

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

  const formatRupiah = (num: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);

  const formatTime = (time: string) => (time ? time.slice(0, 5) : "");

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
                  <CheckCircle2 className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">
                    Thank You for Enrolling!
                  </h1>
                  <p className="text-sm opacity-90">
                    You have successfully enrolled in{" "}
                    <span className="font-semibold">{message.boardTitle}</span>
                  </p>
                  <p className="text-xs opacity-75 mt-2">
                    Let's learn together and improve your skills!
                  </p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              {/* Payment Details */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Payment Details
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Payment Status */}
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <p className="text-xs text-gray-600 mb-1">Payment Status</p>
                    <p className="text-sm font-semibold text-green-700">
                      {message.paymentStatus}
                    </p>
                  </div>

                  {/* Total Amount */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="text-xs text-gray-600 mb-1">Total Amount</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {formatRupiah(message.totalAmount)}
                    </p>
                  </div>

                  {/* Transaction Date */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 md:col-span-2">
                    <p className="text-xs text-gray-600 mb-1">
                      Transaction Date
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {new Date(message.created_at).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Class Details */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Class Details
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* Title */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="text-xs text-gray-600 mb-1">Class Title</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {message.boardTitle}
                    </p>
                  </div>

                  {/* Description */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="text-xs text-gray-600 mb-2">Description</p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {message.boardDescription}
                    </p>
                  </div>

                  {/* Schedule Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Date */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Date</p>
                          <p className="text-sm font-semibold text-gray-800">
                            {new Date(message.date).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Time</p>
                          <p className="text-sm font-semibold text-gray-800">
                            {formatTime(message.startTime)} -{" "}
                            {formatTime(message.endTime)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Organizer */}
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
                  </div>
                </div>
              </div>

              {/* Meeting Link */}
              {message.link && (
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <ExternalLink className="w-5 h-5 text-blue-600" />
                    <h3 className="text-base font-bold text-gray-800">
                      Meeting Link
                    </h3>
                  </div>
                  <a
                    href={message.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline break-all font-medium"
                  >
                    {message.link}
                  </a>
                </div>
              )}

              {/* Footer */}
              <div className="pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-700 font-medium">
                  Happy learning! We wish you success and hope the knowledge is
                  beneficial!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
