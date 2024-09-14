import { Order } from "@prisma/client";

export type EmailOrderType = Omit<Order, "updatedAt" | "userId" | "productId">;
