import { useState, useEffect } from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Headerbar from "./components/HeadBar/Headbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Orders from "./pages/Orders/Orders";
import { SearchProvider } from "./contexts/SearchContext";
import './App.css'
import NotificationPanel from "./components/NotificationPanel/NotificationPanel";

const { Content } = Layout;

function useBreadcrumb() {
  const location = useLocation();
  const [breadcrumb, setBreadcrumb] = useState({ main: 'Dashboards', current: 'Default' });

  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);

    if (pathSegments.length === 0) {
      setBreadcrumb({ main: 'Dashboards', current: 'Default' });
      return;
    }

    const routes = {
      '': { main: 'Dashboards', current: 'Default' },
      'orders': { main: 'eCommerce', current: 'Orders' },
      'profile': { main: 'Pages', current: 'User Profile' },
      'overview': { main: 'User Profile', current: 'Overview' },
      'projects': { main: 'User Profile', current: 'Projects' },
      'campaigns': { main: 'User Profile', current: 'Campaigns' },
      'documents': { main: 'User Profile', current: 'Documents' },
      'followers': { main: 'User Profile', current: 'Followers' },
    };

    const lastSegment = pathSegments[pathSegments.length - 1];
    const breadcrumbData = routes[lastSegment] || { 
      main: pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1), 
      current: lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)
    };

    setBreadcrumb(breadcrumbData);
  }, [location.pathname]);

  return breadcrumb;
}

function AppContent() {
  const [theme, setTheme] = useState("light");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const breadcrumb = useBreadcrumb();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleNotification = () => {
    setNotificationOpen(!notificationOpen);
  };

  const closeNotification = () => {
    setNotificationOpen(false);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    const layout = document.querySelector(".ant-layout");
    if (layout) layout.style.backgroundColor = theme === "dark" ? "rgba(28,28,28,1)" : "#ffffff";

    const content = document.querySelector(".ant-layout-content");
    if (content) content.style.backgroundColor = theme === "dark" ? "rgba(28,28,28,1)" : "#ffffff";
  }, [theme]);

  return (
    <SearchProvider>
      <Layout style={{
        minHeight: "100vh",
        backgroundColor: theme === "dark" ? "rgba(28,28,28,1)" : "#ffffff",
        transition: "background-color 0.3s ease"
      }}>
        <Sidebar 
          theme={theme}
          collapsed={sidebarCollapsed}
        />
        <Layout>
          <Headerbar 
            theme={theme}
            setTheme={setTheme}
            onToggleSidebar={toggleSidebar}
            onToggleNotification={toggleNotification}
            notificationOpen={notificationOpen}
            breadcrumb={breadcrumb}
          />
          <Content 
            style={{
              margin: "16px",
              transition: "margin-left 0.3s ease"
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard theme={theme} />} />
              <Route path="/orders" element={<Orders theme={theme} />} />
            </Routes>
          </Content>
        </Layout>
        
        <NotificationPanel 
          isOpen={notificationOpen}
          onClose={closeNotification}
          theme={theme}
        />
      </Layout>
    </SearchProvider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;