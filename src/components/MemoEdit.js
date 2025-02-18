import React, { useState } from 'react';
import './Popup.css';
import yesImage from '../assets/yes_toggle.png';
import noImage from '../assets/no_toggle.png';

function MemoEdit({ onClose }) {
  const [isPublic, setIsPublic] = useState(false);

  // 버튼 클릭 시 이미지 변경
  const togglePublicStatus = () => {
    setIsPublic(!isPublic); // 상태 토글 (true ↔ false)
  };

  return (
    <div className="memo_edit pop" id="memo_edit">
      <div className="memo_edit popup">
        <div className='memo_edit header'>
          <span className="back1 btn" onClick={onClose}>&times;</span>
          <h2>추억 수정</h2>
        </div>
        <div className="memo_edit body">
          <div className="modal1">
            <div className="name box">
              <label htmlFor="nickName">닉네임</label>
              <input id="nickName" name="name" type="text" placeholder="닉네임을 입력해 주세요" />
            </div>
            <div className="title box">
              <label htmlFor="memory_title">제목</label>
              <input id="memory_title" name="title" placeholder="제목을 입력해 주세요" />
            </div>
            <div className="img box">
              <label htmlFor="memory_img">이미지</label>
              <input id="memory_img" name="img" type="file" placeholder="파일을 선택해 주세요" />
            </div>
            <div className="context box">
              <label htmlFor="memory_context">본문</label>
              <textarea id="memory_context" name="context" placeholder="본문 내용을 입력해 주세요"></textarea>
            </div>
          </div>
          <div className="modal2">
            <div className="tag box">
              <label htmlFor="memory_tag">태그</label>
              <textarea id="memory_tag" name="tag" placeholder="태그 입력 후 Enter"></textarea>
            </div>
            <div className="place box">
              <label htmlFor="memory_place">장소</label>
              <input id="memory_place" name="place" placeholder="장소를 입력해 주세요" />
            </div>
            <div className="date box">
              <label htmlFor="memory_date">추억의 순간</label>
              <input id="memory_date" name="date" type="date" />
            </div>
            <div className="select">
              <label htmlFor="memory_open">추억 공개 선택</label>
              <button className='toggle_btn' onClick={togglePublicStatus}>
                <img src={isPublic ? yesImage : noImage} alt={isPublic ? "Yes" : "No"} />
              </button>
            </div>
            <div className="permission box">
              <label htmlFor="permission">수정 권한 인증</label>
              <input id="permission" name="permission" type="password" placeholder="추억 비밀번호를 입력해 주세요." />
            </div>
          </div>
        </div>
        <button className="edit popbtn">수정하기</button>
      </div>
    </div>
  );
}

export default MemoEdit;