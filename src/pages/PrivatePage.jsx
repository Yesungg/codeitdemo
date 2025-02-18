import React, { useState } from "react";
import "../styles/global.css"; // 스타일 적용
import GroupList from "../components/GroupList"; // 그룹 리스트 컴포넌트

const PrivatePage = () => {
  const [selectedTab, setSelectedTab] = useState("private"); // 비공개 선택

  return (
    <div className="page-container">
      {/* 헤더 */}
      <h1 className="logo">조각집</h1>

      {/* 공개/비공개 선택 + 검색창 + 필터 */}
      <div className="filter-container">
        <div className="tab-buttons">
          <button
            className={selectedTab === "public" ? "active" : ""}
            onClick={() => setSelectedTab("public")}
          >
            공개
          </button>
          <button
            className={selectedTab === "private" ? "active" : ""}
            onClick={() => setSelectedTab("private")}
          >
            비공개
          </button>
        </div>
        <input type="text" placeholder="그룹명을 검색해 주세요" className="search-input" />
        <select className="dropdown">
          <option>공감순</option>
          <option>최신순</option>
        </select>
      </div>

      {/* 그룹 리스트 */}
      <GroupList isPrivate={true} />

      {/* 더보기 버튼 */}
      <div className="text-center">
        <button className="more-button">더보기</button>
      </div>
    </div>
  );
};

export default PrivatePage;
