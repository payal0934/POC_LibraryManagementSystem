// src/pages/ViewAllUsers.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUserCircle, FaPencilAlt, FaSave, FaTimes, FaTrashAlt } from "react-icons/fa";
import "../Admin/Users.css";
import "../User/BorrowBook.css";

const SeeAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [editingUserId, setEditingUserId] = useState(null);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/users");
      setUsers(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users");
    }
  };

  // Delete user
  const handleDelete = async (userId) => {
    if (!window.confirm("Do you really want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/users/${userId}`);
      toast.success("User deleted successfully");
      setUsers((prev) => prev.filter((user) => user.userId !== userId));
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting user");
    }
  };

  // Update user
  const handleUpdateUser = async (userId, updatedFields) => {
    try {
      const payload = {
        userName: updatedFields.userName,
        active: updatedFields.active,
      };
      await axios.put(`http://localhost:8080/api/users/${userId}`, payload);
      toast.success("User updated successfully!");
      setUsers((prev) =>
        prev.map((user) =>
          user.userId === userId ? { ...user, ...payload } : user
        )
      );
      setEditingUserId(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter + search
  const filteredUsers = users.filter((user) => {
    const username = user.userName?.toLowerCase() || "";
    const role = user.role?.toLowerCase() || "";
    const matchesSearch = username.includes(searchTerm.toLowerCase());
    const matchesRole =
      selectedRole.toLowerCase() === "all" || role === selectedRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

  return (
    <div className="borrow-page">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="bb-page-title">👤 All Users</h2>

      {/* Search + Filter */}
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
          filteredUsers.map((user) => {
            const isEditing = editingUserId === user.userId;
            return (
              <div key={user.userId} className="user-card">
                {/* Active status dot */}
                <div
                  className={`user-status-dot ${
                    user.active ? "active" : "inactive"
                  }`}
                  title={user.active ? "Active" : "Inactive"}
                ></div>

                <FaUserCircle className="user-avatar" />

                {/* Name */}
                {isEditing ? (
                  <input
                    className="user-name-input"
                    value={user.userName}
                    onChange={(e) =>
                      setUsers((prev) =>
                        prev.map((u) =>
                          u.userId === user.userId
                            ? { ...u, userName: e.target.value }
                            : u
                        )
                      )
                    }
                  />
                ) : (
                  <p className="user-name">{user.userName}</p>
                )}

                <p className="user-role">Role: {user.role}</p>

                {/* Active toggle */}
                {isEditing && (
                  <label style={{ display: "block", marginBottom: "10px" }}>
                    Active:{" "}
                    <input
                      type="checkbox"
                      checked={user.active}
                      onChange={() =>
                        setUsers((prev) =>
                          prev.map((u) =>
                            u.userId === user.userId
                              ? { ...u, active: !u.active }
                              : u
                          )
                        )
                      }
                    />
                  </label>
                )}

                {/* Action buttons */}
                <div className="user-action-buttons">
   {isEditing ? (
  <>
    <button
      className="user-update-btn"
      onClick={() =>
        handleUpdateUser(user.userId, {
          userName: user.userName,
          active: user.active,
        })
      }
    >
      <FaSave /> Save
    </button>
    <button
      className="user-cancel-btn"
      onClick={() => setEditingUserId(null)}
    >
      <FaTimes /> Cancel
    </button>
  </>
) : (
  <>
    <button
      className="user-edit-btn"
      onClick={() => setEditingUserId(user.userId)}
    >
      <FaPencilAlt /> Edit
    </button>
    <button
      className="user-delete-btn"
      onClick={() => handleDelete(user.userId)}
    >
      <FaTrashAlt /> Delete
    </button>
  </>
)}
                </div>
              </div>
            );
          })
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};

export default SeeAllUsers;
