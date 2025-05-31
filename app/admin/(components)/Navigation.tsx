"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const routerPath = usePathname();
  const isActive = (path: string) => routerPath === path;
  return (
    <div className="bg-beige font-display p-8">
      <nav className="flex flex-col sm:flex-row gap-4 justify-between container mx-auto">
        <Link
          href="/admin/dashboard"
          className={`text-2xl text-grafit ${
            isActive("/admin/dashboard")
              ? "border-b-2 border-grafit"
              : "hover:text-gold border-b-2 border-transparent hover:border-gold transition-border duration-300 ease-in-out"
          } `}
        >
          Dashboard
        </Link>
        <Link
          href="/admin/dashboard/items"
          className={`text-2xl text-grafit ${
            isActive("/admin/dashboard/items")
              ? "border-b-2 border-grafit"
              : "hover:text-gold border-b-2 border-transparent hover:border-gold transition-border duration-300 ease-in-out"
          } `}
        >
          Items
        </Link>
        <Link
          href="/admin/dashboard/users"
          className={`text-2xl text-grafit ${
            isActive("/admin/dashboard/users")
              ? "border-b-2 border-grafit"
              : "hover:text-gold border-b-2 border-transparent hover:border-gold transition-border duration-300 ease-in-out"
          } `}
        >
          Users
        </Link>
        <Link
          href="/admin/dashboard/bids"
          className={`text-2xl text-grafit ${
            isActive("/admin/dashboard/bids")
              ? "border-b-2 border-grafit"
              : "hover:text-gold border-b-2 border-transparent hover:border-gold transition-border duration-300 ease-in-out"
          } `}
        >
          Bids
        </Link>
        <Link
          href="/admin/dashboard/winners"
          className={`text-2xl text-grafit ${
            isActive("/admin/dashboard/winners")
              ? "border-b-2 border-grafit"
              : "hover:text-gold border-b-2 border-transparent hover:border-gold transition-border duration-300 ease-in-out"
          } `}
        >
          Winners
        </Link>
      </nav>
    </div>
  );
};

export default Navigation;
