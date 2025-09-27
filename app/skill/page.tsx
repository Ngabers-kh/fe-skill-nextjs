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

      router.push("/dashboard");
    } catch (err) {
      console.error("Error submit skills:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bgRegister.png')" }}
    >
      <h1 className="text-3xl font-bold mb-10">Fill in Your Skill</h1>

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

      <button
        onClick={handleNext}
        className="mt-10 px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium shadow"
      >
        Next →
      </button>
    </div>
  );
}
