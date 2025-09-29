import { MoreHorizontal, BookOpen, Briefcase, Clock } from "lucide-react";
import { UnifiedBoard } from "../hooks/useBoard";
import { JSX } from "react";

export default function BoardStats({ boards }: { boards: UnifiedBoard[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
      <StatCard
        icon={<MoreHorizontal className="w-6 h-6 text-[rgb(2,44,92)]" />}
        label="Total Boards"
        value={boards.length}
      />
      <StatCard
        icon={<BookOpen className="w-6 h-6 text-[rgb(2,44,92)]" />}
        label="Learning"
        value={boards.filter((b) => b.category === "Learning").length}
      />
      <StatCard
        icon={<Briefcase className="w-6 h-6 text-[rgb(2,44,92)]" />}
        label="Freelance"
        value={boards.filter((b) => b.category === "Freelance").length}
      />
      <StatCard
        icon={<Clock className="w-6 h-6 text-[rgb(2,44,92)]" />}
        label="Open"
        value={boards.filter((b) => b.status === "open").length}
      />
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: JSX.Element;
  label: string;
  value: number;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-gray-500 text-sm font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
}
