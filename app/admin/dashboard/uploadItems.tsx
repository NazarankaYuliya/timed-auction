"use client";
import { useState } from "react";
import axios from "axios";

const UploadItemsButton = () => {
  const [message, setMessage] = useState<string | null>(null);

  const createItem = async () => {
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
  };

  return (
    <div className="space-y-4">
      <button
        onClick={createItem}
        className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
      >
        Upload Items
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
