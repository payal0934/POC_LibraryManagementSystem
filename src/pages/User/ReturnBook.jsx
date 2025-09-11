
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api/axios";
import "../User/ReturnBook.css";

const ReturnBook = () => {
  const { user } = useContext(AuthContext);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch borrowed books
  const fetchBorrowedBooks = async () => {
    if (!user?.userId) return;

    try {
      const res = await api.get(`/api/library/borrowed/${user.userId}`);
      setBorrowedBooks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      toast.error(" Failed to fetch borrowed books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrowedBooks();
  }, [user]);

  // Handle returning a book
  const handleReturn = async (bookId) => {
    try {
      await api.post(`/api/books/return`, null, {
        params: { bookId, userId: user.userId },
      });
      toast.success("✅ Book returned successfully!");
      setBorrowedBooks((prev) => prev.filter((b) => b.bookId !== bookId));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data || " Failed to return book");
    }
  };

  if (!user) return <p>Loading user info...</p>;
  if (loading) return <p>Loading borrowed books...</p>;

  if (borrowedBooks.length === 0)
    return <p className="text-center mt-4"> You have no borrowed books.</p>;

  return (
    <div className="returnbook-page">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="returnbook-title"> My Borrowed Books</h2>

      <table className="returnbook-table">
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {borrowedBooks.map((book) => (
            <tr key={book.bookId}>
              <td>{book.bookName}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>
                <button
                  className="return-btn"
                  onClick={() => handleReturn(book.bookId)}
                >
                  Return
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReturnBook;
