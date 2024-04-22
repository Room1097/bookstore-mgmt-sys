const express =  require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// Import your Book and Sales models
const { Book,Sales } = require('./models/schema');
// const databaseurl = "mongodb+srv://ROOM1097:@DBMSdiu@bookstore.mongocluster.cosmos.azure.com/book?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000"
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

// app.post('/book', async (req, res) => {
//     try {
//         const { title, author, category, ISBN, price, stockQuantity, publicationYear, description } = req.body;

//         const newBook = new Book({
//             title, 
//             author, 
//             category, 
//             ISBN, 
//             price, 
//             stockQuantity, 
//             publicationYear, 
//             description
//         });

//         console.log(newBook)
//         const book = await newBook.save();
        
//         res.status(201).send(book);
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });


app.post('/sales', async (req, res) => {
    try {
        const { bookId, quantity } = req.body;

        // Find the book based on the provided bookId
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).send('Book not found');
        }
        book.stockQuantity -= quantity;

        // Save the updated book to the database
        await book.save();
        // Create a new sales document
        const newSale = new Sales({
            book: book._id, // Assign the book's ObjectId
            quantity: quantity
        });

        // Save the new sale to the database
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