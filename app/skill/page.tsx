// app/skill/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SkillPage() {
  const router = useRouter();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const skills = [
    "Fotografi",
    "Desain",
    "Menulis",
    "Public Speaking",
    "Editing",
    "Coding",
    "UI/UX",
    "Leadership",
    "Marketing",
    "Analisis",
    "Research",
    "Manajemen",
    "Videografi",
    "Musik",
    "Seni",
    "Ilustrasi",
    "Presentasi",
    "Komunikasi",
    "Organisasi",
    "Problem Solving",
  ];

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleNext = () => {
    console.log("Skills terpilih:", selectedSkills);
    router.push("/dashboard");
  };

  return (
    <div
      className="w-full min-h-screen items-center justify-center flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('/bgRegister.png')" }}
    >
      <div className="max-w-7xl mx-auto p-9 sm:p-8 md:p-6">
        <h1 className="text-3xl font-bold mb-10 text-center">
          Fill in Your Skill
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl">
          {skills.map((skill, idx) => (
            <button
              key={idx}
              onClick={() => toggleSkill(skill)}
              className={`px-4 py-2 rounded-full font-medium shadow-md transition 
              ${
                selectedSkills.includes(skill)
                  ? "bg-blue-600 text-white"
                  : "bg-[#FFEEAA] text-black hover:bg-yellow-400"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={handleNext}
            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium shadow"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
