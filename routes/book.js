const express = require("express")

const router = express.Router()

const Author = require("../models/Author")
const Book = require("../models/Book")


router.get('/', async (req, res) => {
    try {
        const book = await Book.find();
        res.json({ book });
    } catch (err) {
        res.status(400).json({ error: err });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findOne({ bookId: req.params.id });
        res.json({ book });
    } catch (err) {
        res.status(400).json({ error: err });
    }
})

router.post('/', async (req, res) => {
    try {
        const authorID = req.body.authorId;
        const author = await Author.findOne({ authorID: authorID });
        console.log(author)

        if (!author) res.status(401).json({ massage: `author not found` });

        const bookInfo = new Book(req.body);

        await bookInfo.save();
        res.status(201).json({massage : 'book added successfully!'})
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const authorID = req.body.authorId;
        const author = Author.findOne({ authorId: authorID });

        if (!author) res.status(401).json({ massage: `author not found` });

        const book = Book.findOneAndUpdate({ bookId: req.params.id }, req.body)

        res.json({ book })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const massage = Book.findOneAndDelete({ bookId: req.params.id });
        if (massage) {
            res.json({ massage: 'Book deleted!' });
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }

})

module.exports = router;

