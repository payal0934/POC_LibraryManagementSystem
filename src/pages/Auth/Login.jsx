import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bgImage from "../../assets/p1.jpg";
import "../../assets/styles/GlassCard.css";
import { AuthContext } from "./AuthContext";

const Login = ({ goBack }) => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // frontend validation
    if (!username || !password || !role) {
      toast.error(" Enter username, password, and select role");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8080/api/users/login?userName=${username}&password=${password}&role=${role}`,
        { method: "POST" }
      );

      if (res.ok) {
        const userData = await res.json(); // { userId, userName, role }
        console.log("Backend login response:", userData);

        toast.success(" Login successful!");

        //  store user in AuthContext + localStorage
        login({
          userId: userData.userId,
          userName: userData.userName,
          role: userData.role,
        });

        //  redirect only after backend validation
        if (userData.role === "admin") {
          navigate("/admin");
        } else if (userData.role === "user") {
          navigate("/user");
        } else {
          toast.error(" Invalid role received from backend");
        }
      } else {
        const err = await res.text();
        toast.error(err || " Invalid login credentials");
      }
    } catch (err) {
      toast.error(" Server not reachable");
      console.error(err);
    }
  };

  return (
    <div
      className="glass-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="glass-overlay"></div>
      <div className="glass-card">
        <h3 className="mb-4 fw-bold">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select your Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <button type="submit" className="glass-btn-primary w-100">
            Login
          </button>
          <button
            type="button"
            className="glass-btn-secondary w-100 mt-2"
            onClick={goBack}
          >
            Back
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
