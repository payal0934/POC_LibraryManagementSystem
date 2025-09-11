import React from "react";
import "../context/Loader.css";

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="loader-text">Loading...</div>
    </div>
  );
};

export default Loader;
