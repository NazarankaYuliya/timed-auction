// "use client";
// import { createContext, useContext, useState, ReactNode } from "react";

// interface PaginationContextType {
//   page: number;
//   setPage: (page: number) => void;
//   pageSize: number;
//   setPageSize: (size: number) => void;
// }

// const PaginationContext = createContext<PaginationContextType | undefined>(
//   undefined,
// );

// export const PaginationProvider = ({ children }: { children: ReactNode }) => {
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(24);

//   return (
//     <PaginationContext.Provider
//       value={{ page, setPage, pageSize, setPageSize }}
//     >
//       {children}
//     </PaginationContext.Provider>
//   );
// };

// export const usePagination = () => {
//   const ctx = useContext(PaginationContext);
//   if (!ctx)
//     throw new Error("usePagination must be used inside PaginationProvider");
//   return ctx;
// };
