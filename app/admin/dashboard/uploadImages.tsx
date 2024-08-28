"use client";

import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef } from "react";

export default function UploadImages() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blobs, setBlobs] = useState<PutBlobResult[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No files selected");
    }

    const files = Array.from(inputFileRef.current.files);

    try {
      const uploadPromises = files.map(async (file) => {
        const response = await fetch(`/api/files?filename=${file.name}`, {
          method: "POST",
          body: file,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        const newBlob = (await response.json()) as PutBlobResult;
        return newBlob;
      });

      const blobs = await Promise.all(uploadPromises);
      setBlobs(blobs);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <>
      <h1>Upload Images</h1>

      <form onSubmit={handleSubmit}>
        <input name="file" ref={inputFileRef} type="file" required multiple />
        <button type="submit">Upload</button>
      </form>

      {/* {blobs.length > 0 && (
        <div>
          {blobs.map((blob, index) => (
            <div key={index}>
              Blob url: <p>{blob.url}</p>
              <p>{blob.pathname}</p>
            </div>
          ))}
        </div>
      )} */}
    </>
  );
}
