"use client";

import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  // Dummy data user
  const user = {
    name: "Fauzan",
    address: "Bandung, Indonesia",
    job: "Fullstack Developer",
    bio: "Saya suka belajar dan membuat aplikasi berbasis web dan IoT.",
    photo: null,
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-8">
        {/* Foto dan Nama */}
        <div className="flex items-center gap-6 mb-6">
          <div className="w-24 h-24 rounded-full bg-red-500 flex items-center justify-center text-white text-lg font-bold">
            {user.photo ? (
              <img
                src={user.photo}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              user.name.charAt(0)
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-600">{user.job}</p>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-3">
          <div>
            <h2 className="text-sm font-semibold text-gray-500">Address</h2>
            <p className="text-gray-800">{user.address}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-500">Bio</h2>
            <p className="text-gray-800">{user.bio}</p>
          </div>
        </div>

        {/* Tombol Edit */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => router.push("/dashboard/profile/edit")}
            className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
