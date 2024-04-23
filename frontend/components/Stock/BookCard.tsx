import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency, formatISBN } from "@/lib/formatters";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BookCardProps {
  title: string;
  desc: string;
  stock: number;
  author: string;
  isbn: string;
  price: number;
  date: number;
  id: string;
  category: string;
}
import { PencilIcon } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import EditBook from "./EditBook";

const BookCard = ({
  title,
  desc,
  stock,
  price,
  author,
  isbn,
  date,
  id,
  category,
}: BookCardProps) => {
  return (
    <div className="w-[30vw]">
      <Card className="p-auto">
        <CardHeader>
          <CardTitle className="">{title}</CardTitle>
          <div className="flex flex-col gap-4 pt-4">
            <div className="flex gap-4 justify-between items-center">
              <CardDescription>{author}</CardDescription>
              <CardDescription>Publication Year: {date}</CardDescription>
            </div>
            <div className="flex flex-col gap-2">
              <CardDescription className="capitalize">
                Category: {category}
              </CardDescription>
              <CardDescription>ISBN: {formatISBN(isbn)}</CardDescription>
            </div>
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
            <ScrollArea className="h-[20vh] w-[26vw] rounded-md border p-4 m-auto">
              {desc}
            </ScrollArea>
            
              <div className="flex justify-end items-center">
                <EditBook id={id} />
              </div>
            
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookCard;
