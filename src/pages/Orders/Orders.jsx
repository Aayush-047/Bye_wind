import { useState, useEffect, useCallback } from 'react';
import { Table, Input, Checkbox, Button, Dropdown, Menu, Modal, Form, Select, DatePicker, message, Grid } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ReactComponent as Contact1Icon } from '../../assets/icons/contacts1.svg';
import { ReactComponent as Contact2Icon } from '../../assets/icons/contacts2.svg';
import { ReactComponent as Contact3Icon } from '../../assets/icons/contacts3.svg';
import { ReactComponent as Contact4Icon } from '../../assets/icons/contacts4.svg';
import { ReactComponent as Contact5Icon } from '../../assets/icons/contacts5.svg';
import { ReactComponent as Contact6Icon } from '../../assets/icons/contacts6.svg';
import { ReactComponent as Contact7Icon } from '../../assets/icons/contacts7.svg';
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';
import { ReactComponent as FilterIcon } from '../../assets/icons/filter.svg';
import { ReactComponent as SortIcon } from '../../assets/icons/sort.svg';
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as DateIcon } from "../../assets/icons/date.svg";
import { ReactComponent as MoreIcon } from "../../assets/icons/more.svg";
import { OrdersMockData as mockData } from '../../mock/OrdersData';
import './Orders.css';

const { useBreakpoint } = Grid;

const iconMap = {
  'Contact1Icon': Contact1Icon,
  'Contact2Icon': Contact2Icon,
  'Contact3Icon': Contact3Icon,
  'Contact4Icon': Contact4Icon,
  'Contact5Icon': Contact5Icon,
  'Contact6Icon': Contact6Icon,
  'Contact7Icon': Contact7Icon,
};

const Orders = ({theme}) => {
  const screens = useBreakpoint();
  const [searchText, setSearchText] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [statusFilter, setStatusFilter] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isActionModalVisible, setIsActionModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isSortVisible, setIsSortVisible] = useState(false);
  

  const [data, setData] = useState(() => {
    try {
      const savedData = localStorage.getItem('ordersData');
      return savedData ? JSON.parse(savedData) : mockData;
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      return mockData;
    }
  });

  const [filteredData, setFilteredData] = useState(data);

  // Memoized applyFilters function to prevent unnecessary re-renders
  const applyFilters = useCallback((search, statuses, sort, dataToFilter = data) => {
    let filtered = dataToFilter.filter(item =>
      (item.user.name.toLowerCase().includes(search.toLowerCase()) ||
       item.project.toLowerCase().includes(search.toLowerCase()) ||
       item.orderId.toLowerCase().includes(search.toLowerCase()) ||
       item.address.toLowerCase().includes(search.toLowerCase())) &&
      (statuses.length === 0 || statuses.includes(item.status))
    );

    if (sort === 'asc') {
      filtered.sort((a, b) => a.user.name.localeCompare(b.user.name));
    } else if (sort === 'desc') {
      filtered.sort((a, b) => b.user.name.localeCompare(a.user.name));
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [data]); // Only recreate when data changes

  useEffect(() => {
    try {
      localStorage.setItem('ordersData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }, [data]);

  useEffect(() => {
    applyFilters(searchText, statusFilter, sortOrder);
  }, [searchText, sortOrder, statusFilter, applyFilters]);

  // Add this useEffect to fix existing data icon mapping
  useEffect(() => {
    // Fix icon mapping for existing data
    const userIconMap = {
      'Natali Craig': 'Contact7Icon',
      'Kate Morrison': 'Contact5Icon',
      'Drew Cano': 'Contact2Icon',
      'Orlando Diggs': 'Contact3Icon',
      'Andi Lane': 'Contact4Icon',
    };

    const fixedData = data.map(item => {
      const iconKey = userIconMap[item.user.name] || 'Contact1Icon';
      return {
        ...item,
        icon: iconKey
      };
    });

    // Only update if there are changes needed
    if (JSON.stringify(fixedData) !== JSON.stringify(data)) {
      setData(fixedData);
    }
  }, [data]);

  const getStatusColor = (status) => {
    const colors = {
      'In Progress': 'rgba(138, 140, 217, 1)',
      'Complete': 'rgba(74, 167, 133, 1)',
      'Pending': 'rgba(89, 168, 212, 1)',
      'Approved': 'rgba(255, 197, 85, 1)',
      'Rejected': 'rgba(28, 28, 28, 0.4)'
    };
    return colors[status] || '#6B7280';
  };

  const isCheckboxAllowed = (status) => {
    return status === 'Rejected' || status === 'Approved';
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleStatusFilter = (statuses) => {
    setStatusFilter(statuses);
    if (!screens.md) {
      setIsFilterVisible(false);
    }
  };

  const handleSort = (order) => {
    setSortOrder(order);
    if (!screens.md) {
      setIsSortVisible(false);
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
      // Fix the user icon mapping - use the same mapping as in mock data
      const userIconMap = {
        'Natali Craig': 'Contact7Icon',
        'Kate Morrison': 'Contact5Icon',
        'Drew Cano': 'Contact2Icon',
        'Orlando Diggs': 'Contact3Icon',
        'Andi Lane': 'Contact4Icon',
        'Add new user': 'Contact1Icon', // Default for new users
      };

      const newOrder = {
        key: (data.length + 1).toString(),
        orderId: `#CM98${(data.length + 1).toString().padStart(2, '0')}`,
        user: { name: values.userName },
        project: values.project,
        address: values.address,
        date: values.date ? values.date.format('MMM D, YYYY') : 'Just now',
        status: values.status,
        icon: userIconMap[values.userName] || 'Contact1Icon' // Use mapping or default
      };
      
      const updatedData = [...data, newOrder];
      setData(updatedData);
      applyFilters(searchText, statusFilter, sortOrder, updatedData);
      
      setIsAddModalVisible(false);
      form.resetFields();
      message.success('Order added successfully!');
    }
  };

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

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    setRecordToDelete(null);
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

  const isDark = theme === 'dark';

  const columns = [
    {
      title: (
        <Checkbox
          indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < filteredData.filter(item => isCheckboxAllowed(item.status)).length}
          checked={selectedRowKeys.length === filteredData.filter(item => isCheckboxAllowed(item.status)).length && filteredData.filter(item => isCheckboxAllowed(item.status)).length > 0}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRowKeys(filteredData.filter(item => isCheckboxAllowed(item.status)).map(item => item.key));
            } else {
              setSelectedRowKeys([]);
            }
          }}
        />
      ),
      dataIndex: 'checkbox',
      width: 50,
      render: (_, record) => (
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
      responsive: ['md'],
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
      responsive: ['md'],
    },
    {
      title: <span style={{ color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(28, 28, 28, 0.4)' }}>Address</span>,
      dataIndex: 'address',
      key: 'address',
      width: 200,
      render: (text) => <span>{text}</span>,
      responsive: ['lg'],
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
      responsive: ['sm'],
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

  // Mobile card view for small screens
  const mobileCardView = () => {
    return filteredData.map(record => {
      const IconComponent = iconMap[record.icon] || Contact1Icon;
      const statusColor = getStatusColor(record.status);
      
      return (
        <div key={record.key} className="mobile-order-card">
          <div className="mobile-card-header">
            <div className="mobile-user-info">
              <div className="user-icon-container">
                <IconComponent width={20} height={20} className="user-icon" />
              </div>
              <div>
                <div className="mobile-user-name">{record.user.name}</div>
                <div className="mobile-order-id">{record.orderId}</div>
              </div>
            </div>
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
              <div className="mobile-action-button">
                <MoreIcon className="action-icon" />
              </div>
            </Dropdown>
          </div>
          
          <div className="mobile-card-details">
            <div className="mobile-detail-row">
              <span className="mobile-detail-label">Project:</span>
              <span>{record.project}</span>
            </div>
            <div className="mobile-detail-row">
              <span className="mobile-detail-label">Date:</span>
              <div className="date-cell">
                <DateIcon className="date-icon" />
                <span>{record.date}</span>
              </div>
            </div>
            <div className="mobile-detail-row">
              <span className="mobile-detail-label">Status:</span>
              <div className="status-cell">
                <div 
                  className="status-dot"
                  style={{ backgroundColor: statusColor }}
                ></div>
                <span style={{ color: statusColor }}>{record.status}</span>
              </div>
            </div>
          </div>
          
          {isCheckboxAllowed(record.status) && (
            <div className="mobile-checkbox">
              <Checkbox
                checked={selectedRowKeys.includes(record.key)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRowKeys([...selectedRowKeys, record.key]);
                  } else {
                    setSelectedRowKeys(selectedRowKeys.filter(key => key !== record.key));
                  }
                }}
              >
                Select order
              </Checkbox>
            </div>
          )}
        </div>
      );
    });
  };

  const inputStyle = {
    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
    borderColor: isDark ? 'rgba(255, 255, 255, 0.4)' : '#d9d9d9',
    color: isDark ? 'rgba(255, 255, 255, 1)' : 'inherit'
  };

  const buttonStyle = {
    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
    borderColor: isDark ? 'rgba(255, 255, 255, 0.4)' : '#d9d9d9',
    color: isDark ? 'rgba(255, 255, 255, 1)' : 'inherit'
  };

  return (
    <div className="orders-container" style={{ backgroundColor: isDark ? 'rgba(28,28,28, 1)' : 'inherit' }}>
      <h3 className="orders-title" style={{ color: isDark ? 'rgba(255, 255, 255, 1)' : 'inherit' }}>Order List</h3>
      
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
          
          {screens.md ? (
            <>
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
            </>
          ) : (
            <>
              <Button 
                icon={<FilterIcon className="header-icon" style={{ color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'inherit' }} />} 
                className="header-icon-button"
                style={buttonStyle}
                onClick={() => setIsFilterVisible(!isFilterVisible)}
              />
              <Button 
                icon={<SortIcon className="header-icon"style={{ color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'inherit' }} />} 
                className="header-icon-button"
                style={buttonStyle}
                onClick={() => setIsSortVisible(!isSortVisible)}
              />
            </>
          )}
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

      {/* Mobile filter and sort options */}
      {!screens.md && (
        <div className={`mobile-filters ${isFilterVisible ? 'visible' : ''}`}>
          <div className="filter-section">
            <div className="filter-title">Filter by Status</div>
            <div className="filter-options">
              {['all', 'In Progress', 'Complete', 'Pending', 'Approved', 'Rejected'].map(status => (
                <div
                  key={status}
                  className={`filter-option ${statusFilter.includes(status) || (status === 'all' && statusFilter.length === 0) ? 'active' : ''}`}
                  onClick={() => {
                    if (status === 'all') {
                      handleStatusFilter([]);
                    } else {
                      const currentFilters = statusFilter.includes(status) 
                        ? statusFilter.filter(f => f !== status)
                        : [...statusFilter, status];
                      handleStatusFilter(currentFilters);
                    }
                  }}
                >
                  {status === 'all' ? 'All Statuses' : status}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!screens.md && (
        <div className={`mobile-filters ${isSortVisible ? 'visible' : ''}`}>
          <div className="filter-section">
            <div className="filter-title">Sort by</div>
            <div className="filter-options">
              {['', 'asc', 'desc'].map(sort => (
                <div
                  key={sort}
                  className={`filter-option ${sortOrder === sort ? 'active' : ''}`}
                  onClick={() => handleSort(sort)}
                >
                  {sort === 'asc' ? 'Name A-Z' : sort === 'desc' ? 'Name Z-A' : 'Default'}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {screens.md ? (
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            current: currentPage, 
            total: filteredData.length, 
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
        />
      ) : (
        <div className="mobile-orders-list">
          {mobileCardView()}
          <div className="mobile-pagination">
            <Button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            <span>Page {currentPage}</span>
            <Button 
              disabled={filteredData.length <= currentPage * 10}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      <Modal
        title={selectedRecord ? "Edit Order" : "Add New Order"}
        open={isAddModalVisible}
        onOk={() => form.submit()}
        onCancel={() => {
          setIsAddModalVisible(false);
          form.resetFields();
          setSelectedRecord(null);
        }}
        width={screens.xs ? "90%" : 600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddOrder}
        >
          <Form.Item
            name="userName"
            label="User Name"
            rules={[{ required: true, message: 'Please enter user name' }]}
          >
            <Input placeholder="Enter user name" />
          </Form.Item>
          
          <Form.Item
            name="project"
            label="Project"
            rules={[{ required: true, message: 'Please enter project name' }]}
          >
            <Input placeholder="Enter project name" />
          </Form.Item>
          
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter address' }]}
          >
            <Input placeholder="Enter address" />
          </Form.Item>
          
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select placeholder="Select status">
              <Select.Option value="In Progress">In Progress</Select.Option>
              <Select.Option value="Complete">Complete</Select.Option>
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="Approved">Approved</Select.Option>
              <Select.Option value="Rejected">Rejected</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="date"
            label="Date"
          >
            <DatePicker className="w-full" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Order Details"
        open={isActionModalVisible}
        onCancel={() => setIsActionModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsActionModalVisible(false)}>
            Close
          </Button>
        ]}
        width={screens.xs ? "90%" : 500}
      >
        {selectedRecord && (
          <div className="space-y-4">
            <div><strong>Order ID:</strong> {selectedRecord.orderId}</div>
            <div><strong>User:</strong> {selectedRecord.user.name}</div>
            <div><strong>Project:</strong> {selectedRecord.project}</div>
            <div><strong>Address:</strong> {selectedRecord.address}</div>
            <div><strong>Date:</strong> {selectedRecord.date}</div>
            <div><strong>Status:</strong> <span style={{ color: getStatusColor(selectedRecord.status) }}>{selectedRecord.status}</span></div>
          </div>
        )}
      </Modal>

      <Modal
        title="Confirm Delete"
        open={isDeleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        okText="Delete"
        okType="danger"
        cancelText="Cancel"
        width={screens.xs ? "90%" : 520}
      >
        {recordToDelete && (
          <p>Are you sure you want to delete order {recordToDelete.orderId}?</p>
        )}
      </Modal>
    </div>
  );
};

export default Orders;