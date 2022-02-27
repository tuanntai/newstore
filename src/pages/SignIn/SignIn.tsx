import { Typography, Form, Input, Button, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SignIn.less'
import { ILoginForm } from './interface'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { authLogin } from '../../redux/actions/auth/auth'
import { authSelectors, resetProgress } from '../../redux/reducer/authReducer'

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { Title } = Typography
  const [form] = Form.useForm<ILoginForm>()
  const accessToken = useAppSelector(authSelectors.accessTokenSelector)
  const message = useAppSelector(authSelectors.authMessageSelector)
  const [loadingProgress, setLoadingProgress] = useState(false)
  const [fields, setFields] = useState([
    { name: 'username', value: '' },
    { name: 'password', value: '' }
  ])

  useEffect(() => {
    if (accessToken) {
      navigate('/')
    }
  }, [accessToken, navigate])

  useEffect(() => {
    if (message) {
      notification.error({ message: message })
      setLoadingProgress(false)
      dispatch(resetProgress())
    }
  }, [message, dispatch])

  const handleLogin = () => {
    setLoadingProgress(true)
    form.validateFields().then((values) => {
      dispatch(
        authLogin({
          username: values.username,
          password: values.password
        })
      )
    })
  }

  return (
    <div className="wrapper">
      <div className="login-container">
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 17 }}
          form={form}
          fields={fields}
          onFinish={handleLogin}
        >
          <Title className="title">Login</Title>
          <Form.Item name="username" label="username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input type="password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="submit" loading={loadingProgress}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default SignIn
