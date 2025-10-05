import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Bar = styled.header`
  display: flex; gap: 1rem; align-items: center;
  padding: 0.75rem 1rem; background: #fff; border-bottom: 1px solid #eee;
`;
const LinkBtn = styled(NavLink)`
  padding: 0.5rem 0.75rem; border-radius: 10px;
  &.active { background: #111; color: #fff; }
`;

export default function HeaderMenu() {
  return (
    <Bar>
      <LinkBtn to="/" end>Home</LinkBtn>
      <LinkBtn to="/browse">Browse</LinkBtn>
      <LinkBtn to="/about">About</LinkBtn>
    </Bar>
  );
}
