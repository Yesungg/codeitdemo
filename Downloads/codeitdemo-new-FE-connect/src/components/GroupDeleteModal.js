import React, { useState } from "react";
import "../styles/Modalstyle.css";

const GroupDeleteModal = ({ closeModal, onDelete }) => {
  const [password, setPassword] = useState("");

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="modal-close" onClick={closeModal}>×</span>
        <h2 className="modal-title">그룹 삭제</h2>

        <div className="group-container">
          <label>삭제 권한 인증</label>
          <input 
            type="password" 
            className="modal-input" 
            placeholder="비밀번호를 입력해 주세요" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="modal-button" onClick={() => onDelete(password)}>삭제하기</button>
      </div>
    </div>
  );
};

export default GroupDeleteModal;