import React, { useState } from "react";
import "../styles/CreateGroup.css"; // CSS 파일 불러오기

const CreateGroup = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState("");

  return (
    <div className="page-container">
      <h1 className="logo">조각집</h1>
      <div className="create-group-container">
        <h2 className="title">그룹 만들기</h2>

        <form>
          {/* 그룹명 입력 */}
          <div className="form-group">
            <label className="label">그룹명</label>
            <input type="text" placeholder="그룹명을 입력하세요" className="input-field" />
          </div>

          {/* 파일 업로드 */}
          <div className="form-group">
            <label className="label">대표 이미지</label>
            <input type="file" className="file-upload" />
          </div>

          {/* 그룹 소개 입력 */}
          <div className="form-group">
            <label className="label">그룹 소개</label>
            <textarea placeholder="그룹을 소개해 주세요" className="textarea"></textarea>
          </div>

          {/* 공개 여부 토글 */}
          <div className="form-group">
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
          </div>

          {/* 비밀번호 입력 (비공개일 때만) */}
          {!isPublic && (
            <div className="form-group">
              <label className="label">비밀번호 생성</label>
              <input
                type="password"
                placeholder="그룹 비밀번호를 설정해 주세요"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}

          {/* 만들기 버튼 */}
          <button className="submit-button">만들기</button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
