// src/pages/Home.jsx
import React from "react";

export default function Home() {
  const clearLocalEdits = () => {
    localStorage.removeItem("photoEdits_v1");
    alert("All local photo edits have been cleared!");
    window.location.reload();
  };

  return (
    <section style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to the Travel Photo Browser 🌍</h1>
      <p style={{ maxWidth: "500px", margin: "0 auto 1.5rem" }}>
        Explore beautiful photos and edit their details locally.
      </p>

      <button
        onClick={clearLocalEdits}
        style={{
          padding: "0.6rem 1.2rem",
          borderRadius: "12px",
          border: "1px solid #ccc",
          background: "#fff",
          fontSize: "0.95rem",
          cursor: "pointer",
          transition: "all .15s ease",
        }}
      >
        Clear Local Changes
      </button>
    </section>
  );
}
