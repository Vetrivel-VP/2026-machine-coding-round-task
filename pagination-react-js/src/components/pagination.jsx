import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import React from "react";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  sibilingCount = 1,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const range = (start, end) =>
    Array.from({ length: end - start + 1 }, (_, i) => i + start);

  const getPages = () => {
    const pages = [];

    // Always show first page
    pages.push(1);

    const left = Math.max(2, currentPage - sibilingCount);
    const right = Math.min(totalPages - 1, currentPage + sibilingCount);

    // Left gap
    if (left > 2) {
      pages.push("...");
    }

    // Middle pages (NO overlap possible now)
    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    // Right gap
    if (right < totalPages - 1) {
      pages.push("...");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPages();
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded shadow bg-gray-50 disabled:opacity-40 hover:bg-gray-100 cursor-pointer`}
      >
        <ChevronLeft />
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            onClick={() => onPageChange(page)}
            type="button"
            key={`${page}-${index}`}
            className={`px-4 py-2 rounded-lg shadow transition ${
              page === currentPage
                ? "bg-indigo-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-lg shadow bg-gray-50 disabled:opacity-40 hover:bg-gray-100 cursor-pointer`}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
