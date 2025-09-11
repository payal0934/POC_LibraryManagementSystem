// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaTrash } from "react-icons/fa";
// import "../User/BorrowBook.css"; 
// import "./ConfirmModal.css";
// import ConfirmModal from "./ConfirmModal";

// // ✅ import the same card images as BorrowBook page
// import borrowBookImg from "../../assets/BooksImages/12.jpg";
// import returnBookImg from "../../assets/BooksImages/romance.jpg";
// import borrowedHistoryImg from "../../assets/BooksImages/mystry.jpg";
// import Img4 from "../../assets/BooksImages/scifi.jpg";
// import Img5 from "../../assets/BooksImages/technology.jpg";
// import Img6 from "../../assets/BooksImages/i1.jpg";
// import Img7 from "../../assets/BooksImages/Horror.png";

// const DeleteBook = () => {
//   const [books, setBooks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const fetchBooks = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/api/books");
//       setBooks(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("❌ Failed to fetch books");
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const handleDeleteBook = async (bookId) => {
//     if (!window.confirm("Are you sure you want to delete this book?")) return;

//     try {
//       await axios.delete(`http://localhost:8080/api/books/${bookId}`);
//       toast.success("Book deleted successfully!");
//       fetchBooks();
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data || "Failed to delete book");
//     }
//   };

//   const filteredBooks = books.filter(
//     (book) =>
//       book.bookName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       book.author?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // ✅ cycle through same 3 images like BorrowBook page
//   const images = [borrowBookImg, returnBookImg, borrowedHistoryImg,Img4,Img5,Img6,Img7];

//   return (
//     <div className="borrow-page">
//       <ToastContainer position="top-right" autoClose={3000} />

//       <nav className="bb-navbar">
//         <h1 className="bb-nav-title">Delete Books</h1>
//       </nav>

//       <div className="bb-filters">
//         <input
//           type="text"
//           className="bb-search-bar"
//           placeholder="Search by book name or author..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <div className="bb-cards-container">
//         {filteredBooks.length > 0 ? (
//           filteredBooks.map((book, index) => (
//             <div key={book.bookId} className="bb-card">
//               <img
//                 src={images[index % images.length]} // cycle images
//                 alt={book.bookName}
//                 className="bb-card-img"
//               />

//               <div className="bb-card-overlay">
//                 <h3>{book.bookName}</h3>
//                 <p>Author: {book.author}</p>
//                 <p>ISBN: {book.isbn}</p>
//                 <p>Count: {book.bookCount}</p>

//                 <button
//                   className="bb-card-btn"
//                   onClick={() => handleDeleteBook(book.bookId)}
//                   style={{
//                     background: "#ff4d4f",
//                     padding: "6px 10px",
//                     fontSize: "0.9rem",
//                   }}
//                   title="Delete Book"
//                 >
//                   <FaTrash />
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No books found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DeleteBook;
