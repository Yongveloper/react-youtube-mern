import React, { useState } from 'react';
import { Typography, Button, Form, Message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';

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

function VideoUploadPage() {
  const [videoTitle, setVideoTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoPrivate, setVideoPrivate] = useState(0);
  const [category, setCategory] = useState('애완동물 및 동물');

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
    setVideoPrivate(value);
  };

  const onCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(value);
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Upload Video</Title>
      </div>
      <Form onSubmit>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Drop zone */}
          <Dropzone onDrop multiple maxSize>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: '300px',
                  height: '240px',
                  border: '1px solid lightgray',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Icon type="plus" style={{ fontSize: '3rem' }} />
              </div>
            )}
          </Dropzone>

          {/* Thumbnail */}
          <div>
            <img src alt />
          </div>
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
        <Button type="primary" size="large" onClick>
          업로드
        </Button>
      </Form>
    </div>
  );
}

export default VideoUploadPage;
