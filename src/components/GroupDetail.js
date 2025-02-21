import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import GroupEditModal from "./GroupEditModal";
import GroupDeleteModal from "./GroupDeleteModal";
import MemoryList from "./MemoryList";
import Divider from "./Divider";
import "../styles/GroupDetailstyle.css";

const GroupDetail = () => {
    const { groupId } = useParams(); // URL에서 groupId 가져오기
    const numericGroupId = parseInt(groupId);
    const location = useLocation();


    // ✅ 상태 변수 설정
    const [group, setGroup] = useState(location.state || null);
    const [memories, setMemories] = useState([]);
    const [likes, setLikes] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [dDay, setDDay] = useState(0); // ✅ dDay 상태 추가
    
    console.log("📌 현재 URL에서 가져온 groupId:", groupId); // ✅ 여기서 groupId 값 확인
    console.log("📌 변환된 numericGroupId groupId:", numericGroupId);
    console.log("📌 location.state에서 받은 그룹 데이터:", location.state);
    console.log("📌 백엔드에서 받은 group.id:", group?.id);

    // ✅ 백엔드에서 그룹 데이터 가져오기
    useEffect(() => {
        if (!group) {
            axios.get(`http://localhost:3000/api/groups/${numericGroupId}`)
                .then((response) => {
                    console.log("🟢 그룹 데이터 불러오기 성공:", response.data);
                    setGroup({
                        ...response.data,
                        postCount: response.data.postCount ?? 0, // ✅ postCount 기본값 설정
                    });
                    setLikes(group.likeCount); // ✅ group.likeCount가 변경될 때마다 likes도 업데이트
                    setDDay(calculateDDay(response.data.createdAt)); // ✅ createdAt 기반으로 dDay 설정
                })
                .catch((error) => console.error("❌ 그룹 데이터를 불러오는 중 오류 발생:", error));
        }


        // ✅ 백엔드에서 해당 그룹의 게시물 목록 불러오기
        axios.get(`http://localhost:3000/api/groups/${numericGroupId}/posts`)
            .then((response) => {
                console.log("🟢 그룹 게시물 목록 불러오기 성공:", response.data);
                setMemories(response.data.data);

                // ✅ postCount를 백엔드에서 받은 `totalItemCount` 값으로 설정
                setGroup(prevGroup => ({
                    ...prevGroup,
                    postCount: response.data.totalItemCount,  // ✅ `totalItemCount`를 사용
                }));
            })
            .catch((error) => console.error("❌ 그룹 게시물 데이터를 불러오는 중 오류 발생:", error));
    }, [groupId]);

    // ✅ `memories` 변경될 때 postCount 업데이트
    useEffect(() => {
        if (group) {
            console.log("✅ 현재 그룹 postCount:", group.postCount);
            console.log("✅ 현재 게시물 개수:", memories.length);
            
            if (group.postCount !== memories.length) {
                setGroup(prevGroup => ({
                    ...prevGroup,
                    postCount: memories.length, // ✅ 게시물 개수로 postCount 업데이트
                }));
            }
        }
    }, [memories]);
    


    // ✅ createdAt을 기반으로 D+일 계산하는 함수
      const calculateDDay = (createdAt) => {
        if (!createdAt) return 0;

        const createdDate = new Date(createdAt);
        const currentDate = new Date();

        // 밀리초 차이를 일(day) 단위로 변환
        const diffTime = currentDate - createdDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        return diffDays >= 0 ? diffDays : 0;
    };


    // ✅ 공감 버튼 클릭 핸들러
    const handleLikeClick = () => {
      axios.post(`http://localhost:3000/api/groups/${groupId}/like`)
          .then((response) => {
              console.log("🟢 공감 업데이트 성공:", response.data);
              setLikes(response.data.likeCount); // ✅ 백엔드에서 받아온 최신 공감 수로 업데이트
              setGroup((prevGroup) => ({
                ...prevGroup,
                likeCount: response.data.likeCount // ✅ group 상태도 업데이트
            }));
          })
          .catch((error) => console.error("❌ 공감 처리 중 오류 발생:", error));
    };

    // ✅ 그룹 삭제 핸들러
    const handleDeleteGroup = (password) => {
        axios.post(`http://localhost:3000/api/groups/${groupId}/verify-password`, { password })
            .then(() => {
                axios.delete(`http://localhost:3000/api/groups/${groupId}`)
                    .then(() => {
                        alert("그룹이 삭제되었습니다.");
                        window.location.href = "/"; // 홈으로 리다이렉트
                    })
                    .catch((error) => console.error("❌ 그룹 삭제 중 오류 발생:", error));
            })
            .catch(() => alert("비밀번호가 틀렸습니다."));
    };

    if (!group) {
        return <p>그룹을 찾을 수 없습니다.</p>;
    }

    return (
        <section className="group-detail">
            <div className="group-header">
                <img src={group.imageUrl} alt="그룹 대표 이미지" className="group-image" />

                <div className="group-info">
                    <div className="group-meta">
                        <span>D+{dDay}</span> {/* ✅ createdAt 기반으로 계산된 D+일 표시 */}
                        <span className="group-privacy">| {group.isPublic ? "공개" : "비공개"}</span> {/* ✅ 공개 / 비공개 변환 */}
                    </div>

                    <div className="group-header-container">
                        <h2 className="group-title">{group.name}</h2>
                        <div className="group-stats">
                            <span>추억 {group?.postCount ?? 0}</span>
                            <span className="group-stats-divider">|</span>
                            <span>그룹 공감 {group.likeCount}</span>
                        </div>
                    </div>

                    <p className="group-desc">{group.introduction}</p>

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

                    <div className="group-management">
                        <button className="group-edit" onClick={() => setIsModalOpen(true)}>그룹 정보 수정하기</button>
                        {isModalOpen && (<GroupEditModal closeModal={() => setIsModalOpen(false)} groupData={group} onUpdateGroup={setGroup} />)}

                        <button className="group-delete" onClick={() => setIsDeleteModalOpen(true)}>그룹 삭제하기</button>
                        {isDeleteModalOpen && (<GroupDeleteModal closeModal={() => setIsDeleteModalOpen(false)} onDelete={handleDeleteGroup} />)}
                    </div>

                    <div className="group-actions">
                        <button className="like-btn" onClick={handleLikeClick}>
                            <img src="/likebtn.png" alt="공감 아이콘" />
                            공감 보내기
                        </button>
                    </div>
                </div>
            </div>

            <Divider />
            <MemoryList groupId={numericGroupId} memories={memories} setMemories={setMemories} />
        </section>
    );
};

export default GroupDetail;