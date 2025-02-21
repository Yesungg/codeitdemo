import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import './Popup.css';
import yesImage from '../assets/yes_toggle.png';
import noImage from '../assets/no_toggle.png';

function MemoEdit({ onClose }) {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태

  // ✅ 게시물 데이터 백엔드에서 불러오기
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/posts/${postId}`)
      .then((response) => {
        console.log("🟢 게시물 데이터 불러오기 성공:", response.data);
        setPost(response.data);
        setIsPublic(response.data.isPublic ?? false);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ 게시물 데이터를 불러오는 중 오류 발생:", error);
        setLoading(false);
      });
  }, [postId]);

  // 버튼 클릭 시 이미지 변경
  const togglePublicStatus = () => {
    setIsPublic((prev) => !prev);// 상태 토글 (true ↔ false)
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
              <input id="nickName" name="name" type="text" placeholder={post?.nickname || "닉네임"} />
            </div>
            <div className="title box">
              <label htmlFor="memory_title">제목</label>
              <input id="memory_title" name="title" placeholder={post?.title || "title"} />
            </div>
            <div className="img box">
              <label htmlFor="memory_img">이미지</label>
              <input id="memory_img" name="img" type="file" placeholder={post?.imageUrl ||"img"} />
            </div>
            <div className="context box">
              <label htmlFor="memory_context">본문</label>
              <textarea id="memory_context" name="context" placeholder={post?.content || "content"}></textarea>
            </div>
          </div>
          <div className="modal2">
            <div className="tag box">
              <label htmlFor="memory_tag">태그</label>
              <textarea id="memory_tag" name="tag" placeholder={post?.tags || "tag"}></textarea>
            </div>
            <div className="place box">
              <label htmlFor="memory_place">장소</label>
              <input id="memory_place" name="place" placeholder={post?.location || "location"} />
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