interface PriceRange {
  min: number;
  max: number;
  step: number;
}

export const priceRanges: PriceRange[] = [
  { min: 0, max: 19, step: 2 },
  { min: 20, max: 59, step: 5 },
  { min: 60, max: 159, step: 10 },
  { min: 160, max: 299, step: 20 },
  { min: 300, max: 449, step: 30 },
  { min: 450, max: 899, step: 50 },
  { min: 900, max: 1799, step: 100 },
  { min: 1800, max: 2999, step: 200 },
  { min: 3000, max: 4499, step: 300 },
  { min: 4500, max: 9999, step: 500 },
  { min: 10000, max: 24999, step: 1000 },
  { min: 25000, max: 49999, step: 2500 },
  { min: 50000, max: Infinity, step: 5000 },
];

const getStepForPrice = (price: number): PriceRange => {
  for (const range of priceRanges) {
    if (price >= range.min && price < range.max) {
      return range;
    }
  }
  throw new Error("Price is out of valid ranges");
};

export const getValidBidOrSuggestion = (maxBid: number): number | string => {
  const range = getStepForPrice(maxBid);

  const remainder = (maxBid - range.min) % range.step;

  if (remainder === 0) {
    return maxBid;
  } else {
    const suggestedBid = maxBid + (range.step - remainder);
    return suggestedBid;
  }
};
