import React from 'react'
import BookCard from './BookCard'

const Stock = () => {
  return (
    <div>
      <BookCard 
        title="Harry Potter"
        desc="A Book."
        stock={10}
        price={400}
        author='J.K. Rowling'
        isbn='1234'
      />
    </div>
  )
}

export default Stock
