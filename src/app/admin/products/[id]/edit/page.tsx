import React from "react";
import ProductForm from "../../_components/ProductForm";
import db from "@/db/db";
import { Metadata } from "next/types";
import PageHeader from "@/app/admin/_components/PageHeader";

export const metadata: Metadata = {
  title: "Admin | Edit | Store",
  description: "Store Edit Features",
};

const EditProductPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const product = await db.product.findUnique({ where: { id } });
  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} />
    </>
  );
};

export default EditProductPage;
