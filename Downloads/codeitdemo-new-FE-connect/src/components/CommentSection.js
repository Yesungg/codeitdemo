import React, { useState, useEffect } from 'react';
import axios from "axios";
import './CommentSection.css';
import CommentEnter from './CommentEnter';
import CommentEdit from './CommentEdit';
import CommentDel from './CommentDel';

function CommentSection({ postId, onCommentCountChange }) {
  console.log("CommentSection postId", postId);
  const [comments, setComments] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 상태
  const [editCommentId, setEditCommentId] = useState(null);
  const [deleteCommentId, setDeleteCommentId] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ 백엔드에서 댓글 목록 가져오기
  useEffect(() => {
    if (!postId) {
      console.warn("❌ postId가 존재하지 않습니다. API 요청을 중단합니다.");
      return;
    }

    axios
      .get(`http://localhost:3000/api/posts/${postId}/comments`)
      .then((response) => {
        console.log("🟢 댓글 목록 응답 데이터:", response.data);
        setComments(response.data.data || []); // 백엔드 응답에서 실제 댓글 데이터만 사용
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ 댓글을 불러오는 중 오류 발생:", error);
        setLoading(false);
      });
  }, [postId]);

  // ✅ 댓글 목록을 다시 불러오는 함수 (업데이트가 필요할 때 호출)
  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/posts/${postId}/comments`);
      console.log("🟢 댓글 목록 응답 데이터:", response.data);
      setComments(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error("❌ 댓글을 불러오는 중 오류 발생:", error);
      setLoading(false);
    }
  };

  // ✅ 처음 마운트될 때 & 댓글 변경 시 다시 불러오기
  useEffect(() => {
    fetchComments();
  }, [postId]); // postId가 변경될 때마다 실행

// ✅ 댓글 개수 변경 반영
useEffect(() => {
  if (onCommentCountChange) {
    onCommentCountChange(comments.length);
  }
}, [comments, onCommentCountChange]);

  // ✅ 새 댓글 추가 요청
  const addComment = async (newComment) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/posts/${postId}/comments`,
        newComment
      );
      console.log("🟢 댓글 추가 성공:", response.data);

      // ✅ 댓글 목록 상태 즉시 업데이트
      setComments((prevComments) => [ ...prevComments, response.data]);

      fetchComments();

        // setComments([...comments, response.data]); // 상태 업데이트
        setIsPopupOpen(false);
      } catch (error) {
        console.error("❌ 댓글 추가 중 오류 발생:", error);
    }
  };

  // ✅ 댓글 수정 요청
  const updateComment = async (id, newContent, password) => {
    try {
      console.log("요청 보낼 데이터: ", {content: newContent, password});
      const response = await axios.put(
        `http://localhost:3000/api/comments/${id}`,
        { 
          content: newContent,
          password: password
        }
      );
      console.log("🟢 댓글 수정 성공:", response.data);

      // 댓글 목록을 다시 불러오도록 설정
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === id ? { ...comment, content: newContent } : comment
        )
      );
      setEditCommentId(null);
    } catch (error) {
      console.error("❌ 댓글 수정 중 오류 발생:", error);
    }
  };

  // ✅ 댓글 삭제 요청
  const deleteComment = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/comments/${id}`);
      console.log("🟢 댓글 삭제 성공");

      setComments(comments.filter((comment) => comment.id !== id));
      setDeleteCommentId(null);
    } catch (error) {
      console.error("❌ 댓글 삭제 중 오류 발생:", error);
    }
  };

  // ✅ 댓글 수정 버튼 클릭 시 실행 (팝업 열기)
  const handleEditComment = (id) => {
    setEditCommentId(id);
  };

  // ✅ 댓글 삭제 버튼 클릭 시 실행 (팝업 열기)
  const handleDeleteComment = (id) => {
    setDeleteCommentId(id);
  };

  // ✅ 댓글 입력 버튼 클릭 시 팝업 열기
  const handleEnterComment = () => {
    setIsPopupOpen(true);
  };

  // // 새 댓글 추가 함수
  // const addComment = (newComment) => {
  //   setComments([...comments, newComment]); // 기존 댓글 리스트에 추가
  //   setIsPopupOpen(false); // 팝업 닫기
  // };

  // // 댓글 삭제 함수
  // const deleteComment = (id) => {
  //   setComments(comments.filter((comment) => comment.id !== id));
  //   setDeleteCommentId(null);
  // };

  // // 댓글 수정 버튼 클릭 시 실행 (팝업 열기)
  // const handleEditComment = (id) => {
  //   setEditCommentId(id);
  // };

  // const handleDeleteComment = (id) => {
  //   setDeleteCommentId(id);
  // };

  // const handleEnterComment = () => {
  //   setIsPopupOpen(true);
  // };

  // // 댓글 내용 수정 후 저장
  // const updateComment = (id, newComment) => {
  //   const updatedComments = comments.map((comment) =>
  //     comment.id === id ? { ...comment, comment: newComment } : comment
  //   );
  //   setComments(updatedComments);
  //   setEditCommentId(null);
  // };

  return (
    <div class="comment_section">
      <button id="click" onClick={handleEnterComment}>댓글 등록하기</button>
      {isPopupOpen && <CommentEnter postId={postId} onClose={() => setIsPopupOpen(false)} onAddComment={addComment} />}
      <h2>댓글 {comments.length}</h2>

      <ul className="comment_list">
        {comments.length === 0 ? (
          <div className="no_comments">
            <b>등록된 댓글이 없습니다.</b>
            <p>가장 먼저 댓글을 등록해 보세요!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <li key={comment.id}>
              <div className="comment_info">
                <strong>{comment.nickname}</strong> {" "} {comment.createdAt?.slice(0,10)} <br/>
                <p>{comment.content}</p>
              </div>
              <div>
                <button className="modify img" onClick={() => handleEditComment(comment.id)}>
                  <img src="../../comment_modify.png" alt="댓글 수정 이미지" />
                </button>
                <button className="delete img" onClick={() => handleDeleteComment(comment.id)}>
                  <img src="../../comment_delete.png" alt="댓글 삭제 이미지"/>
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      {editCommentId !== null && (
        <CommentEdit
          commentData={comments.find((comment) => comment.id === editCommentId)}
          onClose={() => setEditCommentId(null)}
          onEditComment={updateComment}
        />
      )}
      {deleteCommentId !== null && (
        <CommentDel
          commentData={comments.find((comment) => comment.id === deleteCommentId)}
          onClose={() => setDeleteCommentId(null)}
          onDeleteComment={deleteComment}
        />
      )}
      <div class="pagination">
        <button class="active">1</button>
        <button >2</button>
        <button >3</button>
        <button >4</button>
        <button >5</button>
      </div>
    </div>
  );
}

export default CommentSection;