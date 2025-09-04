export const categories: Record<string, string> = {
  B: "Buchbinder",
  A: "Autowerkstatt",
  H: "Hauswirtschaft",
  V: "Verschiedenes",
  T: "Tischlerei",
  G: "Gartenbau",
  W: "Wohnen",
  HW: "Hauswirtschaft",
  BK: "Küche",
  F: "Fleischerei",
  S: "Spezial",
};

export type CategoryCode = keyof typeof categories;
