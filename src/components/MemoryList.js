import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import MemoryCard from "./MemoryCard";
import memoryData from "../data/memoryData";
import "../styles/memoryStyle.css";

import dropdownImg from '../img/dropdown-img.png';

const dropdownStyle = {
  backgroundImage: `url(${dropdownImg})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 20px center',
  backgroundSize: 'auto'
};

const MemoryList = ({ setTotalMemories }) => { // 부모에서 값을 업데이트할 수 있도록 props 추가
  const { groupId } = useParams(); // 현재 URL에서 그룹 ID 가져오기
  console.log("현재 URL에서 가져온 groupId:", groupId);
  console.log("메모리 데이터:", memoryData);
  const navigate = useNavigate();

  const [memories, setMemories] = useState([]);
  const [filter, setFilter] = useState("공개");
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmedSearchTerm, setConfirmedSearchTerm] = useState(""); // 확정된 검색어
  const [sortOption, setSortOption] = useState("공감순");

  // ✅ 백엔드에서 특정 그룹의 글 목록 불러오기
  useEffect(() => {
    if (!groupId) return; // groupId가 없으면 요청하지 않음

    axios.get(`http://localhost:3000/api/groups/${groupId}/memories`)
      .then((response) => {
        console.log("🟢 그룹 추억 데이터 불러오기 성공:", response.data);
        setMemories(response.data.data);
        setTotalMemories(response.data.data.length);  // ✅ 총 개수 업데이트
      })
      .catch((error) => {
        console.error("❌ 그룹 추억 데이터를 불러오는 중 오류 발생:", error);
      });
  }, [groupId]);

  // ✅ 게시물 클릭 시 `postId`를 전달하여 `Post.js`로 이동
  const handleMemoryClick = (memory) => {
    console.log("📌 이동할 게시물 ID:", memory.id);
    navigate(`/posts/${memory.id}`, { state: memory }); // ✅ state와 함께 이동
  };

  // 확정된 검색어로 필터링 실행
  const filteredMemories = memoryData.filter(
    (memory) =>
      String(memory.groupId) === String(groupId) &&
      (filter === "공개" ? Boolean(memory.isPublic) : !Boolean(memory.isPublic)) &&
      (memory.title.toLowerCase().includes(confirmedSearchTerm.toLowerCase()) || 
      memory.tags.some(tag => tag.toLowerCase().includes(confirmedSearchTerm.toLowerCase())))
  );
  

  console.log("필터링된 추억 데이터:", filteredMemories); // ✅ 필터링된 데이터 확인

  // 사용자가 Enter 키를 눌렀을 때 검색어 확정
  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      setConfirmedSearchTerm(searchTerm);
    }
  };

   // ✅ 현재 그룹의 모든 추억 개수 계산
   const totalMemories = memoryData.filter(
    (memory) => String(memory.groupId) === String(groupId)
  ).length;

  console.log("totalMemories:", totalMemories);  // ✅ 디버깅용 로그 추가

  // ✅ 부모 컴포넌트에 개수 전달
  useEffect(() => {
    if (typeof setTotalMemories === "function") {  // ✅ 전달된 함수인지 확인 후 실행
      setTotalMemories(totalMemories);
    } else {
      console.warn("⚠️ setTotalMemories가 전달되지 않음! GroupDetail에서 확인해봐.");
    }
  }, [totalMemories, setTotalMemories]);


  // ✅ 정렬 적용
  const sortedMemories = [...filteredMemories].sort((a, b) => {
    if (sortOption === "공감순") return b.likes - a.likes;
    if (sortOption === "댓글순") return b.comments - a.comments;
    if (sortOption === "최신순") return new Date(b.date) - new Date(a.date);
    return 0;
  });

  return (
    <section className="memory-list">
      <div className="memory-header">
        <h2 className="memory-title">추억 목록</h2>
        <button className="memory-write-button">추억 올리기</button>
      </div>

      <div className="memory-controls">
        <div className="memory-filter">
          <button
            className={`memory-button ${filter === "공개" ? "active" : ""}`}
            onClick={() => setFilter("공개")}
          >
            공개
          </button>
          <button
            className={`memory-button ${filter === "비공개" ? "active" : ""}`}
            onClick={() => setFilter("비공개")}
          >
            비공개
          </button>
        </div>

        <div className="memory-search-container">
          <div className="memory-search-wrapper">
            <img src="/img/search-icon.png" alt="검색" className="search-icon" />
            <input
              type="text"
              className="memory-search"
              placeholder="태그 혹은 제목을 입력해 주세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchKeyPress} // Enter 키 입력 시 확정
            />
          </div>
        </div>

        <select
          style={dropdownStyle}
          className="memory-dropdown"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="공감순">공감순</option>
          <option value="댓글순">댓글순</option>
          <option value="최신순">최신순</option>
        </select>
      </div>

      {sortedMemories.length === 0 ? (
          <div className="empty-memory">
              <img src="/img/empty-icon.svg" alt="추억 없음" className="empty-icon" />
              <p className="empty-text">게시된 추억이 없습니다.</p>
              <p className="empty-subtext">첫 번째 추억을 올려보세요!</p>
              <button className="memory-write-button2">추억 올리기</button>
          </div>
      ) : (
          <>
              <div className="memory-container">
                  {sortedMemories.map((memory) => (
                    <div key={memory.id} onClick={() => handleMemoryClick(memory)}>
                      <MemoryCard key={memory.id} memory={memory} />
                    </div>
                  ))}
              </div>

              {sortedMemories.length > 0 && (
                  <button className="load-more-button">더보기</button>
              )}
          </>
      )}
    </section>
  );
};

export default MemoryList;