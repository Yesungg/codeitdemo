const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/imageController');

// POST /api/image
router.post('/', uploadImage);

module.exports = router;