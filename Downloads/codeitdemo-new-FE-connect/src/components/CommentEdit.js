import React, { useState } from 'react';
import './Popup.css';
import axios from 'axios';

function CommentEdit({ commentData, onClose, onEditComment }) {
  const [editedContent, setEditContent] = useState(commentData?.content || "");
  const [password, setPassword] = useState("");

  const handleEdit = async (e) => {
    e.preventDefault();

    if (!editedContent.trim() || !password.trim()) {
      alert("수정할 내용을 입력하고 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/comments/${commentData.id}`, {
        nickname: editedContent,
        content: editedContent,
        password,
      });

      console.log("🟢 댓글 수정 성공:", response.data);
      onEditComment(commentData.id, editedContent);
      onClose();
    } catch (error) {
      console.error("❌ 댓글 수정 오류:", error);
      alert("비밀번호가 틀리거나 오류가 발생했습니다.");
    }
  };
  
  return (
    <div class="comment_edit pop" id="comment_edit">
      <div class="comment_edit popup">
        <div class="comment_edit header">
          <span class="back4 btn" onClick={onClose}>&times;</span>
          <h2>댓글 수정</h2>
        </div>
        <div class="comment_edit body">
          <form onSubmit={handleEdit}>
            <div class="nickName box">
              <label htmlFor="comment_nickname">닉네임</label>
              <input id="comment_nickname" type="text" value={commentData.nickname} readOnly />
            </div>
            <div class="comment box">
              <label htmlFor="edit_comment">댓글</label>
              <input id="edit_comment" name="comment" type="text" placeholder={commentData.comment} value={editedContent} onChange={(e) => setEditContent(e.target.value)} />
            </div>
            <div class="password box">
              <label htmlFor="password_permission">수정 권한 인증</label>
              <input id="password_permission" name="password" type="password" placeholder="댓글 비밀번호를 입력해주세요." value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="comment_edit popbtn" type="submit" >등록하기</button>
          </form>
        </div>
      </div>
  </div>
  );
}

export default CommentEdit;