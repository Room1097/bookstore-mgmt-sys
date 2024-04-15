const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    ISBN: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, default: 0 },
    publicationDate: { type: Date, required: true },
    description: { type: String }
});


const authorSchema = new Schema({
    name: { type: String, required: true },
    country: { type: String }
});


const categorySchema = new Schema({
    name: { type: String, required: true }
});


const Book = mongoose.model('Book', bookSchema);
const Author = mongoose.model('Author', authorSchema);
const Category = mongoose.model('Category', categorySchema);

module.exports = { Book, Author, Category };
