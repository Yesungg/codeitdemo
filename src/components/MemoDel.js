import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import './Popup.css';

function MemoDel({ onClose }) {
  const { postId } = useParams();
  const [password, setPassword] = useState("");

  const handleDelete = async () => {
    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/api/posts/${postId}`, {
        data: { password }
      });
      alert("게시물이 삭제되었습니다.");
      onClose(); // 팝업 닫기
      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      console.error("❌ 게시물 삭제 중 오류 발생:", error);
      alert("게시물 삭제 실패: 비밀번호가 올바르지 않습니다.");
    }
  };
  return (
    <div className="memo_del pop" id="memo_del">
      <div className="memo_del popup">
        <div className="memo_del header">
          <span className="back2 btn" onClick={onClose}>&times;</span>
          <h2>추억 삭제</h2>
        </div>
        <div className="memo_del body">
          <div className="delete box">
            <label for="delete_permission">삭제 권한 인증</label>
            <input id="delete_permission" name="delete" type="password" placeholder="추억 비밀번호를 입력해주세요." value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="del popbtn" onClick={handleDelete} >삭제하기</button>
        </div>
      </div>
    </div>
  );
}

export default MemoDel;