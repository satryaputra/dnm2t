import type { CheckIn, Thing } from "@/types";

const read10PagesId = crypto.randomUUID();
// @ts-ignore - unused in mock data but kept for future use
const exercise30MinId = crypto.randomUUID();
// @ts-ignore - unused in mock data but kept for future use
const practiceGuitarId = crypto.randomUUID();

export const mockThings: Thing[] = [
  {
    id: read10PagesId,
    title: "Read 10 pages",
    startDate: "2026-01-27",
    endDate: "2026-02-07",
    createdAt: new Date().toISOString(),
  },
  // {
  //   id: exercise30MinId,
  //   title: "Exercise 30 minutes",
  //   startDate: "2026-01-26",
  //   endDate: "2026-02-05",
  //   createdAt: new Date().toISOString(),
  // },
  // {
  //   id: practiceGuitarId,
  //   title: "Practice guitar",
  //   startDate: "2026-01-28",
  //   endDate: "2026-02-17",
  //   createdAt: new Date().toISOString(),
  // },
];

export const mockCheckIns: CheckIn[] = [
  // Read 10 pages (2026-01-27 .. 2026-02-07)
  { thingId: read10PagesId, date: "2026-01-27" },
  { thingId: read10PagesId, date: "2026-01-28" },
  { thingId: read10PagesId, date: "2026-01-29" },
  // { thingId: read10PagesId, date: "2026-01-30" },
  { thingId: read10PagesId, date: "2026-01-31" },
  // { thingId: read10PagesId, date: "2026-02-01" },
  // { thingId: read10PagesId, date: "2026-02-02" },
  // { thingId: read10PagesId, date: "2026-02-03" },
  // { thingId: read10PagesId, date: "2026-02-04" },
  // { thingId: read10PagesId, date: "2026-02-05" },
  // { thingId: read10PagesId, date: "2026-02-06" },
  // { thingId: read10PagesId, date: "2026-02-07" },

  // Exercise 30 minutes (2026-01-26 .. 2026-02-05)
  // { thingId: exercise30MinId, date: "2026-01-26" },
  // { thingId: exercise30MinId, date: "2026-01-27" },
  // { thingId: exercise30MinId, date: "2026-01-28" },
  // { thingId: exercise30MinId, date: "2026-01-29" },
  // { thingId: exercise30MinId, date: "2026-01-30" },
  // { thingId: exercise30MinId, date: "2026-01-31" },
  // { thingId: exercise30MinId, date: "2026-02-01" },
  // { thingId: exercise30MinId, date: "2026-02-02" },
  // { thingId: exercise30MinId, date: "2026-02-03" },
  // { thingId: exercise30MinId, date: "2026-02-04" },
  // { thingId: exercise30MinId, date: "2026-02-05" },

  // Practice guitar (2026-01-28 .. 2026-02-17)
  // { thingId: practiceGuitarId, date: "2026-01-28" },
  // { thingId: practiceGuitarId, date: "2026-01-29" },
  // { thingId: practiceGuitarId, date: "2026-01-30" },
  // { thingId: practiceGuitarId, date: "2026-01-31" },
  // { thingId: practiceGuitarId, date: "2026-02-01" },
  // { thingId: practiceGuitarId, date: "2026-02-02" },
  // { thingId: practiceGuitarId, date: "2026-02-03" },
  // { thingId: practiceGuitarId, date: "2026-02-04" },
  // { thingId: practiceGuitarId, date: "2026-02-05" },
  // { thingId: practiceGuitarId, date: "2026-02-06" },
  // { thingId: practiceGuitarId, date: "2026-02-07" },
  // { thingId: practiceGuitarId, date: "2026-02-08" },
  // { thingId: practiceGuitarId, date: "2026-02-09" },
  // { thingId: practiceGuitarId, date: "2026-02-10" },
  // { thingId: practiceGuitarId, date: "2026-02-11" },
  // { thingId: practiceGuitarId, date: "2026-02-12" },
  // { thingId: practiceGuitarId, date: "2026-02-13" },
  // { thingId: practiceGuitarId, date: "2026-02-14" },
  // { thingId: practiceGuitarId, date: "2026-02-15" },
  // { thingId: practiceGuitarId, date: "2026-02-16" },
  // { thingId: practiceGuitarId, date: "2026-02-17" },
];
