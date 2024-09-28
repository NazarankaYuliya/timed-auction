import Navigation from "../(components)/Navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />
      <main className="container mx-auto p-4">{children}</main>
    </>
  );
}
