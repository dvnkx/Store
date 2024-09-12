import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { routes } from "@/keys";
import { Product } from "@prisma/client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={Array.of(1, 1, 1).map((_, index) => {
            return <ProductCardSkeleton key={index} />;
          })}
        >
          <ProductFetcher productsFetcher={productsFetcher} />
        </Suspense>
      </div>
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
