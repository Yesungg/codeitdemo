import React from "react";
import "../styles/GroupList.css"; // CSS 파일 불러오기
import GroupCard from "./GroupCard"; // 그룹 카드 컴포넌트 불러오기

const groups = [
  { id: 1, title: "에델바이스", description: "서로 따뜻함을 나눠요", image: "/images/image01.png" },
  { id: 2, title: "달봉이네 가족", description: "달봉이의 소중한 순간", image: "/images/image02.png" },
  { id: 3, title: "소중한 추억", description: "가족과 함께한 시간", image: "/images/image03.png" },
  { id: 4, title: "바다 여행", description: "푸른 바다와 함께", image: "/images/image04.png" },
];

const GroupList = () => {
  return (
    <div className="group-list">
      {groups.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </div>
  );
};

export default GroupList;
