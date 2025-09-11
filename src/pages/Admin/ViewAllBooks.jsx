// src/pages/ViewAllBooks.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../User/BorrowBook.css";
import bookImages from "../../utils/BookImages";
import { FaTrash } from "react-icons/fa";

const ViewAllBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const assignImagesToBooks = (books, images) => {
    const shuffledImages = [...images].sort(() => 0.5 - Math.random());
    return books.map((book, index) => ({
      ...book,
      image: shuffledImages[index % shuffledImages.length],
    }));
  };

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/books");
      const booksWithImages = assignImagesToBooks(res.data, bookImages);
      setBooks(booksWithImages);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to fetch books");
    }
  };

  const handleDelete = async (bookId) => {
    const confirmDelete = window.confirm(
      "⚠️ Do you really want to delete this book?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/books/${bookId}`);
      toast.success("✅ Book deleted successfully");
      setBooks((prev) => prev.filter((book) => book.bookId !== bookId));
    } catch (err) {
      toast.error(err.response?.data || "❌ Error deleting book");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Filter + search logic
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.bookName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || book.bookCategory === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="borrow-page">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="bb-page-title">📚 All Books</h2>

      {/* 🔍 Search + Filter */}
      <div className="bb-filters">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bb-search-bar"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bb-category-filter"
        >
          <option value="All">Select Category</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-fiction">Non-fiction</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
          {/* Add more categories as per your DB */}
        </select>
      </div>

      {/* Book Cards */}
      <div className="bb-cards-container">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.bookId} className="bb-card">
              <img
                src={book.image || "/default-book.jpg"}
                alt={book.bookName}
                className="bb-card-img"
              />
              <div className="bb-card-overlay">
                <h3>{book.bookName}</h3>
                <p>Author: {book.author}</p>
                <p>Available: {book.bookCount}</p>
                <p>Category: {book.bookCategory}</p>

                {/* Delete button bottom-right */}
                <button
                  className="bb-delete-btn"
                  onClick={() => handleDelete(book.bookId)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No books available</p>
        )}
      </div>
    </div>
  );
};

export default ViewAllBooks;
