"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
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
        const mappedFreelance = (freelance as FreeLanceApplication[]).map((f) => ({
          id: f.id,
          category: "Freelance",
          title: f.boardFreeLance.title,
          description: f.boardFreeLance.description,
          skills: f.boardFreeLance.skills,
          name: f.boardFreeLance.users?.name,
          appliedDate: f.created_at.split("T")[0],
          status: f.status,
        }));

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

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold">{app.title}</h2>
            <p className="text-gray-500">{app.description}</p>
            <p className="text-sm mt-2">Category: {app.category}</p>
            <p className="text-sm">Organizer: {app.name}</p>
            <p className="text-sm">Applied: {app.appliedDate}</p>
            <p className="text-sm font-medium">
              Status:{" "}
              <span
                className={
                  app.status === "Pending"
                    ? "text-blue-600"
                    : app.status === "Accepted"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {app.status}
              </span>
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {app.skills.length > 0 ? (
                app.skills.map((skill: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-sm">No skills</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
