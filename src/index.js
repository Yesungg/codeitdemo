import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./styles/global.css"; // ✅ 글로벌 스타일 유지

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
