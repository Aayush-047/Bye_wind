import MetricsCards from '../../components/MetricsCards/MetricsCards'
import ProjectionsChart from '../../components/ProjectionsChart/ProjectionsChart'
import RevenueChart from '../../components/RevenueChart/RevenueChart'
import RevenueLocationMap from '../../components/RevenueLocationMap/RevenueLocationMap'
import TopSellingProducts from '../../components/TopSellingProducts/TopSellingProducts'
import TotalSalesChart from '../../components/TotalSalesChart/TotalSalesChart'
import './Dashboard.css' 

const Dashboard = ({ theme }) => {
  return (
    <div className="dashboard-container">
      {/* Dashboard title */}
      <h3 className="dashboard-title">eCommerce</h3>
      
      {/* Metrics and Projections row */}
      <div className="dashboard-row">
        <div className="dashboard-col-half">
          <MetricsCards theme={theme}/>
        </div>
        <div className="dashboard-col-half">
          <ProjectionsChart theme={theme}/>
        </div>
      </div>
      
      {/* Revenue and Location Map row */}
      <div className="dashboard-row">
        <div className="dashboard-col-three-quarters">
          <RevenueChart theme={theme}/>
        </div>
        <div className="dashboard-col-quarter">
          <RevenueLocationMap theme={theme}/>
        </div>
      </div>
      
      {/* Products and Sales row */}
      <div className="dashboard-row">
        <div className="dashboard-col-three-quarters">
          <TopSellingProducts theme={theme}/>
        </div>
        <div className="dashboard-col-quarter">
          <TotalSalesChart theme={theme}/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard