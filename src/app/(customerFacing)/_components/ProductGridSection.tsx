import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { routes } from "@/keys";
import { Product } from "@prisma/client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import SkeletonSuspense from "./SkeletonSuspense";
import Grid from "@/components/Grid";

type ProductGridSectionProps = {
  title: string;
  productsFetcher: () => Promise<Product[]>;
};

const ProductGridSection = ({
  title,
  productsFetcher,
}: ProductGridSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button variant="outline" asChild>
          <Link href={routes.PRODUCTS} className="space-x-2">
            <span> View All</span>
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </div>
      <Grid>
        <SkeletonSuspense>
          <ProductFetcher productsFetcher={productsFetcher} />
        </SkeletonSuspense>
      </Grid>
    </div>
  );
};

const ProductFetcher = async ({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>;
}) => {
  return (await productsFetcher()).map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
};

export default ProductGridSection;
