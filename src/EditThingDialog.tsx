import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogFooter,
  DialogPopup,
} from "@/components/selia/dialog";
import { Field, FieldError, FieldLabel } from "@/components/selia/field";
import { Fieldset, FieldsetLegend } from "@/components/selia/fieldset";
import { Form } from "@/components/selia/form";
import { Input } from "@/components/selia/input";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/selia/number-field";
import { Text } from "@/components/selia/text";
import { Button } from "@/components/selia/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, Remove01Icon } from "@hugeicons/core-free-icons";
import type { Thing } from "@/types";
import { getTotalDays } from "@/lib/utils";

export default function EditThingDialog({
  thing,
  open,
  setOpen,
  onSubmit,
}: {
  thing: Thing;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPopup>
        <DialogBody>
          <Form id="edit-thing-form" className="w-full" onSubmit={onSubmit}>
            <Fieldset>
              <FieldsetLegend>Edit Thing</FieldsetLegend>

              <Text>
                Define what you want to do and how long you’ll commit to it.
              </Text>

              <Field className="flex-1">
                <FieldLabel htmlFor="title">What you want to do?</FieldLabel>
                <Input
                  name="title"
                  placeholder="e.g. Read 10 pages"
                  required
                  defaultValue={thing.title}
                />
                <FieldError />
              </Field>

              <Field className={"pl-1"}>
                <NumberField
                  defaultValue={getTotalDays(thing.startDate, thing.endDate)}
                  min={3}
                  className={"flex flex-row items-center"}
                >
                  <FieldLabel>I commit for</FieldLabel>
                  <NumberFieldGroup>
                    <NumberFieldDecrement>
                      <HugeiconsIcon icon={Remove01Icon} />
                    </NumberFieldDecrement>
                    <NumberFieldInput name="days" />
                    <NumberFieldIncrement>
                      <HugeiconsIcon icon={Add01Icon} />
                    </NumberFieldIncrement>
                  </NumberFieldGroup>
                  <Text>days in a row.</Text>
                </NumberField>
              </Field>
            </Fieldset>
          </Form>
        </DialogBody>
        <DialogFooter>
          <DialogClose>Close</DialogClose>
          <Button type="submit" form="edit-thing-form">
            Submit
          </Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
