import { Typography, Form, Input, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SignIn.less'
import { ILoginForm } from './interface'
import { toast } from 'react-toastify'
import { getAccessToken, setAccessToken } from '../../utils/localStorageService'

const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const { Title } = Typography
  const [form] = Form.useForm<ILoginForm>()
  const accessToken = getAccessToken()
  const [fields, setFields] = useState([
    { name: 'username', value: '' },
    { name: 'password', value: '' }
  ])

  useEffect(() => {
    if (accessToken) {
      navigate('/')
    }
  }, [accessToken, navigate])

  const handleLogin = () => {
    form.validateFields().then((values) => {
      if (values.username === 'admindev' && values.password === '123qwe') {
        setAccessToken('accessToken')
        navigate('/')
      } else {
        toast.error('Wrong Name or Password!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
        setFields([
          { name: 'username', value: '' },
          { name: 'password', value: '' }
        ])
      }
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
          <Form.Item name="username" label="Username" rules={[{ required: true }]}>
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
