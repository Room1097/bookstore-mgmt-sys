"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { bookDataType } from "../Stock/Stock";
import { formatNumber } from "@/lib/formatters";
import { formatDateFromString } from "@/lib/formatters";
import { Skeleton } from "../ui/skeleton";

export type sellDataType = {
  salesDate: Date;
  book: string;
  quantity: number;
  _id: string;
};

function SkeletonCard() {
  return (
    <div className="flex justify-center space-y-3">
      <Skeleton className="h-[50vh] w-[90vw] rounded-xl" />
    </div>
  );
}

const SellBookTable = () => {
  const [sellData, setSellData] = useState<sellDataType[] | null>(null);
  const [bookData, setBookData] = useState<bookDataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/sales")
      .then((response) => response.json())
      .then((data) => setSellData(data));

  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/book")
      .then((response) => response.json())
      .then((data) => setBookData(data));
      setLoading(false)
  }, []);

  return (
   <>
   {
    loading ? <SkeletonCard /> :  <Table>
    <TableCaption>A list of your recent purchases.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Book</TableHead>
        <TableHead>Quantity</TableHead>
        <TableHead>Date</TableHead>
        <TableHead className="w-0">
          <span className="sr-only">Action</span>
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {sellData?.map((item) => (
        <TableRow>
          <TableCell className="font-medium">
            {bookData.find((value) => value._id === item.book)?.title ||
              "Book Title Not Found"}
          </TableCell>
          <TableCell>{formatNumber(item.quantity)}</TableCell>
          <TableCell className="">
            {formatDateFromString(item.salesDate.toString())}
          </TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Edit Fields</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    console.log(item._id);

                    fetch(`http://localhost:3001/sales/${item._id}`, {
                      method: "DELETE",
                    });

                    window.location.reload();
                  }}
                >
                  Delete
                </DropdownMenuItem>
                {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
   }
   </>
  );
};

export default SellBookTable;
