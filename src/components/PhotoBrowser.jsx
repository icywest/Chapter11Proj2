  // src\components\PhotoBrowser.jsx
  import React, { useState, useCallback, useMemo } from "react";
  import PhotoList from "./PhotoList";
  import EditPhotoForm from "./EditPhotoForm";
  import styled from "styled-components";

  const Layout = styled.section`
    display: grid; grid-template-columns: 2fr 1fr; gap: 1rem; padding: 1rem;
    @media (max-width: 900px) { grid-template-columns: 1fr; }
  `;

  export default function PhotoBrowser({ photos, loading, error, onSave }) {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const onThumbClick = useCallback((index) => {
      setSelectedIndex(index);
    }, []);

    const selectedPhoto = useMemo(() => {
      if (selectedIndex == null) return null;
      return photos[selectedIndex] ?? null;
    }, [selectedIndex, photos]);

    if (loading) return <p className="status">Loading photos…</p>;
    if (error) return <p className="status">Failed to load: {error}</p>;
    if (!photos?.length) return <p className="status">No photos found.</p>;

    const safeOnSave = (updated) => {
      onSave?.(updated);
      if (selectedIndex != null && !photos[selectedIndex]) {
        setSelectedIndex(null);
      }
    };

    return (
      <Layout>
        <div>
          <PhotoList photos={photos} onThumbClick={onThumbClick} />
        </div>
        <div>
          <EditPhotoForm
            photo={selectedPhoto}
            onSave={safeOnSave}
            onCancel={() => setSelectedIndex(null)}
          />
        </div>
      </Layout>
    );
  }
