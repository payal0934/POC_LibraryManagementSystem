// src/pages/ViewAllBooks.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../User/BorrowBook.css";
import { FaTrash } from "react-icons/fa";

const ViewAllBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 🔑 Use imageUrl from DB directly if available
  const getImageForBook = (book) => {
    return book.imageUrl?.startsWith("http")
      ? book.imageUrl
      : `http://localhost:8080/Uploads/Images/${book.imageUrl}`;
  };

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/books");
      setBooks(res.data.data || res.data);
    } catch (err) {
      console.error("❌ Error fetching books:", err);
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
      console.error("❌ Error deleting book:", err);
      toast.error(err.response?.data || "❌ Error deleting book");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Filter + search
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.bookName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || book.bookCategory === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="borrow-page">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="bb-page-title">📚 All Books</h2>

      {/* Search + Filter */}
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
        </select>
      </div>

      {/* Masonry Layout (same as BorrowBook) */}
      <div className="bb-masonry">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.bookId} className="bb-masonry-card">
              <img
                src={getImageForBook(book)}
                alt={book.bookName}
                className="bb-card-img"
                onError={(e) => {
                  console.error(
                    `❌ Image not found for bookId=${book.bookId} (${book.bookName}), using default`
                  );
                  e.target.src =
                    "http://localhost:8080/Uploads/Images/default.jpg";
                }}
              />

              <div className="bb-card-overlay">
                <h3>{book.bookName}</h3>
                <p>Author: {book.author}</p>
                <p>Available: {book.bookCount}</p>
                <p>Category: {book.bookCategory}</p>

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
