import React from 'react';
import { Input, Button, Dropdown, Menu } from 'antd';
import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg';
import { ReactComponent as FilterIcon } from '../../../assets/icons/filter.svg';
import { ReactComponent as SortIcon } from '../../../assets/icons/sort.svg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';

const OrdersHeader = ({
  isDark,
  searchText,
  handleSearch,
  statusFilter,
  handleStatusFilter,
  handleSort,
  form,
  setIsAddModalVisible,
  setSelectedRecord
}) => {
  const buttonStyle = {
    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
    borderColor: isDark ? 'rgba(255, 255, 255, 0.4)' : '#d9d9d9',
    color: isDark ? 'rgba(255, 255, 255, 1)' : 'inherit'
  };

  const inputStyle = {
    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
    borderColor: isDark ? 'rgba(255, 255, 255, 0.4)' : '#d9d9d9',
    color: isDark ? 'rgba(255, 255, 255, 1)' : 'inherit'
  };

  const filterMenu = (
    <Menu onClick={({ key }) => {
      if (key === 'all') {
        handleStatusFilter([]);
      } else {
        const currentFilters = statusFilter.includes(key) 
          ? statusFilter.filter(f => f !== key)
          : [...statusFilter, key];
        handleStatusFilter(currentFilters);
      }
    }}>
      <Menu.Item key="all">All Statuses</Menu.Item>
      <Menu.Item key="In Progress">In Progress</Menu.Item>
      <Menu.Item key="Complete">Complete</Menu.Item>
      <Menu.Item key="Pending">Pending</Menu.Item>
      <Menu.Item key="Approved">Approved</Menu.Item>
      <Menu.Item key="Rejected">Rejected</Menu.Item>
    </Menu>
  );

  const sortMenu = (
    <Menu onClick={({ key }) => handleSort(key)}>
      <Menu.Item key="asc">Name A-Z</Menu.Item>
      <Menu.Item key="desc">Name Z-A</Menu.Item>
      <Menu.Item key="">Default</Menu.Item>
    </Menu>
  );

  return (
    <div className={`orders-header ${isDark ? 'dark-theme' : ''}`}>
      <div className="orders-header-left">
        <Button 
          icon={<PlusIcon className="header-icon" style={{ color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'inherit' }} />} 
          className="header-icon-button"
          style={buttonStyle}
          onClick={() => {
            form.resetFields();
            setSelectedRecord(null);
            setIsAddModalVisible(true);
          }}
        />
        
        <Dropdown overlay={filterMenu} trigger={['click']}>
          <Button 
            icon={<FilterIcon className="header-icon" style={{ color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'inherit' }}/>} 
            className="header-icon-button" 
            style={buttonStyle}
          />
        </Dropdown>
        <Dropdown overlay={sortMenu} trigger={['click']}>
          <Button 
            icon={<SortIcon className="header-icon" style={{ color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'inherit' }}/>} 
            className="header-icon-button" 
            style={buttonStyle}
          />
        </Dropdown>
      </div>
      
      <Input
        placeholder="Search"
        prefix={<SearchIcon className="header-icon" style={{ color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'inherit' }} />}
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        className="orders-search"
        size="middle"
        style={inputStyle}
      />
    </div>
  );
};

export default OrdersHeader;