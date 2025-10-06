import React from "react";
import styled from "styled-components";
import { THUMB_BASE_URL } from "../api";

const Card = styled.div`
  --radius: 10px;
  --border: 1px solid rgba(0,0,0,0.05);

  background: #fff;
  border: var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  transition: all 0.15s ease;
  width: 120px;  /* smaller width */
  font-size: 0.8rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);

  &:hover {
    box-shadow: 0 6px 18px rgba(0,0,0,0.08);
    transform: translateY(-2px);
  }
`;

const ThumbWrap = styled.button`
  display: block;
  width: 100%;
  aspect-ratio: 4/3;
  padding: 0;
  border: 0;
  background: #f4f4f5;
  position: relative;
  cursor: pointer;

  &:hover .removeBadge {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-bottom: 1px solid rgba(0,0,0,0.04);
`;

const RemoveBadge = styled.span`
  position: absolute;
  bottom: 6px;
  left: 6px;
  background: rgba(255,255,255,0.92);
  color: #d11a2a;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 6px;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity .15s ease, transform .15s ease;
`;

const Title = styled.div`
  padding: 0.3rem 0.4rem 0.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  color: #1d1d1f;
`;

export default function FavoriteItem({ photo, onRemove }) {
  const src = `${THUMB_BASE_URL}${photo.filename}`;
  const handleClick = () => onRemove?.(photo);

  return (
    <Card>
      <ThumbWrap onClick={handleClick} title="Remove from favorites">
        <Img src={src} alt={photo.title ?? photo.filename} loading="lazy" />
        <RemoveBadge className="removeBadge">✕</RemoveBadge>
      </ThumbWrap>
      <Title>{photo.title ?? photo.filename}</Title>
    </Card>
  );
}
