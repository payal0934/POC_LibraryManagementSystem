

import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api/axios";
import "../User/ReturnBook.css";  // Reuse the same CSS file
import "../User/BorrowdHistory.css"

const BorrowdHistory = () => {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    if (!user?.userId) return;

    try {
      const res = await api.get(`/api/books/history/${user.userId}`);
      console.log("History Data:", res.data); // Debugging line
      setHistory(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      toast.error(" Failed to fetch borrow history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [user]);

  if (!user) return <p>Loading user info...</p>;
  if (loading) return <p>Loading borrow history...</p>;
  if (history.length === 0) return <p className="text-center mt-4">No borrow history found.</p>;

  return (
    <div className="returnbook-page">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="returnbook-title">📚 Borrow History</h2>

      <table className="returnbook-table">
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Borrowed</th>
            <th>Returned</th>
          </tr>
        </thead>
        <tbody>
          {history.map((record) => (
            <tr key={record.id}>
              <td>{record.book ? record.book.bookName : "Unknown"}</td>
              <td>
                {record.borrowedDate
                  ? new Date(record.borrowedDate).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>
                {record.returnedDate
                  ? new Date(record.returnedDate).toLocaleDateString()
                  : "Not returned yet"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowdHistory;


