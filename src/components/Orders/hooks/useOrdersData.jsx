import { useState, useEffect, useCallback } from 'react';
import { OrdersMockData as mockData } from '../../../mock/OrdersData';

const userIconMap = {
  'Natali Craig': 'Contact7Icon',
  'Kate Morrison': 'Contact5Icon',
  'Drew Cano': 'Contact2Icon',
  'Orlando Diggs': 'Contact3Icon',
  'Andi Lane': 'Contact4Icon',
};

export const useOrdersData = () => {
  const [data, setData] = useState(() => {
    try {
      const savedData = localStorage.getItem('ordersData');
      let initialData = savedData ? JSON.parse(savedData) : mockData;
      
      return initialData.map((item, index) => ({
        ...item,
        key: item.key || `order_${index + 1}`,
        icon: item.icon || userIconMap[item.user.name] || 'Contact1Icon'
      })).filter(Boolean);
    } catch (error) {
      return mockData.map((item, index) => ({
        ...item,
        key: item.key || `order_${index + 1}`,
        icon: item.icon || userIconMap[item.user.name] || 'Contact1Icon'
      }));
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ordersData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }, [data]);

  return [data, setData];
};

export const useOrdersFilters = (data) => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const applyFilters = useCallback((search, statuses, sort, dataToFilter = data) => {
    let filtered = [...dataToFilter];
    
    if (search.trim()) {
      filtered = filtered.filter(item => {
        if (!item || !item.user || !item.user.name) return false;
        
        const searchLower = search.toLowerCase();
        return (
          item.user.name.toLowerCase().includes(searchLower) ||
          item.project.toLowerCase().includes(searchLower) ||
          item.orderId.toLowerCase().includes(searchLower) ||
          item.address.toLowerCase().includes(searchLower)
        );
      });
    }
    
    if (statuses.length > 0) {
      filtered = filtered.filter(item => statuses.includes(item.status));
    }
    
    if (sort === 'asc') {
      filtered.sort((a, b) => a.user.name.localeCompare(b.user.name));
    } else if (sort === 'desc') {
      filtered.sort((a, b) => b.user.name.localeCompare(a.user.name));
    }
    
    setFilteredData(filtered);
  }, [data]);

  useEffect(() => {
    applyFilters(searchText, statusFilter, sortOrder);
  }, [searchText, statusFilter, sortOrder, applyFilters]);

  return {
    searchText,
    setSearchText,
    statusFilter,
    setStatusFilter,
    sortOrder,
    setSortOrder,
    filteredData,
    applyFilters
  };
};