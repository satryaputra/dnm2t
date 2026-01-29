import { ThemeProvider } from "./components/theme-provider";
import { useEffect, useState } from "react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  ItemAction,
} from "@/components/selia/item";
import { Stack } from "@/components/selia/stack";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  AutoConversationsIcon,
  Calendar04Icon,
  Remove01Icon,
  Settings03Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/selia/button";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogPopup,
  DialogFooter,
  DialogTrigger,
} from "@/components/selia/dialog";
import { Field, FieldError, FieldLabel } from "@/components/selia/field";
import { Fieldset } from "@/components/selia/fieldset";
import { Form } from "@/components/selia/form";
import { Input } from "@/components/selia/input";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@/components/selia/number-field";
import { addThing, getThings, type Thing } from "@/lib/indexed-db";

export default function App() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [things, setThings] = useState<Thing[]>([]);

  async function refreshThings() {
    const nextThings = await getThings();
    nextThings.sort((a, b) => b.createdAt - a.createdAt);
    setThings(nextThings);
  }

  useEffect(() => {
    void refreshThings();
  }, []);

  function toYyyyMmDd(date: Date) {
    return date.toISOString().slice(0, 10);
  }

  async function handleAddThingSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    const days = Number(formData.get("days"));

    if (!title) return;
    if (!Number.isFinite(days) || days < 1) return;

    const start = new Date();
    const end = new Date(start);
    end.setDate(end.getDate() + days);

    const thing: Thing = {
      id: crypto.randomUUID(),
      title,
      startDate: toYyyyMmDd(start),
      endDate: toYyyyMmDd(end),
      createdAt: Date.now(),
    };

    try {
      await addThing(thing);
      event.currentTarget.reset();
      setIsAddDialogOpen(false);
      void refreshThings();
    } catch (error) {
      console.error("Failed to save thing", error);
    }
  }

  return (
    <ThemeProvider defaultTheme={"dark"}>
      <main className="w-md mx-auto relative min-h-svh">
        {/* Header */}
        <div className="hidden pt-6 sm:flex justify-end px-2">
          <HugeiconsIcon icon={Settings03Icon} />
        </div>

        <div className="mt-6 flex justify-center">
          <Stack direction="row" className="w-full">
            <Item direction="column" className="flex-1 p-5">
              <ItemMedia>
                <Stack direction="row" spacing={"sm"}>
                  <HugeiconsIcon icon={Calendar04Icon} />
                  <p>Today's Focus</p>
                </Stack>
              </ItemMedia>
              <ItemContent className="mt-1">
                <ItemTitle className="text-3xl font-bold">3 Pending</ItemTitle>
                <ItemDescription className="text-sm mt-1">
                  Keep the momentum
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item direction="column" className="flex-1 p-5">
              <ItemMedia>
                <Stack direction="row" spacing={"sm"}>
                  <HugeiconsIcon icon={AutoConversationsIcon} />
                  <p>Overall</p>
                </Stack>
              </ItemMedia>
              <ItemContent className="mt-1">
                <ItemTitle className="text-3xl font-bold">90%</ItemTitle>
                <ItemDescription className="text-sm mt-1">
                  Commitment Rate
                </ItemDescription>
              </ItemContent>
            </Item>
          </Stack>
        </div>

        <div className="mt-6">
          <div className="flex w-full justify-between px-2 items-center">
            <p className="text-xl font-semibold">Things</p>
            <p className="text-sm text-blue-300 hidden">View all</p>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            {things.length === 0 ? (
              <p className="text-sm text-muted px-2">No things yet.</p>
            ) : (
              things.map((thing) => (
                <Item key={thing.id} className="items-center">
                  <ItemMedia>
                    <div className="relative size-14">
                      <RadialBarChart
                        width={56}
                        height={56}
                        cx="50%"
                        cy="50%"
                        innerRadius={20}
                        outerRadius={28}
                        barSize={6}
                        data={[{ value: 0 }]}
                        startAngle={90}
                        endAngle={-270}
                      >
                        <PolarAngleAxis
                          type="number"
                          domain={[0, 100]}
                          tick={false}
                        />
                        <RadialBar
                          background={{ fill: "var(--accent)" }}
                          dataKey="value"
                          cornerRadius={10}
                          fill="var(--accent)"
                        />
                      </RadialBarChart>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                        0%
                      </span>
                    </div>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{thing.title}</ItemTitle>
                    <ItemDescription>
                      {thing.startDate} → {thing.endDate}
                    </ItemDescription>
                  </ItemContent>
                  <ItemAction>
                    <Button size="sm" pill variant={"outline"}>
                      Check In
                    </Button>
                  </ItemAction>
                </Item>
              ))
            )}
          </div>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <div className="flex justify-end sticky bottom-0 pt-8 pb-8 bg-linear-to-t from-background from-50% to-transparent">
            <DialogTrigger
              render={
                <Button className="mr-2" pill variant={"primary"}>
                  <HugeiconsIcon icon={Add01Icon} /> Add new things
                </Button>
              }
            />
          </div>
          <DialogPopup>
            <DialogBody>
              <Form
                id="add-thing-form"
                className="w-full"
                onSubmit={handleAddThingSubmit}
              >
                <Fieldset>
                  <div className="flex gap-4">
                    <Field className="flex-1">
                      <FieldLabel htmlFor="title">
                        what you want to do?
                      </FieldLabel>
                      <Input
                        id="title"
                        name="title"
                        placeholder="e.g, Read 10 pages"
                        required
                      />
                      <FieldError match="valueMissing">
                        This is required
                      </FieldError>
                    </Field>
                    <Field>
                      <NumberField defaultValue={7} min={3}>
                        <NumberFieldScrubArea>
                          <FieldLabel>days</FieldLabel>
                        </NumberFieldScrubArea>
                        <NumberFieldGroup>
                          <NumberFieldDecrement>
                            <HugeiconsIcon icon={Remove01Icon} />
                          </NumberFieldDecrement>
                          <NumberFieldInput name="days" className={"w-9"} />
                          <NumberFieldIncrement>
                            <HugeiconsIcon icon={Add01Icon} />
                          </NumberFieldIncrement>
                        </NumberFieldGroup>
                      </NumberField>
                    </Field>
                  </div>
                </Fieldset>
              </Form>
            </DialogBody>
            <DialogFooter>
              <DialogClose>Close</DialogClose>
              <Button type="submit" form="add-thing-form">
                Submit
              </Button>
            </DialogFooter>
          </DialogPopup>
        </Dialog>
      </main>
    </ThemeProvider>
  );
}
