import React from 'react';

const TopSellingProducts = ({ theme = "light" }) => {
  const products = [
    {
      name: "ASOS Ridley High Waist",
      price: "$79.49",
      quantity: 82,
      amount: "$6,518.18"
    },
    {
      name: "Marco Lightweight Shirt",
      price: "$128.50",
      quantity: 37,
      amount: "$4,754.50"
    },
    {
      name: "Half Sleeve Shirt",
      price: "$39.99",
      quantity: 64,
      amount: "$2,559.36"
    },
    {
      name: "Lightweight Jacket",
      price: "$20.00",
      quantity: 184,
      amount: "$3,680.00"
    },
    {
      name: "Marco Shoes",
      price: "$79.49",
      quantity: 64,
      amount: "$1,965.81"
    }
  ];

  return (
    <div style={{
      backgroundColor: theme === 'dark' ? '#1f2937' : 'rgba(247, 249, 251, 1)',
      padding: '24px',
      borderRadius: '16px',
      border: theme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb',
      width: '100%',
      gap:'4px',
    }}>
      {/* Header */}
      <h3 style={{
        fontWeight: '600',
        margin: '0 0 16px 0',
        lineHeight: '1.2'
      }}>
        Top Selling Products
      </h3>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          fontSize: '14px',
          height:'264px'
        }}>
          {/* Table Header */}
          <thead>
            <tr>
              <th style={{
                textAlign: 'left',
                paddingBottom: '11px',
                borderBottom: `1px solid ${theme === 'dark' ? '#374151' : 'rgba(28, 28, 28, 0.4)'}`,
                fontSize: '14px',
                fontWeight: '500',
                color: theme === 'dark' ? '#9ca3af' : 'rgba(28, 28, 28, 0.4)',
                paddingRight: '24px'
              }}>
                Name
              </th>
              <th style={{
                textAlign: 'left',
                paddingBottom: '11px',
                borderBottom: `1px solid ${theme === 'dark' ? '#374151' : 'rgba(28, 28, 28, 0.4)'}`,
                fontSize: '14px',
                fontWeight: '500',
                color: theme === 'dark' ? '#9ca3af' : 'rgba(28, 28, 28, 0.4)',
                paddingRight: '24px'
              }}>
                Price
              </th>
              <th style={{
                textAlign: 'left',
                paddingBottom: '11px',
                borderBottom: `1px solid ${theme === 'dark' ? '#374151' : 'rgba(28, 28, 28, 0.4)'}`,
                fontSize: '14px',
                fontWeight: '500',
                color: theme === 'dark' ? '#9ca3af' : 'rgba(28, 28, 28, 0.4)',
                paddingRight: '24px'
              }}>
                Quantity
              </th>
              <th style={{
                textAlign: 'left',
                paddingBottom: '11px',
                borderBottom: `1px solid ${theme === 'dark' ? '#374151' : 'rgba(28, 28, 28, 0.4)'}`,
                fontSize: '14px',
                fontWeight: '500',
                color: theme === 'dark' ? '#9ca3af' : 'rgba(28, 28, 28, 0.4)',
                paddingRight: '24px'
              }}>
                Amount
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {products.map((product, index) => (
              <tr 
                key={index}
                style={{
                  transition: 'background-color 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                <td style={{
                  paddingTop: '11px',
                  paddingBottom: '11px',
                  paddingRight: '24px',
                }}>
                  {product.name}
                </td>
                <td style={{
                  paddingTop: '11px',
                  paddingBottom: '11px',
                  paddingRight: '24px',
                }}>
                  {product.price}
                </td>
                <td style={{
                  paddingTop: '11px',
                  paddingBottom: '11px',
                  paddingRight: '24px',
                }}>
                  {product.quantity}
                </td>
                <td style={{
                  paddingTop: '11px',
                  paddingBottom: '11px',
                  paddingRight: '24px',
                }}>
                  {product.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopSellingProducts;