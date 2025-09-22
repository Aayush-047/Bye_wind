import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import './ProjectionsChart.css';

const ProjectionsChart = ({ theme = "light" }) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const getResponsiveConfig = () => {
    if (windowSize <= 480) {
      return {
        height: '160px',
        chartHeight: '120px',
        margin: { top: 5, right: 5, left: -10, bottom: 5 },
        barCategoryGap: "20%",
        tickFontSize: 11,
        titleFontSize: '14px',
        padding: '16px',
        dx: -15,
        dy: 8
      };
    } else if (windowSize <= 768) {
      return {
        height: '180px',
        chartHeight: '130px',
        margin: { top: 8, right: 8, left: -5, bottom: 8 },
        barCategoryGap: "25%",
        tickFontSize: 12,
        titleFontSize: '15px',
        padding: '18px',
        dx: -18,
        dy: 9
      };
    } else if (windowSize <= 1024) {
      return {
        height: '220px',
        chartHeight: '160px',
        margin: { top: 8, right: 8, left: 0, bottom: 8 },
        barCategoryGap: "28%",
        tickFontSize: 13,
        titleFontSize: '16px',
        padding: '20px',
        dx: -18,
        dy: 9
      };
    } else {
      return {
        height: '257px',
        chartHeight: '180px',
        margin: { top: 10, right: 10, left: 0, bottom: 10 },
        barCategoryGap: "30%",
        tickFontSize: 14,
        titleFontSize: '16px',
        padding: '24px',
        dx: -20,
        dy: 10
      };
    }
  };

  const backgroundColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(247, 249, 251, 1)';
  const textColor = theme === 'dark' ? 'rgba(255, 255, 255, 1)' : 'rgba(28, 28, 28, 1)';
  const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(28, 28, 28, 0.05)';
  const tickColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(28, 28, 28, 0.4)';
  const barColor = 'rgba(168, 197, 218, 1)';
  const tooltipBgColor = theme === 'dark' ? 'rgba(40, 40, 40, 0.95)' : 'rgba(255, 255, 255, 0.95)';
  const tooltipTextColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(28, 28, 28, 0.9)';
  const tooltipBorderColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(28, 28, 28, 0.1)';

  const config = getResponsiveConfig();

  // Custom Tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: tooltipBgColor,
          border: `1px solid ${tooltipBorderColor}`,
          borderRadius: '8px',
          padding: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}>
          <p style={{ 
            color: tooltipTextColor, 
            margin: '0 0 8px 0', 
            fontWeight: '600',
            fontSize: '14px'
          }}>
            {label}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '12px',
                height: '12px',
                backgroundColor: barColor,
                borderRadius: '2px'
              }}></div>
              <span style={{ 
                color: tooltipTextColor, 
                fontSize: '13px'
              }}>
                Actuals: <strong>{payload[0].value}M</strong>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '12px',
                height: '12px',
                backgroundColor: barColor,
                borderRadius: '2px',
                opacity: 0.5
              }}></div>
              <span style={{ 
                color: tooltipTextColor, 
                fontSize: '13px'
              }}>
                Projections: <strong>{payload[1].value}M</strong>
              </span>
            </div>
            <div style={{ 
              marginTop: '4px',
              paddingTop: '4px',
              borderTop: `1px solid ${tooltipBorderColor}`
            }}>
              <span style={{ 
                color: tooltipTextColor, 
                fontSize: '13px',
                fontWeight: '600'
              }}>
                Total: <strong>{payload[0].value + payload[1].value}M</strong>
              </span>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`projections-chart-container ${theme}`} style={{
      backgroundColor,
      padding: config.padding,
      borderRadius: '16px',
      width: '100%',
      height: config.height,
    }}>
      <h3 className="projections-title" style={{
        fontWeight: '600',
        color: textColor,
        margin: '0 0 16px 0',
        lineHeight: '20px',
        fontSize: config.titleFontSize
      }}>
        Projections vs Actuals
      </h3>

      <div style={{ width: '100%', height: config.chartHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={config.margin}
            barCategoryGap={config.barCategoryGap}
          >
            <CartesianGrid 
              strokeDasharray="none"
              stroke={gridColor}
              horizontal={true}
              vertical={false}
            />
            
            <XAxis 
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: config.tickFontSize, fill: tickColor, fontWeight: '400' }}
              dy={config.dy}
            />
            
            <YAxis
              domain={[0, 30]}
              ticks={[0, 10, 20, 30]}
              tickFormatter={formatYAxisLabel}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: config.tickFontSize, fill: tickColor, fontWeight: '400' }}
              dx={config.dx}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'transparent' }}
            />
            
            <Bar 
              dataKey="actuals" 
              stackId="stack"
              radius={[0, 0, 4, 4]}
              fill={barColor}
            />
            
            <Bar 
              dataKey="projections" 
              stackId="stack"
              radius={[4, 4, 0, 0]}
              fill={barColor}
              style={{ opacity: '50%' }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProjectionsChart;