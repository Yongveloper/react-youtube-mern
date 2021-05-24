import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCode } from 'react-icons/fa';
import { Card, Icon, Avatar, Col, Typography, Row } from 'antd';
import Axios from 'axios';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
  const [video, setVideo] = useState([]);

  useEffect(() => {
    Axios.get('/api/video/getVideos').then((response) => {
      if (response.data.success) {
        setVideo(response.data.videos);
      } else {
        alert('비디오 가져오기를 실패했습니다.');
      }
    });
  }, []);
  console.log(video);
  const renderCards = video.map((video, index) => {
    const minutes = Math.floor(video.duration / 60);
    const seconds = Math.floor(video.duration - minutes * 60);

    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: 'relative' }}>
          <Link to={`/video/${video._id}`}>
            <img
              style={{ width: '100%' }}
              alt="thumbnail"
              src={`http://localhost:5000/${video.thumbnail}`}
            />
            <div
              className=" duration"
              style={{
                bottom: 0,
                right: 0,
                position: 'absolute',
                margin: '4px',
                color: '#fff',
                backgroundColor: 'rgba(17, 17, 17, 0.8)',
                opacity: 0.8,
                padding: '2px 4px',
                borderRadius: '2px',
                letterSpacing: '0.5px',
                fontSize: '12px',
                fontWeight: '500',
                lineHeight: '12px',
              }}
            >
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </Link>
        </div>
        <br />
        <Meta
          avatar={<Avatar src={video.writer.image} />}
          title={video.title}
        />
        <span>{video.writer.name} </span>
        <br />
        <span style={{ marginLeft: '3rem' }}> {video.views} views</span> -{' '}
        <span> {moment(video.createdAt).format('MMM Do YY')} </span>
      </Col>
    );
  });

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <Title level={2}> Recommended </Title>
      <hr />
      <Row gutter={[32, 16]}>{renderCards}</Row>
    </div>
  );
}

export default LandingPage;
