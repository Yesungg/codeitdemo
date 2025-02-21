import React, { useState } from "react";
import GroupList from "../components/GroupList";
import "../styles/PrivatePage.css";

const PrivatePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("공감순");

  return (
    <div className="container">
      {/* 헤더 */}
      <h2 className="page-title">비공개 그룹 목록 페이지</h2>

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