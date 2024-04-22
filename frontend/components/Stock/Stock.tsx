"use client"
import React from 'react'
import BookCard from './BookCard'
import { useEffect, useState } from "react";

type bookDataType = {
  title: string,
  desc: string,
  stock: number,
  price: number,
  author: string,
  ISBN: string,
  publicationYear: number
}

const Stock = () => {
  const [bookData, setBookData] = useState<bookDataType[]>([]);

  useEffect(() => {
    try{
      fetch("http://localhost:3001/book")
      .then((response) => response.json())
      .then((data) => setBookData(data));
    }
    catch(e) {
      console.log(e)
    }
  },[])

  return (
    <div className='grid grid-cols-3 gap-y-8 gap-x-2'>

      {
        bookData.map((book) => (
          <BookCard 
          title={book.title}
          desc={book.desc}
          date={book.publicationYear}
          stock={book.stock}
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
