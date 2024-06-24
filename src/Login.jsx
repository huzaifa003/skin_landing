import React from 'react';
import { Form, Input, Button, Typography, Card } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ModeContext from './context/ModeContext';
import backgroundImg from '../src/assets/backgroundMedical.jpg';

const { Title } = Typography;

function Login() {
  const { mode } = React.useContext(ModeContext);
  const navigate = useNavigate();

  const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '120vh',
    position: 'fixed',
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: 'repeat',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0,
  };

  const cardStyle = {
    maxWidth: '400px',
    width: '100%',
    backgroundColor: mode === 'dark' ? 'rgba(30, 30, 30, 0.7)' : 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    color: mode === 'dark' ? 'white' : 'black',
    padding: '30px',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  };

  const handleLogin = (values) => {
    const { email, password } = values;
    if (email === 'admin@admin.com' && password === 'admin') {
      navigate('/skin_landing/admin');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={pageStyle}>
      <Card style={cardStyle} bordered={false}>
        <Title level={2} style={{ textAlign: 'center' }}>
          Login
        </Title>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input
              prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
              type="email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
