const express =  require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Book, Sales, Buy } = require('./models/schema');
const databaseurl = "mongodb+srv://ROOM1097:0DBMSdiu@bookstore.mongocluster.cosmos.azure.com/book?retryWrites=true&w=majority";
const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());

console.log(`Server is running on http://localhost:${PORT}`)

mongoose.connect(databaseurl)
.then(()=>{
    console.log("Database Connected");
    app.listen(PORT,()=>{
    })
})
.catch((e)=>{
    console.log(e)
})

app.post('/sales', async (req, res) => {
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


app.get('/sales', async (req, res) => {
    try {
        const sales = await Sales.find();
        
        res.status(200).send(sales);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/buy', async (req, res) => {
    try {
        const { bookId, quantity, supplier } = req.body;

        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).send('Book not found');
        }
        book.stockQuantity += quantity;

        await book.save();

        const newSale = new Buy({
            book: book._id,
            quantity: quantity,
            supplier: supplier
        });

        const savedSale = await newSale.save();
        console.log(savedSale)
        res.status(201).send(savedSale);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/buy', async (req, res) => {
    try {
        const sales = await Buy.find();
        
        res.status(200).send(sales);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/buy/:id', async (req, res) => {
    try {
        const buyId = req.params.id;

        await Buy.findByIdAndDelete(buyId);

        res.status(200).send('Buy entry deleted successfully');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/book/:id', async (req, res) => {
    try {
        const bookId = req.params.id;

        await Book.findByIdAndDelete(bookId);

        res.status(200).send('Buy entry deleted successfully');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/book', async (req, res) => {
    try {
        const { title, author, category, ISBN, price, stockQuantity, publicationYear, description } = req.body;

        const newBook = new Book({
            title, 
            author, 
            category, 
            ISBN, 
            price, 
            stockQuantity, 
            publicationYear, 
            description
        });

        console.log(newBook)
        const book = await newBook.save();
        
        res.status(201).send(book);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/book', async (req, res) => {
    try {
        const books = await Book.find();
        
        res.status(200).send(books);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get("/", (req,res) => {
    console.log(req);
    return res.status(212).send("fuck you")
})
