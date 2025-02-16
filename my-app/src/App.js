import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import GroupDetail from "./components/GroupDetail";
import "./styles/GroupDetailstyle.css";
import "./styles/memoryStyles.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* 그룹 상세 페이지 - URL에 그룹 ID가 포함됨 */}
        <Route path="/group/:groupId" element={<GroupDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
