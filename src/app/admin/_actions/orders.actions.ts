"use server";

import db from "@/db/db";
import { routes } from "@/keys";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

export const getOrders = () => {
  return db.order.findMany({
    select: {
      id: true,
      pricePaidInCents: true,
      product: { select: { name: true } },
      user: { select: { email: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const deleteOrder = async (id: string) => {
  const order = await db.order.delete({
    where: {
      id,
    },
  });

  if (order == null) return notFound();

  revalidatePath(routes.HOME);
  revalidatePath(routes.ADMIN_SALES);
};
