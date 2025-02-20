import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/memoryStyle.css";
import likeIcon from "../img/like-icon.svg"; // 공감 아이콘
import commentIcon from "../img/comment-icon.svg"; // 댓글 아이콘
import dayjs from "dayjs"; // 날짜 변환 라이브러리

const MemoryCard = ({ memory, onClick }) => {
  console.log("📌 백엔드에서 가져온 Memory 데이터:", memory);

  // ✅ 날짜 변환 (ISO -> YYYY.MM.DD HH:mm)
  const formattedDate = dayjs(memory.moment).format("YYYY.MM.DD HH:mm");

  return (
    <div className="memory-card" onClick={onClick}>
      {/* ✅ 백엔드 이미지 URL 렌더링 */}
      <img src={memory.imageUrl} alt={memory.title} className="memory-image" />

      <div className="memory-content">
        <p className="memory-meta">
          <span className="username">{memory.nickname}</span>{" "}
          <span className="gap">|</span>
          <span className="public-status">{memory.isPublic ? "공개" : "비공개"}</span>
        </p>

        <h3 className="memory-title">{memory.title}</h3>

        {/* ✅ 태그 배열을 map()으로 렌더링 */}
        <p className="memory-tags">
          {memory.tags.map((tag, index) => (
            <span key={index}>#{tag.trim()} </span>
          ))}
        </p>

        <div className="memory-meta-container">
            <p className="memory-meta">
                {memory.location} ・ {formattedDate}
            </p>
            <div className="memory-actions">
                <span>
                    <img src={likeIcon} alt="공감" className="icon" /> {memory.likeCount}
                </span>
                <span>
                    <img src={commentIcon} alt="댓글" className="icon" /> {memory.commentCount}
                </span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
