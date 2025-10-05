// src/components/PhotoThumb.jsx
import React from "react";
import { THUMB_BASE_URL } from "../api";
import styled from "styled-components";

const Card = styled.button`
  width: 100%; text-align: left; border: 1px solid #eee; border-radius: 12px;
  background: #fff; padding: 0; cursor: pointer; overflow: hidden;
  &:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
`;
const Img = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  display: block;
`;
const Meta = styled.div` padding: 0.5rem 0.75rem; `;

export default function PhotoThumb({ photo, onClick }) {
  const src = `${THUMB_BASE_URL}${photo.filename}`;

  const city =
    photo.city ??
    photo.location?.city ??
    "";
  const country =
    photo.country ??
    photo.location?.country ??
    "";

  return (
    <Card onClick={onClick} aria-label={`Open ${photo.title}`}>
      <Img src={src} alt={photo.title} loading="lazy" />
      <Meta>
        <h3 style={{ margin: "0 0 4px" }}>{photo.title}</h3>
        <p style={{ margin: 0, opacity: 0.7 }}>
          {[city, country].filter(Boolean).join(", ") || "—"}
        </p>
      </Meta>
    </Card>
  );
}
