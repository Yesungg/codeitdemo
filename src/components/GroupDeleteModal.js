import React, { useState } from "react";
import axios from "axios";
import "../styles/Modalstyle.css";

const GroupDeleteModal = ({ closeModal, groupId }) => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // ✅ 그룹 삭제 요청 함수
  const handleDeleteGroup = async () => {
    if (!password.trim()) {
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }

    console.log("📌 삭제 요청 - groupId:", groupId, "입력된 비밀번호:", password);

    try {
      // ✅ 그룹 삭제 API 요청
      await axios.delete(`http://localhost:3000/api/groups/${groupId}`, {
        data: { password }, // ✅ DELETE 요청의 body에 password 포함
      });

      alert("그룹이 삭제되었습니다.");
      window.location.href = "/"; // ✅ 삭제 후 홈으로 이동
    } catch (error) {
      console.error("❌ 그룹 삭제 실패:", error.response?.data || error);
      setErrorMessage(error.response?.data?.message || "삭제 실패! 다시 시도해주세요.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="modal-close" onClick={closeModal}>×</span>
        <h2 className="modal-title">그룹 삭제</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="group-container">
          <label>삭제 권한 인증</label>
          <input
            type="password"
            className="modal-input"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleDeleteGroup()} // ✅ Enter 키 적용
          />
        </div>

        <button className="modal-button delete" onClick={handleDeleteGroup}>삭제하기</button>
      </div>
    </div>
  );
};

export default GroupDeleteModal;
