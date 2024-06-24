import React from 'react';
import { Typography, Space, Table, Tag, Button } from 'antd';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLocation } from 'react-router-dom';

const { Title } = Typography;

const UserReports = () => {
  const location = useLocation();
  const patientData = location.state?.patientData || {};
  console.log(patientData);

  // Extract report data from patientData for table display
  const reportEntries = Object.entries(patientData).map(([key, value]) => ({
    key: key,
    name: value.description || 'No description', // Assuming description gives report name
    status: value.status,
    date: new Date(parseInt(key)).toLocaleDateString(), // Assuming key is a timestamp
    actions: value,
    pdf: value.pdf, // Assuming there's a direct link to the PDF
  }));

  // Data for chart (simplified example)
  const healthData = reportEntries.map(entry => ({
    period: new Date(parseInt(entry.key)).toLocaleString('default', { month: 'long' }),
    approvals: entry.status === 'approved' ? 1 : 0,
    rejections: entry.status !== 'approved' ? 1 : 0,
  }));

  const columns = [
    { title: 'Report Name', dataIndex: 'name', key: 'name' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: status => <Tag color={status === 'approved' ? 'green' : 'red'}>{status}</Tag> },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    {
      title: 'Action', key: 'action', render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => window.open(record.pdf, '_blank')}>View</Button>
          <Button type="ghost" onClick={() => {
            const link = document.createElement('a');
            link.href = record.pdf;
            link.download = 'Report.pdf';  // Optional: You can set filename dynamically
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
          }}>Download</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Patient Reports</Title>
      <Table columns={columns} dataSource={reportEntries} pagination={false} style={{ marginBottom: '24px' }} />
      
      <Title level={2}>Monthly Report Statistics</Title>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={healthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="approvals" stroke="#82ca9d" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="rejections" stroke="#FF6347" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserReports;
