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
  category
}: BookCardProps) => {
  return (
    <div className=" h-auto">
      <Card className="p-auto">
        <CardHeader>
          <CardTitle className="">{title}</CardTitle>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 justify-between items-center">
              <CardDescription>{author}</CardDescription>
              <CardDescription>Publication Year: {date}</CardDescription>
            </div>
            <div>
            <CardDescription className="capitalize">Category: {category}</CardDescription>
            <CardDescription>ISBN: {isbn}</CardDescription>
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
            <ScrollArea className="h-[25vh] w-auto rounded-md border p-4">
              {desc}
            </ScrollArea>
            <div className="flex justify-between">
              <div>
                
              </div>
              <div className="flex justify-center items-center gap-4">
                <EditBook id={id} />

                <Button
                  onClick={() => {
                    // console.log(id);
                    fetch(`http://localhost:3001/book/${id}`, {
                      method: "DELETE",
                    });
                    window.location.reload();
                  }}
                >
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
