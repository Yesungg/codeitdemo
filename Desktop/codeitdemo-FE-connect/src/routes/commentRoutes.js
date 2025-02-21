const express = require("express");
const {
    createComment,
    getComments,
    updateComment,
    deleteComment,
} = require("../controllers/commentController");

const router = express.Router();

router.post("/posts/:postId/comments", createComment); // 댓글 등록
router.get("/posts/:postId/comments", getComments); // 댓글 목록 조회
router.put("/comments/:commentId", updateComment); // 댓글 수정
router.delete("/comments/:commentId", deleteComment); // 댓글 삭제

module.exports = router;


/*
const express = require('express');
const router = express.Router();
const { createComment, getComments,updateComment, deleteComment } = require('../controllers/commentController');

// POST /api/posts/:postId/comments - 댓글 등록
router.post('/:postId/comments', createComment);

// GET /api/posts/:postId/comments - 댓글 목록 조회
router.get('/:postId/comments', getComments);

// PUT /api/comments/:commentId - 댓글 수정
router.put('/:commentId', updateComment);

// DELETE /api/comments/:commentId - 댓글 삭제
router.delete('/:commentId', deleteComment);

module.exports = router;*/