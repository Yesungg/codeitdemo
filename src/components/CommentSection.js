import React, { useState, useEffect } from 'react';
import './CommentSection.css';
import CommentEnter from './CommentEnter';
import CommentEdit from './CommentEdit';
import CommentDel from './CommentDel';

function CommentSection({ onCommentCountChange }) {
  const [comments, setComments] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 상태
  const [editCommentId, setEditCommentId] = useState(null);
  const [deleteCommentId, setDeleteCommentId] = useState(null);

  useEffect(() => {
    if (onCommentCountChange) {
      onCommentCountChange(comments.length);
    }
  }, [comments, onCommentCountChange]);

  // 새 댓글 추가 함수
  const addComment = (newComment) => {
    setComments([...comments, newComment]); // 기존 댓글 리스트에 추가
    setIsPopupOpen(false); // 팝업 닫기
  };

  // 댓글 삭제 함수
  const deleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
    setDeleteCommentId(null);
  };

  // 댓글 수정 버튼 클릭 시 실행 (팝업 열기)
  const handleEditComment = (id) => {
    setEditCommentId(id);
  };

  const handleDeleteComment = (id) => {
    setDeleteCommentId(id);
  };

  const handleEnterComment = () => {
    setIsPopupOpen(true);
  };

  // 댓글 내용 수정 후 저장
  const updateComment = (id, newComment) => {
    const updatedComments = comments.map((comment) =>
      comment.id === id ? { ...comment, comment: newComment } : comment
    );
    setComments(updatedComments);
    setEditCommentId(null);
  };

  return (
    <div class="comment_section">
      <button id="click" onClick={handleEnterComment}>댓글 등록하기</button>
      {isPopupOpen && <CommentEnter onClose={() => setIsPopupOpen(false)} onAddComment={addComment} />}
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
                <strong>{comment.nickname}</strong> {comment.date} {comment.time} <br/>
                <p>{comment.comment}</p>
              </div>
              <div>
                <button className="modify img" onClick={() => handleEditComment(comment.id)}>
                  <img src="comment_modify.png" alt="댓글 수정 이미지" />
                </button>
                <button className="delete img" onClick={() => handleDeleteComment(comment.id)}>
                  <img src="comment_delete.png" alt="댓글 삭제 이미지"/>
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