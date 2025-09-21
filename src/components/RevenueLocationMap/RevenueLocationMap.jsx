import React from 'react';
import worldMapImage from "../../assets/images/Map.png"

const RevenueLocationMap = ({ theme = "light" }) => {
  const locationData = [
    { 
      city: "New York",
      revenue: "72K",
      dotPosition: { left: '30%', top: '38%' },
      progressWidth: '85%'
    },
    { 
      city: "San Francisco",
      revenue: "39K",
      dotPosition: { left: '23%', top: '35%' },
      progressWidth: '46%'
    },
    { 
      city: "Sydney",
      revenue: "25K",
      dotPosition: { left: '78%', top: '75%' },
      progressWidth: '30%'
    },
    { 
      city: "Singapore",
      revenue: "61K",
      dotPosition: { left: '70%', top: '50%' },
      progressWidth: '72%'
    }
  ];

  return (
    <div style={{
      backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(247, 249, 251, 1)',
      padding: '24px',
      borderRadius: '16px',
      width: '100%',
      height: '318px',
      gap:'16px',
    }}>
      {/* Header */}
      <h3 style={{
        fontWeight: '600',
        color: theme === 'dark' ? 'rgba(255, 255, 255, 1)' : 'rgba(28, 28, 28, 1)',
        margin: '0 0 16px 0',
        lineHeight: '1.2'
      }}>
        Revenue by Location
      </h3>

      {/* Map Container */}
      <div style={{ 
        position: 'relative',
        marginBottom: '16px',
      }}>
        {/* World Map Image */}
        <img 
          src={worldMapImage}
          alt="World Map"
          style={{
            width: '100%',
            height: '82px',
            maxHeight: '100px',
            objectFit: 'contain',
            filter: theme === 'dark' ? 'brightness(1) contrast(1.2)' : 'brightness(0.9)',
            opacity: theme === 'dark' ? 1 : 0.7
          }}
        />
        
        {/* Location Dots */}
        {locationData.map((location, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              ...location.dotPosition,
              width: '8px',
              height: '8px',
              backgroundColor: `${theme === 'dark' ?'rgba(255, 255, 255, 1)':'rgba(28, 28, 28, 1)'}`,
              borderRadius: '50%',
              border: `2px solid ${theme === 'dark' ? '#ffffff' : '#ffffff'}`,
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              transform: 'translate(-50%, -50%)',
              zIndex: 10
            }}
            title={location.city}
          />
        ))}
      </div>

      {/* Location List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {locationData.map((location, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column',  }}>
            {/* City Name and Revenue */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{
                fontSize: '12px',
                color:`${theme === 'dark' ?'rgba(255, 255, 255, 1)':'rgba(28, 28, 28, 1)'}`
              }}>
                {location.city}
              </span>
              <span style={{
                fontSize: '12px',
                color:`${theme === 'dark' ?'rgba(255, 255, 255, 1)':'rgba(28, 28, 28, 1)'}`
              }}>
                {location.revenue}
              </span>
            </div>
            
            {/* Progress Bar */}
            <div style={{
              width: '100%',
              height: '4px',
              backgroundColor: theme === 'dark' ? 'rgba(168, 197, 218, 0.5)' : 'rgba(168, 197, 218, 0.5)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: location.progressWidth,
                height: '100%',
                backgroundColor: 'rgba(168, 197, 218, 1)',
                borderRadius: '2px',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueLocationMap;