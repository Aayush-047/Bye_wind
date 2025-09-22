import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import './RevenueChart.css';

const RevenueChart = ({ theme = "light" }) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const data = [
    { month: 'Jan', currentWeek: 13, previousWeek: 8 },
    { month: 'Feb', currentWeek: 9, previousWeek: 17 },
    { month: 'Mar', currentWeek: 7, previousWeek: 13 },
    { month: 'Apr', currentWeek: 15, previousWeek: 10 },
    { month: 'May', currentWeek: 19, previousWeek: 12 },
    { month: 'Jun', currentWeek: 20, previousWeek: 24 }
  ];

  const solidLineData = data.map((item, index) => ({
    ...item,
    currentWeekSolid: index <= 3 ? item.currentWeek : null,
    currentWeekDashed: index >= 3 ? item.currentWeek : null
  }));

  const formatYAxisLabel = (value) => {
    if (value === 0) return '0';
    return `${value}M`;
  };

  const getResponsiveConfig = () => {
    if (windowSize <= 480) {
      return {
        height: '200px',
        chartHeight: '120px',
        padding: '16px',
        headerGap: '12px',
        legendGap: '16px',
        titleFontSize: '14px',
        legendFontSize: '11px',
        tickFontSize: 10,
        margin: { top: 10, right: 5, left: -10, bottom: 10 },
        dx: -15,
        dy: 8,
        strokeWidth: 2,
        activeDotRadius: 3,
        showValues: false
      };
    } else if (windowSize <= 768) {
      return {
        height: '220px',
        chartHeight: '140px',
        padding: '18px',
        headerGap: '14px',
        legendGap: '18px',
        titleFontSize: '15px',
        legendFontSize: '11px',
        tickFontSize: 11,
        margin: { top: 15, right: 10, left: -5, bottom: 15 },
        dx: -18,
        dy: 9,
        strokeWidth: 2.5,
        activeDotRadius: 3.5,
        showValues: true
      };
    } else if (windowSize <= 1024) {
      return {
        height: '280px',
        chartHeight: '200px',
        padding: '20px',
        headerGap: '16px',
        legendGap: '20px',
        titleFontSize: '16px',
        legendFontSize: '12px',
        tickFontSize: 12,
        margin: { top: 15, right: 15, left: 0, bottom: 15 },
        dx: -18,
        dy: 9,
        strokeWidth: 3,
        activeDotRadius: 4,
        showValues: true
      };
    } else {
      return {
        height: '318px',
        chartHeight: '232px',
        padding: '24px',
        headerGap: '16px',
        legendGap: '24px',
        titleFontSize: '16px',
        legendFontSize: '12px',
        tickFontSize: 12,
        margin: { top: 20, right: 20, left: 0, bottom: 20 },
        dx: -20,
        dy: 10,
        strokeWidth: 3,
        activeDotRadius: 4,
        showValues: true
      };
    }
  };

  const config = getResponsiveConfig();
  const backgroundColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(247, 249, 251, 1)';
  const textColor = theme === 'dark' ? 'rgba(255, 255, 255, 1)' : 'rgba(28, 28, 28, 1)';
  const separatorColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(28, 28, 28, 0.2)';
  const currentWeekDotColor = theme === 'dark' ? 'rgba(198, 199, 248, 1)' : 'rgba(28, 28, 28, 1)';
  const previousWeekDotColor = 'rgba(168, 197, 218, 1)';
  const currentWeekLineColor = theme === 'dark' ? 'rgba(198, 199, 248, 1)' : 'rgba(28, 28, 28, 1)';
  const previousWeekLineColor = 'rgba(168, 197, 218, 1)';
  const gridColor = theme === 'dark' ? '#374151' : '#f3f4f6';
  const tickColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(28, 28, 28, 0.4)';

  return (
    <div className={`revenue-chart-container ${theme}`} style={{
      backgroundColor,
      padding: config.padding,
      borderRadius: '16px',
      width: '100%',
      height: config.height,
    }}>
      <div className="revenue-header" style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: config.headerGap,
        flexWrap: 'wrap',
        gap: config.headerGap
      }}>
        <h3 className="revenue-title" style={{
          fontWeight: '600',
          color: textColor,
          margin: '0',
          lineHeight: '1.2',
          fontSize: config.titleFontSize
        }}>
          Revenue
        </h3> 
        {windowSize > 480 && (
          <>
            <div style={{fontSize:'14px', color: separatorColor}}>|</div>
            <div className="revenue-legend" style={{ 
              display: 'flex', 
              gap: config.legendGap, 
              alignItems: 'center',
              flexWrap: windowSize <= 768 ? 'wrap' : 'nowrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: currentWeekDotColor
                }} />
                <span className="legend-text" style={{ 
                  fontSize: config.legendFontSize, 
                  color: textColor 
                }}>
                  Current Week {config.showValues && <span style={{ fontWeight: '600' }}>$58,211</span>}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: previousWeekDotColor
                }} />
                <span className="legend-text" style={{ 
                  fontSize: config.legendFontSize, 
                  color: textColor 
                }}>
                  Previous Week {config.showValues && <span style={{ fontWeight: '600' }}>$68,768</span>}
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {windowSize <= 480 && (
        <div className="mobile-legend" style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '12px',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: currentWeekDotColor
            }} />
            <span style={{ fontSize: '10px', color: textColor }}>Current</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: previousWeekDotColor
            }} />
            <span style={{ fontSize: '10px', color: textColor }}>Previous</span>
          </div>
        </div>
      )}

      <div style={{ width: '100%', height: config.chartHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={solidLineData}
            margin={config.margin}
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
              tick={{ fontSize: config.tickFontSize, fill: tickColor }}
              dy={config.dy}
            />
            
            <YAxis
              domain={[0, 30]}
              ticks={[0, 10, 20, 30]}
              tickFormatter={formatYAxisLabel}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: config.tickFontSize, fill: tickColor }}
              dx={config.dx}
            />
            
            <Line 
              type="monotone"
              dataKey="previousWeek"
              stroke={previousWeekLineColor}
              strokeWidth={config.strokeWidth}
              dot={false}
              activeDot={{ r: config.activeDotRadius, fill: previousWeekLineColor }}
            />
            
            <Line 
              type="monotone"
              dataKey="currentWeekSolid"
              stroke={currentWeekLineColor}
              strokeWidth={config.strokeWidth}
              dot={false}
              activeDot={{ r: config.activeDotRadius, fill: currentWeekLineColor }}
              connectNulls={false}
            />
            
            <Line 
              type="monotone"
              dataKey="currentWeekDashed"
              stroke={currentWeekLineColor}
              strokeWidth={config.strokeWidth}
              strokeDasharray="8 4"
              dot={false}
              activeDot={{ r: config.activeDotRadius, fill: currentWeekLineColor }}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;