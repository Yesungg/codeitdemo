const express = require('express');
const router = express.Router();
const { createGroup, getGroups, getGroupById, updateGroup, deleteGroup, verifyPassword, likeGroup, getPublicStatus } = require('../controllers/groupController');

// 그룹 등록
router.post('/api/groups', createGroup);

// 그룹 목록 조회
router.get('/api/groups', getGroups);

// 그룹 상세 조회
router.get('/api/groups/:groupId', getGroupById);

// 그룹 수정
router.put('/api/groups/:groupId', updateGroup);

// 그룹 삭제
router.delete('/api/groups/:groupId', deleteGroup);

// 그룹 조회 권한 확인
router.post('/api/groups/:groupId/verify-password', verifyPassword);

// 그룹 공감하기
router.post('/api/groups/:groupId/like', likeGroup);

// 그룹 공개 여부 확인
router.get('/api/groups/:groupId/is-public', getPublicStatus);

module.exports = router;