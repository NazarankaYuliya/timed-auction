"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { IDescription } from "@types";

type Props = {
  catalogNumber: number;
  description?: IDescription | null;
};

const ItemDescription = ({ catalogNumber, description }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!description) {
    return (
      <div className="w-full flex flex-col gap-1 mb-4">
        <p className="text-gold text-xl font-semibold">{catalogNumber}</p>
        <p className="text-grafit text-sm italic">
          Keine Beschreibung verfügbar
        </p>
      </div>
    );
  }

  const { header, producer, type, year, sn, condition, details } = description;

  const fields = [
    { label: "Hersteller", value: producer },
    { label: "Typ", value: type },
    { label: "Baujahr", value: year },
    { label: "Seriennummer (SN)", value: sn },
    { label: "Zustand", value: condition },
    { label: "Weitere Details", value: details },
  ].filter((f) => f.value && String(f.value).trim().length > 0);

  return (
    <div className="w-full flex flex-col gap-1 mb-4">
      <p className="text-gold text-xl font-semibold">{catalogNumber}</p>

      <div className="w-full flex gap-2 items-start">
        <div className="w-3/4">
          <p className="text-grafit text-base tracking-wide font-oswald py-1 line-clamp-2">
            {header || "—"}
          </p>
        </div>
        {fields.length > 0 && (
          <div className="w-1/4">
            <button
              onClick={openModal}
              className="w-full text-cgreen text-sm hover:text-gold border border-cgreen px-2 py-1"
            >
              Mehr erfahren
            </button>
          </div>
        )}
      </div>

      <Dialog open={isModalOpen} onClose={closeModal} className="relative z-10">
        <div className="fixed inset-0 bg-black bg-opacity-50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white mx-2 my-1 p-10 shadow-lg max-w-lg w-full text-center relative flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gold mb-2">
              {catalogNumber} - {header || "Details"}
            </h2>

            <ul className="text-sm text-grafit flex flex-col gap-2 text-left">
              {fields.map((item, idx) => (
                <li key={idx}>
                  <strong>{item.label}:</strong> {item.value}
                </li>
              ))}
            </ul>

            <button
              onClick={closeModal}
              className="text-3xl md:text-4xl absolute z-40 right-0 top-0 text-grafit hover:text-gold bg-white w-12 cursor-pointer"
              aria-label="Schließen"
            >
              &times;
            </button>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default ItemDescription;
