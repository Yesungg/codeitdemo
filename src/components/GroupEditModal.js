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

  // ✅ 파일을 업로드하는 함수 (이미지 업로드 API가 있는 경우)
  const handleFileUpload = async () => {
    if (!selectedFile) return null;

    try {
        const formData = new FormData();
        formData.append("image", selectedFile);

        console.log("📌 이미지 업로드 시작...");
        const uploadResponse = await axios.post(
            `http://localhost:3000/api/image`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );

        console.log("🟢 이미지 업로드 성공:", uploadResponse.data);

        if (!uploadResponse.data.imageUrl) {
            throw new Error("서버에서 이미지 URL을 반환하지 않음!");
        }

        return uploadResponse.data.imageUrl; // ✅ 업로드된 이미지 URL 반환
    } catch (error) {
        console.error("❌ 이미지 업로드 오류:", error);
        return null;
    }
};


  // ✅ 그룹 정보를 수정하는 함수
  const handleUpdateGroup = async () => {
    console.log("📌 handleUpdateGroup 실행됨!");

    if (!groupName || !groupDescription || (groupData.password && !password)) {
        setErrorMessage("모든 항목을 입력해주세요.");
        return;
    }

    let imageUrl = groupData.imageUrl; // 기존 이미지 유지

    // 🖼️ 새 이미지가 선택되었을 경우 업로드 후 URL 가져오기
    if (selectedFile) {
        console.log("📌 파일 업로드 중...");
        try {
            imageUrl = await handleFileUpload(); // ✅ 업로드 후 반환된 URL 저장
            console.log("🟢 업로드된 이미지 URL:", imageUrl);
        } catch (error) {
            console.error("❌ 이미지 업로드 실패:", error);
            setErrorMessage("이미지 업로드에 실패했습니다.");
            return;
        }
    }

    try {
        // JSON 형태로 데이터 구성
        const updateData = {
            name: groupName,
            introduction: groupDescription,
            isPublic: groupPrivacy,
            password: password || undefined, // 비밀번호가 입력되었을 경우에만 포함
            imageUrl: imageUrl, // ✅ 업로드된 이미지 URL 반영
        };

        console.log("📌 전송할 데이터:", updateData);

        const response = await axios.put(
            `http://localhost:3000/api/groups/${groupData.id}`,
            updateData,
            { headers: { "Content-Type": "application/json" } }
        );

        console.log("🟢 그룹 수정 성공:", response.data);

        if (onUpdateGroup) {
            console.log("📌 onUpdateGroup 실행됨!", response.data);
            onUpdateGroup(response.data);
        } else {
            console.warn("⚠️ onUpdateGroup이 전달되지 않음!");
        }

        setTimeout(() => {
            console.log("📌 모달 닫기 실행됨!");
            closeModal(); 
        }, 500);
    } catch (error) {
        console.error("❌ 그룹 수정 오류:", error);
        setErrorMessage("수정에 실패했습니다. 비밀번호를 확인해주세요.");
    }
};


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="modal-close" onClick={closeModal}>×</span>
        <form onSubmit={(e) => {
          e.preventDefault();  // ✅ 기본 동작 막기
          console.log("📌 '수정하기' 버튼 클릭됨!");
          handleUpdateGroup();
        }}>
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

        <button
         className="modal-button" 
         type="submit"

         
        >수정하기
        </button>
        </form>
      </div>
    </div>
  );
};

export default GroupEditModal;