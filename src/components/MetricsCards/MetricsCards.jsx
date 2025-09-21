import React from 'react';
import { useNavigate } from 'react-router-dom';

const MetricsCards = ({ theme = "light" }) => {
  const navigate = useNavigate();

  const UpIcon = () => (
    <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M7.45488 1.60777L13 0L11.6198 5.6061L9.89804 3.9532L7.12069 6.84627C7.02641 6.94448 6.89615 7 6.76 7C6.62385 7 6.49359 6.94448 6.39931 6.84627L4.36 4.72199L1.36069 7.84627C1.16946 8.04547 0.85294 8.05193 0.653735 7.86069C0.454529 7.66946 0.44807 7.35294 0.639307 7.15373L3.99931 3.65373C4.09359 3.55552 4.22385 3.5 4.36 3.5C4.49615 3.5 4.62641 3.55552 4.72069 3.65373L6.76 5.77801L9.17665 3.26067L7.45488 1.60777Z" fill="currentColor"/>
    </svg>
  );

  const DownIcon = () => (
    <svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12.3463 0.639307C12.5455 0.830544 12.5519 1.14706 12.3607 1.34627L9.00069 4.84627C8.90641 4.94448 8.77615 5 8.64 5C8.50385 5 8.37359 4.94448 8.27931 4.84627L6.24 2.72199L3.82335 5.23933L5.54513 6.89223L0 8.5L1.38019 2.8939L3.10197 4.5468L5.87931 1.65373C5.97359 1.55552 6.10385 1.5 6.24 1.5C6.37615 1.5 6.50641 1.55552 6.60069 1.65373L8.64 3.77801L11.6393 0.653735C11.8305 0.454529 12.1471 0.44807 12.3463 0.639307Z" fill="currentColor"/>
    </svg>
  );
  
  const metrics = [
    { id: 1, title: "Customers", value: "3,781", change: "+11.01%", isPositive: true, bgColor: "rgba(227, 245, 255, 1)", clickable: false },
    { id: 2, title: "Orders", value: "1,219", change: "-0.03%", isPositive: false, bgColor: theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(247, 249, 251, 1)", clickable: true, path: "/orders" },
    { id: 3, title: "Revenue", value: "$695", change: "+15.03%", isPositive: true, bgColor: theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(247, 249, 251, 1)", clickable: false },
    { id: 4, title: "Growth", value: "30.1%", change: "+6.08%", isPositive: true, bgColor: "rgba(229, 236, 246, 1)", clickable: false }
  ];

  const handleCardClick = (metric) => {
    if (metric.clickable && metric.path) {
      navigate(metric.path);
    }
  };

  // Helper to determine text color
  const getTextColor = (metricId) => theme === "light" || metricId === 1 || metricId === 4
    ? 'rgba(28, 28, 28, 1)'
    : 'rgba(255, 255, 255, 1)';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '28px' }}>
      {metrics.map((metric) => (
        <div
          key={metric.id}
          style={{
            backgroundColor: metric.bgColor,
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            cursor: metric.clickable ? 'pointer' : 'default'
          }}
          onMouseEnter={(e) => {
            if (metric.clickable) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            }
          }}
          onMouseLeave={(e) => {
            if (metric.clickable) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }
          }}
          onClick={() => handleCardClick(metric)}
        >
          {/* Title */}
          <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '500', color: getTextColor(metric.id), lineHeight: '1.2' }}>
            {metric.title}
          </h3>

          {/* Value and Change */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 'auto' }}>
            <div style={{ fontSize: '36px', fontWeight: '700', color: getTextColor(metric.id), lineHeight: '1', letterSpacing: '-0.025em' }}>
              {metric.value}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: '500', color: getTextColor(metric.id), marginBottom: '4px' }}>
              <span>{metric.change}</span>
              {metric.isPositive ? <UpIcon /> : <DownIcon />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;
