import React from 'react'
import MetricsCards from '../../components/MetricsCards/MetricsCards'
import ProjectionsChart from '../../components/ProjectionsChart/ProjectionsChart'
import RevenueChart from '../../components/RevenueChart/RevenueChart'
import RevenueLocationMap from '../../components/RevenueLocationMap/RevenueLocationMap'
import TopSellingProducts from '../../components/TopSellingProducts/TopSellingProducts'
import TotalSalesChart from '../../components/TotalSalesChart/TotalSalesChart'

const Dashboard = ({ theme }) => {
  return (
    <div >
      <h3 style={{fontWeight:600,marginBottom:16,marginTop:16,padding:'4px 8px',color: theme === 'dark' ? 'rgba(255, 255, 255, 1)' : 'inherit'}}>eCommerce</h3>
      <div style={{display:"flex" , gap :'28px',marginBottom:'28px'}}>
        <div style={{width:'50%'}}>
          <MetricsCards theme={theme}/>
        </div>
        <div style={{width:'50%'}}>
          <ProjectionsChart theme={theme}/>
        </div>
      </div>
      <div style={{display:"flex" , gap :'28px',marginBottom:'28px'}}>
        <div style={{width:'75%'}}>
          <RevenueChart theme={theme}/>
        </div>
        <div style={{width:'25%'}}>
          <RevenueLocationMap theme={theme}/>
        </div>
      </div>
      <div style={{display:"flex" , gap :'28px',marginBottom:'28px'}}>
        <div style={{width:'75%'}}>
          <TopSellingProducts theme={theme}/>
        </div>
        <div style={{width:'25%'}}>
          <TotalSalesChart theme={theme}/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard