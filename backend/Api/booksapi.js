const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('../Connection/connect'); 
const bookModel = require('../Model/schema'); 

const app = express();
app.use(express.json());
app.use(cors());

app.post("/insertBook", async (req, resp) => {
    try {
        const newBook = new bookModel(req.body);
        const result = await newBook.save();
        resp.send(result);
    } catch (error) {
        resp.status(500).send(error.message);
    }
});

app.get("/getBooks", async (req, resp) => {
    try {
        const result = await bookModel.find();
        resp.send(result);
    } catch (error) {
        resp.status(500).send(error.message);
    }
});

app.put("/updateBook/:bookId", async (req, resp) => {
    try {
        const bookId = req.params.bookId;
        const updatedBook = await bookModel.findByIdAndUpdate(bookId, req.body, { new: true });
        if (!updatedBook) {
            return resp.status(404).json({ error: 'Book not found' });
        }
        resp.send(updatedBook);
    } catch (error) {
        resp.status(500).send(error.message);
    }
});

app.delete("/deleteBook/:bookId", async (req, resp) => {
    try {
        const result = await bookModel.findByIdAndDelete(req.params.bookId);
        resp.send(result);
    } catch (error) {
        resp.status(500).send(error.message);
    }
});

app.listen(4000, function (err) {
    if (err) console.log("Error in server setup");
    console.log("Server listening on Port", 4000);
});
