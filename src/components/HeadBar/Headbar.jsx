import { Layout, Input } from "antd";
import { ReactComponent as SidePanelLeftIcon } from "../../assets/icons/sidepanelLeft.svg";
import { ReactComponent as SidePanelRightIcon } from "../../assets/icons/sidepanelRight.svg";
import { ReactComponent as StarIcon } from "../../assets/icons/star.svg";
import { ReactComponent as SunIcon } from "../../assets/icons/sun.svg";
import { ReactComponent as RefreshIcon } from "../../assets/icons/refresh.svg";
import { ReactComponent as BellIcon } from "../../assets/icons/bell.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import './Headbar.css'
import { useState, useEffect } from 'react';

const { Header } = Layout;

export default function HeaderBar({ theme, setTheme, onToggleSidebar, onToggleNotification, notificationOpen, breadcrumb }) {
  // Initialize state with function to read from localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("favorites");
      // Parse the saved value or return empty array if null/undefined
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return [];
    }
  });

  // Get current page from breadcrumb or fallback to pathname
  // Normalize the path to ensure consistent comparison
  const getCurrentPage = () => {
    const page = window.location.pathname;
    // Remove trailing slashes for consistency
    return page.replace(/\/+$/, '');
  };
  
  const currentPage = getCurrentPage();
  const isFavorite = favorites.includes(currentPage);
  
  // Save to localStorage whenever favorites change
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

  return (
    <Header className={`header ${theme}`}>
      {/* Left Section - Navigation */}
      <div className="header-left">
        {/* Menu Icon */}
        <button 
          className={`header-button ${theme}`}
          onClick={onToggleSidebar}
        >
          <SidePanelLeftIcon className="header-icon" style={{fill: theme === "light" ? "inherit" : "rgba(255, 255, 255, 1)",
    stroke: theme === "light" ? "inherit" : "rgba(255, 255, 255, 1)"}} />
        </button>
        {/* Star/Favorite Icon */}
        <button 
          className={`header-button ${theme}`}
          onClick={toggleFavorite}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          style={{ 
            backgroundColor: isFavorite ? 'rgba(255, 193, 7, 0.2)' : 'transparent',
            borderColor: isFavorite ? '#ffc107' : 'transparent',
            
          }}
        >
          <StarIcon 
            className="header-icon" 
            style={{ 
              fill: isFavorite ? '#ffc107' : 'currentColor',
              stroke: isFavorite ? '#ffc107' : 'currentColor',
              fill: theme === "light" ? "inherit" : "rgba(255, 255, 255, 1)",
              stroke: theme === "light" ? "inherit" : "rgba(255, 255, 255, 1)"
            }}
          />
        </button>
        {/* Breadcrumb */}
        <div className={`breadcrumb ${theme}`}>
          <span className={`breadcrumb-item ${theme}`}>Dashboards</span>
          <span className={`breadcrumb-separator ${theme}`}>/</span>
          <span className={`breadcrumb-current ${theme}`}>
            Default
          </span>
        </div>
      </div>
      {/* Center Section - Search */}
      <div className="header-center">
        <Input
          placeholder="Search"
          prefix={<SearchIcon className="search-icon" style={{fill: theme === "light" ? "inherit" : "rgba(255, 255, 255, 0.2)",
              stroke: theme === "light" ? "inherit" : "rgba(255, 255, 255, 0.2)"}}/>}
          suffix={
            <span className={`search-shortcut ${theme}`}>
              ⌘/
            </span>
          }
          className={`search-input ${theme}`}
        />
      </div>
      {/* Right Section - Actions */}
      <div className="header-right">
        {/* Theme Toggle */}
        <button 
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className={`header-action-button ${theme}`}
        >
          <SunIcon className="header-icon" style={{fill: theme === "light" ? "inherit" : "rgba(255, 255, 255, 1)",
    stroke: theme === "light" ? "inherit" : "rgba(255, 255, 255, 1)"}}/>
        </button>
        {/* History/Clock Icon */}
        <button className={`header-action-button ${theme}`} onClick={handleRefresh}>
          <RefreshIcon className="header-icon" style={{fill: theme === "light" ? "inherit" : "rgba(255, 255, 255, 1)",
    stroke: theme === "light" ? "inherit" : "rgba(255, 255, 255, 1)"}}/>
        </button>
        {/* Notifications */}
        <button 
          className={`header-action-button notification-button ${theme}`}
          onClick={onToggleNotification}
        >
          <BellIcon className="header-icon" style={{fill: theme === "light" ? "inherit" : "rgba(255, 255, 255, 1)",
    stroke: theme === "light" ? "inherit" : "rgba(255, 255, 255, 1)"}}/>
          {/* Notification badge */}
          <span className={`notification-badge ${theme}`}></span>
        </button>
        {/* Menu Grid Icon */}
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