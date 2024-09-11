import React from "react";
import PageHeader from "../../_components/PageHeader";
import ProductForm from "../_components/ProductForm";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Admin | Add | Store",
  description: "Store Add Features",
};

const NewProductPage = () => {
  return (
    <>
      <PageHeader>Add Product</PageHeader>
      <ProductForm />
    </>
  );
};

export default NewProductPage;
