import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/GroupList.css"; // CSS 파일 불러오기
import GroupCard from "./GroupCard"; // 그룹 카드 컴포넌트 불러오기

// const groups = [
//   { id: 1, title: "에델바이스", description: "서로 따뜻함을 나눠요", image: "/images/image01.png" },
//   { id: 2, title: "달봉이네 가족", description: "달봉이의 소중한 순간", image: "/images/image02.png" },
//   { id: 3, title: "소중한 추억", description: "가족과 함께한 시간", image: "/images/image03.png" },
//   { id: 4, title: "바다 여행", description: "푸른 바다와 함께", image: "/images/image04.png" },
// ];

const GroupList = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);  // ✅ 그룹 데이터를 담을 상태
  const [loading, setLoading] = useState(true); // ✅ 로딩 상태 추가
  const [error, setError] = useState(null); // ✅ 에러 상태 추가


  // ✅ 백엔드에서 그룹 목록 가져오기
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/groups");
        console.log("🟢 그룹 데이터 불러오기 성공:", response.data.data);
        setGroups(response.data.data); // ✅ 백엔드에서 받은 데이터 저장
      } catch (error) {
        console.error("❌ 그룹 데이터를 불러오는 중 오류 발생:", error);
        setError("그룹 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const handleGroupClick = (group) => {
    console.log("📌 이동할 경로:", `/groups/${group.id}`);
    navigate(`/groups/${group.id}`, { state: group });
  };
  
  // ✅ 데이터 로딩 중일 때 표시
  if (loading) {
    return <div className="loading">그룹 목록을 불러오는 중...</div>;
  }

  // ✅ 에러 발생 시 표시
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="group-list">
      {groups.map((group) => (
        <div key={group.id} onClick={() => handleGroupClick(group)}>
          <GroupCard group={group} />
        </div>
      ))}
    </div>
  );
};

export default GroupList;