import Book from "../models/book.js"

export async function getAllBooks(req, res) {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

export async function addBook(req, res) {
    try {
        const { ISBN } = req.body;

        const foundBook = await Book.findOne({ ISBN });
        if (foundBook) {
            return res.json({ message: "Book Already Exists!" });
        }

        const newBook = await Book.create(req.body);
        res.json({ message: "Book Added Successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

export async function getBooksByISBN(req, res) {
    try {
        const { ISBN } = req.body;
        if (!ISBN) {
            return res.status(400).json({ message: "Please provide a valid ISBN!" });
        }

        const foundBooks = await Book.find({ ISBN });

        if (foundBooks.length > 0) {
            return res.status(200).json({ message: "Books found!", data: foundBooks });
        }

        return res.status(404).json({ message: "No book found with this ISBN!" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

export async function getBooksByTitle(req, res) {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Please provide a valid title!" });
        }

        const foundBooks = await Book.find({ title });

        if (foundBooks.length > 0) {
            return res.status(200).json({ message: "Books found!", data: foundBooks });
        }

        return res.status(404).json({ message: "No book found with this title!" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

export async function getBooksByAuthor(req, res) {
    try {
        const { author } = req.body;
        if (!author) {
            return res.status(400).json({ message: "Please provide a valid author name!" });
        }

        const foundBooks = await Book.find({ author });

        if (foundBooks.length > 0) {
            return res.status(200).json({ message: "Books found!", data: foundBooks });
        }

        return res.status(404).json({ message: "No book found with this author name!" });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Internal Server Error!" });
    }
}
