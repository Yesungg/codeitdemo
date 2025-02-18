import React from "react";
import "../styles/GroupCard.css";

const GroupCard = ({ group, isPrivate }) => {
  return (
    <div className="group-card">
      {/* 비공개 그룹이면 이미지 숨김 */}
      {!isPrivate && (
        <img 
          src={group.image} 
          alt={group.title} 
          style={{ width: "100%", height: "200px", objectFit: "cover" }} 
        />
      )}
      <h3>{group.title}</h3>
      <p>{group.description}</p>

      {/* 그룹 통계 정보 유지 */}
      {group.badges !== undefined && group.memories !== undefined && group.likes !== undefined && (
        <div className="group-stats">
          <span>획득 배지 {group.badges}</span>
          <span>추억 {group.memories}</span>
          <span>그룹 공감 {group.likes.toLocaleString()}</span>
        </div>
      )}
    </div>
  );
};

export default GroupCard;
