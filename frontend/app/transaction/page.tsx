import BuyBookButton from "@/components/BuyBook/BuyBookButton";
import BuyBookTable from "@/components/BuyBook/BuyBookTable";
import Header from "@/components/Header/Header";

export default function AdminTransactionPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header>Transaction Page</Header>
      <div className="flex justify-end">

      <BuyBookButton />
      </div>
      <BuyBookTable />

    </div>
  );
}
