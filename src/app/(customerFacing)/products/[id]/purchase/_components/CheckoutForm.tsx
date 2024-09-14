"use client";

import { setUserEmailExist } from "@/app/_actions/orders.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { routes } from "@/keys";
import { formatCurrency } from "@/lib/formatters";
import { Product } from "@prisma/client";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  loadStripe,
  StripeLinkAuthenticationElementChangeEvent,
} from "@stripe/stripe-js";
import Image from "next/image";
import React, { FormEvent, useState } from "react";

type CheckoutFormProps = {
  product: Product;
  clientSecret: string;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

const CheckoutForm = ({
  product: { id, name, imagePath, priceInCents, description },
  clientSecret,
}: CheckoutFormProps) => {
  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
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
        </div>
      </div>
      <Elements options={{ clientSecret }} stripe={stripePromise}>
        <Form priceInCents={priceInCents} productId={id} />
      </Elements>
    </div>
  );
};

type FormProps = {
  priceInCents: number;
  productId: string;
};

const Form = ({ priceInCents, productId }: FormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [email, setEmail] = useState<string>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (stripe == null || elements == null || email == null) return;

    setIsLoading(true);

    const orderExist = await setUserEmailExist(email, productId);

    if (orderExist) {
      setErrorMessage(
        "You have already purchase this product. Try download it from the My Orders page."
      );
      setIsLoading(false);
    }

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}${routes.PURCHASE_SUCCESS}`,
        },
      })
      .then(({ error }) => {
        if (error.type === "card_error" || error.type === "validation_error") {
          return setErrorMessage(error.message);
        } else {
          setErrorMessage("An unknown error occurred");
        }
      })
      .finally(() => setIsLoading(false));
  };

  const handleEmail = (e: StripeLinkAuthenticationElementChangeEvent) => {
    setEmail(e.value.email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          {errorMessage && (
            <CardDescription className="text-destructive">
              {errorMessage}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <PaymentElement />
          <div className="mt-4">
            <LinkAuthenticationElement onChange={handleEmail} />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            size="lg"
            disabled={stripe == null || elements == null || isLoading}
          >
            {isLoading
              ? "Purchasing..."
              : `Purchase - ${formatCurrency(priceInCents / 100)}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default CheckoutForm;
