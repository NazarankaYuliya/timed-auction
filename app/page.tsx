"use client";

export default function Home() {
  const handleClick = () => {
    window.open("/guest", "_blank");
  };

  return (
    <div className="flex items-center mt-40 ml-10 font-display">
      <button
        onClick={handleClick}
        className="px-8 py-8 bg-beige text-grafit font-semibold hover:text-gold focus:outline-none focus:shadow-outline transition-colors duration-300 text-4xl"
      >
        zur Online Auktion
      </button>
    </div>
  );
}
