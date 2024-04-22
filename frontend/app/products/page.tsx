import CreateBookButton from "@/components/CreateBook/CreateBookButton";
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
    <div>
      <CreateBookButton />
      <Stock />
    </div>
  );
}
