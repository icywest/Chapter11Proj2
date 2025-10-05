//src\styles/GlobalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { height: 100%; }
  body {
    margin: 0;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
    background: #f7f7f9;
    color: #111;
  }
  a { color: inherit; text-decoration: none; }
`;

export default GlobalStyles;
