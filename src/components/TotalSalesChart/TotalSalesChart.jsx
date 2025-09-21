import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const TotalSalesChart = ({ theme = "light" }) => {
  const data = [
    {
      name: 'Direct',
      value: 300.56,
      percentage: 38.6,
      color: theme === 'dark' ? 'rgba(198, 199, 248, 1)' :'rgba(28, 28, 28, 1)'
    },
    {
      name: 'Sponsored',
      value: 154.02,
      percentage: 19.8,
      color: theme === 'dark' ? 'rgba(186, 237, 189, 1)' : 'rgba(149, 164, 252, 1)'
    },
    {
      name: 'E-mail',
      value: 48.96,
      percentage: 6.3,
      color: theme === 'dark' ? 'rgba(149, 164, 252, 1)' : 'rgba(177, 227, 255, 1)'
    },
    {
      name: 'Affiliite',
      value: 135.18,
      percentage: 17.4,
      color: theme === 'dark' ? 'rgba(177, 227, 255, 1)' : 'rgba(186, 237, 189, 1)'
    },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const largestSegment = data.reduce((max, item) => item.percentage > max.percentage ? item : max);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { percentage } = payload[0].payload;
      return (
        <div style={{
            backgroundColor: theme === 'dark' ? '#374151' : 'rgba(28, 28, 28, 0.8)',
            color: '#ffffff',
            padding: '6px 10px', 
            borderRadius: '16px', 
            fontSize: '12px', 
            fontWeight: '600',
          }}>
            {percentage}%
          </div>
      );
    }
    return null;
  };

  return (
    <div style={{
      backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(247, 249, 251, 1)',
      padding: '24px',
      borderRadius: '16px',
      width: '100%',
      height: 'auto',
      gap:'16px'
    }}>
      {/* Header */}
      <h2 style={{
        fontWeight: '600',
        color: theme === 'dark' ? 'rgba(255, 255, 255, 1)' : 'rgba(28, 28, 28, 1)',
        margin: '0 0 16px 0',
        lineHeight: '1.2'
      }}>
        Total Sales
      </h2>

      {/* Chart Container */}
      <div style={{ 
        display: 'flex', 
        justifyContent:'center',
        marginBottom: '16px',
        position: 'relative'
      }}>
        <div style={{ 
          position: 'relative', 
          width: '130px', 
          height: '130px' 
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                startAngle={-120}
                endAngle={450}
                paddingAngle={2}
                dataKey="percentage"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                content={<CustomTooltip />}
                allowEscapeViewBox={{ x: true, y: true }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '16px' 
      }}>
        {data.map((item, index) => (
          <div 
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: item.color,
                flexShrink: 0
              }} />
              <span style={{
                fontSize: '14px',
                color:theme==='dark'?'rgba(255, 255, 255, 1)':'inherit'
              }}>
                {item.name}
              </span>
            </div>
            <span style={{
              fontSize: '12px',
              color:theme==='dark'?'rgba(255, 255, 255, 1)':'inherit'
            }}>
              ${item.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalSalesChart;