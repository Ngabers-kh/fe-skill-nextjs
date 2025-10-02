"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Tag,
  Calendar,
  CheckCircle2,
  Circle,
} from "lucide-react";

const projects = [
  {
    id: 1,
    category: "Learning",
    title: "Build a Portfolio Website",
    description: "Belajar HTML, CSS, dan dasar desain web.",
    skills: ["Coding", "UI/UX"],
    status: "Ongoing",
    name: "Fauzan",
    modules: [
      "Intro HTML & CSS",
      "Membuat Layout Responsive",
      "Deploy ke GitHub Pages",
    ],
  },
  {
    id: 2,
    category: "Freelance",
    title: "Landing Page untuk Startup",
    description: "Buat landing page interaktif untuk client startup lokal.",
    skills: ["Coding", "Design"],
    status: "Open",
    name: "Riza",
    milestones: [
      "Wireframe & Desain",
      "Coding Frontend",
      "Integrasi & Testing",
    ],
  },
];

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = Number(params.id);

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Project Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The project you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.push("/dashboard/project")}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push("/dashboard/project")}
          className="flex items-center gap-2 mb-6 text-gray-700 hover:text-blue-600 font-medium transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </button>

        <div className="max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] p-8 text-white">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`px-4 py-1.5 text-sm font-semibold rounded-full ${
                        project.category === "Learning"
                          ? "bg-white/20 backdrop-blur-sm text-white"
                          : "bg-white/20 backdrop-blur-sm text-white"
                      }`}
                    >
                      {project.category}
                    </span>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        project.status === "Ongoing"
                          ? "bg-blue-100 text-blue-700"
                          : project.status === "Open"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold mb-3">{project.title}</h1>
                  <p className="text-blue-50 text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Organizer */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-[rgb(2,44,92)] rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Organizer</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {project.name}
                    </p>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Tag className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2">
                      Required Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-lg text-sm font-medium border border-yellow-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Learning Modules or Freelance Milestones */}
              {project.category === "Learning" && (
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Learning Modules
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {project.modules?.map((mod, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-lg border border-blue-100 hover:border-blue-200 transition-colors"
                      >
                        <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{mod}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.category === "Freelance" && (
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Project Milestones
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {project.milestones?.map((ms, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-green-50/50 rounded-lg border border-green-100 hover:border-green-200 transition-colors"
                      >
                        <Circle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{ms}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Ready to get started?
                </div>
                <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] hover:from-blue-700 hover:to-[rgb(2,44,92)] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105">
                  {project.category === "Learning"
                    ? "Start Learning"
                    : "Apply Job"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
