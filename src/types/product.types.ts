import { Product } from "@prisma/client";

export type EmailProductType = Omit<
  Product,
  | "id"
  | "priceInCents"
  | "filePath"
  | "isAvailableForPurchase"
  | "createdAt"
  | "updatedAt"
>;
