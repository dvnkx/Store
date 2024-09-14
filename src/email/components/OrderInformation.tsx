import { routes } from "@/keys";
import { formatCurrency } from "@/lib/formatters";
import { EmailOrderType } from "@/types/order.types";
import { EmailProductType } from "@/types/product.types";
import {
  Button,
  Column,
  Img,
  Row,
  Section,
  Text,
} from "@react-email/components";
import React from "react";

type OrderInformationProps = {
  order: EmailOrderType;
  product: EmailProductType;
  downloadVerificationId: string;
};

const dateFormatter = Intl.DateTimeFormat("en", { dateStyle: "medium" });

const OrderInformation = ({
  order,
  product,
  downloadVerificationId,
}: OrderInformationProps) => {
  return (
    <>
      <Section>
        <Row>
          <ColumnComponent columnName="Order ID" columnData={order.id} />
          <ColumnComponent
            columnName="Purchase On"
            columnData={dateFormatter.format(order.createdAt)}
          />
          <ColumnComponent
            columnName="Price Paid"
            columnData={formatCurrency(order.pricePaidInCents / 100)}
          />
        </Row>
      </Section>
      <Section className="border border-solid border-gray-500 rounded-lg p-4 my-4 md:p-6">
        <Img
          width="100%"
          alt={product.name}
          src={`http://localhost:3000${product.imagePath}`}
        />
        <Row className="mt-8">
          <Column className="align-bottom">
            <Text className="text-lg font-bold mr-4">{product.name}</Text>
          </Column>
          <Column align="right" className="align-bottom">
            <Button
              className="bg-black text-white px-6 py-4 rounded text-lg"
              href={`http://localhost:3000${routes.PRODUCTS}/${routes.DOWNLOAD}/${downloadVerificationId}`}
            >
              Download
            </Button>
          </Column>
        </Row>
        <Row>
          <Column>
            <Text className="text-gray-500 mb-0">{product.description}</Text>
          </Column>
        </Row>
      </Section>
    </>
  );
};

type ColumnComponentProps = {
  columnName: string;
  columnData: string;
};

const ColumnComponent = ({ columnName, columnData }: ColumnComponentProps) => {
  return (
    <Column>
      <Text className="mb-0 to-gray-500 whitespace-nowrap text-nowrap mr-4">
        {columnName}
      </Text>
      <Text className="mt-0 mr-4">{columnData}</Text>
    </Column>
  );
};

export default OrderInformation;
