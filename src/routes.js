import express from 'express';
import {
    createBook,
    getBooks,
    getBookById,
    deleteBook,
    editNoteById,
} from './controller.js';

const router = express.Router();

router.post('/books', createBook);
router.get('/books', getBooks);
router.get('/books/:id',getBookById);
router.delete('/books/:id',deleteBook);
router.put('/books/:id',editNoteById);

export default router;