// src/pages/ViewAllBooks.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../User/BorrowBook.css";
import { FaTrash, FaEdit } from "react-icons/fa";

const ViewAllBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Edit Modal state
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

  const [form, setForm] = useState({
    bookName: "",
    author: "",
    isbn: "",
    bookCount: 1,
    bookCategory: "",
    image: null, // File OR string (existing image filename)
  });

  const [preview, setPreview] = useState(null); // For showing preview

  // Utility: Get correct image URL
  const getImageForBook = (book) => {
    return book.imageUrl?.startsWith("http")
      ? book.imageUrl
      : `http://localhost:8080/Uploads/Images/${book.imageUrl}`;
  };

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/books");
      setBooks(res.data.data || res.data);
    } catch (err) {
      console.error(" Error fetching books:", err);
      toast.error(" Failed to fetch books");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Delete a book
  const handleDelete = async (bookId) => {
    const confirmDelete = window.confirm("⚠️ Do you really want to delete this book?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/books/${bookId}`);
      toast.success(" Book deleted successfully");
      setBooks((prev) => prev.filter((book) => book.bookId !== bookId));
    } catch (err) {
      console.error(" Error deleting book:", err);
      toast.error(err.response?.data || " Error deleting book");
    }
  };

  // Edit a book
  const handleEditClick = (book) => {
    setForm({
      bookName: book.bookName,
      author: book.author,
      isbn: book.isbn,
      bookCount: book.bookCount,
      bookCategory: book.bookCategory,
      image: book.imageUrl || null,
    });

    setPreview(getImageForBook(book)); // Show old image preview
    setSelectedBookId(book.bookId);
    setIsEditing(true);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file)); // show new image preview
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Update book
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("bookName", form.bookName);
      formData.append("author", form.author);
      formData.append("isbn", form.isbn);
      formData.append("bookCount", form.bookCount);
      formData.append("bookCategory", form.bookCategory);

      if (form.image instanceof File) {
        formData.append("image", form.image);
      }

      await axios.put(
        `http://localhost:8080/api/books/update/${selectedBookId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success(" Book updated successfully");
      setIsEditing(false);
      fetchBooks();
    } catch (err) {
      console.error(" Error updating book:", err);
      toast.error("Failed to update book");
    }
  };

  // Filter + search
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.bookName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || book.bookCategory === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="borrow-page">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="bb-page-title"> Manage Books</h2>

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

      {/* Masonry Layout */}
      <div className="bb-masonry">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.bookId} className="bb-masonry-card">
              <img
                src={getImageForBook(book)}
                alt={book.bookName}
                className="bb-card-img"
                onError={(e) => {
                  e.target.src = "http://localhost:8080/Uploads/Images/default.jpg";
                }}
              />

              <div className="bb-card-overlay">
                <h3>{book.bookName}</h3>
                <p>Author: {book.author}</p>
                <p>Available: {book.bookCount}</p>
                <p>Category: {book.bookCategory}</p>

                {/* Icons stacked vertically */}
                <div className="bb-icon-container">
                  {/* Edit Button on top */}
                  <button className="bb-edit-btn" onClick={() => handleEditClick(book)}>
                    <FaEdit />
                  </button>

                  {/* Delete Button below */}
                  <button className="bb-delete-btn" onClick={() => handleDelete(book.bookId)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No books available</p>
        )}
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="bb-modal">
          <div className="bb-modal-content">
            <h2>Edit Book</h2>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                name="bookName"
                value={form.bookName}
                onChange={handleChange}
                placeholder="Book Name"
                required
              />
              <input
                type="text"
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Author"
                required
              />
              <input
                type="number"
                name="bookCount"
                value={form.bookCount}
                onChange={handleChange}
                min="1"
                required
              />
              <input
                type="text"
                name="bookCategory"
                value={form.bookCategory}
                onChange={handleChange}
                placeholder="Category"
              />

              {/* Image preview */}
              {preview && (
                <div style={{ margin: "10px 0" }}>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ width: "100px", height: "100px", borderRadius: "8px" }}
                  />
                </div>
              )}

              {/* File input */}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />

              <div className="bb-modal-actions">
                <button type="submit">Update</button>
                <button type="button" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllBooks;
