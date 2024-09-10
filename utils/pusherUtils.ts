import { pusherClient } from "@utils/pusher";

export const subscribeToAuction = (
  itemId: string,
  handleBidUpdate: (currentBid: number) => void,
  handleEndDateUpdate: (endDate: Date) => void,
) => {
  const channel = pusherClient.subscribe("auction-channel");
  const event = `bid-updated-${itemId}`;

  channel.bind(event, (data: { currentBid: number; endDate: Date }) => {
    handleBidUpdate(data.currentBid);
    handleEndDateUpdate(data.endDate);
  });

  return () => {
    channel.unbind(event);
    pusherClient.unsubscribe("auction-channel");
  };
};
