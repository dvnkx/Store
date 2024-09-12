import { Nav, NavLink } from "@/components/Nav";
import { routes } from "@/keys";
import { Metadata } from "next/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin | Store",
  description: "Store Admin Features",
  icons:
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📦</text></svg>",
};

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Nav>
        <NavLink href={routes.ADMIN}>Dashboard</NavLink>
        <NavLink href={routes.ADMIN_PRODUCTS}>Products</NavLink>
        <NavLink href={routes.ADMIN_CUSTOMERS}>Customers</NavLink>
        <NavLink href={routes.ADMIN_SALES}>Sales</NavLink>
      </Nav>
      <div className="container m-6">{children}</div>
    </>
  );
};

export default AdminLayout;
