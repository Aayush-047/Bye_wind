import React, { useState, useEffect } from 'react';
import { Table, Form, message } from 'antd';
import { useOrdersData, useOrdersFilters } from '../../components/Orders/hooks/useOrdersData';
import { isCheckboxAllowed } from '../../components/Orders/utils/ordersUtils';
import { useSearch } from '../../contexts/SearchContext'; 
import OrdersHeader from '../../components/Orders/components/OrdersHeader';
import { getOrdersTableColumns } from '../../components/Orders/components/OrdersTableColumns';
import AddEditOrderModal from '../../components/Orders/modals/AddEditOrderModal';
import ViewOrderModal from '../../components/Orders/modals/ViewOrderModal';
import DeleteOrderModal from '../../components/Orders/modals/DeleteOrderModal';
import './Orders.css';

const Orders = ({ theme }) => {
  const { searchQuery, setCurrentScreen, getFilteredDataForCurrentScreen } = useSearch();
  
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

  const columns = getOrdersTableColumns({
    isDark,
    selectedRowKeys,
    setSelectedRowKeys,
    allowedCheckboxData,
    handleAction
  });

  return (
    <div className="orders-container" style={{ backgroundColor: isDark ? 'rgba(28,28,28, 1)' : 'inherit' }}>
      <h3 className="orders-title" style={{ color: isDark ? 'rgba(255, 255, 255, 1)' : 'inherit' }}>
        Order List
        {/* 👈 OPTIONAL: Show search indicator */}
        {searchQuery && (
          <span style={{ 
            fontSize: '14px', 
            fontWeight: 'normal', 
            color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
            marginLeft: '10px'
          }}>
            - Search results for "{searchQuery}"
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
      />

      <Table
        columns={columns}
        dataSource={displayData} 
        pagination={{
          current: currentPage, 
          total: displayData.length, 
          pageSize: 10,
          showSizeChanger: false,
          showQuickJumper: false,
          showTotal: false,
          simple: false,
          className: "pagination-container",
          onChange: (page) => setCurrentPage(page), 
        }}
        className={`custom-table ${isDark ? 'dark-theme' : ''}`} 
        showHeader={true}
        size="middle"
        rowSelection={undefined}
        scroll={{ x: true }}
        rowKey="key"
      />

      <AddEditOrderModal
        visible={isAddModalVisible}
        onCancel={() => {
          setIsAddModalVisible(false);
          form.resetFields();
          setSelectedRecord(null);
        }}
        onOk={() => form.submit()}
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