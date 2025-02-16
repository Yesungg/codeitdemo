import React from "react";
import GroupEditModal from "./GroupEditModal"; // 그룹 수정 모달 컴포넌트 추가
import GroupDeleteModal from "./GroupDeleteModal"; // 삭제 모달 추가
import { useState } from "react"; // useState 추가
import { useParams } from "react-router-dom";
import groupData from "../data/groupData.js";
import MemoryList from "./MemoryList";  // MemoryList 임포트
import Divider from "./Divider.js"; // Devider 임포트
import "../styles/GroupDetailstyle.css";

const GroupDetail = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가
    const [totalMemories, setTotalMemories] = useState(0); // 상태 추가
    console.log("GroupDetail에서 받은 totalMemories:", totalMemories);  // ✅ 디버깅용 로그

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // 삭제 함수 (나중에 백엔드 연결하면 API 요청 추가)
    const handleDeleteGroup = (password) => {
        console.log("입력한 비밀번호:", password);
        alert("그룹이 삭제되었습니다.");
        setIsDeleteModalOpen(false);
    };

  
  const { groupId } = useParams(); // URL에서 groupId 가져오기
  console.log("현재 URL에서 가져온 groupId:", groupId);

  // groupId와 일치하는 그룹 찾기
  const group = groupData.find((g) => g.groupId.toString() === groupId);
  console.log("찾은 그룹 데이터:", group);

  // 공감 수 상태 관리 (초기값: group.likes)
  const [likes, setLikes] = useState(group ? Number(group.likes) : 0);

  // 공감 버튼 클릭 핸들러
  const handleLikeClick = () => {
    setLikes((prevLikes) => Number(prevLikes) + 1); // 항상 숫자로 변환
};

  
    if (!group) {
      return <p>그룹을 찾을 수 없습니다.</p>;
    }

  return (
    <section className="group-detail">
      <div className="group-header">
      <img src={group.imageUrl} alt="그룹 대표 이미지" className="group-image" />

      <div className="group-info">
        <div className="group-center">
            <div className="group-meta">
                <span>D+{group.dDay}</span> 
                <span className="group-privacy">|  공개</span>
            </div>

            <div className="group-header-container">
                <h2 className="group-title">{group.name}</h2>

                <div className="group-stats">
                    <span>추억 {totalMemories}</span>
                    <span className="group-stats-divider">|</span>
                    <span>그룹 공감 {likes}</span>
                </div>
            </div>

            <p className="group-desc">{group.description}</p>

            {/* 획득 배지 */}
            <div class="badge-section">
                <p class="badge-title">획득 배지</p>
                <div class="badge-container">
                    <div class="badge-item">
                        <span class="badge-icon">👾</span>
                        <span class="badge-text">7일 연속 게시글 등록</span>
                    </div>
                    <div class="badge-item">
                        <span class="badge-icon">🌼</span>
                        <span class="badge-text">그룹 공감 1만 개 이상 받기</span>
                    </div>
                    <div class="badge-item">
                        <span class="badge-icon">💖</span>
                        <span class="badge-text">추억 공감 1만 개 이상 받기</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="group-management">
            <div>
            <button className="group-edit" onClick={() => {setIsModalOpen(true);}}>그룹 정보 수정하기</button>
            {isModalOpen && group && (<GroupEditModal closeModal={() => setIsModalOpen(false)} groupData={group}/>)}
            </div>
            <button className="group-delete" onClick={() => setIsDeleteModalOpen(true)}>그룹 삭제하기</button>
            {isDeleteModalOpen && (<GroupDeleteModal closeModal={() => setIsDeleteModalOpen(false)} onDelete={handleDeleteGroup}/>)}
        </div>


        {/* 공감 버튼 */}
        <div className="group-actions">
            <button className="like-btn" onClick={handleLikeClick}>
                <img src="/img/likebtn.png" alt="공감 아이콘" />
                공감 보내기
            </button>
        </div>
      </div>

        

    </div>

    {/* ✅ Divider를 GroupDetail 내부에서 렌더링 */}
    <Divider />

    {/* ✅ MemoryList를 GroupDetail 내부에서 렌더링 */}
    <MemoryList setTotalMemories={setTotalMemories}/>


    </section>

  );
};

export default GroupDetail;
