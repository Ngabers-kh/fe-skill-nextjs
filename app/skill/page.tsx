"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getAllSkills, addUserSkills } from "../services/api";

type Skill = {
  idSkill: number;
  nameSkill: string;
};

export default function SkillPage() {
  const router = useRouter();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  // ambil token & userId dari cookie
  const token = Cookies.get("token") || "";
  const userId = Cookies.get("userId");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getAllSkills(token);
        setSkills(data);
      } catch (err) {
        console.error("Error fetch skills:", err);
      }
    };
    if (token) fetchSkills();
  }, [token]);

  const toggleSkill = (id: number) => {
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleNext = async () => {
    if (!userId) {
      console.error("User ID tidak ditemukan, mungkin belum login?");
      return;
    }

    try {
      setLoading(true);
      const res = await addUserSkills(Number(userId), selectedSkills, token);
      console.log("Skills berhasil disimpan:", res);

      router.push("/nextpage");
    } catch (err) {
      console.error("Error submit skills:", err);
    } finally {
      setLoading(false);
    }
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
        {skills.map((skill) => (
          <button
            key={skill.idSkill}
            onClick={() => toggleSkill(skill.idSkill)}
            className={`px-4 py-2 rounded-full font-medium shadow-md transition 
              ${
                selectedSkills.includes(skill.idSkill)
                  ? "bg-blue-600 text-white"
                  : "bg-[#FFEEAA] text-black hover:bg-yellow-400"
              }`}
            >
              {skill.nameSkill}
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
