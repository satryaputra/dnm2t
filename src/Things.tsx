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
import { getPercentage, getStreaks, isCheckedIn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { FireIcon, RemoveIcon, RepeatIcon } from "@hugeicons/core-free-icons";

export default function Things({
  things,
  loading,
  checkIns,
  toggleCheck,
}: {
  things: Thing[];
  loading: boolean;
  checkIns: CheckIn[];
  toggleCheck: (thingId: string) => Promise<void>;
}) {
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

              const { current } = getStreaks(thing, checkIns);

              return (
                <Item key={thing.id} className="items-center">
                  <ItemMedia
                    onClick={() => {
                      window.history.pushState({}, "", url.toString());
                      window.dispatchEvent(new PopStateEvent("popstate"));
                    }}
                    className="cursor-pointer"
                  >
                    <Chart value={getPercentage(thing, checkIns)} />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle
                      onClick={() => {
                        window.history.pushState({}, "", url.toString());
                        window.dispatchEvent(new PopStateEvent("popstate"));
                      }}
                      className="cursor-pointer text-md font-semibold"
                    >
                      {thing.title}
                    </ItemTitle>
                    {current > 0 && current <= 2 ? (
                      <ItemDescription className="text-sm flex items-center gap-1 mt-1">
                        <HugeiconsIcon icon={RepeatIcon} size={15} />
                        {current} Day streak
                      </ItemDescription>
                    ) : current > 2 ? (
                      <ItemDescription className="text-sm flex items-center gap-1 mt-1">
                        <HugeiconsIcon
                          icon={FireIcon}
                          size={15}
                          className="-mt-0.5 text-orange-400"
                        />
                        {current} Day streak
                      </ItemDescription>
                    ) : (
                      <ItemDescription className="text-sm flex items-center gap-1 mt-1">
                        <HugeiconsIcon icon={RemoveIcon} size={15} />
                        No active streak
                      </ItemDescription>
                    )}
                  </ItemContent>
                  <ItemAction>
                    {isChecked ? (
                      <Button
                        size="sm"
                        pill
                        variant={"outline"}
                        onClick={() => toggleCheck(thing.id)}
                      >
                        Uncheck
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        pill
                        variant={"primary"}
                        onClick={() => toggleCheck(thing.id)}
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
