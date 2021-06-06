const express = require('express');
const router = express.Router();
const { Video } = require('../models/Video');
const { Subscriber } = require('../models/Subscriber');
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

router.post('/uploadVideo', (req, res) => {
  //  비디오 정보들을 저장
  const video = new Video(req.body);

  video.save((error, doc) => {
    if (error) return res.json({ success: false, error });
    res.status(200).json({ success: true });
  });
});

router.post('/getSubscriptionVideos', (req, res) => {
  //  자신의 아이디를 가지고 구독하는 사람들을 찾는다.
  Subscriber.find({
    userFrom: req.body.userFrom,
  }).exec((error, subscriberInfo) => {
    if (error) {
      return res.status(400).send(error);
    }

    const subscribedUser = subscriberInfo.map(
      (subscriber) => subscriber.userTo
    );

    // 찾은 사람들의 비디오를 가지고 온다.
    Video.find({
      writer: { $in: subscribedUser },
    })
      .populate('writer')
      .exec((error, videos) => {
        if (error) {
          return res.status(400).send(error);
        }
        res.status(200).json({ success: true, videos });
      });
  });
});

router.get('/getVideos', (req, res) => {
  //  비디오를 DB에서 가져와서 클라이언트에 보낸다.
  Video.find()
    .populate('writer')
    .exec((error, videos) => {
      if (error) return res.status(400).send(error);
      res.status(200).json({ success: true, videos });
    });
});

router.post('/getVideoDetail', (req, res) => {
  Video.findOne({ _id: req.body.videoId })
    .populate('writer')
    .exec((error, videoDetail) => {
      if (error) return res.status(400).send(error);
      return res.status(200).json({ success: true, videoDetail });
    });
});

router.post('/thumbnail', (req, res) => {
  //  썸네일 생성 하고 비디오 러닝타임 가져오기

  let filePath = '';
  let fileDuration = '';

  // 비디오 정보 가져오기
  ffmpeg.ffprobe(req.body.url, function (error, metadata) {
    console.log(metadata.format.duration);
    fileDuration = metadata.format.duration;
  });

  // 썸네일 생성
  ffmpeg(req.body.url)
    .on('filenames', function (filenames) {
      filePath = 'uploads/thumbnails/' + filenames[0];
    })
    .on('end', function () {
      return res.json({
        success: true,
        url: filePath,
        fileDuration: fileDuration,
      });
    })
    .on('error', function (error) {
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
