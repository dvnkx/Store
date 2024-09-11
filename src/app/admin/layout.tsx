import { Nav, NavLink } from "@/components/Nav";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Nav>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/customers">Customers</NavLink>
        <NavLink href="/sales">Sales</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
};

export default AdminLayout;
