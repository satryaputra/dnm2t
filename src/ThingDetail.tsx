import {
  ArrowLeft02Icon,
  ChampionIcon,
  Delete02Icon,
  FireIcon,
  Menu01Icon,
  PencilEdit01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Heading } from "@/components/selia/heading";
import { Button } from "@/components/selia/button";
import { useEffect, useState } from "react";
import type { CheckIn, Thing } from "@/types";
import { idbPromise } from "@/App";
import { formatDate, getPercentage } from "@/lib/utils";
import { Stack } from "@/components/selia/stack";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/selia/item";
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuTrigger,
} from "@/components/selia/menu";
import EditThingDialog from "@/EditThingDialog";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogClose,
  AlertDialogPopup,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/selia/alert-dialog";
import { Strong } from "./components/selia/text";

export default function ThingDetail({
  thingId,
  setId,
  checkIns,
}: {
  thingId: string;
  setId: (id: string) => void;
  checkIns: CheckIn[];
}) {
  const [thing, setThing] = useState<Thing | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  async function fetchData() {
    setLoading(true);
    const db = await idbPromise;
    const result = await db.get("things", thingId);
    setThing(result);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function onSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const editedTitle = form.get("title") as string;
    const editedDays = Number(form.get("days"));

    const startDate = new Date(thing!.startDate);
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + editedDays - 1);

    const editedThing: Thing = {
      ...thing!,
      title: editedTitle,
      endDate: formatDate(endDate),
    };

    const db = await idbPromise;
    const thingToUpdate = await db.get("things", thingId);

    if (!thingToUpdate) return;

    await db.put("things", {
      ...thing,
      ...editedThing,
    });

    setOpen(false);
    await fetchData();
  }

  async function deleteThing() {
    setLoading(true);
    const db = await idbPromise;
    const tx = db.transaction(["things", "checkIns"], "readwrite");

    await tx.objectStore("things").delete(thingId);

    const index = tx.objectStore("checkIns").index("by-thingId");
    const keys = await index.getAllKeys(thingId);

    for (const key of keys) {
      await tx.objectStore("checkIns").delete(key);
    }

    await tx.done;
    setLoading(false);
    setId("");
  }

  if (loading && !thing) return "Loading...";

  return (
    <div>
      <div className="flex justify-between items-center py-6">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => {
            setId("");
          }}
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} />
        </Button>
        <Button pill variant={"secondary"}>
          <Heading size="sm">{thing?.title}</Heading>
        </Button>
        <Menu>
          <MenuTrigger
            render={
              <Button variant="secondary" size="icon">
                <HugeiconsIcon icon={Menu01Icon} />
              </Button>
            }
          />
          <MenuPopup size={"compact"}>
            <MenuItem onClick={() => setOpen(true)}>
              <HugeiconsIcon icon={PencilEdit01Icon} />
              Edit
            </MenuItem>
            <MenuItem onClick={() => setOpenDelete(true)}>
              <HugeiconsIcon icon={Delete02Icon} />
              Delete
            </MenuItem>
          </MenuPopup>
        </Menu>
      </div>
      <div className="py-14 text-center">
        <p className="text-9xl font-bold">{getPercentage(thing!, checkIns)}%</p>
        <p className="text-md text-muted font-semibold py-3 tracking-wide">
          COMMITMENT SCORE
        </p>
      </div>

      <div className="flex justify-center">
        <Stack direction="row" className="w-full">
          <Item direction="column" className="flex-1 p-5">
            <ItemMedia>
              <Stack direction="row" spacing={"sm"}>
                <HugeiconsIcon icon={FireIcon} className="text-blue-400" />
                <p className="font-semibold">Current Streak</p>
              </Stack>
            </ItemMedia>
            <ItemContent className="mt-1 flex flex-row items-end gap-2 pl-2">
              <ItemTitle className="text-6xl font-bold">5</ItemTitle>
              <ItemDescription>Days</ItemDescription>
            </ItemContent>
          </Item>
          <Item direction="column" className="flex-1 p-5">
            <ItemMedia>
              <Stack direction="row" spacing={"sm"}>
                <HugeiconsIcon
                  icon={ChampionIcon}
                  className="text-yellow-500"
                />
                <p className="font-semibold">Longest Streak</p>
              </Stack>
            </ItemMedia>
            <ItemContent className="mt-1 flex flex-row items-end gap-2 pl-2">
              <ItemTitle className="text-6xl font-bold">12</ItemTitle>
              <ItemDescription>Days</ItemDescription>
            </ItemContent>
          </Item>
        </Stack>
      </div>

      <EditThingDialog
        thing={thing!}
        open={open}
        setOpen={setOpen}
        onSubmit={onSubmit}
      />

      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogPopup>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Thing</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogBody>
            <AlertDialogDescription className={"-mt-2"}>
              Are you sure you want to delete <Strong>{thing?.title}</Strong>?
            </AlertDialogDescription>
          </AlertDialogBody>
          <AlertDialogFooter>
            <AlertDialogClose>Cancel</AlertDialogClose>
            <Button variant="danger" onClick={deleteThing}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialog>
    </div>
  );
}
