"use client";

import { useParams, useRouter } from "next/navigation";

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
    return <div className="p-6">Project not found</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <button
        onClick={() => router.push("/dashboard/project")}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back to Projects
      </button>

      <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          {project.title}
        </h1>
        <p className="text-gray-600 mb-6">{project.description}</p>

        {/* Info detail */}
        <div className="space-y-3 mb-6">
          <p>
            <span className="font-semibold text-gray-700">Category:</span>{" "}
            {project.category}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Organizer:</span>{" "}
            {project.name}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Status:</span>{" "}
            <span
              className={`${
                project.status === "Ongoing"
                  ? "text-blue-600"
                  : project.status === "Open"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {project.status}
            </span>
          </p>
          <div>
            <span className="font-semibold text-gray-700">Skills:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Learning modules or Freelance milestones */}
        {project.category === "Learning" && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Learning Modules
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              {project.modules?.map((mod, idx) => (
                <li key={idx}>{mod}</li>
              ))}
            </ul>
          </div>
        )}

        {project.category === "Freelance" && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Project Milestones
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              {project.milestones?.map((ms, idx) => (
                <li key={idx}>{ms}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Button */}
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium">
          {project.category === "Learning" ? "Start Learning" : "Apply Job"}
        </button>
      </div>
    </div>
  );
}
