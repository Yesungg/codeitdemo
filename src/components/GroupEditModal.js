import React, { useState } from "react";
import axios from "axios"; // ✅ 백엔드 요청을 위한 axios 추가
import "../styles/Modalstyle.css";

const GroupEditModal = ({ closeModal, groupData, onUpdateGroup }) => {
  const [groupName, setGroupName] = useState(groupData.name);
  const [groupDescription, setGroupDescription] = useState(groupData.introduction);
  const [groupPrivacy, setGroupPrivacy] = useState(groupData.isPublic);
  const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태 추가

  // ✅ 파일 선택 시 실행되는 함수
  const handleFileChange = (event) => {
    const file = event.target.files[0]; 
    if (file) {
      setSelectedFile(file); 
    }
  };

  // ✅ 파일 업로드 input 요소 클릭
  const handleFileSelect = () => {
    document.getElementById("fileInput").click();
  };

  // ✅ 수정하기 버튼 클릭 핸들러
  const handleUpdateGroup = async () => {
    if (!groupName || !groupDescription || (groupData.password && !password)) {
        setErrorMessage("모든 항목을 입력해주세요.");
        return;
    }

    try {
        const formData = new FormData();
        formData.append("name", groupName);
        formData.append("introduction", groupDescription);
        formData.append("isPublic", groupPrivacy);
        if (password) {
            formData.append("password", password);
        }
        if (selectedFile) {
            formData.append("image", selectedFile);
        }

        const response = await axios.put(
            `http://localhost:3000/api/groups/${groupData.id}`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );

        console.log("🟢 그룹 수정 성공:", response.data);

        // ✅ onUpdateGroup 실행되는지 확인
        if (onUpdateGroup) {
            console.log("📌 onUpdateGroup 실행됨!", response.data);
            onUpdateGroup(response.data);  // 이 부분이 실행되어야 화면 업데이트됨
        } else {
            console.warn("⚠️ onUpdateGroup이 전달되지 않음!");
        }

        closeModal();
    } catch (error) {
        console.error("❌ 그룹 수정 오류:", error);
        setErrorMessage("수정에 실패했습니다. 비밀번호를 확인해주세요.");
    }
};



  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="modal-close" onClick={closeModal}>×</span>
        <h2 className="modal-title">그룹 정보 수정</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* 오류 메시지 표시 */}

        <div className="group-container">
            <label>그룹명</label>
            <input 
              type="text" 
              className="modal-input" 
              placeholder="그룹명을 입력해 주세요" 
              value={groupName} 
              onChange={(e) => setGroupName(e.target.value)} 
            />
        </div>

        <div className="group-container">
            <label>대표 이미지</label>
            <div className="modal-file-upload">
                <input 
                  type="text" 
                  className="modal-input" 
                  placeholder="파일을 선택해 주세요" 
                  value={selectedFile ? selectedFile.name : groupData.imageUrl ? groupData.imageUrl.split("/").pop() : ""}  
                  disabled 
                />
                <button className="modal-file-button" onClick={handleFileSelect}>파일 선택</button>
                <input 
                  type="file" 
                  id="fileInput" 
                  style={{ display: "none" }} 
                  accept="image/*" 
                  onChange={handleFileChange} 
                />
            </div>
        </div>

        <div className="group-container">
            <label>그룹 소개</label>
            <textarea 
              className="modal-textarea" 
              placeholder="그룹을 소개해 주세요" 
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
            ></textarea>
        </div>

        <div className="group-container">
            <label className="modal-label">그룹 공개 선택</label>
            <div className="toggle-wrapper">
                <span className="toggle-label">{groupPrivacy ? "공개" : "비공개"}</span>
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

        <button className="modal-button" onClick={handleUpdateGroup}>수정하기</button>
      </div>
    </div>
  );
};

export default GroupEditModal;