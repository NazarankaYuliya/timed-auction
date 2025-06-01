"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";

const ItemDescription = ({
  catalogNumber,
  description,
}: {
  catalogNumber: number;
  description?: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const parseDescription = (description: string) => {
    const fields = ["Hersteller", "Typ", "Baujahr", "SN", "Zustand", "Details"];

    const clean = (value: string | null): string | null => {
      if (!value) return null;
      return value.replace(/[,\s]+$/, "").trim();
    };
    const getValue = (label: string) => {
      const pattern = new RegExp(
        `${label}:\\s*([\\s\\S]*?)(?=\\b(${fields.join("|")}):|$)`,
        "i",
      );
      const match = description.match(pattern);
      return clean(match?.[1] || null);
    };

    const getTitle = () => {
      const pattern = new RegExp(
        `^([\\s\\S]*?)(?=\\b(${fields.join("|")}):)`,
        "i",
      );
      const match = description.match(pattern);
      return clean(match?.[1] || description.trim());
    };

    return {
      title: getTitle(),
      manufacturer: getValue("Hersteller"),
      type: getValue("Typ"),
      year: getValue("Baujahr"),
      sn: getValue("SN"),
      condition: getValue("Zustand"),
      details: getValue("Details"),
    };
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const parsedData = description ? parseDescription(description) : null;

  return (
    <div className="w-full flex flex-col gap-1 mb-4">
      <p className="text-gold text-xl font-semibold">{catalogNumber}</p>

      {parsedData ? (
        <>
          <div className="w-full flex gap-2 items-start">
            <div className="w-3/4">
              <p className="text-grafit text-base tracking-wide font-oswald py-1 line-clamp-2">
                {parsedData.title}
              </p>
            </div>
            <div className="w-1/4">
              <button
                onClick={openModal}
                className="w-full text-cgreen text-sm hover:text-gold border border-cgreen px-2 py-1"
              >
                Mehr erfahren
              </button>
            </div>
          </div>

          <Dialog
            open={isModalOpen}
            onClose={closeModal}
            className="relative z-10"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
              <DialogPanel className="bg-white mx-2 my-1 p-10 shadow-lg max-w-lg w-full text-center relative flex flex-col gap-4">
                <h2 className="text-lg font-bold text-gold mb-2">
                  {catalogNumber} - {parsedData.title}
                </h2>

                <ul className="text-sm text-grafit flex flex-col gap-2 text-left">
                  {[
                    { label: "Hersteller", value: parsedData.manufacturer },
                    { label: "Typ", value: parsedData.type },
                    { label: "Baujahr", value: parsedData.year },
                    { label: "Seriennummer (SN)", value: parsedData.sn },
                    { label: "Zustand", value: parsedData.condition },
                    { label: "Weitere Details", value: parsedData.details },
                  ]
                    .filter((item) => item.value)
                    .map((item, idx) => (
                      <li key={idx}>
                        <strong>{item.label}:</strong> {item.value}
                      </li>
                    ))}
                </ul>
                <button
                  onClick={closeModal}
                  className="text-3xl md:text-4xl absolute z-40 right-0 top-0 text-grafit hover:text-gold bg-white w-12 cursor-pointer"
                >
                  &times;
                </button>
              </DialogPanel>
            </div>
          </Dialog>
        </>
      ) : (
        <p className="text-grafit text-sm italic">
          Keine Beschreibung verfügbar
        </p>
      )}
    </div>
  );
};

export default ItemDescription;
