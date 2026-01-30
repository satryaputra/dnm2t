import Stats from "@/Stats";
import Things from "@/Things";
import Fab from "@/Fab";
import AddThingDialog from "@/AddThingDialog";
import ThingDetail from "@/ThingDetail";

import type { CheckIn, Thing } from "@/types";
import { useEffect, useState } from "react";
import { formatDate, getActiveThings, getPercentage } from "./lib/utils";

import { openDB } from "idb";

export const idbPromise = openDB("things-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("things")) {
      db.createObjectStore("things", { keyPath: "id" });
    }

    if (!db.objectStoreNames.contains("checkIns")) {
      const store = db.createObjectStore("checkIns", {
        keyPath: ["thingId", "date"],
      });

      store.createIndex("by-thingId", "thingId");
      store.createIndex("by-date", "date");
    }
  },
});

export default function App() {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<boolean>(true);

  const [things, setThings] = useState<Thing[]>([]);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [loading, setLoading] = useState(true);

  // Listen param id
  useEffect(() => {
    setLoadingId(true);
    function updateId() {
      const params = new URLSearchParams(window.location.search);
      setId(params.get("id"));
    }

    updateId();
    window.addEventListener("popstate", updateId);
    setLoadingId(false);

    return () => window.removeEventListener("popstate", updateId);
  }, []);

  useEffect(() => {
    if (!id && !loadingId) {
      const url = new URL(window.location.href);
      url.searchParams.delete("id");

      window.history.pushState({}, "", url.toString());
      fetchData()
    }
  }, [id]);

  /* Calculate functions */

  function getPending(): number {
    const active = getActiveThings(things).length;
    const checked = checkIns.filter(
      (ci) => ci.date === formatDate(new Date()),
    ).length;

    return active - checked;
  }

  function getOverall(): number {
    const active = getActiveThings(things);
    const max = 100 / active.length;

    let overall = 0;
    for (const thing of active) {
      const percentage = getPercentage(thing, checkIns);
      overall += (percentage * max) / 100;
    }

    return Number(overall.toFixed(1));
  }

  /* Data fetching/mutating functions */

  async function fetchData() {
    setLoading(true);

    async function getAllThings() {
      const db = await idbPromise;
      setThings(await db.getAll("things"));
    }

    async function getAllCheckIns() {
      const db = await idbPromise;
      setCheckIns(await db.getAll("checkIns"));
    }

    await Promise.all([getAllThings(), getAllCheckIns()]);
    setLoading(false);
  }

  async function onSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const title = form.get("title") as string;
    const days = Number(form.get("days"));

    const startDate = new Date();
    const endDate = new Date();

    // get end date
    endDate.setDate(startDate.getDate() + days - 1);

    const newThing: Thing = {
      id: crypto.randomUUID(),
      title,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      createdAt: new Date().toISOString(),
    };

    const db = await idbPromise;
    await db.add("things", newThing);
    await fetchData();
    setOpen(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="w-md mx-auto min-h-svh pb-10">
      {loadingId ? (
        <p>Loading...</p>
      ) : id ? (
        <ThingDetail
          thingId={id}
          setId={setId}
          checkIns={checkIns.filter((ci) => ci.thingsId === id)}
        />
      ) : (
        <>
          <Stats pending={getPending()} percentage={getOverall()} />

          <Things
            things={things}
            loading={loading}
            checkIns={checkIns}
            setCheckIns={setCheckIns}
          />

          <Fab setOpen={setOpen} />
          <AddThingDialog open={open} setOpen={setOpen} onSubmit={onSubmit} />
        </>
      )}
    </main>
  );
}
