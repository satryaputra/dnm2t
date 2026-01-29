const DB_NAME = "dnm2t";
const DB_VERSION = 1;

export type Thing = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  createdAt: number;
};

let dbPromise: Promise<IDBDatabase> | null = null;

export function initDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains("things")) {
        db.createObjectStore("things", { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains("checkins")) {
        const store = db.createObjectStore("checkins", {
          keyPath: ["thingId", "date"],
        });
        store.createIndex("thingId", "thingId");
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      dbPromise = null;
      reject(request.error);
    };
  });

  return dbPromise;
}

export async function addThing(thing: Thing) {
  const db = await initDB();

  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction("things", "readwrite");
    tx.objectStore("things").add(thing);

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getThings(): Promise<Thing[]> {
  const db = await initDB();

  return new Promise<Thing[]>((resolve, reject) => {
    const tx = db.transaction("things", "readonly");
    const request = tx.objectStore("things").getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
