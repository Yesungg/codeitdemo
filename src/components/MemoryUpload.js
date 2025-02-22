import { useSearchParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../styles/MemoryUpload.css"; // ✅ 스타일 적용

const MemoryUpload = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // ✅ 페이지 이동을 위한 navigate 함수 추가
  const groupId = searchParams.get("groupId"); // ✅ URL에서 groupId 가져오기

  console.log("📌 URL에서 가져온 groupId:", groupId);

  const [formData, setFormData] = useState({
    groupId: groupId || "",  // ✅ URL에서 가져온 groupId 사용
    nickname: "",
    title: "",
    content: "",
    imageFile: null, // 이미지 파일
    tags: [],
    location: "",
    moment: "",
    isPublic: true,
    password: ""
  });

  const [tagInput, setTagInput] = useState("");

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

  useEffect(() => {
    console.log("📌 URL에서 가져온 groupId:", groupId);
  }, [groupId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("✅ 최종 formData:", formData);

    // `groupId`를 정수로 변환
    const numericGroupId = parseInt(groupId, 10);
    if (isNaN(numericGroupId)) {
      alert("올바른 그룹 ID가 아닙니다!");
      return;
    }

    console.log("✅ 최종 groupId 확인 (After):", numericGroupId, typeof numericGroupId);

    let imageUrl = null;

    // ✅ 1️⃣ 이미지가 있는 경우 먼저 업로드 (multipart/form-data)
    if (formData.imageFile) {
      const imageFormData = new FormData();
      imageFormData.append("image", formData.imageFile);

      try {
        const imageResponse = await fetch("http://localhost:3000/api/image", {
          method: "POST",
          body: imageFormData,
        });

        if (!imageResponse.ok) {
          throw new Error("이미지 업로드 실패");
        }

        const imageData = await imageResponse.json();
        imageUrl = imageData.imageUrl; // 업로드된 이미지 URL 저장
        console.log("✅ 업로드된 이미지 URL:", imageUrl);
      } catch (error) {
        alert("이미지 업로드에 실패했습니다.");
        console.error(error);
        return;
      }
    }

    // ✅ 2️⃣ 게시물 생성 요청 (JSON 형식)
    const postData = {
      groupId: numericGroupId,
      nickname: formData.nickname || "익명",
      title: formData.title,
      content: formData.content,
      tags: formData.tags, // 태그 배열 그대로 전송
      location: formData.location || "",
      moment: formData.moment ? new Date(formData.moment).toISOString() : null,
      isPublic: formData.isPublic,
      password: formData.password,
      imageUrl: imageUrl, // 업로드된 이미지 URL을 저장
    };

    try {
      const response = await fetch(`http://localhost:3000/api/groups/${numericGroupId}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        alert("추억이 성공적으로 업로드되었습니다!");
        console.log("📌 navigate 실행 - 이동할 groupId:", numericGroupId); // ✅ 콘솔 로그 추가
        navigate(`/`); // ✅ 업로드 성공 시 그룹 상세 페이지로 이동
      } else {
        const errorText = await response.text();
        console.error("업로드 실패:", errorText);
        alert(`업로드 실패! 서버 응답: ${errorText}`);
      }
    } catch (error) {
      console.error("게시물 업로드 중 오류 발생:", error);
    }
  };

  return (
    <div className="memory-upload">
        <form onSubmit={handleSubmit} className="memory-upload-container">
        <h2>추억 올리기</h2>
        <div className="memory-upload-form">
            <div className="left-column">
                <div className="group-container">
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
                    <input type="text" name="tags" value={tagInput} onChange={handleTagInputChange} onKeyDown={handleTagKeyDown} placeholder="태그를 입력해 주세요" />
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
        </div>

        <button type="submit" className="memory-upload-form-button">올리기</button>
        </form>
    </div>
  );
};

export default MemoryUpload;