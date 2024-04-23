const express = require('express');
const router = express.Router();
const { Buy, Book } = require('../models/schema');

router.post('/', async (req, res) => {
    try {
        const { bookId, quantity, supplier } = req.body;

        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).send('Book not found');
        }
        book.stockQuantity += quantity;

        await book.save();

        const newBuy = new Buy({
            book: book._id,
            quantity: quantity,
            supplier: supplier
        });

        const savedBuy = await newBuy.save();
        console.log(savedBuy)
        res.status(201).send(savedBuy);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/', async (req, res) => {
    try {
        const buys = await Buy.find();
        
        res.status(200).send(buys);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
