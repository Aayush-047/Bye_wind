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

  const tableHeaderStyle = {
    textAlign: 'left',
    paddingBottom: '11px',
    borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(28, 28, 28, 0.4)'}`,
    fontSize: '14px',
    fontWeight: '500',
    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(28, 28, 28, 0.4)',
    paddingRight: '24px'
  };

  const tableCellStyle = {
    paddingTop: '11px',
    paddingBottom: '11px',
    paddingRight: '24px',
    color: theme === 'dark' ? 'rgba(255, 255, 255, 1)' : 'rgba(28, 28, 28, 0.4)',
  };

  return (
    <div style={{
      backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(247, 249, 251, 1)',
      padding: '24px',
      borderRadius: '16px',
      width: '100%',
      gap: '4px',
    }}>
      <h3 style={{
        fontWeight: '600',
        margin: '0 0 16px 0',
        lineHeight: '1.2',
        color: theme === 'dark' ? 'rgba(255, 255, 255, 1)' : 'inherit',
      }}>
        Top Selling Products
      </h3>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          fontSize: '14px',
          height: '264px'
        }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Name</th>
              <th style={tableHeaderStyle}>Price</th>
              <th style={tableHeaderStyle}>Quantity</th>
              <th style={tableHeaderStyle}>Amount</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => (
              <tr 
                key={index}
                style={{
                  transition: 'background-color 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                <td style={tableCellStyle}>{product.name}</td>
                <td style={tableCellStyle}>{product.price}</td>
                <td style={tableCellStyle}>{product.quantity}</td>
                <td style={tableCellStyle}>{product.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopSellingProducts;