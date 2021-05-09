const express = require('express');
const router = express.Router();
// const { Video } = require('../models/Video');
const { auth } = require('../middleware/auth');
const path = require('path');
const multer = require('multer');
let ffmpeg = require('fluent-ffmpeg');

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

router.post('/thumbnail', (req, res) => {
  //  썸네일 생성 하고 비디오 러닝타임 가져오기

  let filePath = '';
  let fileDuration = '';

  // 비디오 정보 가져오기
  ffmpeg.ffprobe(req.body.url, function (error, metadata) {
    console.log(metadata);
    console.log(metadata.format.duration);
    fileDuration = metadata.format.duration;
  });

  // 썸네일 생성
  ffmpeg(req.body.url)
    .on('fileName', function (fileNames) {
      console.log(`Will generate ${fileNames.join(', ')}`);
      console.log(fileNames);
      filePath = `uploads/thumbnails/${fileNames[0]}`;
    })
    .on('end', function () {
      console.log('Screenshots taken');
      return res.json({ success: true, url: filePath, fileDuration });
    })
    .on('error', function (error) {
      console.error(error);
      return res.json({ success: false, error });
    })
    .screenshots({
      count: 3,
      folder: 'uploads/thumbnails',
      size: '320x240',
      filename: 'thumbnail-%b.png',
    });
});

module.exports = router;
