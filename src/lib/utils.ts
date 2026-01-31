import type { CheckIn, Thing } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function isCheckedIn(thingId: string, checkIns: CheckIn[]): boolean {
  const today = formatDate(new Date());
  return checkIns.some((ci) => ci.thingId === thingId && ci.date === today);
}

export function getTotalDays(startDate: string, endDate: string) {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  const start = new Date(startDate);
  const end = new Date(endDate);

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const res = Math.abs(
    Math.floor((end.getTime() - start.getTime()) / MS_PER_DAY),
  );

  // inclusive
  return res + 1;
}

function getCompletedDays(thingId: string, checkIns: CheckIn[]) {
  return checkIns.filter((ci) => ci.thingId === thingId).length;
}

export function getPercentage(thing: Thing, checkIns: CheckIn[]): number {
  const totalDays = getTotalDays(thing.startDate, thing.endDate);
  const daysCompleted = getCompletedDays(thing.id, checkIns);

  return Math.round((daysCompleted / totalDays) * 100);
}

export function getActiveThings(
  things: Thing[],
  today = formatDate(new Date()),
): Thing[] {
  return things.filter(
    (thing) => thing.startDate <= today && thing.endDate >= today,
  );
}

export function getStreaks(thing: Thing, checkIns: CheckIn[]) {
  const dates = Array.from(
    new Set(
      checkIns
        .filter((ci) => ci.thingId === thing.id)
        .map((ci) => ci.date)
        .sort(),
    ),
  );

  if (dates.length === 0) {
    return { current: 0, longest: 0 };
  }

  let longest = 1;
  let runningLongest = 1;

  for (let i = 1; i < dates.length; i++) {
    const diff = diffDays(dates[i - 1], dates[i]);
    runningLongest = diff === 1 ? runningLongest + 1 : 1;
    longest = Math.max(longest, runningLongest);
  }

  // Current streak is only counted if it reaches today.
  const today = formatDate(new Date());
  const lastDate = dates[dates.length - 1];
  if (lastDate !== today) {
    return { current: 0, longest };
  }

  let current = 1;
  for (let i = dates.length - 1; i >= 1; i--) {
    const diff = diffDays(dates[i - 1], dates[i]);
    if (diff === 1) {
      current++;
    } else {
      break;
    }
  }

  return { current, longest };
}

const DAY = 1000 * 60 * 60 * 24;

function diffDays(date1: string, date2: string) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / DAY);
}
