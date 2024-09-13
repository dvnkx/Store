"use server";

import db from "@/db/db";
import { routes } from "@/keys";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

export const getUsers = () => {
  return db.user.findMany({
    select: {
      id: true,
      email: true,
      orders: { select: { pricePaidInCents: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const deleteUser = async (id: string) => {
  const user = await db.user.delete({
    where: {
      id,
    },
  });

  if (user == null) return notFound();

  revalidatePath(routes.HOME);
  revalidatePath(routes.ADMIN_CUSTOMERS);
};
