import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import '../styles/Post.css';
import postingImage from '../assets/fishing.png';
import MemoEdit from '../components/MemoEdit.js';
import MemoDel from '../components/MemoDel.js';
import CommentSection from '../components/CommentSection.js';

function Post({}) {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [popupType, setPopupType] = useState(null);
  const [commentCount, setCommentCount] = useState(0);
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태


  // // ✅ 게시물 데이터 백엔드에서 불러오기
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3000/api/posts/${postId}`)
  //     .then((response) => {
  //       console.log("🟢 게시물 데이터 불러오기 성공:", response.data);
  //       setPost(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("❌ 게시물 데이터를 불러오는 중 오류 발생:", error);
  //       setLoading(false);
  //     });
  // }, [postId]);

  // ✅ 게시물 데이터 + 댓글 개수 불러오기
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postResponse = await axios.get(
          `http://localhost:3000/api/posts/${postId}`
        );
        console.log("🟢 게시물 데이터 불러오기 성공:", postResponse.data);

        setPost(postResponse.data);
        setLikes(postResponse.data.likeCount || 0);
        setLoading(false);
      } catch (error) {
        console.error("❌ 게시물 데이터를 불러오는 중 오류 발생:", error);
        setLoading(false);
      }
    };

    fetchPostData();
  }, [postId]);

  // ✅ 공감 버튼 클릭 시 실행
  const handleLikeClick = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/posts/${postId}/like`);
      console.log("🟢 공감 반영 성공:", response.data);
      
      setLikes(likes + 1); // ✅ 공감 수 증가

    } catch (error) {
      console.error("❌ 공감 반영 중 오류 발생:", error);
    }
  };

  // ✅ 데이터 로딩 중일 때 표시
  if (loading) {
    return <div className="loading">게시글을 불러오는 중...</div>;
  }

  // ✅ 게시물 데이터가 없을 때 처리
  if (!post) {
    return <div className="error">게시글을 찾을 수 없습니다.</div>;
  }


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
          <span>{post.nickname}</span>
          <span className="space1">|</span>
          <span className="space2">{post.isPublic ? '공개' : '비공개'}</span>
        </p>
        <p>
          <button id="edit_memory" onClick={handleEditMemory}>추억 수정하기</button>
          <button id="delete_memory" onClick={handleDeleteMemory}>추억 삭제하기</button>
        </p>
      </div>
      <h2 className="post_title">{post.title}</h2>
      <p className="post_meta">
        {post.tags.map((item, index) => (
          <span key={index}>#{item}</span>
        ))}
      </p>
      <div className="second">
        <p className="post_info">
          <span className="title weight">{post.location}</span>
          <span className="date weight">{post.createdAt?.slice(0,10)}</span>
          <span><img src="../../views.png" alt="조회수" /> {likes || 0}</span>
          <span><img src="../../comments.png" alt="공감수" /> {commentCount}</span>
        </p>
        <p>
          <button id="like" onClick={handleLikeClick}>
            <img src="../../views.png" alt="공감 버튼" />
            공감 보내기
          </button>
        </p>
      </div>
      <div className="content">
        <div className="post_image">
          <img src={post.imageUrl} alt="낚시 사진" />
        </div>
        <p>{post.content}</p>
      </div>

      <CommentSection postId={postId} onCommentCountChange={handleCommentCountChange} />
      {/* 팝업이 열릴 때만 표시 */}
      {popupType === "edit" && <MemoEdit onClose={() => setPopupType(null)} />}
      {popupType === "delete" && <MemoDel onClose={() => setPopupType(null)} />}
    </div>
  );
}

export default Post;