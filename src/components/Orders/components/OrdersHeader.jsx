import React, { useState, useEffect } from 'react';
import { Input, Button, Dropdown, Menu } from 'antd';
import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg';
import { ReactComponent as FilterIcon } from '../../../assets/icons/filter.svg';
import { ReactComponent as SortIcon } from '../../../assets/icons/sort.svg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import './OrdersHeader.css';

const OrdersHeader = ({
  isDark,
  searchText,
  handleSearch,
  statusFilter,
  handleStatusFilter,
  handleSort,
  form,
  setIsAddModalVisible,
  setSelectedRecord,
  isMobile,
  isTablet
}) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const getButtonSize = () => {
    if (windowSize <= 480) return 'small';
    if (windowSize <= 768) return 'small';
    return 'middle';
  };

  const getInputSize = () => {
    if (windowSize <= 480) return 'small';
    if (windowSize <= 768) return 'small';
    return 'middle';
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

  const handleSearchToggle = () => {
    if (windowSize <= 480) {
      setIsSearchExpanded(!isSearchExpanded);
      if (isSearchExpanded && !searchText) {
        setIsSearchExpanded(false);
      }
    }
  };

  if (windowSize <= 480) {
    return (
      <div className={`orders-header mobile-header ${isDark ? 'dark-theme' : ''}`}>
        {!isSearchExpanded ? (
          <div className="orders-header-row">
            <div className="orders-header-left mobile-left">
              <Button 
                icon={<PlusIcon className="header-icon mobile-icon" />}
                className="header-icon-button mobile-button"
                style={buttonStyle}
                size={getButtonSize()}
                onClick={() => {
                  form.resetFields();
                  setSelectedRecord(null);
                  setIsAddModalVisible(true);
                }}
              />
              
              <Dropdown overlay={filterMenu} trigger={['click']} placement="bottomLeft">
                <Button 
                  icon={<FilterIcon className="header-icon mobile-icon" />}
                  className="header-icon-button mobile-button"
                  style={buttonStyle}
                  size={getButtonSize()}
                />
              </Dropdown>
              
              <Dropdown overlay={sortMenu} trigger={['click']} placement="bottomLeft">
                <Button 
                  icon={<SortIcon className="header-icon mobile-icon" />}
                  className="header-icon-button mobile-button"
                  style={buttonStyle}
                  size={getButtonSize()}
                />
              </Dropdown>
            </div>
            
            <Button 
              icon={<SearchIcon className="header-icon mobile-icon" />}
              className="header-icon-button mobile-search-button"
              style={buttonStyle}
              size={getButtonSize()}
              onClick={handleSearchToggle}
            />
          </div>
        ) : (
          <div className="mobile-search-expanded">
            <Input
              placeholder="Search orders..."
              prefix={<SearchIcon className="header-icon mobile-icon" />}
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              className="orders-search mobile-search"
              size={getInputSize()}
              style={inputStyle}
              autoFocus
              allowClear
              onPressEnter={handleSearchToggle}
              onBlur={() => !searchText && setIsSearchExpanded(false)}
            />
            <Button 
              type="text" 
              size="small"
              onClick={handleSearchToggle}
              className="mobile-search-close"
              style={{ color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)' }}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    );
  }

  if (windowSize <= 768) {
    return (
      <div className={`orders-header tablet-header ${isDark ? 'dark-theme' : ''}`}>
        <div className="orders-header-top">
          <div className="orders-header-left tablet-left">
            <Button 
              icon={<PlusIcon className="header-icon tablet-icon" />}
              className="header-icon-button tablet-button"
              style={buttonStyle}
              size={getButtonSize()}
              onClick={() => {
                form.resetFields();
                setSelectedRecord(null);
                setIsAddModalVisible(true);
              }}
            />
            
            <Dropdown overlay={filterMenu} trigger={['click']} placement="bottomLeft">
              <Button 
                icon={<FilterIcon className="header-icon tablet-icon" />}
                className="header-icon-button tablet-button"
                style={buttonStyle}
                size={getButtonSize()}
              />
            </Dropdown>
            
            <Dropdown overlay={sortMenu} trigger={['click']} placement="bottomLeft">
              <Button 
                icon={<SortIcon className="header-icon tablet-icon" />}
                className="header-icon-button tablet-button"
                style={buttonStyle}
                size={getButtonSize()}
              />
            </Dropdown>
          </div>
          
          <Input
            placeholder="Search orders..."
            prefix={<SearchIcon className="header-icon tablet-icon" />}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            className="orders-search tablet-search"
            size={getInputSize()}
            style={inputStyle}
            allowClear
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`orders-header desktop-header ${isDark ? 'dark-theme' : ''}`}>
      <div className="orders-header-left desktop-left">
        <Button 
          icon={<PlusIcon className="header-icon desktop-icon" />}
          className="header-icon-button desktop-button"
          style={buttonStyle}
          size={getButtonSize()}
          onClick={() => {
            form.resetFields();
            setSelectedRecord(null);
            setIsAddModalVisible(true);
          }}
        />
        
        <Dropdown overlay={filterMenu} trigger={['click']}>
          <Button 
            icon={<FilterIcon className="header-icon desktop-icon" />}
            className="header-icon-button desktop-button"
            style={buttonStyle}
            size={getButtonSize()}
          />
        </Dropdown>
        
        <Dropdown overlay={sortMenu} trigger={['click']}>
          <Button 
            icon={<SortIcon className="header-icon desktop-icon" />}
            className="header-icon-button desktop-button"
            style={buttonStyle}
            size={getButtonSize()}
          />
        </Dropdown>
      </div>
      
      <Input
        placeholder="Search"
        prefix={<SearchIcon className="header-icon desktop-icon" />}
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        className="orders-search desktop-search"
        size={getInputSize()}
        style={inputStyle}
      />
    </div>
  );
};

export default OrdersHeader;