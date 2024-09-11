"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import React, { ComponentProps, FormEvent, useState } from "react";
import { addProduct } from "../../_actions/product.actions";
import { useFormState, useFormStatus } from "react-dom";

type InputAreaProps = ComponentProps<"input"> & {
  name: string;
  label: string;
  error?: string[] | undefined;
};

type TextAreaProps = ComponentProps<"textarea"> & {
  name: string;
  label: string;
  error?: string[] | undefined;
};

const InputArea = ({ name, label, error, ...rest }: InputAreaProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input className="w-[400px]" {...rest} id={name} name={name} required />
      {error && <div className="text-destructive">{error}</div>}
    </div>
  );
};

const TextArea = ({ name, label, error, ...rest }: TextAreaProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        className="w-[400px]"
        {...rest}
        id={name}
        name={name}
        required
      />
      {error && <div className="text-destructive">{error}</div>}
    </div>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
};

const ProductForm = () => {
  const [error, action] = useFormState(addProduct, {});
  const [priceInCents, setPriceInCents] = useState<number>();
  const handlePrice = (e: FormEvent<HTMLInputElement>) => {
    setPriceInCents(Number(e.currentTarget.value) || undefined);
  };

  return (
    <form action={action} className="space-y-8">
      <InputArea name="name" label="Name" type="text" error={error.name} />
      <InputArea
        name="priceInCents"
        label="Price In Cents"
        error={error.priceInCents}
        type="number"
        value={priceInCents}
        onChange={handlePrice}
      />
      <div className="text-muted-foreground">
        {formatCurrency((priceInCents || 0) / 100)}
      </div>
      <TextArea
        name="description"
        label="Description"
        error={error.description}
      />
      <InputArea name="file" label="File" type="file" error={error.file} />
      <InputArea name="image" label="Image" type="file" error={error.image} />
      <SubmitButton />
    </form>
  );
};

export default ProductForm;
