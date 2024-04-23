const express = require('express');
const router = express.Router();
const { Book } = require('../models/schema');

router.post('/', async (req, res) => {
    try {
        const { title, author, category, ISBN, price, publicationYear, description } = req.body;
        
        const newBook = new Book({
            title,
            description,
            publicationYear,
            price,
            ISBN,
            category,
            author,
            stockQuantity: 0,
        });

        const book = await newBook.save();
        
        res.status(201).send(book);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const { title, author, category, ISBN, price, publicationYear, description } = req.body;

        const existingBook = await Book.findById(id);

        if (!existingBook) {
            return res.status(404).send('Book not found');
        }

        existingBook.title = title;
        existingBook.author = author;
        existingBook.category = category;
        existingBook.ISBN = ISBN;
        existingBook.price = price;
        existingBook.publicationYear = publicationYear;
        existingBook.description = description;

        const updatedBook = await existingBook.save();
        
        res.status(200).send(updatedBook);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:id', async (req, res) => {
    const bookId = req.params.id;

    try {
        const book = await Book.findById(bookId);
        
        res.status(200).send(book);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        
        res.status(200).send(books);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const bookId = req.params.id;

        await Book.findByIdAndDelete(bookId);

        res.status(200).send('Book deleted successfully');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
