"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Award, CheckCircle2, ArrowRight } from "lucide-react";
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
  const [fetchingSkills, setFetchingSkills] = useState(true);

  const token = Cookies.get("token") || "";
  const userId = Cookies.get("userId");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getAllSkills(token);
        setSkills(data);
      } catch (err) {
        console.error("Error fetch skills:", err);
      } finally {
        setFetchingSkills(false);
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

    if (selectedSkills.length === 0) {
      alert("Please select at least one skill");
      return;
    }

    try {
      setLoading(true);
      const res = await addUserSkills(Number(userId), selectedSkills, token);
      console.log("Skills berhasil disimpan:", res);
      router.push("/dashboard/project");
    } catch (err) {
      console.error("Error submit skills:", err);
      alert("Failed to save skills. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetchingSkills) {
    return (
      <div
        className="w-full min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/bgRegister.png')" }}
      >
        <div className="w-full min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white font-medium">Loading skills...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: "url('/bgRegister.png')" }}
    >
      <div className="w-full max-w-5xl">
        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="p-8 text-white">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center mb-3">
              Highlight Your Strengths
            </h1>
            <p className="text-center text-blue-50 text-lg">
              Select the skills that represent you best
            </p>
          </div>

          {/* Content Section */}
          <div className="pb-8 px-8">
            {/* Selection Counter */}
            <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-gray-800" />
                <p className="text-sm font-semibold text-gray-800">
                  Selected:{" "}
                  <span className="text-gray-800">{selectedSkills.length}</span>{" "}
                  skill{selectedSkills.length !== 1 ? "s" : ""}
                </p>
              </div>
              {selectedSkills.length >= 5 && (
                <p className="text-xs text-center text-gray-600 mt-2">
                  Great! You've selected {selectedSkills.length} skills
                </p>
              )}
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
              {skills.map((skill) => {
                const isSelected = selectedSkills.includes(skill.idSkill);
                return (
                  <button
                    key={skill.idSkill}
                    onClick={() => toggleSkill(skill.idSkill)}
                    className={`cursor-pointer relative px-2 py-2 rounded-xl font-medium text-sm shadow-sm transition-all duration-200 transform hover:scale-105 ${
                      isSelected
                        ? "bg-[#ffe600] text-gray-800 shadow-md"
                        : "bg-yellow-50 text-gray-800 border-2 border-yellow-200 hover:border-yellow-300 hover:bg-yellow-100"
                    }`}
                  >
                    {isSelected && (
                      <CheckCircle2 className="absolute top-1.5 right-1.5 w-4 h-4 text-gray-800" />
                    )}
                    <span className={isSelected ? "pr-5" : ""}>
                      {skill.nameSkill}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-6 border-t border-gray-200">
              <button
                onClick={() => router.push("/auth")}
                className="cursor-pointer w-full sm:w-auto px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition-all text-sm"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={loading || selectedSkills.length === 0}
                className={`w-full sm:w-auto px-8 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${
                  loading || selectedSkills.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed text-sm"
                    : "cursor-pointer text-sm bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] hover:from-blue-700 hover:to-[rgb(2,44,92)] text-white transform hover:scale-105"
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <span>Continue to Dashboard</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {selectedSkills.length === 0 && (
              <p className="text-center text-xs text-gray-300 mt-4">
                Please select at least one skill to continue
              </p>
            )}
            {/* Helper Text */}
            <p className="text-center text-sm text-gray-300 mt-6 mx-auto max-w-2xl">
              Choose skills that best represent your expertise. You can always
              update them later from your profile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
