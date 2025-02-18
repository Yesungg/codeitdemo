import React, { useState } from "react";
import "../styles/Modalstyle.css";

const GroupEditModal = ({ closeModal, groupData }) => {
  const [groupName, setGroupName] = useState(groupData.name);
  const [groupDescription, setGroupDescription] = useState(groupData.description);
  const [groupPrivacy, setGroupPrivacy] = useState(groupData.isPublic);
  const [password, setPassword] = useState("");

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="modal-close" onClick={closeModal}>×</span>
        <h2 className="modal-title">그룹 정보 수정</h2>

        <div className="group-container">
            <label>그룹명</label>
            <input 
            type="text" 
            className="modal-input" 
            value={groupName} 
            onChange={(e) => setGroupName(e.target.value)} 
            />
        </div>

        <div className="group-container">
            <label>대표 이미지</label>
            <div className="modal-file-upload">
            <input type="text" className="modal-input" value="dalbong.jpg" disabled />
            <button className="modal-file-button">파일 선택</button>
            </div>
        </div>

        <div className="group-container">
            <label>그룹 소개</label>
            <textarea 
            className="modal-textarea" 
            placeholder="그룹을 소개해주세요" 
            value={groupDescription} 
            onChange={(e) => setGroupDescription(e.target.value)}
            ></textarea>
        </div>

        <div className="group-container">
            <label className="modal-label">그룹 공개 선택</label>
            <div className="toggle-wrapper">
                <span className="toggle-label">공개</span>
                <label className="switch">
                <input 
                    type="checkbox" 
                    checked={groupPrivacy} 
                    onChange={() => setGroupPrivacy(!groupPrivacy)} 
                />
                <span className="slider round"></span>
                </label>
            </div>
        </div>


        <div className="group-container">
            <label>수정 권한 인증</label>
            <input 
            type="password" 
            className="modal-input" 
            placeholder="비밀번호를 입력해 주세요" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        <button className="modal-button">수정하기</button>
      </div>
    </div>
  );
};

export default GroupEditModal;