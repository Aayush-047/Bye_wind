import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

const ProjectionsChart = ({ theme = "light" }) => {
  const data = [
    {
      month: 'Jan',
      actuals: 16,
      projections: 4,
      total: 20
    },
    {
      month: 'Feb', 
      actuals: 24,
      projections: 2,
      total: 26
    },
    {
      month: 'Mar',
      actuals: 18,
      projections: 4,
      total: 22
    },
    {
      month: 'Apr',
      actuals: 22,
      projections: 6,
      total: 28
    },
    {
      month: 'May',
      actuals: 15,
      projections: 3,
      total: 18
    },
    {
      month: 'Jun',
      actuals: 25,
      projections: 2,
      total: 27
    }
  ];

  const formatYAxisLabel = (value) => {
    if (value === 0) return '0';
    return `${value}M`;
  };

  return (
    <div style={{
      backgroundColor: theme === 'dark' ? '#1f2937' : 'rgba(247, 249, 251, 1)',
      padding: '24px',
      borderRadius: '16px',
      border: theme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb',
      width: '100%',
      height: '257px',
      gap: '16px',
    }}>
      {/* Header */}
      <h2 style={{
        fontWeight: '600',
        color: theme === 'dark' ? '#ffffff' : '#1f2937',
        margin: '0 0 24px 0',
        lineHeight: '20px'
      }}>
        Projections vs Actuals
      </h2>

      {/* Chart Container */}
      <div style={{ width: '100%', height: '180px' }}>
        <ResponsiveContainer width="100%" height="100%" >
          <BarChart
            data={data}
             margin={{
                top: 10, 
                right: 10,
                left: 0,   
                bottom: 10,
              }}
            barCategoryGap="30%"
          >
            {/* Grid Lines */}
            <CartesianGrid 
              strokeDasharray="none"
              stroke={theme === 'dark' ? '#374151' : 'rgba(28, 28, 28, 0.05)'}
              horizontal={true}
              vertical={false}
            />
            
            <XAxis 
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 14,
                fill: theme === 'dark' ? '#9ca3af' : 'rgba(28, 28, 28, 0.4)',
                fontWeight: '400'
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
                fontSize: 14,
                fill: theme === 'dark' ? '#9ca3af' : 'rgba(28, 28, 28, 0.4)',
                fontWeight: '400'
              }}
              dx={-20}
            />
            
            {/* Actuals Bar (Bottom/Darker) */}
            <Bar 
              dataKey="actuals" 
              stackId="stack"
              radius={[0, 0, 4, 4]}
              fill={theme === 'dark' ? '#1e40af' : 'rgba(168, 197, 218, 1)'}
            />
            
            {/* Projections Bar (Top/Lighter) */}
            <Bar 
              dataKey="projections" 
              stackId="stack"
              radius={[4, 4, 0, 0]}
              fill={theme === 'dark' ? '#60a5fa' : 'rgba(168, 197, 218, 1)'}
              style={{opacity:'50%'}}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Grid Lines */}
      <style jsx>{`
        .recharts-cartesian-grid-horizontal line {
          stroke: ${theme === 'dark' ? '#374151' : 'rgba(28, 28, 28, 0.05)'};
          stroke-width: 1;
        }
        .recharts-cartesian-grid-vertical {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ProjectionsChart;