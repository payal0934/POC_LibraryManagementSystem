import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { FaHome, FaArrowLeft, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const user = localStorage.getItem("user");
  const publicRoutes = ["/", "/login", "/signup"];

  if (!user || publicRoutes.includes(location.pathname)) {
    return null;
  }

  const handleDashboard = () => {
    // Redirect based on role stored in localStorage
    const storedUser = JSON.parse(user);
    if (storedUser?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
    setIsOpen(false);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleBack = () => {
    navigate(-1);
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    setIsOpen(false);
  };

  // ✅ treat both user dashboard and admin dashboard as "home"
  const dashboardRoutes = ["/user", "/admin"];
  const showBackButton = !dashboardRoutes.includes(location.pathname);

  return (
    <>
      {/* Toggle button changes based on location */}
      <div
        className="hamburger"
        onClick={showBackButton ? handleBack : toggleSidebar}
      >
        {showBackButton ? <FaArrowLeft /> : "☰"}
      </div>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="sidebar-btn" onClick={handleDashboard}>
          <FaHome /> Dashboard
        </button>

        <button className="sidebar-btn logout" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
};

export default Sidebar;




















// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "./Sidebar.css";
// import { FaHome, FaArrowLeft, FaSignOutAlt } from "react-icons/fa";

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isOpen, setIsOpen] = useState(false);

//   // Get the current user from localStorage (or any auth state you have)
//   const user = localStorage.getItem("user");

//   // Define public routes where sidebar should NOT appear
//   const publicRoutes = ["/", "/login", "/signup"];

//   // If current route is public or user not logged in, don't render sidebar
//   if (!user || publicRoutes.includes(location.pathname)) {
//     return null;
//   }

//   const handleDashboard = () => {
//     navigate("/user");
//     setIsOpen(false);
//   };

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleBack = () => {
//     navigate(-1); // Go back in history
//     setIsOpen(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/");
//     setIsOpen(false);
//   };

//   const showBackButton = location.pathname !== "/user";

//   return (
//     <>
//       <div className="hamburger" onClick={toggleSidebar}>
//         ☰
//       </div>

//       <div className={`sidebar ${isOpen ? "open" : ""}`}>
//         <button className="sidebar-btn" onClick={handleDashboard}>
//           <FaHome /> Dashboard
//         </button>

//         {showBackButton && (
//           <button className="sidebar-btn" onClick={handleBack}>
//             <FaArrowLeft /> Back
//           </button>
//         )}

//         <button className="sidebar-btn logout" onClick={handleLogout}>
//           <FaSignOutAlt /> Logout
//         </button>
//       </div>

//       {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}
//     </>
//   );
// };

// export default Sidebar;
