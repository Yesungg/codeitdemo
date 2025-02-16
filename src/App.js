import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header"; // ✅ 헤더 추가
import PublicPage from "./pages/PublicPage";
import PrivatePage from "./pages/PrivatePage";
import CreateGroup from "./pages/CreateGroup"; // ✅ 이름 통일
import AccessCheck from "./pages/AccessCheck";

const App = () => {
  return (
    <Router>
      {/* 모든 페이지에서 공통으로 표시될 헤더 */}
      <Header />  

      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="/private" element={<PrivatePage />} />
        <Route path="/create-group" element={<CreateGroup />} /> {/* ✅ 이름 변경 */}
        <Route path="/access-check" element={<AccessCheck />} />
      </Routes>
    </Router>
  );
};

export default App;
