import Header from "@/components/Header/Header";
import SellBookButton from "@/components/SellBook/SellBookButton";
import SellBookTable from "@/components/SellBook/SellBookTable";

export default function AdminSalesPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header>Sales Page</Header>
      <div className="flex justify-end">
        <SellBookButton />
      </div>
      <SellBookTable />
    </div>
  );
}
