import React, { useEffect, useState } from 'react';
import { Row, Col, List, Avatar } from 'antd';
import Axios from 'axios';

const VideoDetailPage = ({ match }) => {
  const {
    params: { videoId },
  } = match;
  const variable = { videoId };

  const [videoDetail, setVideoDetail] = useState([]);

  useEffect(() => {
    Axios.post('/api/video/getVideoDetail', variable).then((response) => {
      if (response.data.success) {
        setVideoDetail(response.data.videoDetail);
      } else {
        alert('비디오 정보를 가져오기에 실패했습니다.');
      }
    });
  }, []);

  if (!videoDetail.writer) return <div>...Loading</div>;

  return (
    <Row gutter={[16, 16]}>
      <Col lg={18} xs={24}></Col>
      <div style={{ width: '100%', padding: '3rem 4rem' }}>
        <video
          style={{ width: '100%' }}
          src={`http://localhost:5000/${videoDetail.filePath}`}
          controls
        />
        <List.Item actions>
          <List.Item.Meta
            avatar={<Avatar src={videoDetail.writer.image} />}
            title={videoDetail.writer.name}
            description={videoDetail.description}
          />
        </List.Item>
        {/* Comments */}
      </div>
      <Col lg={6} xs={24}>
        Side Video
      </Col>
    </Row>
  );
};

export default VideoDetailPage;
