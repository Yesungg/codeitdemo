import React from "react";
import "../styles/GroupList.css"; // ✅ 스타일 추가

const GroupCard = ({ group }) => {
  return (
    <div className="group-card">
      {/* ✅ image -> imageUrl로 변경 */}
      <img src={group.imageUrl} alt={group.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
      <div className="group-meta">
        <p className="group-meta-info">D+{group.dDay} | {group.isPublic ? "공개" : "비공개"}</p>
      </div>
      <h3 className="group-title">{group.name}</h3>
      <p className="group-introduction">{group.introduction}</p>
      <div className="group-stats">
        <div className="group-badge">획득 배지 <span>{group.badgeCount}</span></div>
        <div className="group-posts">추억 <span>{group.postCount}</span></div>
        <div className="group-likes">🌼 <span>{group.likeCount.toLocaleString()}</span></div>
      </div>
    </div>
  );
};

export default GroupCard;
