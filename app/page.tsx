import Image from "next/image";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <div className="bg-[#F9FAFB] text-white min-h-screen">
      <div className="container mx-auto p-4">
        < Navbar />
      </div>
    </div>
  );
}
