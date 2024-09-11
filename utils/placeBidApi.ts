export const placeBidApi = async (
  itemId: string,
  userId: string,
  bidAmount: number,
) => {
  const response = await fetch("/api/bid/add-bid", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ itemId, userId, bidAmount }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Fehler beim Platzieren des Gebots.");
  }

  return await response.json();
};
