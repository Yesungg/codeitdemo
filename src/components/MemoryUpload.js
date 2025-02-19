import React, { useState } from "react";
import "../styles/MemoryUpload.css"; // ✅ 스타일 적용

const MemoryUpload = () => {
  const [formData, setFormData] = useState({
    groupId: "",        // 그룹 ID (필수)
    nickname: "",       // 닉네임 (없으면 '익명' 기본값)
    title: "",          // 제목
    content: "",        // 본문 내용
    imageFile: null,    // 이미지 파일
    tags: [],           // 태그 (배열)
    location: "",       // 장소 (선택 사항)
    moment: "",         // 날짜 (Date 객체로 변환 필요)
    isPublic: true,     // 공개 여부 (기본값 true)
    password: ""        // 비밀번호 (해싱 후 저장됨)
  });

  const [tagInput, setTagInput] = useState(""); // ✅ 태그 입력 상태 추가

  // 입력 필드 값 변경 핸들러
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 이미지 파일 업로드 처리
  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      imageFile: e.target.files[0],
    }));
  };

  // 태그 입력 핸들러
  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  // 태그 추가 핸들러 (Enter 또는 쉼표 입력 시)
  const handleTagKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim() !== "") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!formData.tags.includes(newTag)) { // 중복 방지
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag],
        }));
      }
      
      // 입력창 초기화 (비동기 처리)
      setTimeout(() => setTagInput(""), 0);
    }
  };

  // 태그 삭제 핸들러
  const handleTagRemove = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // API에 데이터 전송
  const handleSubmit = async (e) => {
    e.preventDefault();

    // FormData 객체 생성 (파일 업로드 포함)
    const postData = new FormData();
    postData.append("groupId", parseInt(formData.groupId));
    postData.append("nickname", formData.nickname || "익명");
    postData.append("title", formData.title);
    postData.append("content", formData.content);
    if (formData.imageFile) {
      postData.append("image", formData.imageFile); // 실제 파일 업로드
    }
    postData.append("tags", formData.tags ? formData.tags.split(",").join(",") : "");
    postData.append("location", formData.location || "");
    postData.append("moment", formData.moment ? new Date(formData.moment).toISOString() : "");
    postData.append("isPublic", formData.isPublic);
    postData.append("password", formData.password);

    try {
      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        body: postData, // ✅ FormData 전송 (JSON 아님)
      });

      if (response.ok) {
        alert("추억이 성공적으로 업로드되었습니다!");
        setFormData({
          groupId: "",
          nickname: "",
          title: "",
          content: "",
          imageFile: null,
          tags: "",
          location: "",
          moment: "",
          isPublic: true,
          password: "",
        });
      } else {
        alert("업로드 실패!");
      }
    } catch (error) {
      console.error("업로드 중 오류 발생:", error);
    }
  };

  return (
    <div className="memory-upload">
        <div className="memory-upload-container">
        <h2>추억 올리기</h2>
        <form onSubmit={handleSubmit} className="memory-upload-form">
            <div className="left-column">
                <div class="group-container">
                    <label>닉네임</label>
                    <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} placeholder="닉네임을 입력해 주세요" />
                </div>

                <div className="group-container">
                    <label>제목</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="제목을 입력해 주세요" required />
                </div>

                <div className="group-container file-upload-container">
                    <label>이미지</label>
                    <div className="custom-file-upload">
                        <input type="text" readOnly placeholder="파일을 선택해 주세요" value={formData.imageFile ? formData.imageFile.name : ""} />
                        <label className="file-button">
                            파일 선택
                            <input type="file" name="imageFile" onChange={handleImageChange} />
                        </label>
                    </div>
                </div>


                <div className="group-container">
                    <label>본문</label>
                    <textarea name="content" value={formData.content} onChange={handleChange} placeholder="본문 내용을 입력해 주세요" required />
                </div>
            </div>

            {/* 구분선 추가 */}
            <div className="memoryUpload-divider"></div>

            <div className="right-column">
                <div className="group-container">
                    <label>태그</label>
                    <input type="text" 
                     name="tags" 
                     value={tagInput}
                     onChange={handleTagInputChange}
                     onKeyDown={handleTagKeyDown}
                     placeholder="태그를 입력해 주세요" />

                     {/* 입력된 태그 리스트 */}
                    <div className="tag-list">
                        {formData.tags.map((tag, index) => (
                        <span key={index} className="tag">
                            #{tag} <button type="button" onClick={() => handleTagRemove(tag)}>×</button>
                        </span>
                        ))}
                    </div>
                </div>

                <div className="group-container">
                    <label>장소</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="장소를 입력해 주세요" />
                </div>

                <div className="group-container">
                    <label>추억의 순간</label>
                    <input type="date" name="moment" value={formData.moment} onChange={handleChange} />
                </div>

                <div className="group-container">
                    <label className="modal-label">추억 공개 선택</label>
                    <div className="toggle-wrapper">
                        <span className="toggle-label">공개</span>
                        <label className="switch">
                        <input 
                            type="checkbox" 
                            name="isPublic"
                            checked={formData.isPublic}
                            onChange={handleChange}
                        />
                        <span className="slider round"></span>
                        </label>
                    </div>
                </div>

                <div className="group-container">
                    <label>비밀번호</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="비밀번호를 입력해 주세요" />
                </div>
            </div>
        </form>

        <button type="submit" className="memory-upload-form-button">올리기</button>
        </div>
    </div>
  );
};

export default MemoryUpload;
