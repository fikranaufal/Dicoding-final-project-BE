import express from 'express';
import {
    createBook,
    getBooks,
    getBookById,
    deleteBook,
    editNoteById,
    getReadingBooks,
    //getUnreadingBooks,
    //getFinishedBooks,
    //getUnfinishedBooks,
    //getDicodingKeyBooks
} from './controller.js';

const router = express.Router();

// All mandatory router
router.post('/books', createBook);
router.get('/books', getBooks);
router.get('/books/:id',getBookById);
router.delete('/books/:id',deleteBook);
router.put('/books/:id',editNoteById);

// All optional router
router.get('/books', getReadingBooks);
//router.get('/books?reading=0', getUnreadingBooks);
//router.get('/books?finished=1', getFinishedBooks);
//router.get('/books?finished=0', getUnfinishedBooks);
//router.get('/books?named=:"dicoding"', getDicodingKeyBooks);

export default router;