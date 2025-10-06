// src/components/PhotoList.jsx
import React from "react";
import PhotoThumb from "./PhotoThumb";
import styled from "styled-components";

const Grid = styled.ul`
  list-style: none; padding: 0; margin: 0;
  display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.75rem;
`;

export default function PhotoList({ photos, onThumbClick, onAddFavorite }) {
  return (
    <Grid>
      {photos.map((p, idx) => (
        <li key={p.id ?? p.filename ?? idx}>
          <PhotoThumb
            photo={p}
            onClick={() => onThumbClick(idx)}
            onAddFavorite={onAddFavorite}
          />
        </li>
      ))}
    </Grid>
  );
}
