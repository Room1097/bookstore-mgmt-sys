"use client";
import React from "react";
import BookCard from "./BookCard";
import { useEffect, useState } from "react";

export type bookDataType = {
  title: string;
  description: string;
  stockQuantity: number;
  category: string;
  price: number;
  author: string;
  ISBN: string;
  publicationYear: number;
  _id: string;
};

import { Skeleton } from "@/components/ui/skeleton";

function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[50vh] w-[30vw] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[20vw]" />
        <Skeleton className="h-4 w-[18vw]" />
      </div>
    </div>
  );
}

const Stock = () => {
  const [bookData, setBookData] = useState<bookDataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      fetch("http://localhost:3001/book")
        .then((response) => response.json())
        .then((data) => setBookData(data));

      setLoading(false);
      console.log(bookData);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-y-8 gap-x-4">
      {loading ? (
        <div className="flex gap-4">
          
          <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
        </div>
      ) : (
        bookData.map((book) => (
          <BookCard
            title={book.title}
            desc={book.description}
            date={book.publicationYear}
            stock={book.stockQuantity}
            price={book.price}
            author={book.author}
            isbn={book.ISBN}
            id={book._id}
            category={book.category}
          />
        ))
      )}
    </div>
  );
};

export default Stock;
