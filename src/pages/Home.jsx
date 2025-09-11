import React, { useState, useEffect } from "react";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import bgImage from "../assets/bg.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";

const Home = () => {
  const [page, setPage] = useState("home");

  useEffect(() => {
    // Add class when on Home
    document.body.classList.add("no-scroll");

    // Cleanup when leaving Home
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  const showSuccess = (msg) => toast.success(msg, { position: "top-right" });
  const showError = (msg) => toast.error(msg, { position: "top-right" });

  if (page === "login")
    return (
      <Login
        goBack={() => setPage("home")}
        showSuccess={showSuccess}
        showError={showError}
      />
    );

  if (page === "signup")
    return (
      <Signup
        goBack={() => setPage("home")}
        showSuccess={showSuccess}
        showError={showError}
      />
    );

  return (
    <div className="home-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="home-overlay"></div>
      <div className="home-card">
        <h1>Library Management System</h1>
        {/* <p>Explore, Borrow, and Enjoy Books Effortlessly</p> */}
        <p><i>Books are just a click away</i></p>
        <div className="home-buttons">
          <button className="home-btn-login" onClick={() => setPage("login")}>
            Login
          </button>
          <button
            className="home-btn-signup"
            onClick={() => setPage("signup")}
          >
            Signup
          </button>
        </div>
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default Home;
