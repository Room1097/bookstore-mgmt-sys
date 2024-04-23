const express = require('express');
const router = express.Router();
const { Book, Sales } = require('../models/schema');

router.get('/revenue', async (req, res) => {
    try {
        const books = await Book.find();
        const sales = await Sales.find();
        let revenue = 0;
        for (let i = 0; i < sales.length; i++) {
            const price = (books.find(value => value._id === sales[i].book)?.price || 0) * sales[i].quantity;
            revenue += price;
        }
        res.status(200).json({ revenue: revenue });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
