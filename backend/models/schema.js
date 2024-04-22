const mongoose = require('mongoose');
const { string, number } = require('zod');
const Schema = mongoose.Schema;


const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true , lowercase : true},
    ISBN: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, default: 0 },
    publicationYear: { type: Number, required: true },
    description: { type: String }
});



const Book = mongoose.model('Book', bookSchema);


module.exports = { Book };