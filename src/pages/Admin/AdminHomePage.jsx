// src/pages/Admin/AdminHomepage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import "../User/UserHomePage.css"
// Images
import img1 from "../../assets/viewall.jpg";
import img2 from "../../assets/img4.jpg";
import img3 from "../../assets/addbook.jpg";

const AdminHomepage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  // Card data (same style as UserHomePage)
  const cards = [
    {
      id: 1,
      title: "Manage Book",
      desc: "Book availability in the library and manage it efficiently.",
      img: img1,
      path: "/view-books",
    },
    {
      id: 2,
      title: "Manage Users",
      desc: "View and manage registered users.",
      img: img2,
      path: "/view-users",
    },
    {
      id: 3,
      title: "Add to Library",
      desc: "Add fresh titles to the collection.",
      img: img3,
      path: "/add-book",
    },
  ];

  // Fetch all books (if needed later)
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/books");
        setBooks(res.data);
      } catch (err) {
        console.error(err);
        toast.error("❌ Failed to fetch books");
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="uhp-wrapper">
      <div className="uhp-container">
        <ToastContainer position="top-right" autoClose={3000} />
        <h1 className="uhp-title">👋 Welcome, Admin</h1>

        <div className="uhp-cards-container">
          {cards.map((card) => (
            <div
              className="uhp-card"
              key={card.id}
              onClick={() => navigate(card.path)}
            >
              <img src={card.img} alt={card.title} className="uhp-card-img" />
              <div className="uhp-card-overlay">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <span className="uhp-card-arrow">
                  <FaArrowRight />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Optional Quote for Admin */}
        <p className="uhp-quote">“Leadership is the capacity to translate vision into reality.”</p>
      </div>
    </div>
  );
};

export default AdminHomepage;
