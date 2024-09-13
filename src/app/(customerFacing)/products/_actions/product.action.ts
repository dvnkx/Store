import db from "@/db/db";
import { cache } from "@/lib/cache";

export const getProduct = cache(
  (id: string) => {
    return db.product.findUnique({ where: { id } });
  },
  ["/", "getProduct"]
);
