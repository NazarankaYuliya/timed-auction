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
