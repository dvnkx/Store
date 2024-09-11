import { formatCurrency, formatNumber } from "@/lib/formatters";
import React from "react";
import DashboardCard from "./_components/DashboardCard";
import {
  getSalesData,
  getUserData,
  getProductData,
} from "./_actions/dashboardActions";

const AdminDashboard = async () => {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Sales"
        subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
        body={formatCurrency(salesData.amount)}
      />
      <DashboardCard
        title="Customers"
        subtitle={`${formatCurrency(
          userData.averageValuePerUser
        )} Average Value`}
        body={`${formatNumber(userData.userCount)}`}
      />
      <DashboardCard
        title="Active Products"
        subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
        body={`${formatNumber(productData.activeCount)}`}
      />
    </section>
  );
};

export default AdminDashboard;
