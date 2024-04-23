import CreateBookButton from "@/components/CreateBook/CreateBookButton";
import Header from "@/components/Header/Header";
import Stock from "@/components/Stock/Stock";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminProductPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header>Products Page</Header>
      <div className="flex justify-end">

      <CreateBookButton />
      </div>
      <Stock />
    </div>
  );
}
