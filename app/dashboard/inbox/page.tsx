"use client";

import Link from "next/link";

const messages = [
  {
    id: 1,
    from: "Riza (Startup Inc.)",
    subject: "Interview Invitation",
    snippet: "Halo Fauzan, terima kasih sudah apply. Kami ingin mengundang...",
    unread: true,
  },
  {
    id: 2,
    from: "Aisyah (Bootcamp UX)",
    subject: "Materi Minggu Pertama",
    snippet: "Berikut link materi untuk minggu pertama...",
    unread: false,
  },
  {
    id: 3,
    from: "Adinda (Fashion Brand)",
    subject: "Hasil Seleksi Campaign",
    snippet: "Terima kasih sudah apply. Mohon maaf saat ini kami memilih...",
    unread: false,
  },
];

export default function InboxPage() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <h2 className="p-4 text-lg font-bold text-gray-800 border-b">Inbox</h2>

      <div className="divide-y">
        {messages.map((msg) => (
          <Link
            key={msg.id}
            href={`/dashboard/inbox/${msg.id}`}
            className="block p-4 hover:bg-gray-100"
          >
            <div className="flex justify-between items-center">
              <span
                className={`font-medium ${
                  msg.unread ? "text-blue-600" : "text-gray-800"
                }`}
              >
                {msg.from}
              </span>
              {msg.unread && (
                <span className="ml-2 w-2 h-2 rounded-full bg-blue-500" />
              )}
            </div>
            <p className="text-sm text-gray-600">{msg.subject}</p>
            <p className="text-xs text-gray-500 truncate">{msg.snippet}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
