/* 각 추억 카드 컴포넌트 */
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/memoryStyle.css";
import likeIcon from "../img/like-icon.svg"; // 공감 아이콘
import commentIcon from "../img/comment-icon.svg"; // 댓글 아이콘


const MemoryCard = ({ memory, onClick }) => {
  console.log("📌 Memory 데이터:", memory);

  return (
    <div className="memory-card" onClick={onClick}>
      <img src={memory.imageUrl} alt={memory.title} className="memory-image" />
      <div className="memory-content">
        <p className="memory-meta">
          <span className="username">{memory.username}</span> |{" "}
          <span className="public-status">{memory.isPublic ? "공개" : "비공개"}</span>
        </p>
        <h3 className="memory-title">{memory.title}</h3>
        <p className="memory-tags">
          {memory.tags.map((tag, index) => (
            <span key={index} className="tag">#{tag} </span>
          ))}
        </p>
        <div className="memory-meta-container">
            <p className="memory-meta">
                {memory.location} ・ {memory.date}
            </p>
            <div className="memory-actions">
                <span>
                    <img src={likeIcon} alt="공감" className="icon" /> {memory.likes}
                </span>
                <span>
                <img src={commentIcon} alt="댓글" className="icon" /> {memory.comments}
                </span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;