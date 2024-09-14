import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import React, { Fragment } from "react";
import OrderInformation from "./components/OrderInformation";

type OrdersHistoryProps = {
  orders: {
    id: string;
    pricePaidInCents: number;
    createdAt: Date;
    downloadVerificationId: string;
    product: {
      name: string;
      imagePath: string;
      description: string;
    };
  }[];
};

export const OrdersHistory = ({
  orders = [
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      pricePaidInCents: 10000,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: "Product Name",
        imagePath:
          "/products/73011f2a-c467-4829-932e-1aa005d0324e-rudenkiy.jpg",
        description: "Some description",
      },
    },
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      pricePaidInCents: 10000,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: "Product Name 2",
        imagePath:
          "/products/73011f2a-c467-4829-932e-1aa005d0324e-rudenkiy.jpg",
        description: "Some description 2",
      },
    },
  ],
}: OrdersHistoryProps) => {
  return (
    <Html>
      <Preview>Order History & Download</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-lg">
            <Heading>Order History</Heading>
            {orders.map((order, index) => (
              <Fragment key={index}>
                <OrderInformation
                  key={order.id}
                  order={order}
                  product={order.product}
                  downloadVerificationId={order.downloadVerificationId}
                />
                {index < orders.length - 1 && <Hr />}
              </Fragment>
            ))}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default OrdersHistory;
