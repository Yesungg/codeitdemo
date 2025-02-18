import React, { useState } from 'react';
import './Popup.css';
import axios from 'axios';

function CommentEnter({ postId, onAddComment, onClose }) {
  const [nickname, setNickname] = useState("");
  const [comment, setComment] = useState("");
  const [password, setPassword] = useState("");

  // 입력값 변경 시 상태 업데이트
  const handleNicknameChange = (e) => setNickname(e.target.value);
  const handleCommentChange = (e) => setComment(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // 댓글 추가 함수
  // const handleSubmit = (e) => {
  //   e.preventDefault(); // 기본 이벤트 제거

  //   if (!nickname.trim() || !comment.trim() || !password.trim()) {
  //     alert("닉네임, 댓글, 비밀번호를 모두 입력해주세요.");
  //     return;
  //   }

  //   // 현재 날짜 및 시간 추가
  //   const currentDate = new Date();
  //   const formattedDate = currentDate.toLocaleDateString();
  //   const formattedTime = currentDate.toLocaleTimeString();

  //   // 부모 컴포넌트(App.js)로 데이터 전달
  //   onAddComment({
  //     id: Date.now(),
  //     nickname,
  //     comment,
  //     password,
  //     date: formattedDate,
  //     time: formattedTime
  //   });

  //   // 입력 필드 초기화
  //   setNickname("");
  //   setComment("");
  //   setPassword("");

  //   // 팝업 닫기
  //   onClose();
  // };

  // ✅ 댓글 등록 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 동작 방지

    if (!nickname.trim() || !comment.trim() || !password.trim()) {
      alert("닉네임, 댓글, 비밀번호를 모두 입력해주세요.");
      return;
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    
    try {
      // ✅ 백엔드로 댓글 저장 (API 호출)
      const response = await axios.post(`http://localhost:3000/api/posts/${postId}/comments`, {
        nickname,
        content: comment, // 기존 변수명을 백엔드 스키마에 맞게 변경
        password,
      });
  
      console.log("🟢 댓글 등록 성공:", response.data);
  
      // ✅ 부모 컴포넌트로 댓글 데이터 전달 (백엔드 응답 데이터 활용)
      onAddComment(response.data);
  
      // ✅ 입력 필드 초기화
      setNickname("");
      setComment("");
      setPassword("");
  
      // ✅ 팝업 닫기
      onClose();
    } catch (error) {
      console.error("❌ 댓글 등록 오류:", error);
      alert("댓글 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div class="comment_enter pop" id="comment_enter">
      <div class="comment_enter popup">
        <div class="comment_enter header">
          <span class="back3 btn" onClick={onClose}>&times;</span>
          <h2>댓글 등록</h2>
        </div>
        <div class="comment_enter body">
          <form onSubmit={handleSubmit}>
            <div class="nickName box">
              <label htmlFor="comment_nickname">닉네임</label>
              <input id="comment_nickname" name="comment_nickname" type="text" placeholder="닉네임을 입력해주세요." value={nickname} onChange={handleNicknameChange} required />
            </div>
            <div class="comment box">
              <label htmlFor="comment">댓글</label>
              <input id="comment" name="comment" type="text" placeholder="댓글을 입력해주세요." value={comment} onChange={handleCommentChange} required />
            </div>
            <div class="password box">
              <label htmlFor="password">비밀번호 생성</label>
              <input id="password" name="password" type="password" placeholder="댓글 비밀번호를 입력해주세요." value={password} onChange={handlePasswordChange} required />
            </div>
            <button className="comment_del popbtn" type="submit">등록하기</button>
          </form>
        </div>
      </div>
  </div>
  );
}

export default CommentEnter;