import { Typography, Form, Input, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SignIn.less'
import { ILoginForm } from './interface'
import { getAccessToken, setAccessToken } from '../../utils/localStorageService'
import { useAppDispatch } from '../../redux/hook'
import { authLogin } from '../../redux/actions/auth/auth'

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { Title } = Typography
  const [form] = Form.useForm<ILoginForm>()
  const accessToken = getAccessToken()
  const [fields, setFields] = useState([
    { name: 'email', value: '' },
    { name: 'password', value: '' }
  ])

  useEffect(() => {
    if (accessToken) {
      navigate('/')
    }
  }, [accessToken, navigate])

  const handleLogin = () => {
    form.validateFields().then((values) => {
      dispatch(
        authLogin({
          email: values.email,
          password: values.password
        })
      )
      setFields([
        { name: 'email', value: '' },
        { name: 'password', value: '' }
      ])
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
          <Form.Item name="email" label="email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input type="password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default SignIn
