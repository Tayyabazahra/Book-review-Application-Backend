// index.js
import axios
 from "axios";
// Define the base URL for the API
const baseURL = 'http://localhost:8747/api';

// Task 10: Get all books – Using async callback function
const getAllBooks = async () => {
    try {
        const response = await axios.get(`${baseURL}/books`);
        console.log('All Books:', response.data);
    } catch (error) {
        console.error('Error fetching all books:', error);
    }
};

// Task 11: Search by ISBN – Using Promises
const getBookByISBN = (isbn) => {
    return axios.post(`${baseURL}/books/byISBN`, { isbn })
        .then(response => {
            console.log('Book by ISBN:', response.data);
        })
        .catch(error => {
            console.error('Error fetching book by ISBN:', error);
        });
};

// Task 12: Search by Author
const getBooksByAuthor = async (author) => {
    try {
        const response = await axios.post(`${baseURL}/books/byAuthor`, { author });
        console.log('Books by Author:', response.data);
    } catch (error) {
        console.error('Error fetching books by author:', error);
    }
};

// Task 13: Search by Title
const getBooksByTitle = async (title) => {
    try {
        const response = await axios.post(`${baseURL}/books/byTitle`, { title });
        console.log('Books by Title:', response.data);
    } catch (error) {
        console.error('Error fetching books by title:', error);
    }
};

// Example usage of the functions
getAllBooks();  // Get all books
getBookByISBN('1234567890');  // Search by ISBN
getBooksByAuthor('F. Scott Fitzgerald');  // Search by Author
getBooksByTitle('The Great Gatsby');  // Search by Title
