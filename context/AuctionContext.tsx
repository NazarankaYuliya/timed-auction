"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { categories, CategoryCode } from "@/data/categories";

type FilterType = "all" | "myBids";

interface AuctionContextType {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  category: CategoryCode | "all";
  setCategory: (c: CategoryCode | "all") => void;
  page: number;
  setPage: (p: number) => void;
  pageSize: number;
  setPageSize: (s: number) => void;

  lotNumber: string;
  setLotNumber: (n: string) => void;
}

const AuctionContext = createContext<AuctionContextType | undefined>(undefined);

export const AuctionProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [category, setCategory] = useState<CategoryCode | "all">("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);

  const searchParams = useSearchParams();
  const router = useRouter();

  const [lotNumber, setLotNumber] = useState(searchParams.get("lot") || "");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (lotNumber) {
      params.set("lot", lotNumber);
    } else {
      params.delete("lot");
    }
    router.replace(`?${params.toString()}`);
    setPage(1);
  }, [lotNumber]);

  return (
    <AuctionContext.Provider
      value={{
        filter,
        setFilter,
        category,
        setCategory,
        page,
        setPage,
        pageSize,
        setPageSize,
        lotNumber,
        setLotNumber,
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
};

export const useAuction = () => {
  const ctx = useContext(AuctionContext);
  if (!ctx) throw new Error("useAuction must be used inside AuctionProvider");
  return ctx;
};
