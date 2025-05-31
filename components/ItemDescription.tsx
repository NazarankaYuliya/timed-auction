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
    const getValue = (label: string) => {
      const match = description.match(new RegExp(`${label}:\\s*([^,\\n]+)`));
      return match?.[1]?.trim() || null;
    };

    const getCondition = () => {
      const match = description.match(/Zustand:\s*(.*?)(?=Details:|$)/i);
      return match?.[1]?.trim() || null;
    };

    const getAccessories = () => {
      const detailsMatch = description.match(/Details:(.+)/i);
      return detailsMatch?.[1]?.trim() || null;
    };

    return {
      title: description.split(",")[0].trim(),
      manufacturer: getValue("Hersteller"),
      type: getValue("Typ"),
      year: getValue("Baujahr"),
      sn: getValue("SN"),
      condition: getCondition(),
      accessories: getAccessories(),
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
                  <li>
                    <strong>Hersteller:</strong> {parsedData.manufacturer}
                  </li>
                  <li>
                    <strong>Typ:</strong> {parsedData.type}
                  </li>
                  <li>
                    <strong>Baujahr:</strong> {parsedData.year}
                  </li>
                  <li>
                    <strong>Seriennummer (SN):</strong> {parsedData.sn}
                  </li>
                  <li>
                    <strong>Zustand:</strong> {parsedData.condition}
                  </li>
                  <li>
                    <strong>Weitere Details:</strong> {parsedData.accessories}
                  </li>
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
