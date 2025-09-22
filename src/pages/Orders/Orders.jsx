import React, { useState, useEffect } from 'react';
import { Table, Form, message } from 'antd';
import { useOrdersData, useOrdersFilters } from '../../components/Orders/hooks/useOrdersData';
import { isCheckboxAllowed,userIconMap } from '../../components/Orders/utils/ordersUtils';
import { useSearch } from '../../contexts/SearchContext'; 
import OrdersHeader from '../../components/Orders/components/OrdersHeader';
import { getOrdersTableColumns } from '../../components/Orders/components/OrdersTableColumns';
import AddEditOrderModal from '../../components/Orders/modals/AddEditOrderModal';
import ViewOrderModal from '../../components/Orders/modals/ViewOrderModal';
import DeleteOrderModal from '../../components/Orders/modals/DeleteOrderModal';
import './Orders.css';

const Orders = ({ theme }) => {
  const { searchQuery, setCurrentScreen, getFilteredDataForCurrentScreen } = useSearch();
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  
  const [data, setData] = useOrdersData();
  const {
    searchText,
    setSearchText,
    statusFilter,
    setStatusFilter,
    sortOrder,
    setSortOrder,
    filteredData,
    applyFilters
  } = useOrdersFilters(data);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isActionModalVisible, setIsActionModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [form] = Form.useForm();

  const isDark = theme === 'dark';

  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setCurrentScreen('orders');
  }, [setCurrentScreen]);

  useEffect(() => {
    if (searchQuery) {
      setSearchText(searchQuery);
    }
  }, [searchQuery, setSearchText]);

  const getDisplayData = () => {
    if (searchQuery) {
      const globalFilteredData = getFilteredDataForCurrentScreen();
      if (globalFilteredData && globalFilteredData.length > 0) {
        return globalFilteredData.map((item, index) => ({
          key: item.id || `search-${index}`,
          orderId: item.id,
          user: {
            name: item.user,
            avatar: `/api/placeholder/32/32` 
          },
          project: item.project,
          address: item.address,
          date: item.date || 'Just now',
          status: item.status
        }));
      }
    }
    return filteredData;
  };

  const displayData = getDisplayData();
  const allowedCheckboxData = displayData.filter(item => isCheckboxAllowed(item.status));

  const handleAction = (action, record) => {
    setSelectedRecord(record);
    if (action === 'view') {
      setIsActionModalVisible(true);
    } else if (action === 'edit') {
      form.setFieldsValue({
        userName: record.user.name,
        project: record.project,
        address: record.address,
        status: record.status,
      });
      setIsAddModalVisible(true);
    } else if (action === 'delete') {
      setRecordToDelete(record);
      setIsDeleteModalVisible(true);
    }
  };

  const handleAddOrder = (values) => {
    if (selectedRecord) {
      const updatedData = data.map(item => {
        if (item.key === selectedRecord.key) {
          return {
            ...item,
            user: { name: values.userName },
            project: values.project,
            address: values.address,
            date: values.date ? values.date.format('MMM D, YYYY') : item.date,
            status: values.status,
          };
        }
        return item;
      });
      
      setData(updatedData);
      applyFilters(searchText, statusFilter, sortOrder, updatedData);
      
      setIsAddModalVisible(false);
      form.resetFields();
      setSelectedRecord(null);
      message.success('Order updated successfully!');
    } else {
      const newOrder = {
        key: `order_${Date.now()}`,
        orderId: `#CM98${(data.length + 1).toString().padStart(2, '0')}`,
        user: { name: values.userName },
        project: values.project,
        address: values.address,
        date: values.date ? values.date.format('MMM D, YYYY') : 'Just now',
        status: values.status,
        icon: userIconMap[values.userName] || 'Contact1Icon'
      };
      
      const updatedData = [...data, newOrder];
      setData(updatedData);
      applyFilters(searchText, statusFilter, sortOrder, updatedData);
      
      setIsAddModalVisible(false);
      form.resetFields();
      message.success('Order added successfully!');
    }
  };

  const handleDeleteConfirm = () => {
    if (recordToDelete) {
      const updatedData = data.filter(item => item.key !== recordToDelete.key);
      setData(updatedData);
      applyFilters(searchText, statusFilter, sortOrder, updatedData);
      setIsDeleteModalVisible(false);
      setRecordToDelete(null);
      message.success('Order deleted successfully!');
    }
  };

  const getResponsiveConfig = () => {
    if (windowSize <= 480) {
      return {
        size: 'small',
        pageSize: 5,
        scroll: { x: 600 },
        showHeader: false,
        pagination: {
          simple: true,
          size: 'small',
          showSizeChanger: false,
          showQuickJumper: false,
          showTotal: false
        }
      };
    } else if (windowSize <= 768) {
      return {
        size: 'small',
        pageSize: 8,
        scroll: { x: 800 },
        showHeader: true,
        pagination: {
          simple: false,
          size: 'small',
          showSizeChanger: false,
          showQuickJumper: false,
          showTotal: (total) => `${total} orders`
        }
      };
    } else if (windowSize <= 1024) {
      return {
        size: 'middle',
        pageSize: 10,
        scroll: { x: 1000 },
        showHeader: true,
        pagination: {
          simple: false,
          size: 'default',
          showSizeChanger: false,
          showQuickJumper: true,
          showTotal: (total) => `Total ${total} orders`
        }
      };
    } else {
      return {
        size: 'middle',
        pageSize: 10,
        scroll: { x: true },
        showHeader: true,
        pagination: {
          simple: false,
          showSizeChanger: false,
          showQuickJumper: false,
          showTotal: false
        }
      };
    }
  };

  const config = getResponsiveConfig();
  
  const columns = getOrdersTableColumns({
    isDark,
    selectedRowKeys,
    setSelectedRowKeys,
    allowedCheckboxData,
    handleAction,
    isMobile: windowSize <= 480,
    isTablet: windowSize <= 768
  });

  return (
    <div className={`orders-container ${windowSize <= 768 ? 'mobile-view' : ''}`} 
         style={{ backgroundColor: isDark ? 'rgba(28,28,28, 1)' : 'inherit' }}>
      <h3 className={`orders-title ${windowSize <= 480 ? 'mobile-title' : ''}`} 
          style={{ color: isDark ? 'rgba(255, 255, 255, 1)' : 'inherit' }}>
        {windowSize <= 480 ? 'Orders' : 'Order List'}
        {searchQuery && (
          <span className="search-indicator" style={{ 
            fontSize: windowSize <= 480 ? '12px' : '14px', 
            fontWeight: 'normal', 
            color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
            marginLeft: '10px',
            display: windowSize <= 480 ? 'block' : 'inline'
          }}>
            {windowSize <= 480 ? `"${searchQuery}"` : `- Search results for "${searchQuery}"`}
          </span>
        )}
      </h3>
      
      <OrdersHeader
        isDark={isDark}
        searchText={searchText}
        handleSearch={setSearchText}
        handleStatusFilter={setStatusFilter}
        handleSort={setSortOrder}
        form={form}
        setIsAddModalVisible={setIsAddModalVisible}
        setSelectedRecord={setSelectedRecord}
        isMobile={windowSize <= 480}
        isTablet={windowSize <= 768}
      />

      <div className={`table-wrapper ${windowSize <= 480 ? 'mobile-table' : ''}`}>
        <Table
          columns={columns}
          dataSource={displayData} 
          pagination={{
            current: currentPage, 
            total: displayData.length, 
            pageSize: config.pageSize,
            ...config.pagination,
            className: `pagination-container ${windowSize <= 480 ? 'mobile-pagination' : ''}`,
            onChange: (page) => setCurrentPage(page), 
          }}
          className={`custom-table ${isDark ? 'dark-theme' : ''} ${windowSize <= 480 ? 'mobile-table' : ''}`} 
          showHeader={config.showHeader}
          size={config.size}
          rowSelection={windowSize <= 480 ? undefined : undefined}
          scroll={config.scroll}
          rowKey="key"
        />
      </div>

      <AddEditOrderModal
        visible={isAddModalVisible}
        onCancel={() => {
          setIsAddModalVisible(false);
          form.resetFields();
          setSelectedRecord(null);
        }}
        onOk={() => form.submit()}
        submit={handleAddOrder}
        form={form}
        selectedRecord={selectedRecord}
        isDark={isDark}
      />

      <ViewOrderModal
        visible={isActionModalVisible}
        onCancel={() => setIsActionModalVisible(false)}
        selectedRecord={selectedRecord}
        isDark={isDark}
      />

      <DeleteOrderModal
        visible={isDeleteModalVisible}
        onCancel={() => {
          setIsDeleteModalVisible(false);
          setRecordToDelete(null);
        }}
        onOk={handleDeleteConfirm}
        recordToDelete={recordToDelete}
      />
    </div>
  );
};

export default Orders;