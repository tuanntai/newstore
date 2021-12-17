import { Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import { Button, Typography, Form, Input, notification } from 'antd'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import './CreateTermPolicy.less'
import Editor from '../../component/Editor/Editor'
import { resetTermPolicyProgress, termPolicySelector } from '../../redux/reducer/termPolicy/termPolicyReduces'
import { ETermPolicyStatus } from '../../api/termPolicy/interface'
import { postPolicy, postTerm } from '../../redux/actions/termPolicy/termPolicy'

const CreateTermPolicy: React.FC = () => {
  const { Option } = Select
  const dispatch = useAppDispatch()
  const [showModal, setShowModal] = useState(false)
  const [postStatus, setPostStatus] = useState<ETermPolicyStatus>(ETermPolicyStatus.TERM)
  const errorMessage = useAppSelector(termPolicySelector.termPolicyErrorSelector)
  const progress = useAppSelector(termPolicySelector.termPolicyProgressSelector)
  const [form] = Form.useForm()
  const [contentText, setContentText] = useState('')
  const [termFields, setTermFields] = useState([
    { name: 'title', value: '' },
  ])

  useEffect(() => {
    dispatch(setCurrentPage('Create Term Policy'))
    dispatch(resetTermPolicyProgress())
  }, [dispatch])

  useEffect(() => {
    if (progress === false && errorMessage) {
      notification.error({
        message: errorMessage,
        placement: 'topRight'
      })
    } else if (progress)
      notification.success({
        message: `Successfully`,
        placement: 'topRight'
      })
    dispatch(resetTermPolicyProgress())
  }, [progress, errorMessage, dispatch])

  const handleSubmit = () => {
    setShowModal(!showModal)
    form.validateFields().then((value) => {
      const createParam = {
        id: value.id,
        title: value.title,
        content: contentText,
      }
      if(postStatus === ETermPolicyStatus.POLICY){
        dispatch(postPolicy(createParam))
      } else if (postStatus === ETermPolicyStatus.TERM)
      dispatch(postTerm(createParam))
      setTermFields([
        { name: 'title', value: '' }
      ])
      setContentText('')
    })
  }

  const handleCancel = () => {
    setShowModal(!showModal)
  }

  const handleChangeType = (value: ETermPolicyStatus) => {
    setPostStatus(value)
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
          <div className="select-container">
            <Typography>Select Type:</Typography>
            <Select
              defaultValue={ETermPolicyStatus.TERM}
              style={{ width: 120 }}
              onChange={handleChangeType}
            >
              <Option value={ETermPolicyStatus.TERM}>Term</Option>
              <Option value={ETermPolicyStatus.POLICY}>Policy</Option>
            </Select>
          </div>
          <div className="button-container">
            <Button
              type="primary"
              className="submit-button"
              onClick={() => setShowModal(!showModal)}
            >
              {postStatus === ETermPolicyStatus.POLICY ? 'Save Policy' : 'Submit'}
            </Button>
          </div>
          <Modal
            title={postStatus === ETermPolicyStatus.POLICY ? 'Save Policy' : 'Publish Term'}
            visible={showModal}
            onOk={handleSubmit}
            onCancel={handleCancel}
            cancelText="Cancel"
            okText={postStatus === ETermPolicyStatus.POLICY ? 'Save' : 'Submit'}
          >
            Are you sure ?
          </Modal>
          <Modal>
            
          </Modal>
        </div>
      </div>
    </Form>
  )
}

export default CreateTermPolicy
