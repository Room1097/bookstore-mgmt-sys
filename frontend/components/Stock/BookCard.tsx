import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import { ScrollArea } from "@/components/ui/scroll-area";
interface BookCardProps {
  title: string;
  desc: string;
  stock: number;
  author: string;
  isbn: string;
  price: number;
  date: number;
}
import { PencilIcon } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

const BookCard = ({
  title,
  desc,
  stock,
  price,
  author,
  isbn,
  date,
}: BookCardProps) => {
  return (
    <div className=" h-auto">
      <Card className="p-auto">
        <CardHeader>
          <CardTitle className="">{title}</CardTitle>
          <div className="flex flex-col gap-8">
            <div className="flex gap-4 justify-between items-center">
              <CardDescription>{author}</CardDescription>
              <CardDescription>Publication Year: {date}</CardDescription>
            </div>
            <CardDescription>ISBN: {isbn}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center gap-8">
            <span className="flex gap-2 text-zinc-600">
              <span className="underline"> Stock</span>: {stock ? stock : 0}
            </span>
            {formatCurrency(price)}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col gap-4">
            <ScrollArea className="h-[25vh] w-auto rounded-md border p-4">
              {desc}
            </ScrollArea>
            <div className="flex justify-end">
              <div className="flex justify-center items-center gap-4">
                <Button className="">
                  <PencilIcon />
                </Button>
                <Button>
                  <Trash2 />
                </Button>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookCard;
