import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const RevenueChart = ({ theme = "light" }) => {
  const data = [
    { month: 'Jan', currentWeek: 13, previousWeek: 8 },
    { month: 'Feb', currentWeek: 9, previousWeek: 17 },
    { month: 'Mar', currentWeek: 7, previousWeek: 13 },
    { month: 'Apr', currentWeek: 15, previousWeek: 10 },
    { month: 'May', currentWeek: 19, previousWeek: 12 },
    { month: 'Jun', currentWeek: 20, previousWeek: 24 }
  ];

  // Create data with null values to break the line at the transition point
  const solidLineData = data.map((item, index) => ({
    ...item,
    currentWeekSolid: index <= 3 ? item.currentWeek : null, // Jan to Apr (index 0-3)
    currentWeekDashed: index >= 3 ? item.currentWeek : null // Apr to Jun (index 3-5)
  }));

  const formatYAxisLabel = (value) => {
    if (value === 0) return '0';
    return `${value}M`;
  };

  return (
    <div style={{
      backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(247, 249, 251, 1)',
      padding: '24px',
      borderRadius: '16px',
      width: '100%',
      height: '318px',
    }}>
      {/* Header with Legend */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '16px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <h3 style={{
          fontWeight: '600',
          color: theme === 'dark' ? 'rgba(255, 255, 255, 1)' : 'rgba(28, 28, 28, 1)',
          margin: '0',
          lineHeight: '1.2'
        }}>
          Revenue
        </h3> 
        <div style={{fontSize:'14px',color:theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' :'rgba(28, 28, 28, 0.2)'}}>
            |
        </div>
        {/* Legend */}
        <div style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: theme === 'dark' ? 'rgba(198, 199, 248, 1)' :'rgba(28, 28, 28, 1)'
            }} />
            <span style={{
              fontSize: '12px',
              color: theme === 'dark' ? 'rgba(255, 255, 255, 1)' : 'rgba(28, 28, 28, 1)',
            }}>
              Current Week <span style={{ fontWeight: '600' }}>$58,211</span>
            </span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: theme === 'dark' ? 'rgba(168, 197, 218, 1)' : 'rgba(168, 197, 218, 1)'
            }} />
            <span style={{
              fontSize: '12px',
              color: theme === 'dark' ? 'rgba(255, 255, 255, 1)' : 'rgba(28, 28, 28, 1)',
            }}>
              Previous Week <span style={{ fontWeight: '600' }}>$68,768</span>
            </span>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div style={{ width: '100%', height: '232px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={solidLineData}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 20,
            }}
          >
            {/* Grid Lines */}
            <CartesianGrid 
              strokeDasharray="none"
              stroke={theme === 'dark' ? '#374151' : '#f3f4f6'}
              horizontal={true}
              vertical={false}
            />
            
            <XAxis 
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: theme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(28, 28, 28, 0.4)',
              }}
              dy={10}
            />
            
            <YAxis
              domain={[0, 30]}
              ticks={[0, 10, 20, 30]}
              tickFormatter={formatYAxisLabel}
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: theme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(28, 28, 28, 0.4)',
              }}
              dx={-20}
            />
            
            {/* Previous Week Line (Light Blue/Solid) */}
            <Line 
              type="monotone"
              dataKey="previousWeek"
              stroke= {theme === 'dark' ? 'rgba(168, 197, 218, 1)':'rgba(168, 197, 218, 1)'}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 4, fill: 'rgba(168, 197, 218, 1)' }}
            />
            
            {/* Current Week Line - Solid Part (Jan to Apr) */}
            <Line 
              type="monotone"
              dataKey="currentWeekSolid"
              stroke={theme === 'dark' ? 'rgba(198, 199, 248, 1)':'rgba(28, 28, 28, 1)'}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 4, fill: 'rgba(198, 199, 248, 1)' }}
              connectNulls={false}
            />
            
            {/* Current Week Line - Dashed Part (Apr to Jun) */}
            <Line 
              type="monotone"
              dataKey="currentWeekDashed"
              stroke={theme === 'dark' ? 'rgba(198, 199, 248, 1)':'rgba(28, 28, 28, 1)'}
              strokeWidth={3}
              strokeDasharray="8 4"
              dot={false}
              activeDot={{ r: 4, fill: 'rgba(198, 199, 248, 1)' }}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;