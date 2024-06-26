import { Router } from "express";
import { books } from "../store/book.js";
import { upload } from '../middleware/file.js';

const router = Router();

router.get('/', (req, res) => {
    res.render('books/index', { 
        title: 'Book | index',
        books: books,
    })
});

router.get('/create', (req, res) => {
    res.render('books/create', { title: 'Book | create' })
});

router.post('/create', upload.single('bookfile'),  (req, res) => {
    const { title } = req.body;
    const file = req.file;

    if (!title && !file) {
        res.status(400)
            .json('Params not params')
    } else {
        const newBook = {
            id: new Date().getTime(),
            title,
            description: "",
            authors: "",
            favorite: "",
            fileCover: "",
            // fileName: file.filename,
        }
        books.push(newBook);
        res.redirect(`/books/${newBook.id}`);
    }
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const book = books.find(item => item.id == id);
    if (!book) {
        res.status(404).json('Not found')
    } else {
        res.render('books/view', {
            title: 'Book | view',
            book: book,
        })
    }
});

router.get('/:id/edit', (req, res) => {
    const { id } = req.params;
    const book = books.find(item => item.id == id);
    if (!book) {
        res.status(404).json('Not found')
    } else {
        res.render('books/edit', {
            title: 'Book | edit',
            book: book,
        })
    }
});
router.post('/:id/edit', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const book = books.find(item => item.id == id);
    if (!book) {
        res.status(404).json('Not found');
    } else {
        book.title = title;
        res.redirect(`/books/${book.id}`);
    }
});

router.post('/:id', (req, res) => {
    const { id } = req.params;
    const bookIdx = books.findIndex(item => item.id == id);
    if (bookIdx == -1) {
        res.status(404).json('Not found');
    } else {
        books.splice(bookIdx, 1)
        res.redirect('/books');
    }
});

router.get('/:id/download', (req, res) => {
    const { id } = req.params;
    const book = books.find(item => item.id == id);
    if (!book) {
        res.status(404).json('Not found');
    } else {
        res.download('/images/cover.png', 'cover.png', {root: './public'});
    }
});

export {
    router,
}