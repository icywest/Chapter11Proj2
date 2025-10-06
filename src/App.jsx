// src/App.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HeaderMenu from "./components/HeaderMenu";
import Home from "./pages/Home";
import About from "./pages/About";
import Browse from "./pages/Browse";
import FavoriteBar from "./components/FavoriteBar";
import { fetchPhotos } from "./api";

const LS_KEY = "photoEdits_v1";
const LS_FAVS = "photoFavorites_v1";

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const data = await fetchPhotos({ signal: ctrl.signal });

        // merge local edits
        const stored = JSON.parse(localStorage.getItem(LS_KEY) || "{}");
        const merged = data.map((p) => {
          const key = p.id ?? p.filename;
          return stored[key] ? { ...p, ...stored[key] } : p;
        });
        setPhotos(merged);

        // load favorites
        const favKeys = JSON.parse(localStorage.getItem(LS_FAVS) || "[]");
        const favs = favKeys
          .map((k) => merged.find((p) => (p.id ?? p.filename) === k))
          .filter(Boolean);
        setFavorites(favs);
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

  // Helpers to persist favorites as keys
  const persistFavs = useCallback((arr) => {
    const keys = arr.map((p) => p.id ?? p.filename).filter(Boolean);
    localStorage.setItem(LS_FAVS, JSON.stringify(keys));
  }, []);

  const addFavorite = useCallback((photo) => {
    setFavorites((prev) => {
      const key = photo.id ?? photo.filename;
      if (!key) return prev;
      if (prev.some((p) => (p.id ?? p.filename) === key)) return prev;
      const next = [photo, ...prev];
      persistFavs(next);
      return next;
    });
  }, [persistFavs]);

  const removeFavorite = useCallback((photo) => {
    const key = photo.id ?? photo.filename;
    setFavorites((prev) => {
      const next = prev.filter((p) => (p.id ?? p.filename) !== key);
      persistFavs(next);
      return next;
    });
  }, [persistFavs]);

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

      // persist edits
      const stored = JSON.parse(localStorage.getItem(LS_KEY) || "{}");
      stored[key] = {
        title: patched.title,
        city: patched.city,
        country: patched.country,
        filename: patched.filename,
      };
      localStorage.setItem(LS_KEY, JSON.stringify(stored));

      setFavorites((prevFavs) => {
        const favIdx = prevFavs.findIndex((p) => (p.id ?? p.filename) === key);
        if (favIdx === -1) return prevFavs;
        const favNext = [...prevFavs];
        favNext[favIdx] = patched;
        return favNext;
      });

      return next;
    });
  }, []);
  return (
    <div className="app-shell">
      <HeaderMenu />
      <FavoriteBar favorites={favorites} onRemove={removeFavorite} />

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
                onAddFavorite={addFavorite}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}
