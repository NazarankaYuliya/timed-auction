"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";

const ItemDescription = ({
  catalogNumber,
  description,
}: {
  catalogNumber: number;
  description: string;
}) => {
  const parseDescription = (description: string) => {
    const parts = description.split(",");

    const parsedData = {
      title: parts[0]?.trim(),
      manufacturer: parts
        .find((part) => part.includes("Hersteller"))
        ?.split(":")[1]
        ?.trim(),
      type: parts
        .find((part) => part.includes("Typ"))
        ?.split(":")[1]
        ?.trim(),
      year: parts
        .find((part) => part.includes("Bj"))
        ?.split(":")[1]
        ?.trim(),
      sn: parts
        .find((part) => part.includes("SN"))
        ?.split(":")[1]
        ?.trim(),
      condition: parts
        .find((part) => part.includes("Zustand"))
        ?.split(":")[1]
        ?.trim(),
      accessories: getZubehoer(description),
    };

    return parsedData;
  };

  const getZubehoer = (description: string) => {
    const lowerDescription = description.toLowerCase();
    const zubehoerIndex = lowerDescription.indexOf("zubehör");

    if (zubehoerIndex !== -1) {
      const zubehoerPart = description.slice(zubehoerIndex);
      const zubehoerValue = zubehoerPart.split(":")[1]?.trim();
      return zubehoerValue;
    }

    return null;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const parsedData = parseDescription(description);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-full flex flex-col gap-1 mb-4">
      <p className="text-gold text-xl font-semibold">{catalogNumber}</p>
      <div className="flex gap-2 justify-between items-baseline">
        <p className="text-grafit text-base tracking-wide font-oswald py-1">
          {parsedData.title}
        </p>

        <button
          onClick={openModal}
          className="text-cgreen text-sm hover:text-gold border border-cgreen px-2 py-1"
        >
          Mehr erfahren
        </button>
      </div>

      <Dialog open={isModalOpen} onClose={closeModal} className="relative z-10">
        <div className="fixed inset-0 bg-black bg-opacity-50" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white mx-2 my-1 p-10 shadow-lg max-w-lg w-full text-center relative flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gold mb-2">
              {catalogNumber} - {parsedData.title}
            </h2>

            <ul className="text-sm text-grafit flex flex-col gap-2">
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
    </div>
  );
};

export default ItemDescription;
