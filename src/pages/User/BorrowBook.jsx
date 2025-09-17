// src/pages/User/BorrowBook.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Auth/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../User/BorrowBook.css";

const BorrowBook = () => {
  const { user } = useContext(AuthContext);
  const currentUserId = user?.userId;

  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch books
  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/books");
      const bookArray = res.data.data || [];
      setBooks(bookArray);

      const uniqueCategories = [
        "All",
        ...new Set(bookArray.map((b) => b.bookCategory)),
      ];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error(" Error fetching books:", err);
      toast.error(" Failed to fetch books");
    }
  };

  // Fetch borrowed books
  const fetchBorrowedBooks = async () => {
    if (!currentUserId) return;
    try {
      const res = await axios.get(
        `http://localhost:8080/api/library/borrowed/${currentUserId}`
      );
      setBorrowedBooks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(" Error fetching borrowed books:", err);
      toast.error(" Failed to fetch borrowed books");
    }
  };

  // Load books + borrowed books
  useEffect(() => {
    const fetchAllData = async () => {
      if (!user) return;

      setLoading(true);
      try {
        await fetchBooks();
        await fetchBorrowedBooks();
      } catch (err) {
        console.error(" Error fetching data:", err);
        toast.error(" Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [user]);

  // Borrow a book
  const handleBorrow = async (bookId) => {
    if (!currentUserId) return toast.error(" User not logged in!");

    if (borrowedBooks.some((b) => b.bookId === bookId)) {
      return toast.info(" You have already borrowed this book!");
    }

    try {
      const res = await axios.post(
        `http://localhost:8080/api/books/borrow/${bookId}?userId=${currentUserId}`
      );
      toast.success(res.data);

      // Update book count instantly
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.bookId === bookId
            ? { ...book, bookCount: book.bookCount - 1 }
            : book
        )
      );

      // Add to borrowed list
      const borrowedBook = books.find((book) => book.bookId === bookId);
      if (borrowedBook) {
        setBorrowedBooks((prev) => [
          ...prev,
          { ...borrowedBook, borrowedDate: new Date() },
        ]);
      }
    } catch (err) {
      console.error(" Error borrowing book:", err);
      toast.error(err.response?.data || " Error borrowing book");
    }
  };

  if (!user) return <p>Loading user info...</p>;
  if (loading) return <p>Loading books...</p>;

  // Filter books
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.bookName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || book.bookCategory === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  // Fetch latest books
const fetchLatestBooks = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/books/latest");
    const latestBooks = res.data.data || [];
    setBooks(latestBooks);

    const uniqueCategories = [
      "All",
      ...new Set(latestBooks.map((b) => b.bookCategory)),
    ];
    setCategories(uniqueCategories);
  } catch (err) {
    console.error("Error fetching latest books:", err);
    toast.error("Failed to fetch latest books");
  }
};


  return (
    <div className="borrow-page">
      <ToastContainer position="top-right" autoClose={3000} />
<h2 className="bb-page-title"> Start Reading Today</h2>

      {/* Search & Filter */}
      <div className="bb-filters">
        <input
          type="text"
          className="bb-search-bar"
          placeholder="Search book by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="bb-category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Masonry Layout */}
      <div className="bb-masonry">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book.bookId}
              className={`bb-masonry-card ${
                borrowedBooks.some((b) => b.bookId === book.bookId)
                  ? "borrowed"
                  : ""
              }`}
            >
              <img
                src={
                  book.imageUrl?.startsWith("http")
                    ? book.imageUrl
                    : `http://localhost:8080/Uploads/Images/${book.imageUrl}`
                }
                alt={book.bookName}
                className="bb-card-img"
                onError={(e) => {
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
                  className="bb-card-btn"
                  disabled={
                    book.bookCount <= 0 ||
                    borrowedBooks.some((b) => b.bookId === book.bookId)
                  }
                  onClick={() => handleBorrow(book.bookId)}
                >
                  {borrowedBooks.some((b) => b.bookId === book.bookId)
                    ? "Borrowed"
                    : book.bookCount > 0
                    ? "Borrow"
                    : "Not Available"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
  );
};

export default BorrowBook;
