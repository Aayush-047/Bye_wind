import { Layout, Input } from "antd";
import { ReactComponent as SidePanelLeftIcon } from "../../assets/icons/sidepanelLeft.svg";
import { ReactComponent as SidePanelRightIcon } from "../../assets/icons/sidepanelRight.svg";
import { ReactComponent as StarIcon } from "../../assets/icons/star.svg";
import { ReactComponent as SunIcon } from "../../assets/icons/sun.svg";
import { ReactComponent as RefreshIcon } from "../../assets/icons/refresh.svg";
import { ReactComponent as BellIcon } from "../../assets/icons/bell.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { useSearch } from '../../contexts/SearchContext'; 
import './Headbar.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const { Header } = Layout;

export default function HeaderBar({ theme, setTheme, onToggleSidebar, onToggleNotification, notificationOpen, breadcrumb }) {
  const { searchQuery, handleSearch, searchResults } = useSearch();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();


  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  });

  const getCurrentPage = () => {
    const page = window.location.pathname;
    return page.replace(/\/+$/, '');
  };
  
  const currentPage = getCurrentPage();
  const isFavorite = favorites.includes(currentPage);
  
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  }, [favorites]);

  const toggleFavorite = () => {
    setFavorites((prev) => {
      if (prev.includes(currentPage)) {
        return prev.filter((f) => f !== currentPage);
      } else {
        return [...prev, currentPage];
      }
    });
  };
  
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    handleSearch(value);
    setShowDropdown(value.length > 0);
  };

  const handleSearchFocus = () => {
    if (searchQuery.length > 0) {
      setShowDropdown(true);
    }
  };

  const handleSearchBlur = () => {
    setTimeout(() => setShowDropdown(false), 150);
  };

  const handleResultClick = (result) => {
  if (result.screen === 'orders') {
    navigate('/orders'); 
  } else if (result.screen === 'dashboard') {
    navigate('/');
  }
  setShowDropdown(false);
};

  return (
    <Header className={`header ${theme}`}>
      <div className="header-left">
        <button 
          className={`header-button ${theme}`}
          onClick={onToggleSidebar}
        >
          <SidePanelLeftIcon className="header-icon" style={{fill: theme === "light" ? "inherit" : "rgba(255, 255, 255, 1)",
    stroke: theme === "light" ? "inherit" : "rgba(255, 255, 255, 1)"}} />
        </button>
        <button 
          className={`header-button ${theme} ${isFavorite ? 'favorite-active' : ''}`}
          onClick={toggleFavorite}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <StarIcon 
            className={`header-icon ${isFavorite ? 'star-filled' : ''}` } 
            style={{fill: theme === "light" ? "inherit" : "rgba(255, 255, 255, 1)",
    stroke: theme === "light" ? "inherit" : "rgba(255, 255, 255, 1)"}}
          />
        </button>
        <div className={`breadcrumb ${theme} breadcrumb-responsive`}>
          <span className={`breadcrumb-item ${theme}`}>{breadcrumb.main}</span>
          <span className={`breadcrumb-separator ${theme}`}>/</span>
          <span className={`breadcrumb-current ${theme}`}>
            {breadcrumb.current}
          </span>
        </div>
      </div>
      
      <div className="header-center" style={{ position: 'relative' }}>
        <Input
          placeholder="Search"
          value={searchQuery} 
          onChange={handleSearchChange} 
          onFocus={handleSearchFocus} 
          onBlur={handleSearchBlur} 
          prefix={<SearchIcon className="search-icon" style={{fill: theme === "light" ? "inherit" : "rgba(255, 255, 255, 0.2)",
              stroke: theme === "light" ? "inherit" : "rgba(255, 255, 255, 0.2)"}}/>}
          suffix={
            <span className={`search-shortcut ${theme}`}>
              ⌘/
            </span>
          }
          className={`search-input ${theme}`}
        />
        
        {showDropdown && searchResults.length > 0 && (
          <div className={`search-dropdown ${theme}`} style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: theme === 'light' ? 'white' : '#1f1f1f',
            border: `1px solid ${theme === 'light' ? '#d9d9d9' : '#434343'}`,
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 1000,
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            {searchResults.slice(0, 8).map((result, index) => (
              <div
                key={`${result.type}-${result.id}-${index}`}
                className={`search-result-item ${theme}`}
                style={{
                  padding: '12px 16px',
                  borderBottom: index < Math.min(searchResults.length, 8) - 1 ? `1px solid ${theme === 'light' ? '#f0f0f0' : '#303030'}` : 'none',
                  cursor: 'pointer'
                }}
                onClick={() => handleResultClick(result)}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = theme === 'light' ? '#f5f5f5' : '#262626';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '500', marginBottom: '4px', color: theme === 'light' ? '#000' : '#fff' }}>
                      {result.type === 'Order' && result.id}
                      {result.type === 'Product' && result.name}
                      {result.type === 'Metric' && result.name}
                      {result.type === 'Location' && result.name}
                    </div>
                    <div style={{ fontSize: '12px', color: theme === 'light' ? '#666' : '#999' }}>
                      {result.type === 'Order' && `${result.user} - ${result.project}`}
                      {result.type === 'Product' && result.price}
                      {result.type === 'Metric' && result.value}
                      {result.type === 'Location' && result.value}
                    </div>
                  </div>
                  <span style={{
                    fontSize: '11px',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    backgroundColor: theme === 'light' ? '#f0f0f0' : '#404040',
                    color: theme === 'light' ? '#666' : '#ccc'
                  }}>
                    {result.type}
                  </span>
                </div>
              </div>
            ))}
            {searchResults.length > 8 && (
              <div style={{
                padding: '8px 16px',
                textAlign: 'center',
                fontSize: '12px',
                color: theme === 'light' ? '#666' : '#999',
                borderTop: `1px solid ${theme === 'light' ? '#f0f0f0' : '#303030'}`
              }}>
                +{searchResults.length - 8} more results
              </div>
            )}
          </div>
        )}
      </div>

      <div className="header-right">
        <button 
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className={`header-action-button ${theme}`}
        >
          <SunIcon className="header-icon" style={{fill: theme === "light" ? "inherit" : "rgba(255, 255, 255, 1)",
    stroke: theme === "light" ? "inherit" : "rgba(255, 255, 255, 1)"}}/>
        </button>
        <button className={`header-action-button ${theme}`} onClick={handleRefresh}>
          <RefreshIcon className="header-icon" style={{fill: theme === "light" ? "inherit" : "rgba(255, 255, 255, 1)",
    stroke: theme === "light" ? "inherit" : "rgba(255, 255, 255, 1)"}}/>
        </button>
        <button 
          className={`header-action-button notification-button ${theme}`}
          onClick={onToggleNotification}
        >
          <BellIcon className="header-icon" style={{fill: theme === "light" ? "inherit" : "rgba(255, 255, 255, 1)",
    stroke: theme === "light" ? "inherit" : "rgba(255, 255, 255, 1)"}}/>
          <span className={`notification-badge ${theme}`}></span>
        </button>
        <button 
          className={`header-action-button ${theme}`}
          onClick={onToggleNotification}
        >
          <SidePanelRightIcon className="header-icon" style={{fill: theme === "light" ? "inherit" : "rgba(255, 255, 255, 1)",
    stroke: theme === "light" ? "inherit" : "rgba(255, 255, 255, 1)"}}/>
        </button>
      </div>
    </Header>
  );
}