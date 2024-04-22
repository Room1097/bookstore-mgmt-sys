const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true, lowercase: true },
    ISBN: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, default: 0 },
    publicationYear: { type: Number, required: true },
    description: { type: String }
});

const salesSchema = new Schema({
    salesDate: { type: Date, default: Date.now },
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true }
});
const buySchema = new Schema({
    salesDate: { type: Date, default: Date.now },
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true },
    supplier : { type: String, required:true } 
});

const Book = mongoose.model('Book', bookSchema);
const Sales = mongoose.model('Sales', salesSchema);
const Buy = mongoose.model('Buy', buySchema);

module.exports = { Book, Sales,Buy };
