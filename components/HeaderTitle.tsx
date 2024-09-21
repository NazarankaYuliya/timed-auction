import Link from "next/link";

const HeaderTitle = () => {
  return (
    <div className="flex flex-row items-center">
      <Link
        href="https://www.petzold-auktionen.de/home"
        className="uppercase text-2xl sm:text-3xl lg:text-5xl xl:text-6xl"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h1>Petzold KG</h1>
      </Link>

      <div className="hidden md:flex md:flex-col ml-4 text-sm lg:text-base xl:text-xl ">
        <span>seit 1898</span>
        <span>Versteigerungen und Schätzungen</span>
      </div>
    </div>
  );
};

export default HeaderTitle;
