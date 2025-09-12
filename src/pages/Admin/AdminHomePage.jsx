// src/pages/Admin/AdminHomepage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


// Replace with your local images
import img1 from "../../assets/viewall.jpg";
import img4 from "../../assets/img4.jpg";
import img3 from "../../assets/addbook.jpg";
import { FaArrowRight } from "react-icons/fa";

const cardData = [
  {
    title: "Manage Book",
    description: "Book availablility in the library and manage it effeciently",
    image: img1,
    path: "/view-books",
  },
  {
    title: "Manage Users",
    description: "View and manage registered users.",
    image: img4,
    path: "/view-users", // 👉 this should point to your ViewAllUsers.jsx route
  },
  {
    title: "Add to Library",
    description: "Add fresh titles to the collection.",
    image: img3,
    path: "/add-book",
  },
];

const AdminHomepage = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/books");
      setBooks(res.data);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to fetch books");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="uhp-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="uhp-title">👋 Welcome, Admin</h1>

<div className="uhp-cards-container">
  {cardData.map((card, index) => (
    <div
      key={index}
      className="uhp-card"
      onClick={() => navigate(card.path)} //  Navigate directly using card.path
    >
      <img src={card.image} alt={card.title} className="uhp-card-img" />
      <div className="uhp-card-overlay">
        <h3>{card.title}</h3>
        <p>{card.description}</p>
         <span className="uhp-card-arrow">
                <FaArrowRight />
              </span>  </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default AdminHomepage;
