"use client";

import { IItem } from "@types";
import { saveAs } from "file-saver";

const DownloadButton = ({ winners }: { winners: any }) => {
  const downloadCSV1 = () => {
    const csvData = winners.map((winner: any) => {
      const items = winner.items
        .map((item: IItem) => {
          return `Catalog Number: ${
            item.catalogNumber
          }, Price: ${item.currentBid.toFixed(2)}, Price with VAT: ${(
            item.currentBid * (item.isMarked ? 1.15 * 1.19 : 1 + 0.15 * 1.19)
          ).toFixed(2)}`;
        })
        .join("; ");

      return {
        firstName: winner.winnerData.firstName,
        lastName: winner.winnerData.lastName,
        email: winner.winnerData.email,
        phone: winner.winnerData.phone,
        city: winner.winnerData.city,
        postalCode: winner.winnerData.postalCode,
        country: winner.winnerData.country,
        items: items,
      };
    });

    const csvContent =
      ["First Name,Last Name,Email,Phone,City,PLZ,Country,Items"].join(",") +
      "\n" +
      csvData.map((row: any) => Object.values(row).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "winners_with_items_in_one_cell.csv");
  };

  const downloadCSV2 = () => {
    const csvData = winners
      .map((winner: any) =>
        winner.items.map((item: IItem) => ({
          catalogNumber: item.catalogNumber,
          currentBid: item.currentBid.toFixed(2),
          currentBidWithVAT: (
            item.currentBid * (item.isMarked ? 1.15 * 1.19 : 1 + 0.15 * 1.19)
          ).toFixed(2),
          firstName: winner.winnerData.firstName,
          lastName: winner.winnerData.lastName,
          email: winner.winnerData.email,
          phone: winner.winnerData.phone,
          street: winner.winnerData.street,
          city: winner.winnerData.city,
          postalCode: winner.winnerData.postalCode,
          country: winner.winnerData.country,
        })),
      )
      .flat();

    const csvContent =
      [
        "Catalog Number,Price,Price with VAT,First Name,Last Name,Email,Phone,Street,City,PLZ,Country",
      ].join(",") +
      "\n" +
      csvData.map((row: any) => Object.values(row).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "winners_with_each_item_in_separate_row.csv");
  };

  // Третий вариант - только информация о победителях
  const downloadCSV3 = () => {
    const csvData = winners.map((winner: any) => {
      const items = winner.items
        .map((item: IItem) => {
          return `${item.catalogNumber}`;
        })
        .join("; ");

      return {
        firstName: winner.winnerData.firstName,
        lastName: winner.winnerData.lastName,
        email: winner.winnerData.email,
        phone: winner.winnerData.phone,
        city: winner.winnerData.city,
        postalCode: winner.winnerData.postalCode,
        country: winner.winnerData.country,
        items: items,
      };
    });

    const csvContent =
      ["First Name,Last Name,Email,Phone,City,PLZ,Country,Items"].join(",") +
      "\n" +
      csvData.map((row: any) => Object.values(row).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "winners_with_lot_numbers.csv");
  };

  return (
    <div className="flex flex-wrap gap-4 w-full justify-center mb-8">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        onClick={downloadCSV1}
      >
        Download CSV (Items in One Cell)
      </button>

      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
        onClick={downloadCSV2}
      >
        Download CSV (Each Item in Separate Row)
      </button>

      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={downloadCSV3}
      >
        Download CSV (Winners with lot numbers)
      </button>
    </div>
  );
};

export default DownloadButton;
