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

    // respond if conditional do not accomplish
    return res.status(500).json({
        status: "error",
        message: "Buku gagal ditambahkan"
    });

};

// This is logic for get all books
export const getBooks = (req, res) => {
    let Books = books;

    // This is logic for reading query
    if(req.query.reading !== undefined) {
        const queryValue = req.query.reading; // Define queryValue as query value

        // Conditional when queryValue of reading is 1
        if(queryValue == 1) {
            Books = Books.filter((book) => book.reading === true);
        } else if(queryValue == 0) { // Conditional when queryValue of reading is 0
            Books = Books.filter((book) => book.reading === false);
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Gagal menampilkan buku. Parameter query tidak valid'
            });
        }
    } 
    
    // This is logic for finished query
    if(req.query.finished !== undefined) {
        const queryValue = req.query.finished; // Define queryValue as query value

        // Conditional when queryValue of finished is 1
        if(queryValue == 1) {
            Books = Books.filter((book) => book.finished === true);
        } else if(queryValue == 0) { // Conditional when queryValue of finished is 0
            Books = Books.filter((book) => book.finished === false);
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Gagal menampilkan buku. Parameter query tidak valid'
            });
        }
    }

    // This is logic for name query
    if(req.query.name !== undefined) {
        const queryValue = req.query.name; // Define queryValue as query value

        // Conditional when queryValue is dicoding with case insensitive
        if(queryValue.toLowerCase() == 'dicoding') {
            Books = Books.filter((book) => book.name.toLowerCase().includes('dicoding') === true)
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Gagal menampilkan buku. Parameter query tidak valid'
            });
        }
    }

    // Respond if conditional do not accomplish
    return res.status(200).json({
        status: 'success',
        data: { books : Books.map(({ id, name, publisher }) => ({ id, name, publisher })) }
    })
}
// This is logic for get book by id 
export const getBookById = (req, res) => {
    const { id } = req.params;
    const book = books.find((n) => n.id === id);

    // Conditional for getting book by id
    if(book) {
        return res.status(200).json({
            status: "success",
            data: { books }
        });
    }

    // respond if book doesn't exist
    return res.status(404).json({
        status: "fail",
        message: "Buku tidak ditemukan"
    });
};

// This is logic for delete a book by id 
export const deleteBook = (req, res) => {
    const { id } = req.params; // Getting id from params
    const index = books.findIndex((n) => n.id === id); // search for index

    // Conditional if Id exist and value is not negative
    if(index !== -1) {
        books.splice(index,1); // Deleting array by index and only 1 
        return res.status(200).json({
            status: "success",
            message: "Buku berhasil dihapus"
        });        
    }

    // Respond when conditional do not accomplish
    return res.status(404).json({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan"
    });
};

// This is logic for edit note by ID
export const editNoteById = (req, res) => {
    const { Id } = req.params; // Getting id from params
    const { name, year, author, summary, publisher, pageCount, readPage, reading} = req.body; // Getting all key from body
    const updatedAt = new Date().toISOString(); // Initialize new update
    const index = books.findIndex((n) => n.Id === Id);

    // Conditional if there is no name in params
    if(!name) {
        res.status(400).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        });
    }

    // Conditional if there readPage more than pageCount
    if(readPage > pageCount) {
        res.status(400).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari readCount'
        })
    }

    // Conditional if the index is not negative
    if(index !== -1) {
        books[index] = { ...books[index], name, year, author, summary, publisher, pageCount, reading, updatedAt};
        return res.json({
            status: 'success',
            message: 'Buku berhasil diperbarui'
        });
    }


    // Respond when condition above not qualify
    return res.status(404).json({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan'
    });

};
