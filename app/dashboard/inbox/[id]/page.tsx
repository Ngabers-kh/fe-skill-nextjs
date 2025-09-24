"use client";

import { useParams } from "next/navigation";

const messages = {
  1: {
    subject: "Interview Invitation",
    from: "Riza (Startup Inc.)",
    body: "Halo Fauzan,\n\nTerima kasih sudah apply. Kami ingin mengundang Anda interview hari Jumat pukul 14.00 WIB via Zoom.\n\nSalam,\nStartup Inc.",
  },
  2: {
    subject: "Materi Minggu Pertama",
    from: "Aisyah (Bootcamp UX)",
    body: "Halo Fauzan,\n\nBerikut link materi minggu pertama bootcamp UX: [Google Drive Link].\n\nTerima kasih,\nAisyah",
  },
  3: {
    subject: "Hasil Seleksi Campaign",
    from: "Adinda (Fashion Brand)",
    body: "Halo Fauzan,\n\nTerima kasih sudah apply. Saat ini kami memilih kandidat lain.\n\nSemoga sukses,\nAdinda",
  },
};

export default function MessageDetailPage() {
  const { id } = useParams();
  const message = messages[Number(id) as 1 | 2 | 3];

  if (!message) {
    return <div className="p-6">Pesan tidak ditemukan.</div>;
  }

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {message.subject}
      </h3>
      <p className="text-sm text-gray-500 mb-4">From: {message.from}</p>
      <div className="whitespace-pre-line text-gray-700 bg-white p-4 rounded-lg shadow">
        {message.body}
      </div>
    </div>
  );
}
