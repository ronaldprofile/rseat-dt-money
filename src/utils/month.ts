// "YYYY-MM", always in local time (toISOString would shift late-night
// transactions at the end of the month into the next one)
export type MonthKey = string;

const monthFormatter = new Intl.DateTimeFormat("pt-br", {
  month: "long",
  year: "numeric",
});

function parseMonthKey(key: MonthKey) {
  const [year, month] = key.split("-").map(Number);

  return { year, monthIndex: month - 1 };
}

export function toMonthKey(date: Date): MonthKey {
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${date.getFullYear()}-${month}`;
}

export function currentMonthKey(): MonthKey {
  return toMonthKey(new Date());
}

export function shiftMonth(key: MonthKey, delta: number): MonthKey {
  const { year, monthIndex } = parseMonthKey(key);

  return toMonthKey(new Date(year, monthIndex + delta, 1));
}

export function daysInMonth(key: MonthKey): number {
  const { year, monthIndex } = parseMonthKey(key);

  return new Date(year, monthIndex + 1, 0).getDate();
}

export function formatMonth(key: MonthKey): string {
  const { year, monthIndex } = parseMonthKey(key);
  const label = monthFormatter.format(new Date(year, monthIndex, 1));

  return label.charAt(0).toUpperCase() + label.slice(1);
}
