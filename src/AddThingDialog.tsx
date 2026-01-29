import type { FormEvent } from "react";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogPopup,
  DialogFooter,
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

export default function AddThingDialog({
  open,
  setOpen,
  onSubmit,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPopup>
        <DialogBody>
          <Form id="add-thing-form" className="w-full" onSubmit={onSubmit}>
            <Fieldset>
              <FieldsetLegend>New Thing</FieldsetLegend>

              <Text>
                Define what you want to do and how long you’ll commit to it.
              </Text>

              <Field className="flex-1">
                <FieldLabel htmlFor="title">What you want to do?</FieldLabel>
                <Input name="title" placeholder="e.g. Read 10 pages" required />
                <FieldError />
              </Field>

              <Field className={"pl-1"}>
                <NumberField
                  defaultValue={7}
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
          <Button type="submit" form="add-thing-form">
            Submit
          </Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
