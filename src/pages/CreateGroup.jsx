import React, { useState } from "react";
import "../styles/global.css"; // CSS 파일 불러오기


const CreateGroupPage = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState("");

  return (
    <>
   

      <div className="page-container">
        <div className="create-group-container">
          <h2 className="title">그룹 만들기</h2>

          {/* 그룹명 입력 */}
          <label className="label">그룹명</label>
          <input type="text" placeholder="당황하지 않게" className="input-field" />

          {/* 파일 업로드 */}
          <label className="label">대표 이미지</label>
          <input type="file" className="file-upload" />

          {/* 그룹 소개 입력 */}
          <label className="label">그룹 소개</label>
          <textarea placeholder="그룹을 소개해 주세요" className="textarea"></textarea>

          {/* 공개 여부 토글 */}
          <label className="label">그룹 공개 선택</label>
          <div className="toggle-container">
            <span>공개</span>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
              className="toggle-switch"
            />
          </div>

          {/* 비밀번호 입력 (비공개일 때만) */}
          {!isPublic && (
            <>
              <label className="label">비밀번호 생성</label>
              <input
                type="password"
                placeholder="그룹 비밀번호를 설정해 주세요"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          )}

          {/* 만들기 버튼 */}
          <button className="submit-button">만들기</button>
        </div>
      </div>
    </>
  );
};

export default CreateGroupPage;