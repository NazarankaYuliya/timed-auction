"use client";
import axios from "axios";

const UploadItemsButton = () => {
  const createItem = async () => {
    await axios.post("/api/items");
  };

  return (
    <button
      onClick={createItem}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Upload Items
    </button>
  );
};

export default UploadItemsButton;
