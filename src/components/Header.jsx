import React from "react";
import { useNavigate } from "react-router-dom"; // 🚀 React Router 추가
import "../styles/global.css"; // CSS 파일 불러오기

const Header = () => {
  const navigate = useNavigate(); // 🔹 페이지 이동을 위한 훅

  return (
    <header className="header">
      {/* 헤더 내부 컨테이너 */}
      <div className="header-content">
        {/* 로고 이미지 */}
        <img src="/images/image.png" alt="조각집 로고" className="header-logo" />
      </div>

      {/* 그룹 만들기 버튼 */}
      <button 
        className="create-group-button"
        onClick={() => navigate("/create-group")} // 🚀 클릭 시 페이지 이동
      >
        그룹 만들기
      </button>
    </header>
  );
};

export default Header;
