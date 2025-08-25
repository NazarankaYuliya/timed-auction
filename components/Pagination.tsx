"use client";
import { usePagination } from "@context/PaginationContext";
import { useMemo } from "react";

interface PaginationProps {
  totalItems: number;
}

export default function Pagination({ totalItems }: PaginationProps) {
  const { page, setPage, pageSize, setPageSize } = usePagination();
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const pagesToShow = useMemo(() => {
    const set = new Set<number>(
      [1, totalPages, page - 1, page, page + 1].filter(
        (p) => p >= 1 && p <= totalPages,
      ),
    );
    return Array.from(set).sort((a, b) => a - b);
  }, [page, totalPages]);

  const goTo = (p: number) => {
    setPage(Math.max(1, Math.min(totalPages, p)));
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="mt-10 w-full flex flex-col items-center gap-4">
      {/* Выбор размера страницы */}
      <div className="flex gap-2 items-center text-sm">
        <span>Pro Seite:</span>
        {[24, 48, 96].map((size) => (
          <button
            key={size}
            className={`px-3 py-1 border rounded ${
              size === pageSize ? "bg-grafit text-white" : ""
            }`}
            onClick={() => {
              setPageSize(size);
              setPage(1); // сброс на первую страницу
            }}
          >
            {size}
          </button>
        ))}
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <nav
          className="flex items-center justify-center gap-2 sm:gap-3"
          aria-label="Seitennavigation"
        >
          <button
            onClick={() => goTo(1)}
            disabled={page === 1}
            className="hidden sm:inline-flex px-3 py-2 border rounded"
          >
            «
          </button>
          <button
            onClick={() => goTo(page - 1)}
            disabled={page === 1}
            className="px-3 py-2 border rounded"
          >
            ‹
          </button>

          {pagesToShow.map((p, idx) => {
            const prev = pagesToShow[idx - 1];
            const needDots = prev && p - prev > 1;
            return (
              <span key={p} className="flex items-center">
                {needDots && <span className="px-2 select-none">…</span>}
                <button
                  onClick={() => goTo(p)}
                  className={`px-3 py-2 border rounded ${
                    p === page ? "bg-grafit text-white" : ""
                  }`}
                  aria-current={p === page ? "page" : undefined}
                >
                  {p}
                </button>
              </span>
            );
          })}

          <button
            onClick={() => goTo(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-2 border rounded"
          >
            ›
          </button>
          <button
            onClick={() => goTo(totalPages)}
            disabled={page === totalPages}
            className="hidden sm:inline-flex px-3 py-2 border rounded"
          >
            »
          </button>
        </nav>
      )}
    </div>
  );
}
