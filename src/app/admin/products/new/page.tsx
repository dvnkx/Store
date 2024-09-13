import React from "react";

import ProductForm from "../_components/ProductForm";
import { Metadata } from "next/types";
import PageHeader from "../../_components/PageHeader";

export const metadata: Metadata = {
  title: "Admin | Add | Store",
  description: "Store Add Features",
};

const NewProductPage = () => (
  <>
    <PageHeader>Add Product</PageHeader>
    <ProductForm />
  </>
);

export default NewProductPage;
