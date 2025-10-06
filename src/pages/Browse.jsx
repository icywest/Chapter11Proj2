// src/pages/Browse.jsx
import React from "react";
import PhotoBrowser from "../components/PhotoBrowser";

export default function Browse({ photos, loading, error, onSave, onAddFavorite }) {
  return (
    <PhotoBrowser
      photos={photos}
      loading={loading}
      error={error}
      onSave={onSave}
      onAddFavorite={onAddFavorite}
    />
  );
}
