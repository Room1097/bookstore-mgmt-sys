"use client"
import React from 'react'
import BookCard from './BookCard'
import { useEffect, useState } from "react";

export type bookDataType = {
  title: string,
  description: string,
  stockQuantity: number,
  price: number,
  author: string,
  ISBN: string,
  publicationYear: number,
  _id: string;
}

const Stock = () => {
  const [bookData, setBookData] = useState<bookDataType[]>([]);

  useEffect(() => {
    try{
      fetch("http://localhost:3001/book")
      .then((response) => response.json())
      .then((data) => setBookData(data));
      console.log(bookData)
    }
    catch(e) {
      console.log(e)
    }
  },[])

  return (
    <div className='grid lg:grid-cols-3 grid-cols-1 gap-y-8 gap-x-4'>

      {
        bookData.map((book) => (
          
          <BookCard 
          title={book.title}
          desc={book.description}
          date={book.publicationYear}
          stock={book.stockQuantity}
          price={book.price}
          author={book.author}
          isbn={book.ISBN}
        />
        ))
      }
      
     
    </div>
  )
}

export default Stock
