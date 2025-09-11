import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/p1.jpg";
import "../../assets/styles/GlassCard.css";

const Signup = ({ goBack }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error(" Enter username and password");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8080/api/users/signup?userName=${username}&password=${password}&role=${role}`,
        { method: "POST" }
      );

      if (res.ok) {
        const msg = await res.text();
        toast.success(msg);

        // ✅ Redirect to login after success
        setTimeout(() => navigate("/login"), 1500);
      } else {
        const err = await res.text();
        toast.error(err || " Signup failed");
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
        <h3 className="mb-4 fw-bold">Signup</h3>
        <form onSubmit={handleSignup}>
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
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="glass-btn-primary w-100">
            Signup
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

export default Signup;
