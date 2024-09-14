import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import React from "react";
import OrderInformation from "./components/OrderInformation";

import { Order, Product } from "@prisma/client";
import { EmailProductType } from "@/types/product.types";
import { EmailOrderType } from "@/types/order.types";

type PurchaseReceiptProps = {
  product: Product | EmailProductType;
  order: Order | EmailOrderType;
  downloadVerificationId: string;
};

const PurchaseReceipt = ({
  product = {
    name: "Product Name",
    imagePath: "/products/73011f2a-c467-4829-932e-1aa005d0324e-rudenkiy.jpg",
    description: "Some description",
  },
  order = {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    pricePaidInCents: 10000,
  },
  downloadVerificationId = crypto.randomUUID(),
}: PurchaseReceiptProps) => {
  return (
    <Html>
      <Preview>{product.name} and view receipt</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-lg">
            <Heading>Purchase received</Heading>
            <OrderInformation
              order={order}
              product={product}
              downloadVerificationId={downloadVerificationId}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PurchaseReceipt;
