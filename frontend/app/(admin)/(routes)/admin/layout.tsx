import { Nav } from "@/components/Nav";
import { NavLink } from "@/components/Nav";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Books</NavLink>
        <NavLink href="/admin/transaction">Transactions</NavLink>
        <NavLink href="/admin/sales">Sales</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
}
