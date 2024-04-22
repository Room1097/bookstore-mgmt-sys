const express =  require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Book } = require('./models/schema');
// const databaseurl = "mongodb+srv://ROOM1097:@DBMSdiu@bookstore.mongocluster.cosmos.azure.com/book?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000"
const databaseurl = "mongodb+srv://ROOM1097:0DBMSdiu@bookstore.mongocluster.cosmos.azure.com/book?retryWrites=true&w=majority";
const PORT = 3001;
const app = express();

app.use(express.json());

app.use(cors());

mongoose.connect(databaseurl)
.then(()=>{
    console.log("Database Connected");
    app.listen(PORT,()=>{
        console.log(`Server is running on http://localhost:${PORT}`)
    })
})
.catch((e)=>{
    console.log(e)
})

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