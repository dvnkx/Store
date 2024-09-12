import { ProductCardSkeleton } from "@/components/ProductCard";
import React, { ReactNode, Suspense } from "react";

const SkeletonSuspense = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense
      fallback={Array.of(1, 1, 1).map((_, index) => {
        return <ProductCardSkeleton key={index} />;
      })}
    >
      {children}
    </Suspense>
  );
};

export default SkeletonSuspense;
