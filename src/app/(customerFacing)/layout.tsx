import { Nav, NavLink } from "@/components/Nav";
import { routes } from "@/keys";

export const dynamic = "force-dynamic";

const CustomerLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Nav>
        <NavLink href={routes.HOME}>Dashboard</NavLink>
        <NavLink href={routes.PRODUCTS}>Products</NavLink>
        <NavLink href={routes.ORDERS}>My Orders</NavLink>
      </Nav>
      <div className="container m-6">{children}</div>
    </>
  );
};

export default CustomerLayout;
