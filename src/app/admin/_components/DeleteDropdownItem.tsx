"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { useTransition } from "react";
import { deleteProduct } from "../_actions/product.actions";
import { deleteUser } from "../_actions/users.actions";
import { deleteOrder } from "../_actions/orders.actions";

type DeleteDropdownItemProps = {
  id: string;
  disabled?: boolean;
  type: "product" | "user" | "order";
};

export const DeleteDropdownItem = ({
  id,
  disabled,
  type,
}: DeleteDropdownItemProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      switch (type) {
        case "product": {
          await deleteProduct(id);
          break;
        }
        case "user": {
          await deleteUser(id);
          break;
        }
        case "order": {
          await deleteOrder(id);
          break;
        }
        default:
          throw new Error("Unknown type");
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
