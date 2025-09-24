"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menus = [
    { name: "Project", path: "/dashboard/project" },
    { name: "My Board", path: "/dashboard/board" },
    { name: "My Application", path: "/dashboard/application" },
    { name: "Profile", path: "/dashboard/profile" },
    { name: "Inbox", path: "/dashboard/inbox" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8">My App</h2>
        <nav className="flex flex-col gap-3">
          {menus.map((menu) => (
            <Link
              key={menu.path}
              href={menu.path}
              className={`px-4 py-2 rounded-md transition ${
                pathname === menu.path ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              {menu.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-white">{children}</main>
    </div>
  );
}
