"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const routerPath = usePathname();
  const isActive = (path: string) => routerPath === path;
  return (
    <div className="bg-beige font-display p-8">
      <nav className="flex justify-between container mx-auto">
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
          href="/admin/items"
          className={`text-2xl text-grafit ${
            isActive("/admin/items")
              ? "border-b-2 border-grafit"
              : "hover:text-gold border-b-2 border-transparent hover:border-gold transition-border duration-300 ease-in-out"
          } `}
        >
          Items
        </Link>
        <Link
          href="/admin/users"
          className={`text-2xl text-grafit ${
            isActive("/admin/users")
              ? "border-b-2 border-grafit"
              : "hover:text-gold border-b-2 border-transparent hover:border-gold transition-border duration-300 ease-in-out"
          } `}
        >
          Users
        </Link>
        <Link
          href="/admin/bids"
          className={`text-2xl text-grafit ${
            isActive("/admin/bids")
              ? "border-b-2 border-grafit"
              : "hover:text-gold border-b-2 border-transparent hover:border-gold transition-border duration-300 ease-in-out"
          } `}
        >
          Bids
        </Link>
        <Link
          href="/admin/winners"
          className={`text-2xl text-grafit ${
            isActive("/admin/winners")
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
