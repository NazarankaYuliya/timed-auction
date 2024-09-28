"use client";

import { useState, useRef } from "react";

export default function UploadImages() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    if (!inputFileRef.current?.files) {
      setMessage("No files selected");
      return;
    }

    const files = Array.from(inputFileRef.current.files);

    try {
      await Promise.all(
        files.map(async (file) => {
          const response = await fetch(`/api/files?filename=${file.name}`, {
            method: "POST",
            body: file,
          });

          if (!response.ok) {
            throw new Error(`Failed to upload ${file.name}`);
          }
        }),
      );
      setMessage("Files uploaded successfully!");
    } catch (error) {
      setMessage(`Error uploading files: ${(error as Error).message}`);
    }
    setIsLoading(false);
  };

  return (
    <div className="border-2 border-beige p-6 rounded-sm shadow-md flex flex-col gap-4 justify-between font-display">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        Upload Images
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="file"
          ref={inputFileRef}
          type="file"
          required
          multiple
          className="block w-full text-gray-700 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {message && (
          <p className="mt-4 mb-4 text-lg font-medium text-center text-grafit">
            {message}
          </p>
        )}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-grafit text-white rounded-sm hover:bg-green-600 transition-colors duration-300"
        >
          {isLoading ? "Loading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
