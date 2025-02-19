import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FirstHeader from "./components/Header.jsx"; // ✅ 메일화면 전용 헤더
import Header from "./components/Header.js";
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

      <Routes>
        <Route 
          path="/"  
          element={
            <>
              <FirstHeader />
              <PublicPage />
            </>
          } 
        />
        <Route 
          path="/private" 
          element={
            <>
              <PrivatePage />
            </>
          } 
        />

        {/* main 화면을 제회한 부분들은 기본 header사용 */}
        <Route
          path="*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/create-group" element={<CreateGroup />} /> {/* ✅ 이름 변경 */}
                <Route path="/access-check" element={<AccessCheck />} />
                <Route path="/groups" element={<GroupList />} />
                <Route path="/groups/:groupId" element={<GroupDetail />} />
                <Route path="/posts/:postId" element={<Post />} />
              </Routes>
            </>
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;