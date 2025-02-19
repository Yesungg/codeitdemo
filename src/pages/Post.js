import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
import axios from 'axios';
import '../styles/Post.css';
import postingImage from '../assets/fishing.png';
import MemoEdit from '../components/MemoEdit.js';
import MemoDel from '../components/MemoDel.js';
import CommentSection from '../components/CommentSection.js';

function Post({}) {
  const { postId } = useParams();
  const numericPostId = Number(postId);
  const location = useLocation();
  const memory = location.state;

  const [group, setGroup] = useState(location.state || {});
  // const [post, setPost] = useState(null);
  const [popupType, setPopupType] = useState(null);
  const [commentCount, setCommentCount] = useState(0);

  // ✅ 예시 데이터 (백엔드 없이 동작 가능)
  // const [post, setPost] = useState({
  //   id: postId,
  //   title: group.title || "예시 게시글 제목",
  //   description: group.description || "이것은 예시 게시글입니다.",
  //   image: group.image || "/images/example.png", // ✅ 예시 이미지 (public 폴더에 있어야 함)
  //   content: "이곳에 예시 게시글의 내용을 입력하세요.",
  //   createdAt: "2024-02-17",
  //   likes: 10,
  //   views: 120,
  // });


  // useEffect(() => {
  //   axios.get(`http://localhost:3000/api/groups/${postId}`)
  //     .then((response) => {
  //       console.log("🟢 게시글 데이터 불러오기 성공:", response.data);
  //       setPost(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("❌ 게시글 데이터를 불러오는 중 오류 발생:", error);
  //     });
  // }, [postId, group]);

  // if (!post) return <div>게시글을 불러오는 중...</div>; // ✅ 데이터 로딩 중 표시

  const handleEditMemory = () => {
    setPopupType("edit"); // 팝업 열기
  };

  const handleDeleteMemory = () => {
    setPopupType("delete");
  };

  const handleCommentCountChange = (count) => {
    setCommentCount(count);
  };

  return (
    <div className="container">
      <div className="first">
        <p>
          <span>{memory.username}</span>
          <span className="space1">|</span>
          <span className="space2">{memory.isPublic ? '공개' : '비공개'}</span>
        </p>
        <p>
          <button id="edit_memory" onClick={handleEditMemory}>추억 수정하기</button>
          <button id="delete_memory" onClick={handleDeleteMemory}>추억 삭제하기</button>
        </p>
      </div>
      <h2 className="post_title">{memory.title}</h2>
      <p className="post_meta"> {memory.description}
        {memory.tags.map((item, index) => (
          <span key={index}>#{item}</span>
        ))}
      </p>
      <div className="second">
        <p className="post_info">
          <span className="title weight">인천 앞바다</span>
          <span className="date weight">24.01.19</span>
          <span><img src="views.png" alt="조회수" /> 120</span>
          <span><img src="comments.png" alt="공감수" /> {commentCount}</span>
        </p>
        <p>
          <button id="like">
            <img src="views.png" alt="공감 버튼" />
            공감 보내기
          </button>
        </p>
      </div>
      <div className="content">
        <div className="post_image">
          <img src={memory.image} alt="낚시 사진" />
        </div>
        <p>{memory.comment}인천 앞바다에서 월척을 낚았습니다! 가족들과 기억에 오래도록 남을 멋진 하루였어요.</p>
      </div>

      <CommentSection onCommentCountChange={handleCommentCountChange} />
      {/* 팝업이 열릴 때만 표시 */}
      {popupType === "edit" && <MemoEdit onClose={() => setPopupType(null)} />}
      {popupType === "delete" && <MemoDel onClose={() => setPopupType(null)} />}
    </div>
  );
}

export default Post;