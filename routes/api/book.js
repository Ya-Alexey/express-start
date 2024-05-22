import { Router } from "express";
import { books } from "../../store/book.js";
import { upload } from '../../middleware/file.js';

const router = Router();

router.get('/', (req, res) => {
    res.json(books)
});
router.post('/', upload.single('book-file'), (req, res) => {
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
            fileName: file.filename,
        }
        books.push(newBook);
        res.status(201).json(newBook);
    }
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const book = books.find(item => item.id == id);
    if (!book) {
        res.status(404).json('Not found')
    } else {
        res.json(book)
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const book = books.find(item => item.id == id);
    if (!book) {
        res.status(404).json('Not found');
    } else {
        Object.assign(book, updateData);
        res.json(book)
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const bookIdx = books.findIndex(item => item.id == id);
    if (bookIdx == -1) {
        res.status(404).json('Not found');
    } else {
        books.splice(bookIdx, 1)
        res.json('success');
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