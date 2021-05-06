const express = require('express');
const router = express.Router();
// const { Video } = require('../models/Video');
const { auth } = require('../middleware/auth');
const path = require('path');
const multer = require('multer');

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.mp4') {
      return cb(
        res.status(400).end('오직 mp4 파일만 사용할 수 있습니다.'),
        false
      );
    }
    cb(null, true);
  },
});

const upload = multer({ storage }).single('file');

//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {
  // 비디오를 서버에 저장
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

module.exports = router;
