"use client";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      // Kalau halaman sedikit, tampilkan semua
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Selalu tampilkan page pertama
      pages.push(1);

      // Ellipsis sebelum currentPage
      if (currentPage > 2) {
        pages.push("...");
      }

      // Current page dan tetangganya
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }

      // Ellipsis setelah currentPage
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Selalu tampilkan page terakhir
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-center mt-6 gap-1.5 items-center mb-4">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="cursor-pointer px-3 h-8 flex items-center justify-center rounded-full text-sm font-medium border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        ‹
      </button>

      {/* Page numbers */}
      {pages.map((page, idx) =>
        page === "..." ? (
          <span
            key={idx}
            className="w-8 h-8 flex items-center justify-center text-gray-400"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(Number(page))}
            className={`cursor-pointer w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors duration-200 ${
              page === currentPage
                ? "bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="cursor-pointer px-3 h-8 flex items-center justify-center rounded-full text-sm font-medium border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        ›
      </button>
    </div>
  );
}
