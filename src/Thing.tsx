import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Heading } from "@/components/selia/heading";
import { Text } from "@/components/selia/text";

export default function ThingDetail({ thingId }: { thingId: string }) {
  return (
    <div>
      <div className="flex justify-between py-6">
        <HugeiconsIcon icon={ArrowLeft02Icon} />
        <Heading size="sm">Name</Heading>
        <Text>Edit</Text>
      </div>
    </div>
  );
}
