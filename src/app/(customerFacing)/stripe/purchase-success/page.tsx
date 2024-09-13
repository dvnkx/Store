import { Button } from "@/components/ui/button";
import { routes, stripe } from "@/keys";
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { getProduct } from "../../products/_actions/product.action";
import { createDownloadVerification } from "../../products/_actions/downloadVerification.action";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Store | Purchase | Status",
  description: "Store Purchase Status",
};

const PurchaseSuccess = async ({
  searchParams,
}: {
  searchParams: { payment_intent: string };
}) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent
  );

  if (paymentIntent.metadata.productId == null) return notFound();

  const product = await getProduct(paymentIntent.metadata.productId);

  if (product == null) return notFound();

  const { id, imagePath, name, priceInCents, description } = product;

  const isSuccess = paymentIntent.status === "succeeded";

  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <h1 className="text-4xl font-bold">
        {isSuccess ? "Success!" : "Error!"}
      </h1>
      <div className="flex gap-4 items-center">
        <div className="aspect-video flex-shrink-0 w-1/3 relative">
          <Image
            className="object-cover"
            src={imagePath}
            fill
            alt={`${name}-product_image`}
          />
        </div>
        <div>
          <div className="text-lg">{formatCurrency(priceInCents / 100)}</div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <div className="line-clamp-3 text-muted-foreground">
            {description}
          </div>
          <Button size="lg" className="mt-4" asChild>
            {isSuccess ? (
              <a
                href={`${routes.PRODUCTS}${
                  routes.DOWNLOAD
                }/${await createDownloadVerification(id)}`}
              >
                Download
              </a>
            ) : (
              <Link href={`${routes.PRODUCTS}/${id}${routes.PURCHASE}`}>
                Try Again
              </Link>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccess;
