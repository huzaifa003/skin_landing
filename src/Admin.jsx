import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from './DB/firebase'; // Adjust path as necessary
import { Layout, Menu, Table, Space, Button, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const AdminPanel = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const patientsRef = ref(db, 'patients');
    onValue(patientsRef, (snapshot) => {
      const data = snapshot.val();
      const formattedData = Object.keys(data).map(key => ({
        key: key,
        name: data[key].profile.name,
        age: data[key].profile.age,
        summary: data[key].profile.summary,
        reports: data[key].reports,
      }));
      setPatients(formattedData);
    });

    return () => {
      // Clean up listener when the component unmounts
    };
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Summary',
      dataIndex: 'summary',
      key: 'summary',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => viewReports(record.reports)}>View Details</Button>
        </Space>
      ),
    },
  ];

  const viewReports = (reports) => {
    // console.log(reports.patientData);
    navigate('/skin_landing/reports', { state: { patientData: reports } });
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider style={{ backgroundColor: '#001529' }}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            Patients
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: '#fff', padding: 0 }}>
          <Title level={3} style={{ margin: '16px' }}>Admin Panel</Title>
        </Header>
        <Content style={{ margin: '16px' }}>
          <Table dataSource={patients} columns={columns} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPanel;
