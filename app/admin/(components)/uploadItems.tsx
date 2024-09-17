"use client";
import { useState } from "react";
import axios from "axios";

const UploadItemsButton = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createItem = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/items");
      if (response.status === 201) {
        setMessage("Items uploaded successfully!");
      } else {
        throw new Error("Failed to upload items");
      }
    } catch (error) {
      setMessage(`Error: ${(error as Error).message}`);
    }
    setIsLoading(false);
  };

  return (
    <div className="border-2 border-beige p-6 rounded-lg shadow-md flex flex-col gap-4 justify-between">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        Upload Items
      </h2>
      <p>Upload items from Ninox table</p>
      <button
        onClick={createItem}
        className="w-full py-2 px-4 bg-grafit text-white rounded hover:bg-green-600 transition-colors duration-300"
      >
        {isLoading ? "Loading..." : "Upload"}
      </button>

      {message && (
        <p className="text-lg font-medium text-center text-green-600">
          {message}
        </p>
      )}
    </div>
  );
};

export default UploadItemsButton;
