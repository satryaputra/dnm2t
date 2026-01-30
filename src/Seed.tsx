import { idbPromise } from "./App";
import { Button } from "./components/selia/button";
import { mockCheckIns, mockThings } from "./lib/mock-data";

export default function Seed() {
  async function seed() {
    const db = await idbPromise;
    for (const thing of mockThings) {
      await db.put("things", thing);
    }
    for (const checkIn of mockCheckIns) {
      await db.put("checkIns", checkIn);
    }
    alert("Seeded!");
  }

  return <Button onClick={seed}>Seed</Button>;
}
