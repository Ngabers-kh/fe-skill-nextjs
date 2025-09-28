"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  getUser,
  getUserSkill,
  updateUser,
  getAllSkills,
} from "../../../services/api";

interface User {
  id?: number;
  name?: string;
  address?: string;
  job?: string;
  bio?: string;
  photo?: string | null;
}

interface Skill {
  idSkill: number;
  nameSkill: string;
}

export default function EditProfilePage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);

  function toggleSkill(idSkill: number) {
    setSelectedSkills((prev) =>
      prev.includes(idSkill)
        ? prev.filter((s) => s !== idSkill)
        : [...prev, idSkill]
    );
  }

  const router = useRouter();
  const [form, setForm] = useState<User>({
    name: "",
    address: "",
    job: "",
    bio: "",
    photo: null,
  });
  const [skills, setSkills] = useState<Skill[]>([]);
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  const token = Cookies.get("token") || "";
  const userId = Cookies.get("userId") || "";

  useEffect(() => {
    async function fetchData() {
      try {
        if (!userId || !token) throw new Error("Token/userId tidak ditemukan");

        const [userData, skillData, masterSkills] = await Promise.all([
          getUser(Number(userId), token),
          getUserSkill(Number(userId), token),
          getAllSkills(token),
        ]);

        setForm(userData);
        setSkills(skillData);
        setAllSkills(masterSkills);

        // Sinkronkan selectedSkills dengan skill yang sudah dimiliki user
        setSelectedSkills(skillData.map((s: Skill) => s.idSkill));
      } catch (err) {
        console.error("Gagal ambil data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId, token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (!userId || !token) throw new Error("Token/userId tidak ada");

      await updateUser(Number(userId), token, {
        ...form,
        skillIds: skills.map((s) => s.idSkill),
      });

      // Success notification with better UX
      const notification = document.createElement("div");
      notification.className =
        "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-transform duration-300";
      notification.innerHTML = `
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          Profile updated successfully!
        </div>
      `;
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.remove();
        router.push("/dashboard/profile");
      }, 1500);
    } catch (err) {
      console.error("Gagal update user:", err);
      alert("Gagal update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-[rgb(2,44,92)] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading your data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Main Form Card */}
          <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100/50">
            {/* Header Section */}
            <div className="bg-gradient-to-r bg-[rgb(2,44,92)] px-8 py-6">
              <div className="flex items-center gap-4">
                <div className="md:w-16 md:h-16 w-13 h-13 bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Profile Settings
                  </h2>
                  <p className="text-blue-100">
                    Customize your profile information
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Basic Info */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-[rgb(2,44,92)]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    Basic Information
                  </h3>

                  {/* Name Field */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={form.name || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 text-gray-700 font-medium group-hover:border-gray-300"
                        placeholder="Enter your full name"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Address Field */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Address
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="address"
                        value={form.address || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 text-gray-700 font-medium group-hover:border-gray-300"
                        placeholder="Enter your address"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Job Field */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Job Title
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="job"
                        value={form.job || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 text-gray-700 font-medium group-hover:border-gray-300"
                        placeholder="Enter your job title"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 3.75A2.75 2.75 0 0 1 8.75 1h2.5A2.75 2.75 0 0 1 14 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 0 1 6 4.193V3.75Zm6.5 0v.325a41.622 41.622 0 0 0-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25ZM10 10a1 1 0 0 0-1 1v.01a1 1 0 0 0 1 1h.01a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1H10Z"
                            clipRule="evenodd"
                          />
                          <path d="M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 0 1-9.274 0C3.985 17.585 3 16.402 3 15.055Z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Bio Field */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Biography
                    </label>
                    <textarea
                      name="bio"
                      value={form.bio || ""}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 text-gray-700 font-medium group-hover:border-gray-300 resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>

                {/* Right Column - Skills */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-[rgb(2,44,92)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    Skills
                  </h3>

                  {/* Current Skills Display */}
                  <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-100">
                    <h4 className="font-semibold text-gray-700 mb-3">
                      Current Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.length > 0 ? (
                        skills.map((skill, index) => (
                          <span
                            key={skill.idSkill}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r to-[rgb(2,44,92)] from-blue-800 text-white rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            {skill.nameSkill}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500 italic">
                          No skills selected yet
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Skills Selection */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Select Skills
                    </label>
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="cursor-pointer w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 text-left font-medium text-gray-600 hover:border-gray-300 flex items-center justify-between"
                    >
                      <span>Choose your skills...</span>
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                          dropdownOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {dropdownOpen && (
                      <div className="absolute bottom-full mb-2 z-20 w-full bg-white border-2 border-gray-200 rounded-xl shadow-xl overflow-hidden animate-dropdown-enter">
                        <div className="p-2 max-h-80 overflow-y-auto">
                          {/* Compact Grid Checkbox */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {allSkills.map((skill) => (
                              <label
                                key={skill.idSkill}
                                className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded-lg transition-colors duration-150 cursor-pointer group"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedSkills.includes(
                                    skill.idSkill
                                  )}
                                  onChange={() => toggleSkill(skill.idSkill)}
                                  className="sr-only"
                                />
                                <div
                                  className={`w-5 h-5 border-2 rounded-md flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                                    selectedSkills.includes(skill.idSkill)
                                      ? "bg-blue-600 border-blue-600"
                                      : "border-gray-300 group-hover:border-blue-400"
                                  }`}
                                >
                                  {selectedSkills.includes(skill.idSkill) && (
                                    <svg
                                      className="w-3 h-3 text-white"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  )}
                                </div>
                                <span
                                  className={`text-sm font-medium transition-colors duration-200 ${
                                    selectedSkills.includes(skill.idSkill)
                                      ? "text-blue-600"
                                      : "text-gray-700 group-hover:text-blue-600"
                                  }`}
                                >
                                  {skill.nameSkill}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Apply Button */}
                        <div className="border-t border-gray-100 p-4 bg-gray-50">
                          <button
                            onClick={() => {
                              const newSkills = allSkills.filter((s) =>
                                selectedSkills.includes(s.idSkill)
                              );
                              setSkills(newSkills);
                              setDropdownOpen(false);
                            }}
                            className="cursor-pointer w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            Apply Selected Skills ({selectedSkills.length})
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row justify-end gap-4">
                <button
                  onClick={() => router.push("/dashboard/profile")}
                  className="cursor-pointer px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={`cursor-pointer px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 min-w-[140px] ${
                    saving
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r to-[rgb(2,44,92)] from-blue-800 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-105"
                  } text-white`}
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
