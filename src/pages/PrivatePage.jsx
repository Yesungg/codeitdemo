import React, { useState } from "react";
import "../styles/PrivatePage.css"; // 스타일 적용
import GroupList from "../components/GroupList"; // 그룹 리스트 컴포넌트

const PrivatePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("공감순");

  return (
    <div className="page-container">
      {/* 헤더 */}
      <h1 className="logo">조각집</h1>

      {/* 검색 필터 영역 */}
      <div className="filter-container">
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

      {/* 비공개 그룹 리스트 */}
      <GroupList searchTerm={searchTerm} sortOption={sortOption} filter="private" />

      {/* 더보기 버튼 */}
      <div className="more-button-container">
        <button className="more-button">더보기</button>
      </div>
    </div>
  );
};

export default PrivatePage;
