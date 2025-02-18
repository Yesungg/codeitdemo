import React from "react";
import GroupEditModal from "./GroupEditModal"; // 그룹 수정 모달 컴포넌트 추가
import GroupDeleteModal from "./GroupDeleteModal"; // 삭제 모달 추가
import { useState, useEffect } from "react"; // useState 추가
import { useParams, useLocation } from "react-router-dom";
import axios from 'axios';
import groupData from "../data/groupData.js";
import { getMemoriesByGroupId } from "../data/memoryData.js";
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
  const numericGroupId = parseInt(groupId);
  console.log("현재 URL에서 가져온 groupId:", groupId);

  const location = useLocation();
  const [group, setGroup] = useState(location.state || null);
  const [memories, setMemories] = useState([]);
  // const group = groupData.find(g => g.id === numericGroupId);
  // const memories = getMemoriesByGroupId(numericGroupId);

  console.log("📌 현재 URL에서 가져온 groupId:", numericGroupId);
  console.log("📌 location.state에서 받은 그룹 데이터:", location.state);

  // ✅ 만약 location.state가 없을 경우, 백엔드에서 데이터 가져오기 (예제)
  useEffect(() => {
    if (!group) {
        axios.get(`http://localhost:3000/api/groups/${groupId}`)
            .then((response) => {
                console.log("🟢 그룹 데이터 불러오기 성공:", response.data);
                setGroup(response.data);
            })
            .catch((error) => console.error("❌ 그룹 데이터를 불러오는 중 오류 발생:", error));
    }

    // ✅ 백엔드에서 해당 그룹의 게시물 목록 불러오기
    axios.get(`http://localhost:3000/api/groups/${groupId}/posts`)
        .then((response) => {
            console.log("🟢 그룹 게시물 목록 불러오기 성공:", response.data);
            setMemories(response.data.data);
            setTotalMemories(response.data.data.length);
        })
        .catch((error) => console.error("❌ 그룹 게시물 데이터를 불러오는 중 오류 발생:", error));
}, [groupId, group]);
  // groupId와 일치하는 그룹 찾기
  // const group = groupData.find((g) => g.groupId.toString() === groupId);
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
            <div className="badge-section">
                <p className="badge-title">획득 배지</p>
                <div className="badge-container">
                    <div className="badge-item">
                        <span className="badge-icon">👾</span>
                        <span className="badge-text">7일 연속 게시글 등록</span>
                    </div>
                    <div className="badge-item">
                        <span className="badge-icon">🌼</span>
                        <span className="badge-text">그룹 공감 1만 개 이상 받기</span>
                    </div>
                    <div className="badge-item">
                        <span className="badge-icon">💖</span>
                        <span className="badge-text">추억 공감 1만 개 이상 받기</span>
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
    <MemoryList setTotalMemories={setTotalMemories} groupId={numericGroupId} memories={memories} />


    </section>

  );
};

export default GroupDetail;