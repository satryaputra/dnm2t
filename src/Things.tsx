import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  ItemAction,
} from "@/components/selia/item";
import { Button } from "@/components/selia/button";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import type { CheckIn, Thing } from "@/types";
import { getPercentage, isCheckedIn } from "@/lib/utils";

export default function Things({
  things,
  loading,
  checkIns,
  setCheckIns,
}: {
  things: Thing[];
  loading: boolean;
  checkIns: CheckIn[];
  setCheckIns: React.Dispatch<React.SetStateAction<CheckIn[]>>;
}) {
  const today = new Date().toISOString().split("T")[0];

  function check(thingId: string) {
    setCheckIns((prev) => {
      if (prev.some((ci) => ci.thingsId === thingId && ci.date === today)) {
        return prev;
      }

      return [...prev, { thingsId: thingId, date: today }];
    });
  }

  function uncheck(thingId: string) {
    setCheckIns((prev) =>
      prev.filter((ci) => !(ci.thingsId === thingId && ci.date === today)),
    );
  }

  return (
    <div className="mt-6 pb-28">
      <div className="flex w-full justify-between px-2 items-center">
        <p className="text-xl font-semibold">Things</p>
        <p className="text-sm text-blue-300 hidden">View all</p>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {loading ? (
          <p className="text-sm text-muted px-2">Loading...</p>
        ) : things.length === 0 ? (
          <p className="text-sm text-muted px-2">No things yet.</p>
        ) : (
          things
            .sort((a, b) => {
              const isCheckedA = isCheckedIn(a.id, checkIns);
              const isCheckedB = isCheckedIn(b.id, checkIns);

              if (isCheckedA && !isCheckedB) return 1;
              if (!isCheckedA && isCheckedB) return -1;

              return 0;
            })
            .map((thing) => {
              const isChecked = isCheckedIn(thing.id, checkIns);

              const url = new URL(window.location.href);
              url.searchParams.set("id", thing.id);

              return (
                <Item key={thing.id} className="items-center">
                  <ItemMedia
                    onClick={() => {
                      window.history.pushState({}, "", url.toString());
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }}
                    className="cursor-pointer"
                  >
                    <Chart value={getPercentage(thing, checkIns)} />
                  </ItemMedia>
                  <ItemContent
                    onClick={() => {
                      window.history.pushState({}, "", url.toString());
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }}
                    className="cursor-pointer"
                  >
                    <ItemTitle>{thing.title}</ItemTitle>
                    <ItemDescription>
                      {thing.startDate} → {thing.endDate}
                    </ItemDescription>
                  </ItemContent>
                  <ItemAction>
                    {isChecked ? (
                      <Button
                        size="sm"
                        pill
                        variant={"outline"}
                        onClick={() => uncheck(thing.id)}
                      >
                        Uncheck
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        pill
                        variant={"primary"}
                        onClick={() => check(thing.id)}
                      >
                        Check In
                      </Button>
                    )}
                  </ItemAction>
                </Item>
              );
            })
        )}
      </div>
    </div>
  );
}

function Chart({ value }: { value: number }) {
  return (
    <div className="relative size-14">
      <RadialBarChart
        width={56}
        height={56}
        cx="50%"
        cy="50%"
        innerRadius={20}
        outerRadius={28}
        barSize={6}
        data={[{ value }]}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        <RadialBar
          background={{ fill: "var(--accent)" }}
          dataKey="value"
          cornerRadius={10}
          fill="var(--primary)"
        />
      </RadialBarChart>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
        {value}%
      </span>
    </div>
  );
}
