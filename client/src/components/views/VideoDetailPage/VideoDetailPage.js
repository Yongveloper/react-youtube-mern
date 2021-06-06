import React, { useEffect, useState } from 'react';
import { Row, Col, List, Avatar } from 'antd';
import Axios from 'axios';
import SdieVideo from './Sections/SdieVideo';
import Subscribe from './Sections/Subscribe';

const VideoDetailPage = ({ match }) => {
  const {
    params: { videoId },
  } = match;

  const variable = { videoId };

  const [videoDetail, setVideoDetail] = useState([]);

  useEffect(() => {
    if (videoDetail) {
      setVideoDetail([]);
    }

    Axios.post('/api/video/getVideoDetail', variable).then((response) => {
      if (response.data.success) {
        setVideoDetail(response.data.videoDetail);
      } else {
        alert('비디오 정보를 가져오기에 실패했습니다.');
      }
    });
  }, [videoId]);

  if (!videoDetail.writer)
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '30px',
          fontWeight: 'bold',
        }}
      >
        ...Loading
      </div>
    );

  return (
    <Row gutter={[16, 16]}>
      <Col lg={18} xs={24}>
        <div style={{ width: '100%', padding: '3rem 4rem' }}>
          <video
            style={{ width: '100%' }}
            src={`http://localhost:5000/${videoDetail.filePath}`}
            controls
          />
          <List.Item
            actions={[
              <Subscribe
                userTo={videoDetail.writer}
                userFrom={localStorage.getItem('userId')}
              />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={videoDetail.writer.image} />}
              title={videoDetail.writer.name}
              description={videoDetail.description}
            />
          </List.Item>
          {/* Comments */}
        </div>
      </Col>
      <Col lg={6} xs={24}>
        <SdieVideo />
      </Col>
    </Row>
  );
};

export default VideoDetailPage;
