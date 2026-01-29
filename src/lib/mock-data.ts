import type { CheckIn, Thing } from "@/types";

const read10PagesId = crypto.randomUUID();
const exercise30MinId = crypto.randomUUID();
const practiceGuitarId = crypto.randomUUID();

export const mockThings: Thing[] = [
  {
    id: read10PagesId,
    title: "Read 10 pages",
    startDate: "2026-01-27",
    endDate: "2026-02-07",
    createdAt: new Date().toISOString(),
  },
  {
    id: exercise30MinId,
    title: "Exercise 30 minutes",
    startDate: "2026-01-26",
    endDate: "2026-02-05",
    createdAt: new Date().toISOString(),
  },
  {
    id: practiceGuitarId,
    title: "Practice guitar",
    startDate: "2026-01-28",
    endDate: "2026-02-17",
    createdAt: new Date().toISOString(),
  },
];

export const mockCheckIns: CheckIn[] = [
  // Read 10 pages (2026-01-27 .. 2026-02-07)
  { thingsId: read10PagesId, date: "2026-01-27" },
  { thingsId: read10PagesId, date: "2026-01-28" },
  { thingsId: read10PagesId, date: "2026-01-29" },
  { thingsId: read10PagesId, date: "2026-01-30" },
  { thingsId: read10PagesId, date: "2026-01-31" },
  { thingsId: read10PagesId, date: "2026-02-01" },
  { thingsId: read10PagesId, date: "2026-02-02" },
  { thingsId: read10PagesId, date: "2026-02-03" },
  { thingsId: read10PagesId, date: "2026-02-04" },
  { thingsId: read10PagesId, date: "2026-02-05" },
  { thingsId: read10PagesId, date: "2026-02-06" },
  { thingsId: read10PagesId, date: "2026-02-07" },

  // Exercise 30 minutes (2026-01-26 .. 2026-02-05)
  { thingsId: exercise30MinId, date: "2026-01-26" },
  { thingsId: exercise30MinId, date: "2026-01-27" },
  { thingsId: exercise30MinId, date: "2026-01-28" },
  { thingsId: exercise30MinId, date: "2026-01-29" },
  { thingsId: exercise30MinId, date: "2026-01-30" },
  { thingsId: exercise30MinId, date: "2026-01-31" },
  { thingsId: exercise30MinId, date: "2026-02-01" },
  { thingsId: exercise30MinId, date: "2026-02-02" },
  { thingsId: exercise30MinId, date: "2026-02-03" },
  { thingsId: exercise30MinId, date: "2026-02-04" },
  { thingsId: exercise30MinId, date: "2026-02-05" },

  // Practice guitar (2026-01-28 .. 2026-02-17)
  { thingsId: practiceGuitarId, date: "2026-01-28" },
  { thingsId: practiceGuitarId, date: "2026-01-29" },
  { thingsId: practiceGuitarId, date: "2026-01-30" },
  { thingsId: practiceGuitarId, date: "2026-01-31" },
  { thingsId: practiceGuitarId, date: "2026-02-01" },
  { thingsId: practiceGuitarId, date: "2026-02-02" },
  { thingsId: practiceGuitarId, date: "2026-02-03" },
  { thingsId: practiceGuitarId, date: "2026-02-04" },
  { thingsId: practiceGuitarId, date: "2026-02-05" },
  { thingsId: practiceGuitarId, date: "2026-02-06" },
  { thingsId: practiceGuitarId, date: "2026-02-07" },
  { thingsId: practiceGuitarId, date: "2026-02-08" },
  { thingsId: practiceGuitarId, date: "2026-02-09" },
  { thingsId: practiceGuitarId, date: "2026-02-10" },
  { thingsId: practiceGuitarId, date: "2026-02-11" },
  { thingsId: practiceGuitarId, date: "2026-02-12" },
  { thingsId: practiceGuitarId, date: "2026-02-13" },
  { thingsId: practiceGuitarId, date: "2026-02-14" },
  { thingsId: practiceGuitarId, date: "2026-02-15" },
  { thingsId: practiceGuitarId, date: "2026-02-16" },
  { thingsId: practiceGuitarId, date: "2026-02-17" },
];
