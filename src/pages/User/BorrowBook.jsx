import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Auth/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../User/BorrowBook.css";
 import bookImages from "../../utils/BookImages";
 


const BorrowBook = () => {
  const { user } = useContext(AuthContext);
  const currentUserId = user?.userId;

  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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

      const uniqueCategories = [
        "All",
        ...new Set(res.data.map((book) => book.bookCategory)),
      ];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchBooks();
  }, [user]);


  const handleBorrow = async (bookId) => {
  if (!currentUserId) return toast.error("⚠️ User not logged in!");

  // Check from backend borrowedBooks (persistent)
  if (borrowedBooks.some((b) => b.bookId === bookId)) {
    return toast.info("⚠️ You have already borrowed this book!");
  }

  try {
    const res = await axios.post(
      `http://localhost:8080/api/books/borrow/${bookId}?userId=${currentUserId}`
    );
    toast.success(res.data);

    // Update book stock
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.bookId === bookId
          ? { ...book, bookCount: book.bookCount - 1 }
          : book
      )
    );

    // ✅ Add borrowed book to borrowedBooks state
    const borrowedBook = books.find((book) => book.bookId === bookId);
    if (borrowedBook) {
      setBorrowedBooks((prev) => [
        ...prev,
        { ...borrowedBook, borrowedDate: new Date() },
      ]);
    }
  } catch (err) {
    toast.error(err.response?.data || " Error borrowing book");
  }
};


  if (!user) return <p>Loading user info...</p>;
  if (loading) return <p>Loading books...</p>;

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.bookName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || book.bookCategory === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div className="borrow-page">
        <nav className="bb-navbar"></nav>

        <ToastContainer position="top-right" autoClose={3000} />
<h2 className="bb-page-title">Book To Buy</h2>

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

        <div className="bb-cards-container">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div
                key={book.bookId}
                className={`bb-card ${
                  borrowedBooks.some((b) => b.bookId === book.bookId)
                    ? "borrowed"
                    : ""
                }`}
              >
                <img
                  src={book.image}
                  alt={book.bookName}
                  className="bb-card-img"
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
    </>
  );
};

export default BorrowBook;
