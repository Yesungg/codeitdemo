import React, { useState } from 'react';
import './Popup.css';
import axios from 'axios';

function CommentDel({ commentData, onClose, onDeleteComment }) {
  const [password, setPassword] = useState("");

  const handleDelete = async () => {
    if (!password.trim()) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/api/comments/${commentData.id}`, {
        data: { password }
      });

      console.log("🟢 댓글 삭제 성공");
      onDeleteComment(commentData.id);
      onClose();
    } catch (error) {
      console.error("❌ 댓글 삭제 오류:", error);
      alert("비밀번호가 틀리거나 오류가 발생했습니다.");
    }
  };

  return (
    <div className="comment_del pop" id="comment_del">
      <div className="comment_del popup">
        <div className="comment_del header">
          <span className="back5 btn" onClick={onClose}>&times;</span>
          <h2>댓글 삭제</h2>
        </div>
        <div className="comment_del body">
          <div className="del box">
            <label htmlFor="del_permission">삭제 권한 인증</label>
            <input id="del_permission" name="delete" type="password" value={password} placeholder="추억 비밀번호를 입력해주세요." onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="comment_del popbtn" onClick={handleDelete}>삭제하기</button>
        </div>
      </div>
  </div>
  );
}

export default CommentDel;