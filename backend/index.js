const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const salesRoutes = require('./routes/salesRoutes');
const buyRoutes = require('./routes/buyRoutes');
const bookRoutes = require('./routes/bookRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const databaseurl = "mongodb+srv://ROOM1097:0DBMSdiu@bookstore.mongocluster.cosmos.azure.com/book?retryWrites=true&w=majority";
const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(databaseurl)
.then(() => {
    console.log("Database Connected");
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch((e) => {
    console.log(e)
});

// Routes
app.use('/sales', salesRoutes);
app.use('/buy', buyRoutes);
app.use('/book', bookRoutes);
app.use('/dash', dashboardRoutes);
