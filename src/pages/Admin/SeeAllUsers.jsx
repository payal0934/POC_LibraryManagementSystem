// src/pages/ViewAllUsers.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash, FaUserCircle } from "react-icons/fa";
import "../User/BorrowBook.css"; // reuse styles or make new one

const SeeAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");


const fetchUsers = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/users");
    console.log("Users API response:", res.data);
    setUsers(res.data.data); // ✅ include both user & admin
  } catch (err) {
    console.error(err);
    toast.error("❌ Failed to fetch users");
  }
};




  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("⚠️ Do you really want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/users/${userId}`);
      toast.success("✅ User deleted successfully");
      setUsers((prev) => prev.filter((user) => user.userId !== userId));
    } catch (err) {
      toast.error(err.response?.data || "❌ Error deleting user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter + search logic
const filteredUsers = users.filter((user) => {
  const username = user.userName?.toLowerCase() || "";
  const role = user.role?.toLowerCase() || "";

  const matchesSearch =
    username.includes(searchTerm.toLowerCase());

  const matchesRole =
    selectedRole.toLowerCase() === "all" || role === selectedRole.toLowerCase();

  return matchesSearch && matchesRole;
});



  return (
    <div className="borrow-page">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="bb-page-title">👤 All Users</h2>

      {/* 🔍 Search + Filter */}
      <div className="bb-filters">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bb-search-bar"
        />

      <select
  value={selectedRole}
  onChange={(e) => setSelectedRole(e.target.value)}
  className="bb-category-filter"
>
  <option value="all">All Roles</option>
  <option value="admin">Admin</option>
  <option value="user">User</option>
</select>

      </div>

      {/* User Cards */}
    <div className="bb-cards-container">


{filteredUsers.length > 0 ? (
  filteredUsers.map((user) => (
    <div key={user.userId} className="bb-card">
      <FaUserCircle className="bb-card-img user-avatar" />
      <div className="bb-card-overlay">
        <h3>{user.userName}</h3>
        <p>Role: {user.role}</p>
      </div>
    </div>
  ))
) : (
  <p>No users found</p>
)}



      </div>
    </div>
  );
};

export default SeeAllUsers;
