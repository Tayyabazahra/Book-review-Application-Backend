import mongoose from "mongoose";

// Define the schema for the books collection
const bookSchema = new mongoose.Schema(
  {
    ISBN: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  },
  { collection: "Books" } 
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
