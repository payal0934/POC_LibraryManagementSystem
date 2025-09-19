import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import AdminHomepage from "./pages/Admin/AdminHomePage";
import ViewAllBooks from "./pages/Admin/ViewAllBooks";
// import DeleteBook from "./pages/Admin/DeleteBooks";
import AddBook from "./pages/Admin/AddBook";
// import Profile from "./pages/Profile";
import BorrowBook from "./pages/User/BorrowBook";
// import ReturnBook from "./pages/User/ReturnBook";
// import MyBorrowedBooks from "./pages/User/MyBorrowedBook";
import Loader from "./context/Loader";
import UserHomePage from "./pages/User/UserHomePage";
import BorrowdHistory from "./pages/User/BorrowdHistory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedLayout from "./pages/Auth/ProtectedLayout";
// import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
// import "./components/Navbar.css"; 
// import Profile from "./components/Profile";
import SeeAllUsers from "./pages/Admin/SeeAllUsers";

function App() {
  const location = useLocation();
  const [loadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    setLoadingPage(true);
    const timer = setTimeout(() => setLoadingPage(false), 800);
    return () => clearTimeout(timer);
  }, [location]);
 return (
    <>
      {loadingPage && <Loader />}
      <Sidebar />
        {/* <Navbar/> */}
       
        <Routes>
      
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Pages */}
          <Route element={<ProtectedLayout />}>
            {/* Admin */}
            <Route path="/admin" element={<AdminHomepage />} />
            <Route path="/view-books" element={<ViewAllBooks />} />
           <Route path="/view-users" element={<SeeAllUsers/>} />  <Route path="/add-book" element={<AddBook />} />

            {/* User */}
            <Route path="/user" element={<UserHomePage />} />
            <Route path="/borrow-books" element={<BorrowBook />} />
            {/* <Route path="/return-book" element={<ReturnBook />} /> */}
            <Route path="/borrowed-history" element={<BorrowdHistory />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
     

      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

export default App;
