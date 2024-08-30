"use client";

import { useState, useRef } from "react";

export default function UploadImages() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

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
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col justify-between">
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
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
        >
          Upload Images
        </button>
      </form>

      {message && (
        <p className="mt-4 text-lg font-medium text-center text-blue-600">
          {message}
        </p>
      )}
    </div>
  );
}
