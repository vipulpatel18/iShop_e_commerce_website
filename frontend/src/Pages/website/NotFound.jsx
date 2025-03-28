// NotFound.js
import React from "react";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404</h1>
      <p>Page Not Found</p>
      <a href="/" style={{ textDecoration: "none", color: "blue" }}>
        Go Back to Home
      </a>
    </div>
  );
};

export default NotFound;
