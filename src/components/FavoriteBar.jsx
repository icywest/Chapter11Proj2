import React, { useState, useMemo } from "react";
import styled from "styled-components";
import FavoriteItem from "./FavoriteItem";

const Bar = styled.section`
  background: transparent;
  border-bottom: 1px solid #eee;
  padding-top: 0.3rem;
`;

const Head = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.4rem 1rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 0.9rem;
  color: #1d1d1f;
  font-weight: 700;
`;

const Toggle = styled.button`
  border: 0;
  background: none;
  font-size: 0.8rem;
  color: #007aff;
  cursor: pointer;
`;

const GridWrap = styled.div`
  padding: 0.4rem 1rem 0.8rem;
`;

export default function FavoriteBar({ favorites = [], onRemove }) {
  const [collapsed, setCollapsed] = useState(false);
  const count = favorites.length;
  const label = useMemo(() => (count ? `(${count})` : "(empty)"), [count]);

  return (
    <Bar>
      <Head>
        <Title>Favorites {label}</Title>
        <Toggle onClick={() => setCollapsed(v => !v)}>
          {collapsed ? "Show" : "Hide"}
        </Toggle>
      </Head>

      {!collapsed && (
        <GridWrap>
          <div
            className="favorites"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
              gap: "0.5rem",
            }}
          >
            {favorites.map((p) => {
              const key = p.id ?? p.filename;
              return (
                <FavoriteItem
                  key={key}
                  photo={p}
                  onRemove={onRemove}
                />
              );
            })}
          </div>
        </GridWrap>
      )}
    </Bar>
  );
}
