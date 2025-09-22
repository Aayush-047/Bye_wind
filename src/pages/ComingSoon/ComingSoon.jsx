import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const ComingSoon = ({ theme }) => {
  const navigate = useNavigate();
  
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '60vh',
      backgroundColor: theme === 'dark' ? 'rgba(28,28,28,1)' : '#ffffff'
    }}>
      <Result
        status="404"
        title="Coming Soon"
        subTitle="This page is under development. Please check back later."
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default ComingSoon;
