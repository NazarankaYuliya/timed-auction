export const formatTimeUnit = (unit: number, singular: string) =>
  unit > 0 ? `${unit}${singular} ` : "";

export const calculateTimeRemaining = (endDate: Date) => {
  const now = new Date();
  const timeToEnd = endDate.getTime() - now.getTime();

  const weeks = Math.floor(timeToEnd / (1000 * 60 * 60 * 24 * 7));
  const days = Math.floor(
    (timeToEnd % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24),
  );
  const hours = Math.floor(
    (timeToEnd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeToEnd % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeToEnd % (1000 * 60)) / 1000);

  return `${formatTimeUnit(weeks, "w")}${formatTimeUnit(
    days,
    "d",
  )}${formatTimeUnit(hours, "h")}${formatTimeUnit(
    minutes,
    "m",
  )}${formatTimeUnit(seconds, "s")} verbleibend`;
};

export const formatDateAndTime = (date: Date) => {
  const formattedDate = date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const formattedTime =
    date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }) +
    " Uhr";

  return `${formattedDate}\n${formattedTime}`;
};
