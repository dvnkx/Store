import { Metadata } from "next/types";
import React from "react";
import SkeletonSuspense from "../_components/SkeletonSuspense";
import Grid from "@/components/Grid";
import db from "@/db/db";
import { ProductCard } from "@/components/ProductCard";
import { cache } from "@/lib/cache";

const getProducts = cache(() => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: "asc" },
  });
}, ["/products", "getProducts"]);

export const metadata: Metadata = {
  title: "Store | Products",
  description: "Store Products Page",
};

const ProductsPage = () => {
  return (
    <Grid>
      <SkeletonSuspense>
        <ProductsSuspense />
      </SkeletonSuspense>
    </Grid>
  );
};

const ProductsSuspense = async () => {
  const products = await getProducts();
  return products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
};

export default ProductsPage;
