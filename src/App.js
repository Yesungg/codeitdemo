import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header"; // ✅ 헤더 추가
import PublicPage from "./pages/PublicPage";
import PrivatePage from "./pages/PrivatePage";
import CreateGroup from "./pages/CreateGroup"; // ✅ 이름 통일
import AccessCheck from "./pages/AccessCheck";
import GroupList from "./components/GroupList";
import GroupDetail from "./components/GroupDetail";
import Post from "./pages/Post";

function App() {
  return (
    <BrowserRouter>
      {/* 모든 페이지에서 공통으로 표시될 헤더 */}
      <Header />  

      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="/private" element={<PrivatePage />} />
        <Route path="/create-group" element={<CreateGroup />} /> {/* ✅ 이름 변경 */}
        <Route path="/access-check" element={<AccessCheck />} />
        <Route path="/groups" element={<GroupList />} />
        <Route path="/groups/:groupId" element={<GroupDetail />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;