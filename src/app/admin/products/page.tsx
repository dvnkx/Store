import React from "react";
import PageHeader from "../_components/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { routes } from "@/keys";
import ProductsTable from "./_components/ProductsTable";

const AdminProductsPage = () => {
  return (
    <>
      <div className="flex justify-between">
        <PageHeader>Products</PageHeader>
        <Button>
          <Link href={routes.NEW_PRODUCT}>Add Product</Link>
        </Button>
      </div>

      <ProductsTable />
    </>
  );
};

export default AdminProductsPage;
