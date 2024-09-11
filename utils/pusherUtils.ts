import { pusherClient } from "@utils/pusher";

export const subscribeToAuction = (
  handleItemUpdate: (itemId: string, currentBid: number, endDate: Date) => void,
) => {
  const channel = pusherClient.subscribe("auction-channel");

  channel.bind(
    "bid-updated",
    (data: { itemId: string; currentBid: number; endDate: Date }) => {
      handleItemUpdate(data.itemId, data.currentBid, new Date(data.endDate));
    },
  );

  return () => {
    channel.unbind("bid-updated");
    pusherClient.unsubscribe("auction-channel");
  };
};
