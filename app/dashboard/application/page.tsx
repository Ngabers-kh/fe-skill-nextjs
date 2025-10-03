"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FileCheck, Calendar, User, Tag, Clock } from "lucide-react";
import {
  getAllApplicationsFreeLanceByUser,
  getAllApplicationsLearningByUser,
} from "../../services/api";

// interface umum untuk user
interface UserInfo {
  name: string;
}

// interface untuk board Learning
interface BoardLearning {
  id: number;
  date: string;
  price: number;
  title: string;
  status: string;
  startTime: string;
  endTime: string;
  description: string;
  users: UserInfo;
  skills: string[];
}

// aplikasi Learning
export interface LearningApplication {
  id: number;
  idTransaction: string;
  totalAmount: number;
  paymentStatus: string;
  created_at: string;
  boardLearning: BoardLearning;
}

// interface untuk board Freelance
interface BoardFreeLance {
  id: number;
  price: number;
  quota: number;
  title: string;
  status: string;
  startDate: string;
  endDate: string;
  description: string;
  users: UserInfo;
  skills: string[];
}

// aplikasi Freelance
export interface FreeLanceApplication {
  id: number;
  status: string;
  subject: string | null;
  message: string | null;
  created_at: string;
  boardFreeLance: BoardFreeLance;
}

export default function ApplicationPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const token = Cookies.get("token") || "";
  const idUser = Cookies.get("userId");

  useEffect(() => {
    async function fetchApplications() {
      try {
        if (!idUser || !token) throw new Error("User/Token not found");

        const [freelance, learning] = await Promise.all([
          getAllApplicationsFreeLanceByUser(Number(idUser), token),
          getAllApplicationsLearningByUser(Number(idUser), token),
        ]);

        // mapping freelance
        const mappedFreelance = (freelance as FreeLanceApplication[]).map(
          (f) => ({
            id: f.id,
            category: "Freelance",
            title: f.boardFreeLance.title,
            description: f.boardFreeLance.description,
            skills: f.boardFreeLance.skills,
            name: f.boardFreeLance.users?.name,
            appliedDate: f.created_at.split("T")[0],
            status: f.status,
          })
        );

        // mapping learning
        const mappedLearning = (learning as LearningApplication[]).map((l) => ({
          id: l.id,
          category: "Learning",
          title: l.boardLearning.title,
          description: l.boardLearning.description,
          skills: l.boardLearning.skills,
          name: l.boardLearning.users?.name,
          appliedDate: l.created_at.split("T")[0],
          status: l.paymentStatus === "Success" ? "Accepted" : "Pending",
        }));

        setApplications([...mappedFreelance, ...mappedLearning]);
      } catch (err) {
        console.error("Gagal ambil data aplikasi:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, [idUser, token]);

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    if (filter === "All") return true;
    return app.category === filter;
  });

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-[rgb(2,44,92)] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading applications...</p>
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
              <FileCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                My Applications
              </h1>
              <p className="text-gray-600 text-sm">
                Track all your project applications
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 shadow-sm">
              <p className="text-xs text-gray-600 mb-1">Total Applications</p>
              <p className="text-2xl font-bold text-gray-800">
                {applications.length}
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 shadow-sm">
              <p className="text-xs text-gray-600 mb-1">Freelance</p>
              <p className="text-2xl font-bold text-green-600">
                {applications.filter((a) => a.category === "Freelance").length}
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 shadow-sm">
              <p className="text-xs text-gray-600 mb-1">Learning</p>
              <p className="text-2xl font-bold text-blue-600">
                {applications.filter((a) => a.category === "Learning").length}
              </p>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-6 border border-gray-200/50 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            <div className="flex gap-2">
              {["All", "Freelance", "Learning"].map((category) => (
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

        {/* Applications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredApplications.map((app) => (
            <div
              key={app.id}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 shadow-sm hover:shadow-md transition-all group flex flex-col h-full"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <span
                  className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                    app.category === "Learning"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {app.category}
                </span>
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded ${
                    app.status === "Pending"
                      ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                      : app.status === "Accepted"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {app.status}
                </span>
              </div>

              {/* Content utama */}
              <div className="flex-grow">
                <h2 className="text-base font-bold text-gray-800 mb-2 line-clamp-2 transition-colors">
                  {app.title}
                </h2>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {app.description}
                </p>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-600 truncate">
                      {app.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-600">
                      {app.appliedDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer - Skills */}
              <div className="pt-3 mt-auto border-t border-gray-200">
                <div className="flex items-center gap-1.5 mb-2">
                  <Tag className="w-3 h-3 text-gray-400" />
                  <span className="text-xs font-medium text-gray-600">
                    Skills
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {app.skills.length > 0 ? (
                    app.skills.slice(0, 3).map((skill: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-yellow-50 text-yellow-700 rounded text-xs border border-yellow-200"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-xs">No skills</span>
                  )}
                  {app.skills.length > 3 && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                      +{app.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredApplications.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <FileCheck className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">No applications found</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
