import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

// Mock data for both screens
const mockData = {
  orders: [
    { id: '#CM9801', type: 'Order', user: 'Natali Craig', project: 'Landing Page', address: 'Meadow Lane Oakland', status: 'In Progress', date: 'Just now' },
    { id: '#CM9802', type: 'Order', user: 'Kate Morrison', project: 'CRM Admin pages', address: 'Larry San Francisco', status: 'Complete', date: 'A minute ago' },
    { id: '#CM9803', type: 'Order', user: 'Drew Cano', project: 'Client Project', address: 'Bagwell Avenue Ocala', status: 'Pending', date: '1 hour ago' },
    { id: '#CM9804', type: 'Order', user: 'Orlando Diggs', project: 'Admin Dashboard', address: 'Washburn Baton Rouge', status: 'Approved', date: 'Yesterday' },
    { id: '#CM9805', type: 'Order', user: 'Andi Lane', project: 'App Landing Page', address: 'Nest Lane Olivette', status: 'Rejected', date: 'Feb 2, 2023' },
  ],
  products: [
    { id: 'asos-ridley', type: 'Product', name: 'ASOS Ridley High Waist', price: '$79.49', quantity: 82 },
    { id: 'marco-shirt', type: 'Product', name: 'Marco Lightweight Shirt', price: '$128.50', quantity: 37 },
    { id: 'half-sleeve', type: 'Product', name: 'Half Sleeve Shirt', price: '$39.99', quantity: 64 },
    { id: 'lightweight-jacket', type: 'Product', name: 'Lightweight Jacket', price: '$20.00', quantity: 184 },
    { id: 'marco-shoes', type: 'Product', name: 'Marco Shoes', price: '$79.49', quantity: 64 },
  ],
  metrics: [
    { id: 'customers', type: 'Metric', name: 'Customers', value: '3,781', change: '+11.01%' },
    { id: 'orders-metric', type: 'Metric', name: 'Orders', value: '1,219', change: '-0.03%' },
    { id: 'revenue', type: 'Metric', name: 'Revenue', value: '$695', change: '+15.03%' },
    { id: 'growth', type: 'Metric', name: 'Growth', value: '30.1%', change: '+6.08%' },
  ],
  locations: [
    { id: 'new-york', type: 'Location', name: 'New York', value: '72K' },
    { id: 'san-francisco', type: 'Location', name: 'San Francisco', value: '39K' },
    { id: 'sydney', type: 'Location', name: 'Sydney', value: '25K' },
    { id: 'singapore', type: 'Location', name: 'Singapore', value: '61K' },
  ]
};

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('orders'); // 'orders' or 'dashboard'

  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return [];
    }

    setIsSearching(true);
    const searchTerm = query.toLowerCase();
    let results = [];

    // Search in orders
    mockData.orders.forEach(order => {
      if (
        order.id.toLowerCase().includes(searchTerm) ||
        order.user.toLowerCase().includes(searchTerm) ||
        order.project.toLowerCase().includes(searchTerm) ||
        order.address.toLowerCase().includes(searchTerm) ||
        order.status.toLowerCase().includes(searchTerm)
      ) {
        results.push({ ...order, screen: 'orders' });
      }
    });

    // Search in products
    mockData.products.forEach(product => {
      if (
        product.name.toLowerCase().includes(searchTerm) ||
        product.price.toLowerCase().includes(searchTerm)
      ) {
        results.push({ ...product, screen: 'dashboard' });
      }
    });

    // Search in metrics
    mockData.metrics.forEach(metric => {
      if (
        metric.name.toLowerCase().includes(searchTerm) ||
        metric.value.toLowerCase().includes(searchTerm)
      ) {
        results.push({ ...metric, screen: 'dashboard' });
      }
    });

    // Search in locations
    mockData.locations.forEach(location => {
      if (
        location.name.toLowerCase().includes(searchTerm) ||
        location.value.toLowerCase().includes(searchTerm)
      ) {
        results.push({ ...location, screen: 'dashboard' });
      }
    });

    setSearchResults(results);
    setIsSearching(false);
    return results;
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    performSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const getFilteredDataForCurrentScreen = () => {
    if (!searchQuery) return null;

    const currentScreenResults = searchResults.filter(result => result.screen === currentScreen);
    return currentScreenResults;
  };


  const value = {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    currentScreen,
    setCurrentScreen,
    handleSearch,
    clearSearch,
    getFilteredDataForCurrentScreen,
    mockData
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};