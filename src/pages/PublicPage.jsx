import React, { useState } from "react";
import GroupList from "../components/GroupList";
import "../styles/PublicPage.css"; // 스타일 적용

const PublicPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("공감순");
  const [filter, setFilter] = useState("public"); // "public" 또는 "private"

  return (
    <div className="page-container">
      <div className="filter-container">
  <div className="toggle-buttons">
    <button 
      className={`toggle-btn ${filter === "public" ? "active" : ""}`} 
      onClick={() => setFilter("public")}
    >
      공개
    </button>
    <button 
      className={`toggle-btn ${filter === "private" ? "active" : ""}`} 
      onClick={() => setFilter("private")}
    >
      비공개
    </button>
  </div>

  {/* 검색창이 넓어지도록 div 추가 */}
  <input 
    type="text" 
    className="search-input" 
    placeholder="그룹명을 검색해 주세요" 
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <select 
    className="sort-dropdown" 
    value={sortOption} 
    onChange={(e) => setSortOption(e.target.value)}
  >
    <option value="공감순">공감순</option>
    <option value="최신순">최신순</option>
    <option value="조회순">조회순</option>
  </select>
</div>

      {/* 그룹 리스트 */}
      <GroupList searchTerm={searchTerm} filter={filter} sortOption={sortOption} />
      
      {/* 더보기 버튼 */}
      <div className="more-button-container">
        <button className="more-button">더보기</button>
      </div>
    </div>
  );
};

export default PublicPage;
