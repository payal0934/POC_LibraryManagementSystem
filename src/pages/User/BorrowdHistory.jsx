// src/pages/BookHistory.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../User/ReturnBook.css"
import "../User/BorrowdHistory.css"
const BookHistory = () => {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

const fetchHistory = async () => {
  if (!user?.userId) return;

  try {
    const res = await axios.get(
      `http://localhost:8080/api/library/history/${user.userId}`
    );
    console.log("History Data:", res.data);

    // Adjust for backend structure
    setHistory(Array.isArray(res.data.data) ? res.data.data : []);
  } catch (err) {
    console.error(err);
    toast.error("Failed to fetch borrow history");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchHistory();
  }, [user]);

  if (!user) return <p>Loading user info...</p>;
  if (loading) return <p>Loading history...</p>;

  return (
    <div className="returnbook-page">
      <h2 className="returnbook-title">📖 Book History</h2>

      {history.length === 0 ? (
        <p className="empty-msg">No history available.</p>
      ) : (
        <table className="returnbook-table">
          <thead>
            <tr>
              <th>Book</th>
              <th>Borrow Date</th>
              <th>Return Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record, index) => (
              <tr key={index}>
                <td>{record.bookName}</td>
                <td>
                  {record.borrowedDate
                    ? new Date(record.borrowedDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  {record.returnedDate
                    ? new Date(record.returnedDate).toLocaleDateString()
                    : "Not Returned"}
                </td>
                <td>
                  <span
                    className={`status-badge ${
                      record.returnedDate ? "returned" : "borrowed"
                    }`}
                  >
                    {record.returnedDate ? "Returned" : "Borrowed"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookHistory;
