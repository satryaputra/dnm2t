import { Button } from "@/components/selia/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";

export default function Fab({ setOpen }: { setOpen: (open: boolean) => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 pointer-events-none h-18 right-4 bg-linear-to-t from-background from-40% to-transparent">
      <div className="mx-auto w-md max-w-[calc(100%-2rem)] flex justify-end ">
        <div className="pointer-events-auto">
          <Button
            pill
            size="lg-icon"
            variant={"primary"}
            aria-label="Add new thing"
            title="Add new thing"
            className="shadow-2xl"
            onClick={() => setOpen(true)}
          >
            <HugeiconsIcon icon={Add01Icon} />
          </Button>
        </div>
      </div>
    </div>
  );
}
