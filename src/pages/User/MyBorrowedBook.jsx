// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../Auth/AuthContext";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// // import "./ReturnBook.css";
// import "../User/ReturnBook.css"


// const MyBorrowedBooks = () => {
//   const { user } = useContext(AuthContext);
//   const currentUserId = user?.userId;

//   const [borrowedBooks, setBorrowedBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchBorrowedBooks = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:8080/api/books/borrowed/${currentUserId}`
//       );
//       setBorrowedBooks(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch borrowed books");
//       setLoading(false);
//     }
//   };

//   const handleReturn = async (bookId) => {
//     try {
//       const res = await axios.post(
//         `http://localhost:8080/api/books/return`,
//         null,
//         {
//           params: {
//             bookId: bookId,
//             userId: currentUserId,
//           },
//         }
//       );
//       toast.success(res.data);
//       fetchBorrowedBooks(); // Refresh the list after returning
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data || " Failed to return book");
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchBorrowedBooks();
//     }
//   }, [user]);

//   if (!user) return <p>Loading user info...</p>;
//   if (loading) return <p>Loading borrowed books...</p>;

//   return (
//     <div className="myborrowed-container">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <h2 className="myborrowed-title">====My Borrowed Books</h2>

//       {borrowedBooks.length === 0 ? (
//         <p className="no-books">You have not borrowed any books yet.</p>
//       ) : (
//         <div className="myborrowed-grid">
//           {borrowedBooks.map((book) => (
//             <div key={book.bookId} className="myborrowed-card">
//               <img
//                 src={`https://picsum.photos/200/250?random=${book.bookId}`}
//                 alt={book.bookName}
//                 className="myborrowed-image"
//               />
//               <div className="myborrowed-info">
//                 <h5 className="myborrowed-title-text">{book.bookName}</h5>
//                 <p className="myborrowed-author">Author: {book.author}</p>
//                 <p className="myborrowed-date">
//                   Borrowed On:{" "}
//                   {book.borrowedDate
//                     ? new Date(book.borrowedDate).toLocaleDateString()
//                     : "Unknown"}
//                 </p>
//                 <button
//                   className="myborrowed-return-btn"
//                   onClick={() => handleReturn(book.bookId)}
//                 >
//                   Return Book
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyBorrowedBooks;