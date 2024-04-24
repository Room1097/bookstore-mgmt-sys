"use client"
import React, { useEffect, useState } from "react";
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
import { bookDataType } from "../Stock/Stock";
import { formatNumber } from "@/lib/formatters";
import { formatDateFromString } from "@/lib/formatters";
import { Skeleton } from "@/components/ui/skeleton";

export type buyDataType = {
  salesDate: Date;
  supplier: string;
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

const BuyBookTable = () => {
  const [buyData, setBuyData] = useState<buyDataType[] | null>(null);
  const [bookData, setBookData] = useState<bookDataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/buy")
      .then((response) => response.json())
      .then((data) => {
        setBuyData(data);
        setLoading(false); 
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/book")
      .then((response) => response.json())
      .then((data) => setBookData(data));
  }, []);

  return (
    <>
      {loading ? (
        <div>
          <SkeletonCard />
        </div>
      ) : (
        <Table>
          <TableCaption>A list of your recent purchases.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Book</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-0">
                <span className="sr-only">Action</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {buyData?.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">
                  {bookData.find((value) => value._id === item.book)?.title ||
                    "Book Title Not Found"}
                </TableCell>
                <TableCell>{formatNumber(item.quantity)}</TableCell>
                <TableCell>{item.supplier}</TableCell>
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
                          fetch(`http://localhost:3001/buy/${item._id}`, {
                            method: "DELETE",
                          })
                            .then(() => {
                              // Refresh data after successful deletion
                              window.location.reload();
                            })
                            .catch((error) => console.error(error));
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
      )}
    </>
  );
};

export default BuyBookTable;
