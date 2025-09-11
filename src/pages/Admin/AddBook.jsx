import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./AddBook.css"; // make sure to create this file
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBook = ({ onBookAdded }) => {
  const [book, setBook] = useState({
    bookName: "",
    author: "",
    isbn: "",
    bookCount: 1,
    bookCategory: "",
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/books/add", book);
      toast.success(`Book '${book.bookName}' added successfully!`);
      setBook({ bookName: "", author: "", isbn: "", bookCount: 1, category: "" });
      if (onBookAdded) onBookAdded();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add book");
    }
  };

  return (
    <div className="add-book-wrapper">
      <form onSubmit={handleSubmit} className="glass-form">
        <h2>Add New Book</h2>
        <input
          type="text"
          name="bookName"
          value={book.bookName}
          onChange={handleChange}
          placeholder="Book Name"
          required
        />
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          placeholder="Author"
          required
        />
        <input
          type="text"
          name="isbn"
          value={book.isbn}
          onChange={handleChange}
          placeholder="ISBN"
          required
        />
        <input
          type="number"
          name="bookCount"
          value={book.bookCount}
          onChange={handleChange}
          placeholder="Count"
          min={1}
          required
        />
        <input
          type="text"
          name="bookCategory"
          value={book.bookCategory}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <button type="submit">Add Book</button>
      </form>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default AddBook;
