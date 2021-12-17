import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import { Button, Form, Input, notification } from 'antd'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import '../CreateTerm/CreateTermPolicy.less'
import 'react-quill/dist/quill.snow.css'
import { useNavigate } from 'react-router-dom'
import Editor from '../../component/Editor/Editor'
import { ETermPolicyStatus } from '../../api/termPolicy/interface'
import {
  resetTermPolicyProgress,
  termPolicySelector
} from '../../redux/reducer/termPolicy/termPolicyReduces'
import { editPolicy, editTerm } from '../../redux/actions/termPolicy/termPolicy'

const EditTermPolicy: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [showModal, setShowModal] = useState(false)
  const [contentText, setContentText] = useState('')
  const progress = useAppSelector(termPolicySelector.termPolicyProgressSelector)
  const errorMessage = useAppSelector(termPolicySelector.termPolicyErrorSelector)
  const termInfo = useAppSelector(termPolicySelector.editInfoSelector)
  const [termFields, setTermFields] = useState([{ name: 'title', value: '' }])

  useEffect(() => {
    dispatch(setCurrentPage('Edit Term Policy'))
    dispatch(resetTermPolicyProgress())
  }, [])

  useEffect(() => {
    if (termInfo) {
      setContentText(termInfo.content)
      setTermFields([{ name: 'title', value: termInfo.title }])
    }
  }, [termInfo])
  useEffect(() => {
    if (progress === false && errorMessage) {
      notification.error({
        message: errorMessage,
        placement: 'topRight'
      })
    } else if (progress) {
      navigate(-1)
    }
  }, [progress, errorMessage, dispatch])

  const handleSubmit = () => {
    setShowModal(!showModal)
    form.validateFields().then((value) => {
      const createParam = {
        title: value.title,
        content: contentText
      }
      if (termInfo.type === ETermPolicyStatus.POLICY) {  
        dispatch(
          editPolicy({
            id: termInfo.id,
            editedData: createParam
          })
        )
      } else {
        dispatch(
          editTerm({
            id: termInfo.id,
            editedData: createParam
          })
        )}
      setTermFields([{ name: 'title', value: '' }])
      setContentText('')
    })
  }

  const handleCancel = () => {
    setShowModal(!showModal)
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 2 }}
      form={form}
      fields={termFields}
      onFinish={handleSubmit}
    >
      <div className="create-wrapper">
        <div className="left">
          <Form.Item name="title" label="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="content">
            <Editor contentText={contentText} setContentText={setContentText} />
          </Form.Item>
        </div>
        <div className="right">
          <div className="button-container">
            <Button
              type="primary"
              className="submit-button"
              onClick={() => setShowModal(!showModal)}
            >
              Submit
            </Button>
          </div>
          <Modal
            title="Edit"
            visible={showModal}
            onOk={handleSubmit}
            onCancel={handleCancel}
            cancelText="Cancel"
            okText="Submit"
          >
            Are you sure ?
          </Modal>
        </div>
      </div>
    </Form>
  )
}

export default EditTermPolicy
