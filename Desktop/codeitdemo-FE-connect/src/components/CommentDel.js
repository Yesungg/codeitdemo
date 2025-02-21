import React, { useState } from 'react';
import './Popup.css';

function CommentDel({ commentData, onClose, onDeleteComment }) {
  const [passwordInput, setPasswordInput] = useState("");

  // 비밀번호 입력 변경 핸들러
  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
  };

  // 삭제 버튼 클릭 시 실행
  const handleDelete = () => {
    // 입력한 비밀번호와 댓글 비밀번호 비교
    if (passwordInput !== commentData.password) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 댓글 삭제 실행
    onDeleteComment(commentData.id);

    // 팝업 닫기
    onClose();
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
            <input id="del_permission" name="delete" type="password" value={passwordInput} placeholder="추억 비밀번호를 입력해주세요." onChange={handlePasswordChange} />
          </div>
          <button className="comment_del popbtn" onClick={handleDelete}>삭제하기</button>
        </div>
      </div>
  </div>
  );
}

export default CommentDel;