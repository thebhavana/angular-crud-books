const mongoose = require('mongoose');
const BookSchema = mongoose.Schema({
    "title": { type: String, required: true },
    "author": { type: String, required: true },
    "isbn": { type: String, required: true },
    "publicationdate": { type: Date },
    "publisher": String,
    "price": Number
});

module.exports = mongoose.model("Book", BookSchema);
