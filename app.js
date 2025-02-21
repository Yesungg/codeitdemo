const express = require('express');
const path = require("path");
const cors = require('cors'); // CORS 미들웨어 추가
const app = express();

// 📌 'uploads' 폴더를 정적 파일로 제공하도록 설정
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// JSON 형식의 요청을 파싱
app.use(express.json());

// CORS 미들웨어 적용
app.use(cors()); // 모든 도메인에서의 요청을 허용

// 정적 파일 제공 (예: public 폴더 내 파일들을 제공)
app.use(express.static('public'));

// 라우터 파일들 임포트
const groupRoutes = require('./src/routes/groupRoutes');     // 그룹 관련 API (경로는 내부에서 '/','/:groupId', '/:groupId/like' 등으로 정의됨)
const postRoutes = require('./src/routes/postRoutes');       // 게시물 관련 API (내부에서 '/groups/:groupId/posts'와 '/posts/:postId' 등으로 정의됨)
const commentRoutes = require('./src/routes/commentRoutes'); // 댓글 관련 API
const imageRoutes = require('./src/routes/imageRoutes');     // 이미지 업로드 API
const badgeRoutes = require('./src/routes/badgeRoutes');     // 뱃지 관련 API

// 라우터 등록  
// 그룹 관련 라우터는 그룹 API 명세에 따라 '/api/groups' 아래에 있어야 합니다.
app.use('/api/groups', groupRoutes);
// 게시물 관련 라우터는 내부에서 '/groups/:groupId/posts'와 '/posts/:postId'로 정의했으므로,  
// 전체 경로를 '/api' 아래에 마운트합니다.
app.use('/api/groups', postRoutes);
// 댓글 관련 라우터는 '/posts/:postId/comments' 또는 '/comments/:commentId'로 정의되어 있으므로,  
// '/api' 아래에 마운트합니다.
app.use('/api', commentRoutes);
// 이미지 업로드 라우터는 '/api/image'로 정의되어 있습니다.
app.use('/api/image', imageRoutes);
// 뱃지 관련 라우터는 내부에서 '/groups/:groupId/badges'로 정의되어 있으므로,  
// '/api' 아래에 마운트합니다.
app.use('/api', badgeRoutes);

// 기본 엔드포인트 (테스트용)
app.get('/', (req, res) => {
  res.send('조각집 백엔드 API 서버입니다!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
