import React from 'react';
import { Checkbox, Dropdown, Menu } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ReactComponent as Contact1Icon } from '../../../assets/icons/contacts1.svg';
import { ReactComponent as DateIcon } from '../../../assets/icons/date.svg';
import { ReactComponent as MoreIcon } from '../../../assets/icons/more.svg';
import { iconMap } from '../utils/ordersUtils';
import { isCheckboxAllowed, getStatusColor } from '../utils/ordersUtils';

export const getOrdersTableColumns = ({
  isDark,
  selectedRowKeys,
  setSelectedRowKeys,
  allowedCheckboxData,
  handleAction
}) => {
  return [
    {
      title: (
        <Checkbox
          indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < allowedCheckboxData.length}
          checked={selectedRowKeys.length === allowedCheckboxData.length && allowedCheckboxData.length > 0}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRowKeys(allowedCheckboxData.map(item => item.key));
            } else {
              setSelectedRowKeys([]);
            }
          }}
        />
      ),
      dataIndex: 'checkbox',
      key: 'checkbox',
      width: 50,
      render: (text, record) => (
        isCheckboxAllowed(record.status) ? (
          <Checkbox
            checked={selectedRowKeys.includes(record.key)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedRowKeys([...selectedRowKeys, record.key]);
              } else {
                setSelectedRowKeys(selectedRowKeys.filter(key => key !== record.key));
              }
            }}
          />
        ) : null
      ),
    },
    {
      title: <span style={{ color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(28, 28, 28, 0.4)' }}>Order ID</span>,
      dataIndex: 'orderId',
      key: 'orderId',
      width: 120,
      render: (text) => <span>{text}</span>,
    },
    {
      title: <span style={{ color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(28, 28, 28, 0.4)' }}>User</span>,
      dataIndex: 'user',
      key: 'user',
      width: 200,
      render: (user, record) => {
        if (!user || !user.name) {
          return <span>Invalid User</span>;
        }
        
        const IconComponent = iconMap[record.icon] || Contact1Icon;
        return (
          <div className="user-cell">
            <div className="user-icon-container">
              <IconComponent width={24} height={24} className="user-icon" />
            </div>
            <span>{user.name}</span>
          </div>
        );
      },
    },
    {
      title: <span style={{ color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(28, 28, 28, 0.4)' }}>Project</span>,
      dataIndex: 'project',
      key: 'project',
      width: 180,
      render: (text) => <span>{text}</span>,
    },
    {
      title: <span style={{ color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(28, 28, 28, 0.4)' }}>Address</span>,
      dataIndex: 'address',
      key: 'address',
      width: 200,
      render: (text) => <span>{text}</span>,
    },
    {
      title: <span style={{ color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(28, 28, 28, 0.4)' }}>Date</span>,
      dataIndex: 'date',
      key: 'date',
      width: 150,
      render: (text) => (
        <div className="date-cell">
          <DateIcon className="date-icon" />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: <span style={{ color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(28, 28, 28, 0.4)' }}>Status</span>,
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (status) => {
        const color = getStatusColor(status);
        return (
          <div className="status-cell">
            <div 
              className="status-dot"
              style={{ backgroundColor: color }}
            ></div>
            <span style={{ color: color }}>{status}</span>
          </div>
        );
      },
    },
    {
      title: '',
      key: 'action',
      width: 50,
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu onClick={({ key }) => handleAction(key, record)}>
              <Menu.Item key="view" icon={<EyeOutlined />}>View Details</Menu.Item>
              {isCheckboxAllowed(record.status) && (
                <Menu.Item key="edit" icon={<EditOutlined />}>Edit Order</Menu.Item>
              )}
              {isCheckboxAllowed(record.status) && (
                <Menu.Item key="delete" icon={<DeleteOutlined />} danger>Delete Order</Menu.Item>
              )}
            </Menu>
          }
          trigger={['click']}
          placement="bottomRight"
        >
          <div className="action-cell">
            <MoreIcon className="action-icon" />
          </div>
        </Dropdown>
      ),
    },
  ];
};