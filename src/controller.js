import { nanoid } from 'nanoid';
import books from './books.js';

// This is logic for create a new book
export const createBook = (req, res) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;
    const id = nanoid(16);
    const finished = readPage === pageCount;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    // This is conditional if there is no name when creating a book 
    if(!name) {
        return res.status(400).json({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku"
        });
    }

    // This is conditional if readPage is more than pageCount
    if(readPage > pageCount) {
        return res.status(400).json({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        });
    }

    // creating a newbook
    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt
    };

    // Push a new book to books array
    books.push(newBook);
    const isSuccess = books.filter((book) => book.id === id).length > 0;

    // This is a respond if success to create a book
    if(isSuccess) {
        return res.status(201).json({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: id
            }
        });
    }

    return res.status(500).json({
        status: "error",
        message: "Buku gagal ditambahkan"
    });

};

// This is logic for get all books
export const getBooks = (req, res) => {
    return res.status(200).json({
        status: "success",
        data: { books }
    });
};

// This is logic for get book by id 
export const getBookById = (req, res) => {
    const { id } = req.params;
    const book = books.find((n) => n.id === id);

    if(book) {
        return res.status(200).json({
            status: "success",
            data: { books }
        });
    }

    return res.status(404).json({
        status: "fail",
        message: "Buku tidak ditemukan"
    });
};

// This is logic for delete a book by id 
export const deleteBook = (req, res) => {
    const { id } = req.params;
    const index = books.findIndex((n) => n.id === id);

    if(index !== -1) {
        books.splice(index,1);
        return res.status(200).json({
            status: "success",
            message: "Buku berhasil dihapus"
        });        
    }

    return res.status(404).json({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan"
    });
};

// This is logic for edit note by ID
export const editNoteById = (req, res) => {
    const { Id } = req.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading} = req.body;
    const updatedAt = new Date().toISOString();
    const index = books.findIndex((n) => n.Id === Id);

    if(!name) {
        res.status(400).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        });
    }

    if(readPage > pageCount) {
        res.status(400).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari readCount'
        })
    }

    if(index !== -1) {
        books[index] = { ...books[index], name, year, author, summary, publisher, pageCount, reading, updatedAt};
        return res.json({
            status: 'success',
            message: 'Catatan berhasil diperbarui'
        });
    }


    return res.status(404).json({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan'
    });

};

// Logic for get all reading books
export const getReadingBooks = (req, res) => {
    const { queryValue } = req.query.reading;
    let allReadingBooks = [];

    if(queryValue === 0) {
        for(let book in books) {
            if(book.reading === false) {
                allReadingBooks.push(book)
            };
        };

        return res.status(200).json({
            status: 'success',
            data: { allReadingBooks }
        });
    } else if(queryValue === 1) {
        for(let book in books) {
            if(book.reading === true) {
                allReadingBooks.push(book)
            };
        };

        return res.status(200).json({
            status: 'success',
            data: { allReadingBooks }
        });
    }

    res.status(404).json({
        status: 'fail',
        message: 'Buku gagal diambil. Parameter query tidak sesuai'
    })
};