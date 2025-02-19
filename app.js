const express = require("express");
const path = require("path");
const cors = require("cors"); // CORS 미들웨어 추가
const app = express();

const groupRoutes = require("./src/routes/groupRoutes");

// CORS 미들웨어 적용
app.use(cors()); // 모든 도메인에서의 요청을 허용

// JSON 형식의 요청을 파싱
app.use(express.json());

app.use("/api/groups", groupRoutes); // 그룹 관련 라우트 연결
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });  