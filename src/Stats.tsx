import { Stack } from "@/components/selia/stack";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/selia/item";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AutoConversationsIcon,
  Calendar04Icon,
} from "@hugeicons/core-free-icons";

export default function Stats({
  pending,
  percentage,
}: {
  pending: number;
  percentage: number;
}) {
  return (
    <div className="pt-10 flex justify-center">
      <Stack direction="row" className="w-full">
        <Item direction="column" className="flex-1 p-5">
          <ItemMedia>
            <Stack direction="row" spacing={"sm"}>
              <HugeiconsIcon icon={Calendar04Icon} />
              <p>Today's Focus</p>
            </Stack>
          </ItemMedia>
          <ItemContent className="mt-1">
            <ItemTitle className="text-3xl font-bold">{pending}</ItemTitle>
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
            <ItemTitle className="text-3xl font-bold">{percentage}%</ItemTitle>
            <ItemDescription className="text-sm mt-1">
              Commitment Rate
            </ItemDescription>
          </ItemContent>
        </Item>
      </Stack>
    </div>
  );
}
