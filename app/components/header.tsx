// jika pakai komponen button custom
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="mx-auto py-12 bg-[rgb(2,44,92)]">
      <div className="max-w-7xl px-7 mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Kolom kiri */}
        <div className="flex-1 text-center md:text-start text-white mb-8 md:mb-0">
          <h1 className="text-4xl font-bold mb-4">Selamat Datang di Lomba!</h1>
          <p className="mb-6 text-lg">
            Ikuti lomba seru dan menangkan hadiahnya. Daftar sekarang juga dan
            tunjukkan kemampuanmu!
          </p>
          <Link href="/auth" passHref legacyBehavior>
            <a className="bg-[#ffe600] text-[#043873] px-6 py-3 rounded-full font-bold hover:bg-white hover:text-[rgb(2,44,92)] transition-colors">
              Try Now
            </a>
          </Link>
        </div>
        {/* Kolom kanan */}
        <div className="flex-1 flex justify-center md:justify-end">
          <img
            src="https://placehold.co/500x400?text=Gambar"
            alt="Gambar Header"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
