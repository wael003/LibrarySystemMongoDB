const express = require("express")
const router = express.Router()

const BookShop = require("../models/BookShop")
const Book = require("../models/Book")

router.get('/', async (req, res) => {
    try {
        const bookshop = await BookShop.find();
        res.json({ bookshop });
    } catch (err) {
        res.status(400).json({ error: err });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const bookshop = await BookShop.findOne({ shopId: req.params.id });
        res.json({ bookshop });
    } catch (err) {
        res.status(400).json({ error: err });
    }
})

router.post('/', async (req, res) => {
    try {
        const bookIds = req.body.booksAvailable; // assuming this is an array
        let book;
        let books = [];
        for (let i = 0; i < bookIds.length; i++) {
            book = await Book.findOne({ bookId: bookIds[i] });
            if (book) {
                books.push(book);
            }

        }
        if (books.length == bookIds.length) {
            const bookshopInfo = new BookShop(req.body);

            await bookshopInfo.save();
        } else {
             res.status(401).json({ massage: `there is book not found` });
        }


        res.status(201).json({ massage: 'bookshop added successfully!' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const bookIds = req.body.booksAvailable; // assuming this is an array
        let book;
        let books = [];
        for (let i = 0; i < bookIds.length; i++) {
            book = await Book.findOne({ bookId: bookIds[i] });
            if (book) {
                books.push(book);
            }

        }
        if (books.length == bookIds.length) {
            const bookshopInfo = await BookShop.findOneAndUpdate({shopId : req.params.id} , req.body , {new : true});

            res.status(201).json({ bookshopInfo});
        } else {
             res.status(401).json({ message: `One or more books not found` });
        }
       
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const massage = await BookShop.findOneAndDelete({ shopId: req.params.id });
        if (massage) {
            res.json({ massage: 'BookShop deleted!' });
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }

})

module.exports = router;