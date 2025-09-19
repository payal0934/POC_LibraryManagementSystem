// src/pages/BorrowHistory.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../User/ReturnBook.css";
import "../User/BorrowdHistory.css";

const BorrowdHistory = () => {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returning, setReturning] = useState(null); // track returning bookId

  const fetchHistory = async () => {
    if (!user?.userId) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/library/history/${user.userId}`
      );

      const payload = res.data?.data ?? res.data ?? [];

      if (!Array.isArray(payload)) {
        setHistory([]);
        return;
      }

      const normalized = payload.map((rec) => {
        let borrowed = rec.borrowedDate ? new Date(rec.borrowedDate) : null;
        let returned = rec.returnedDate ? new Date(rec.returnedDate) : null;

        return {
          ...rec,
          borrowedDateObj: borrowed,
          returnedDateObj: returned,
        };
      });

      // custom sort: Borrowed (active) first, Returned last
      const sorted = [...normalized].sort((a, b) => {
        if (!a.returnedDateObj && b.returnedDateObj) return -1; // borrowed first
        if (a.returnedDateObj && !b.returnedDateObj) return 1;  // returned later
        const ta = a.borrowedDateObj ? a.borrowedDateObj.getTime() : -Infinity;
        const tb = b.borrowedDateObj ? b.borrowedDateObj.getTime() : -Infinity;
        return tb - ta;
      });

      setHistory(sorted);
    } catch (err) {
      console.error("Error fetching history:", err);
      toast.error("Failed to fetch borrow history");
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [user]);

  // Handle return book
  const handleReturn = async (bookId) => {
    setReturning(bookId); // disable button immediately
    try {
      await axios.post(
        `http://localhost:8080/api/books/return`,
        null,
        { params: { bookId, userId: user.userId } }
      );
      toast.success("✅ Book returned successfully!");

      // update that record in state without full reload
      setHistory((prev) => {
        const updated = prev.map((rec) =>
          rec.bookId === bookId
            ? { ...rec, returnedDateObj: new Date() } // mark returned
            : rec
        );

        // re-sort so returned goes down
        return updated.sort((a, b) => {
          if (!a.returnedDateObj && b.returnedDateObj) return -1;
          if (a.returnedDateObj && !b.returnedDateObj) return 1;
          const ta = a.borrowedDateObj ? a.borrowedDateObj.getTime() : -Infinity;
          const tb = b.borrowedDateObj ? b.borrowedDateObj.getTime() : -Infinity;
          return tb - ta;
        });
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data || "Failed to return book");
    } finally {
      setReturning(null);
    }
  };

  if (!user) return <p>Loading user info...</p>;
  if (loading) return <p>Loading history...</p>;

  const formatDate = (dateObj) =>
    dateObj
      ? dateObj.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "N/A";

  return (
    <div className="returnbook-page">
      <h2 className="returnbook-title">📖 Borrow History</h2>

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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record, index) => (
              <tr key={index}>
                <td>{record.bookName ?? (record.book?.bookName ?? "Unknown")}</td>
                <td>{record.borrowedDateObj ? formatDate(record.borrowedDateObj) : "N/A"}</td>
                <td>{record.returnedDateObj ? formatDate(record.returnedDateObj) : "Not Returned"}</td>
                <td>
                  <span
                    className={`status-badge ${
                      record.returnedDateObj ? "returned" : "borrowed"
                    }`}
                  >
                    {record.returnedDateObj ? "Returned" : "Borrowed"}
                  </span>
                </td>
                <td>
                  {!record.returnedDateObj && (
                    <button
                      className="return-btn"
                      onClick={() => handleReturn(record.bookId)}
                      disabled={returning === record.bookId}
                    >
                      {returning === record.bookId ? "Returning..." : "Return"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BorrowdHistory;
