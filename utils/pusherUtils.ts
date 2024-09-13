import { pusherClient } from "@utils/pusher";

export const subscribeToAuction = (updateItem: any) => {
  const channel = pusherClient.subscribe("auction-channel");

  channel.bind("bid-updated", (data: any) => {
    updateItem(data.itemId, data.currentBid, data.biddingStep, data.endDate);
  });

  return () => {
    pusherClient.unsubscribe("auction-channel");
  };
};
