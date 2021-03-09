import React, { useEffect, useState } from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import styles from './upload.module.scss';

function UploadComponent({ listType, showUploadList, limit, isSubmit, handleChangeImage, children }: any) {
  const [fileListCom, setFileListCom] = useState<any>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const [previewTitle, setPreviewTitle] = useState();

  useEffect(() => {
    if (isSubmit || !isSubmit) {
      setFileListCom([]);
    }
    return () => {};
  }, [isSubmit])

  function getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  function handleCancel() {
    setPreviewVisible(false);
  }

  async function handlePreview(file: any) {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    setPreviewImage(file.url || file.preview);
  };

  async function handleChange({ file, fileList }: any) {
    if (file.status === 'removed') {
      setFileListCom(fileList);
      handleChangeImage('', '');
    } else {
      const fileTemp = fileList.find((f: any) => f.uid === file.uid);
      if (fileTemp) {
        fileTemp.status = 'done';
        setFileListCom(fileList);
      }
    }
  }

  async function handleRequest({ file }: any) {
    const result = await getBase64(file);
    const type = file.type.split('/')[1];
    handleChangeImage(result, type);
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <React.Fragment>
      <Upload
        customRequest={handleRequest}
        listType={listType}
        showUploadList={showUploadList}
        fileList={fileListCom}
        onPreview={handlePreview}
        onChange={handleChange}
        className={styles.app_upload}
      >
        {
          listType !== 'text' 
          ? !limit || limit < 0 || (fileListCom && fileListCom.length < limit) ? uploadButton : null
          : children
        }

      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </React.Fragment>
  )
}

export default UploadComponent;