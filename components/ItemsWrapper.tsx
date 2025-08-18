"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IItem } from "@types";
import { subscribeToAuction } from "@utils/pusherUtils";
import ItemCard from "./ItemCard";

interface ItemsWrapperProps {
  items: IItem[];
  userId?: string;
  status: string;
}

const PAGE_SIZE = 20;

const ItemsWrapper = ({ items, userId, status }: ItemsWrapperProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page") || 1);

  const [auctionItems, setAuctionItems] = useState<IItem[]>(items);
  const [page, setPage] = useState<number>(
    isNaN(pageFromUrl) ? 1 : pageFromUrl,
  );

  // live updates
  useEffect(() => {
    const updateItem = (
      itemId: string,
      currentBid: number,
      biddingStep: number,
      endDate: Date,
      winner: string,
    ) => {
      setAuctionItems((prev) =>
        prev.map((item) =>
          item._id === itemId
            ? {
                ...item,
                currentBid,
                auctionDates: { ...item.auctionDates, endDate },
                biddingStep,
                winner,
              }
            : item,
        ),
      );
    };

    const unsubscribe = subscribeToAuction(updateItem);
    return () => unsubscribe();
  }, []);

  // если items пришли новые пропсами (SSR/перенavigация)
  useEffect(() => {
    setAuctionItems(items);
  }, [items]);

  // считаем страницы
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(auctionItems.length / PAGE_SIZE)),
    [auctionItems.length],
  );

  // держим page в допустимых пределах
  useEffect(() => {
    if (page < 1) setPage(1);
    else if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  // синхронизируем URL ?page=
  useEffect(() => {
    const current = Number(searchParams.get("page") || 1);
    if (current !== page) {
      const params = new URLSearchParams(searchParams.toString());
      if (page === 1) params.delete("page");
      else params.set("page", String(page));
      router.replace(`?${params.toString()}`, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const pagedItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return auctionItems.slice(start, start + PAGE_SIZE);
  }, [auctionItems, page]);

  const goTo = (p: number) => {
    setPage(p);
    // скролл к началу грида
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const pagesToShow = useMemo(() => {
    // компактная полоска страниц: первая, последняя, текущая ±1
    const set = new Set<number>(
      [1, totalPages, page - 1, page, page + 1].filter(
        (p) => p >= 1 && p <= totalPages,
      ),
    );
    return Array.from(set).sort((a, b) => a - b);
  }, [page, totalPages]);

  return (
    <div className="container mx-auto mt-10 p-6">
      {/* Grid карточек */}
      <div className="flex flex-wrap justify-center gap-8 relative">
        {pagedItems.map((item) => (
          <ItemCard
            key={String(item._id)}
            item={item}
            userId={userId}
            status={status}
          />
        ))}
      </div>

      {/* Пагинация (DE + mobile-friendly) */}
      {totalPages > 1 && (
        <nav
          className="mt-10 w-full flex items-center justify-center text-grafit"
          aria-label="Seitennavigation"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-full">
            {/* Erste (скрыта на мобилке) */}
            <button
              className="hidden sm:inline-flex px-3 py-2 rounded border disabled:opacity-50"
              onClick={() => goTo(1)}
              disabled={page === 1}
              aria-label="Erste Seite"
            >
              «
            </button>

            {/* Zurück */}
            <button
              className="inline-flex px-3 py-2  rounded border disabled:opacity-50 text-sm sm:text-base"
              onClick={() => goTo(page - 1)}
              disabled={page === 1}
              aria-label="Vorherige Seite"
            >
              ‹
            </button>

            {/* Номера страниц — компактные, с троеточиями */}
            {pagesToShow.map((p, idx) => {
              const prev = pagesToShow[idx - 1];
              const needDots = prev && p - prev > 1;
              return (
                <span key={p} className="flex items-center">
                  {needDots && <span className="px-2 select-none">…</span>}
                  <button
                    className={`px-3 py-2 rounded border text-sm sm:text-base ${
                      p === page ? "bg-grafit text-white" : ""
                    }`}
                    onClick={() => goTo(p)}
                    aria-current={p === page ? "page" : undefined}
                    aria-label={`Seite ${p}`}
                  >
                    {p}
                  </button>
                </span>
              );
            })}

            {/* Weiter */}
            <button
              className="inline-flex px-3 py-2 rounded border disabled:opacity-50 text-sm sm:text-base"
              onClick={() => goTo(page + 1)}
              disabled={page === totalPages}
              aria-label="Nächste Seite"
            >
              ›
            </button>

            {/* Letzte (скрыта на мобилке) */}
            <button
              className="hidden sm:inline-flex px-3 py-2 rounded border disabled:opacity-50"
              onClick={() => goTo(totalPages)}
              disabled={page === totalPages}
              aria-label="Letzte Seite"
            >
              »
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default ItemsWrapper;
