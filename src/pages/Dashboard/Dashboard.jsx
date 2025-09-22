import React, { useEffect } from 'react';
import { useSearch } from '../../contexts/SearchContext';
import MetricsCards from '../../components/MetricsCards/MetricsCards';
import ProjectionsChart from '../../components/ProjectionsChart/ProjectionsChart';
import RevenueChart from '../../components/RevenueChart/RevenueChart';
import RevenueLocationMap from '../../components/RevenueLocationMap/RevenueLocationMap';
import TopSellingProducts from '../../components/TopSellingProducts/TopSellingProducts';
import TotalSalesChart from '../../components/TotalSalesChart/TotalSalesChart';
import './Dashboard.css';

const Dashboard = ({ theme }) => {
  const { setCurrentScreen } = useSearch();
  
  useEffect(() => {
    setCurrentScreen('dashboard');
  }, [setCurrentScreen]);

  return (
    <div className="dashboard-container">
      <h3 className={`dashboard-title ${theme === 'dark' ? 'dark-theme' : ''}`}>
        eCommerce
      </h3>
      
      {/* Metrics and Projections Row */}
      <div className="dashboard-row metrics-row">
        <div className="dashboard-column half-width">
          <MetricsCards theme={theme}/>
        </div>
        <div className="dashboard-column half-width">
          <ProjectionsChart theme={theme} />
        </div>
      </div>
      
      {/* Revenue Chart and Location Map Row */}
      <div className="dashboard-row revenue-section">
        <div className="dashboard-column three-quarters-width">
          <RevenueChart theme={theme} />
        </div>
        <div className="dashboard-column quarter-width">
          <RevenueLocationMap theme={theme} />
        </div>
      </div>
      
      {/* Products and Sales Chart Row */}
      <div className="dashboard-row products-section">
        <div className="dashboard-column three-quarters-width">
          <TopSellingProducts theme={theme} />
        </div>
        <div className="dashboard-column quarter-width">
          <TotalSalesChart theme={theme} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;