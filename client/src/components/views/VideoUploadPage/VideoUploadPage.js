import React, { useState } from 'react';
import axios from 'axios';
import { Typography, Button, Form, Message, Input, Icon, message } from 'antd';
import Dropzone from 'react-dropzone';
import { useSelector } from 'react-redux';

const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
  { value: 0, label: '비공개' },
  { value: 1, label: '공개' },
];

const CategoryOptions = [
  { value: 0, label: '영화 및 애니메이션' },
  { value: 1, label: '자동차 및 차량' },
  { value: 2, label: '음악' },
  { value: 3, label: '애완동물 및 동물' },
];

function VideoUploadPage({ history }) {
  const user = useSelector((state) => state.user);
  const [videoTitle, setVideoTitle] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState(0);
  const [category, setCategory] = useState('애완동물 및 동물');
  const [filePath, setFilePath] = useState('');
  const [duration, setDuration] = useState('');
  const [thumbnailPath, setThumbnailPath] = useState('');

  const onTitleChange = (event) => {
    const {
      target: { value },
    } = event;
    setVideoTitle(value);
  };

  const onDiscriptionChange = (event) => {
    const {
      target: { value },
    } = event;
    setDescription(value);
  };

  const onPrivateChange = (event) => {
    const {
      target: { value },
    } = event;
    setPrivacy(value);
  };

  const onCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    setCategory(value);
  };

  const onDrop = (file) => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', file[0]);
    axios.post('/api/video/uploadfiles', formData, config).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        let variable = {
          url: response.data.url,
          filename: response.data.fileName,
        };
        setFilePath(response.data.url);
        axios.post('/api/video/thumbnail', variable).then((response) => {
          if (response.data.success) {
            setDuration(response.data.duration);
            setThumbnailPath(response.data.url);
          } else {
            alert('미리보기 이미지 생성에 실패했습니다.');
          }
        });
      } else {
        alert('비디오 업로드를 실패했습니다.');
      }
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const variables = {
      writer: user.userData._id,
      title: videoTitle,
      description: description,
      privacy: privacy,
      filePath: filePath,
      category: category,
      duration: duration,
      thumbnail: thumbnailPath,
    };

    axios.post('/api/video/uploadVideo', variables).then((response) => {
      if (response.data.success) {
        message.success('성공적으로 업로드를 했습니다.');
        setTimeout(() => {
          history.push('/');
        }, 3000);
      } else {
        alert('비디오 업로드를 실패했습니다.');
      }
    });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Upload Video</Title>
      </div>
      <Form onSubmit={onSubmit}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Drop zone */}
          <Dropzone onDrop={onDrop} multiple={false} maxSize={10000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: '300px',
                  height: '240px',
                  border: '1px solid lightgray',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Icon type="plus" style={{ fontSize: '3rem' }} />
              </div>
            )}
          </Dropzone>
          {/* Thumbnail */}
          {thumbnailPath && (
            <div>
              <img
                src={`http://localhost:5000/${thumbnailPath}`}
                alt="thumbnail"
              />
            </div>
          )}
        </div>
        <br />
        <br />
        <label>제목</label>
        <Input onChange={onTitleChange} value={videoTitle} />
        <br />
        <br />
        <label>설명</label>
        <TextArea onChange={onDiscriptionChange} value={description} />
        <br />
        <br />
        <select onChange={onPrivateChange}>
          {PrivateOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <select onChange={onCategoryChange}>
          {CategoryOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="primary" size="large" onClick={onSubmit}>
          업로드
        </Button>
      </Form>
    </div>
  );
}

export default VideoUploadPage;
