const express = require('express');
const router = express.Router();
const { Sales, Book } = require('../models/schema');

router.post('/', async (req, res) => {
    try {
        const { bookId, quantity } = req.body;

        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).send('Book not found');
        }
        book.stockQuantity -= quantity;

        await book.save();

        const newSale = new Sales({
            book: book._id,
            quantity: quantity
        });

        const savedSale = await newSale.save();
        console.log(savedSale)
        res.status(201).send(savedSale);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/', async (req, res) => {
    try {
        const sales = await Sales.find();
        
        res.status(200).send(sales);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const saleId = req.params.id;

        const sale = await Sales.findById(saleId);

        if (!sale) {
            return res.status(404).send('Sale not found');
        }

        const book = await Book.findById(sale.book);

        if (!book) {
            return res.status(404).send('Book not found');
        }

        book.stockQuantity += sale.quantity;

        await book.save();

        await Sales.findByIdAndDelete(saleId);

        res.status(200).send('Sale entry deleted successfully');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
