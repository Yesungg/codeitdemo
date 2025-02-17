import React, { useState } from 'react';
import './Popup.css';

function CommentEdit({ commentData, onClose, onEditComment }) {
  const [comment, setComment] = useState(commentData.comment);
  const [passwordInput, setPasswordInput] = useState("");

  const handleCommentChange = (e) => setComment(e.target.value);
  const handlePasswordChange = (e) => setPasswordInput(e.target.value);

  // 댓글 수정 완료 버튼 클릭 시 실행
  const handleSubmit = (e) => {
    e.preventDefault();

    // 입력한 비밀번호가 기존 비밀번호와 일치하는지 확인
    if (passwordInput !== commentData.password) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 수정된 댓글을 부모 컴포넌트(CommentSection.js)로 전달
    onEditComment(commentData.id, comment);

    // 팝업 닫기
    onClose();
  };
  
  return (
    <div class="comment_edit pop" id="comment_edit">
      <div class="comment_edit popup">
        <div class="comment_edit header">
          <span class="back4 btn" onClick={onClose}>&times;</span>
          <h2>댓글 수정</h2>
        </div>
        <div class="comment_edit body">
          <div class="nickName box">
            <label htmlFor="comment_nickname">닉네임</label>
            <input id="comment_nickname" type="text" value={commentData.nickname} readOnly />
          </div>
          <div class="comment box">
            <label htmlFor="edit_comment">댓글</label>
            <input id="edit_comment" name="comment" type="text" placeholder={commentData.comment} value={comment} onChange={handleCommentChange} />
          </div>
          <div class="password box">
            <label htmlFor="password_permission">수정 권한 인증</label>
            <input id="password_permission" name="password" type="password" placeholder="댓글 비밀번호를 입력해주세요." value={passwordInput} onChange={handlePasswordChange} />
          </div>
          <button className="comment_edit popbtn" onClick={handleSubmit} >등록하기</button>
        </div>
      </div>
  </div>
  );
}

export default CommentEdit;