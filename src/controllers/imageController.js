const multer = require('multer');
const path = require('path');

// 파일 크기 제한 (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// 허용할 파일 확장자 목록
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif'];

// 파일 저장 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../uploads')); // 업로드 폴더
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

// 파일 필터링 함수 (허용된 확장자만 업로드)
const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
        return cb(new Error(`허용되지 않는 파일 형식입니다: ${ext}`), false);
    }
    cb(null, true);
};

// 업로드 미들웨어 설정
const upload = multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE },  // 파일 크기 제한
    fileFilter
}).single('image'); // 'image'는 폼 데이터의 필드 이름

// 이미지 업로드 핸들러
const uploadImage = (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // multer 관련 에러 처리
            return res.status(400).json({ message: `업로드 실패: ${err.message}` });
        } else if (err) {
            // 기타 에러 처리
            return res.status(500).json({ message: `서버 오류: ${err.message}` });
        }

        if (!req.file) {
            return res.status(400).json({ message: '이미지가 업로드되지 않았습니다.' });
        }

        // 이미지 URL 생성
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        res.status(200).json({ imageUrl });
    });
};

module.exports = {
    uploadImage,
};