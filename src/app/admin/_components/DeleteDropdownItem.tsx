"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { useTransition } from "react";
import { deleteProduct } from "../_actions/product.actions";
import { deleteUser } from "../_actions/users.actions";

type DeleteDropdownItemProps = {
  id: string;
  disabled?: boolean;
  type: "product" | "user";
};

export const DeleteDropdownItem = ({
  id,
  disabled,
  type,
}: DeleteDropdownItemProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      {
        type === "product" ? deleteProduct(id) : deleteUser(id);
      }
    });
  };

  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={isPending || disabled}
      onClick={handleDelete}
    >
      Delete
    </DropdownMenuItem>
  );
};
