"use client";

import React, { useTransition } from "react";
import { toggleProductAvalibylity } from "../../_actions/product.actions";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

type ActiveToggleDropdownItemProps = {
  id: string;
  isAvailableForPurchase: boolean;
};

export const ActiveToggleDropdownItem = ({
  id,
  isAvailableForPurchase,
}: ActiveToggleDropdownItemProps) => {
  const [isPending, startTransition] = useTransition();

  const handleUpdatePurchaseAvalibylity = () => {
    startTransition(async () => {
      await toggleProductAvalibylity(id, !isAvailableForPurchase);
    });
  };

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={handleUpdatePurchaseAvalibylity}
    >
      {isAvailableForPurchase ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
  );
};
