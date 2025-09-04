"use client";
import { useAuction } from "@context/AuctionContext";
import { useMemo } from "react";

interface PaginationProps {
  totalItems: number;
}

export default function Pagination({ totalItems }: PaginationProps) {
  const { page, setPage, pageSize } = useAuction();
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
