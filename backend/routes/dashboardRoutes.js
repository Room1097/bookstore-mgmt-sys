const express = require('express');
const router = express.Router();
const { Book, Sales } = require('../models/schema');

router.get('/revenue', async (req, res) => {
    try {
        const books = await Book.find();
        const sales = await Sales.find();
        let revenue = 0;
        
        for (let i = 0; i < sales.length; i++) {
            const sale = sales[i];
            const book = books.find(value => value._id.toString() === sale.book.toString());
            
            if (book) {
                const price = book.price * sale.quantity;
                // console.log(price);
                revenue += price;
            }
        }
        
        res.status(200).json({ revenue: revenue });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/stock', async (req, res) => {
    try {
        const books = await Book.find();
   
        let stock = 0;
        for (let i = 0; i < books.length; i++) {
            
            stock += books[i].stockQuantity;
        }
        res.status(200).json({ stock });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
