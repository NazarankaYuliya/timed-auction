import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="bg-blue-100 p-8">
        <div className="flex flex-wrap justify-between">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Admin Dashboard
          </h1>
          <Link
            href="/admin/dashboard/items"
            className="text-blue-500 hover:text-blue-700"
          >
            Items
          </Link>
          <Link
            href="/admin/dashboard/users"
            className="text-blue-500 hover:text-blue-700"
          >
            Users
          </Link>
          <Link
            href="/admin/dashboard/bids"
            className="text-blue-500 hover:text-blue-700"
          >
            Bids
          </Link>
          <Link
            href="/admin/dashboard/winners"
            className="text-blue-500 hover:text-blue-700"
          >
            Winners
          </Link>
        </div>
      </div>
      <main>{children}</main>
    </>
  );
}
