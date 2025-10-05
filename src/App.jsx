// src/App.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import HeaderMenu from "./components/HeaderMenu";
import Home from "./pages/Home";
import About from "./pages/About";
import Browse from "./pages/Browse";
import { fetchPhotos } from "./api";

const LS_KEY = "photoEdits_v1";

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const data = await fetchPhotos({ signal: ctrl.signal });

        const stored = JSON.parse(localStorage.getItem(LS_KEY) || "{}");
        const merged = data.map((p) => {
          const key = p.id ?? p.filename;
          return stored[key] ? { ...p, ...stored[key] } : p;
        });

        setPhotos(merged);
      } catch (e) {
        if (e.name !== "CanceledError" && e.name !== "AbortError") {
          setError(e.message ?? "Fetch error");
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => ctrl.abort();
  }, []);

  const handleSave = useCallback((updated) => {
    setPhotos((prev) => {
      const key = updated.id ?? updated.filename;
      const idx = prev.findIndex((p) => (p.id ?? p.filename) === key);
      if (idx === -1) return prev;

      const next = [...prev];
      const old = next[idx];

      const patched = {
        ...old,
        ...updated,
        location: {
          ...(old.location || {}),
          city: updated.city ?? old.location?.city ?? "",
          country: updated.country ?? old.location?.country ?? "",
        },
      };
      next[idx] = patched;

      const stored = JSON.parse(localStorage.getItem(LS_KEY) || "{}");
      stored[key] = {
        title: patched.title,
        city: patched.city,
        country: patched.country,
        filename: patched.filename,
      };
      localStorage.setItem(LS_KEY, JSON.stringify(stored));
      console.log("Saved locally:", key, stored[key]);
      return next;
    });
  }, []);

  return (
    <div className="app-shell">
      <HeaderMenu />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/browse"
            element={
              <Browse
                photos={photos}
                loading={loading}
                error={error}
                onSave={handleSave}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}
