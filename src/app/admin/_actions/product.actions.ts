"use server";

import db from "@/db/db";
import { routes } from "@/keys";
import { productSchema } from "@/schemas/product.schema";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

export const addProduct = async (_: unknown, formData: FormData) => {
  const result = productSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!result.success) return result.error.formErrors.fieldErrors;

  const data = result.data;

  await fs.mkdir("products", { recursive: true });
  const filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
  await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));

  await fs.mkdir("public/products", { recursive: true });
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  );

  await db.product.create({
    data: {
      isAvailableForPurchase: false,
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      filePath,
      imagePath,
    },
  });

  revalidatePath(routes.PRODUCTS);

  redirect(routes.PRODUCTS);
};

export const toggleProductAvalibylity = async (
  id: string,
  isAvailableForPurchase: boolean
) => {
  await db.product.update({
    where: { id },
    data: { isAvailableForPurchase },
  });

  revalidatePath(routes.PRODUCTS);
};

export const deleteProduct = async (id: string) => {
  const product = await db.product.delete({ where: { id } });

  if (product === null) notFound();

  await fs.unlink(product.filePath);
  await fs.unlink(`public${product.imagePath}`);

  revalidatePath(routes.PRODUCTS);
};
