import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MemoryCard from "./MemoryCard";
import "../styles/memoryStyle.css";
import dropdownImg from '../img/dropdown-img.png';

const dropdownStyle = {
  backgroundImage: `url(${dropdownImg})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 20px center',
  backgroundSize: 'auto'
};

const MemoryList = ({ groupId }) => {
    console.log("📌 현재 URL에서 가져온 groupId:", groupId);

    const navigate = useNavigate();
    const numericGroupId = Number(groupId);
    
    // ✅ 상태 관리
    const [memories, setMemories] = useState([]);
    const [filter, setFilter] = useState("공개");
    const [searchTerm, setSearchTerm] = useState(""); // ✅ 실시간 입력값
    const [confirmedSearchTerm, setConfirmedSearchTerm] = useState(""); // ✅ 확정된 검색어 (엔터 입력 시 적용)
    const [sortOption, setSortOption] = useState("공감순");

    // ✅ 백엔드에서 해당 그룹의 게시물 목록 불러오기
    useEffect(() => {
        axios.get(`http://localhost:3000/api/groups/${numericGroupId}/posts`)
            .then((response) => {
                console.log("🟢 그룹 게시물 목록 불러오기 성공:", response.data);
                setMemories(response.data.data);
            })
            .catch((error) => console.error("❌ 그룹 게시물 데이터를 불러오는 중 오류 발생:", error));
    }, [numericGroupId]);

    // ✅ 검색어 확정 (엔터 입력 시)
    const handleSearchKeyPress = (e) => {
        if (e.key === "Enter") {
            setConfirmedSearchTerm(searchTerm); // ✅ 엔터 입력 시 검색어 확정
        }
    };

    // ✅ 필터링된 게시물 목록 (공개 / 비공개 + 검색 적용)
    const filteredMemories = memories.filter(memory => 
      (filter === "공개" ? memory.isPublic : !memory.isPublic) &&
      (memory.title.toLowerCase().includes(confirmedSearchTerm.toLowerCase()) ||
       memory.tags.some(tag => tag.toLowerCase().includes(confirmedSearchTerm.toLowerCase())))
    );

    // ✅ 정렬 함수: `공감순`, `댓글순`, `최신순` 정렬 적용
    const sortMemories = (memories) => {
      return [...memories].sort((a, b) => {
          if (sortOption === "공감순") {
              return b.likeCount - a.likeCount; // `likeCount` 내림차순 (공감 많은 순)
          } else if (sortOption === "댓글순") {
              return b.commentCount - a.commentCount; // `commentCount` 내림차순 (댓글 많은 순)
          } else if (sortOption === "최신순") {
              return new Date(b.createdAt) - new Date(a.createdAt); // 최신 글 순
          }
          return 0;
      });
  };

  const sortedMemories = sortMemories(filteredMemories);

    // ✅ 게시물 클릭 시 이동
    const handleMemoryClick = (memory) => {
        console.log("📌 이동할 게시물 ID:", memory.id);
        navigate(`/posts/${memory.id}`, { state: memory });
    };

    return (
        <section className="memory-list">
            <div className="memory-header">
                <h2 className="memory-title">추억 목록</h2>
                <button className="memory-write-button" onClick={() => navigate(`/MemoryUpload?groupId=${groupId}`)}>
                    추억 올리기
                </button>
            </div>

            <div className="memory-controls">
                <div className="memory-filter">
                    <button className={`memory-button ${filter === "공개" ? "active" : ""}`} onClick={() => setFilter("공개")}>
                        공개
                    </button>
                    <button className={`memory-button ${filter === "비공개" ? "active" : ""}`} onClick={() => setFilter("비공개")}>
                        비공개
                    </button>
                </div>

                <div className="memory-search-container">
                    <div className="memory-search-wrapper">
                        <img src="/search-icon.png" alt="검색" className="search-icon" />
                        <input
                            type="text"
                            className="memory-search"
                            placeholder="태그 혹은 제목을 입력해 주세요"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearchKeyPress} // ✅ 엔터 입력 시 검색 실행
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

            {/* ✅ 필터링된 게시물 목록을 표시 */}
            {sortedMemories.length === 0 ? (
                <div className="empty-memory">
                    <img src="/empty-icon.svg" alt="추억 없음" className="empty-icon" />
                    <p className="empty-text">게시된 추억이 없습니다.</p>
                    <p className="empty-subtext">첫 번째 추억을 올려보세요!</p>
                    <button className="memory-write-button2" onClick={() => navigate(`/MemoryUpload?groupId=${groupId}`)}>
                        추억 올리기
                    </button>
                </div>
            ) : (
                <>
                    <div className="memory-container">
                        {sortedMemories.map((memory) => (
                            <div key={memory.id}>
                                <MemoryCard key={memory.id} memory={memory} onClick={() => handleMemoryClick(memory)} />
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
