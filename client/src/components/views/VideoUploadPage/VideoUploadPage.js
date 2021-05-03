import React from 'react';
import { Typography, Button, Form, Message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';

const { TextArea } = Input;
const { Title } = Typography;

function VideoUploadPage() {
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
        <Input onChange value />
        <br />
        <br />
        <label>설명</label>
        <TextArea onChange value />
        <br />
        <br />
        <select>
          <option key="1" onChange></option>
        </select>
        <br />
        <br />
        <select>
          <option key="1" onChange></option>
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
