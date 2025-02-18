import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GroupList.css"; // CSS 파일 불러오기
import GroupCard from "./GroupCard"; // 그룹 카드 컴포넌트 불러오기

const groups = [
  { id: 1, title: "에델바이스", description: "서로 따뜻함을 나눠요", image: "/images/image01.png", likes: 1500, views: 3000, date: "2024-02-01", isPrivate: false },
  { id: 2, title: "달봉이네 가족", description: "달봉이의 소중한 순간", image: "/images/image02.png", likes: 1200, views: 2500, date: "2024-02-03", isPrivate: false },
  { id: 3, title: "소중한 추억", description: "가족과 함께한 시간", image: "/images/image03.png", likes: 1800, views: 4000, date: "2024-02-02", isPrivate: false },
  { id: 4, title: "바다 여행", description: "푸른 바다와 함께", image: "/images/image04.png", likes: 800, views: 1200, date: "2024-01-30", isPrivate: false },
  { id: 5, title: "가족 모임", description: "가족들끼리만 모이는 비공개 그룹", likes: 1600, views: 3200, date: "2024-02-04", isPrivate: true },
  { id: 6, title: "비밀 일기", description: "나만의 비밀을 공유하는 공간", likes: 1000, views: 2200, date: "2024-02-01", isPrivate: true },
  { id: 7, title: "취미 모임", description: "소규모 취미 생활 공유", likes: 1300, views: 2800, date: "2024-02-05", isPrivate: true },
  { id: 8, title: "친구들의 공간", description: "오직 친구들만!", likes: 2000, views: 5000, date: "2024-02-06", isPrivate: true },
];

const GroupList = ({ searchTerm, filter, sortOption }) => {
  const navigate = useNavigate();

  const filteredGroups = useMemo(() => {
    let result = groups.filter(group => group.isPrivate === (filter === "private"));

    if (searchTerm) {
      result = result.filter(group => group.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    switch (sortOption) {
      case "공감순":
        result.sort((a, b) => b.likes - a.likes);
        break;
      case "최신순":
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "조회순":
        result.sort((a, b) => b.views - a.views);
        break;
      default:
        break;
    }
    return result;
  }, [searchTerm, filter, sortOption]);

  const handleGroupClick = (group) => {
    navigate(`/groups/${group.id}`, { state: group });
  };

  return (
    <div className="group-list">
      {filteredGroups.length > 0 ? (
        filteredGroups.map(group => (
          <div key={group.id} onClick={() => handleGroupClick(group)}>
            <GroupCard group={group} isPrivate={group.isPrivate} />
          </div>
        ))
      ) : (
        <p className="no-results">검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default GroupList;
