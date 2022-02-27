import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { notification, Upload } from 'antd'
import React, { useState } from 'react'
import { IUploadFile } from './interface'
import './UploadFile.less'

const UploadFile: React.FC<IUploadFile> = ({ imgUrl, setImgUrl }) => {
  const [loadingImage, setLoadingImage] = useState(false)

  const uploadButton = (
    <div>
      {loadingImage ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      notification.error({ message: 'You can only upload JPG/PNG file!' })
    }

    return isJpgOrPng
  }

  const handleFileChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoadingImage(true)
      return
    }
    if (info.file.status === 'done') {
      setImgUrl(info.file.response)
      console.log(info.file.response)
      setLoadingImage(false)
    }
  }

  return (
    <>
      <Upload
        name="upload"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleFileChange}
        action={`${process.env.REACT_APP_API_URL}/s3/images`}
      >
        {imgUrl ? <img src={imgUrl} alt="thumbnail" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </>
  )
}

export default UploadFile
