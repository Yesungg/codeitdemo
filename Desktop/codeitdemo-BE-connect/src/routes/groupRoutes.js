const express = require('express');
const router = express.Router();
const { createGroup, getGroups, getGroupById, updateGroup, deleteGroup, verifyGroupPassword, likeGroup, checkGroupIsPublic } = require('../controllers/groupController');

const postController = require('../controllers/postController'); // ✅ 추가

router.get('/:groupId/posts', postController.getPostsByGroup); // ✅ 이 코드가 있어야 그룹별 게시물 조회 가능

// 그룹 내 게시물 등록: POST /api/groups/:groupId/posts
router.post('/:groupId/posts', postController.createPost);

// 그룹 등록
router.post('/', createGroup);

// 그룹 목록 조회
router.get('/', getGroups);

// 그룹 상세 조회
router.get('/:groupId', getGroupById);

// 그룹 수정
router.put('/:groupId', updateGroup);

// 그룹 삭제
router.delete('/:groupId', deleteGroup);

// 그룹 조회 권한 확인
router.post('/:groupId/verify-password', verifyGroupPassword);

// 그룹 공감하기 (수정)
router.post('/:groupId/like', likeGroup);

// 그룹 공개 여부 확인
router.get('/:groupId/is-public', checkGroupIsPublic);

module.exports = router;