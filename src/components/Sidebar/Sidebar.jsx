import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as ProfileIcon } from "../../assets/icons/profile.svg";
import { ReactComponent as DashboardIcon } from "../../assets/icons/default.svg";
import { ReactComponent as ShoppingcartIcon } from "../../assets/icons/shoppingcart.svg";
import { ReactComponent as FileIcon } from "../../assets/icons/file.svg";
import { ReactComponent as BookIcon } from "../../assets/icons/book.svg";
import { ReactComponent as AccountIcon } from "../../assets/icons/account.svg";
import { ReactComponent as BlogIcon } from "../../assets/icons/blog.svg";
import { ReactComponent as CorporateIcon } from "../../assets/icons/corporate.svg";
import { ReactComponent as ProfileSideBarIcon } from "../../assets/icons/profile-sidebar.svg";
import { ReactComponent as SocailIcon } from "../../assets/icons/social.svg";
import './Sidebar.css';

const { Sider } = Layout;

export default function Sidebar({ theme = "light", collapsed = false }) {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  let selectedKey = pathSegments[pathSegments.length - 1] || "default";

  if (collapsed) return null;

  return (
    <Sider
      width={212}
      theme={theme}
      collapsed={collapsed}
      collapsedWidth={0}
      className={`sidebar ${theme}`}
      style={theme === 'dark' ? { backgroundColor: 'rgba(28, 28, 28, 1)' } : {}}
    >
      {/* Header */}
      <div 
        className="sidebar-header" 
        style={{
          backgroundColor: theme === 'dark' ? 'rgba(28, 28, 28, 1)' : 'inherit',
          color: theme === 'dark' ? '#ffffff' : 'inherit',
        }}
      >
        <ProfileIcon 
          className="sidebar-header-icon"
        />
        <span 
          className="sidebar-header-text" 
          style={theme === 'dark' ? { color: 'rgba(255, 255, 255, 1)' } : {}}
        >
          ByeWind
        </span>
      </div>

      {/* Favorites/Recently Section */}
      <div 
        className="sidebar-section" 
      >
        <div className="sidebar-tabs">
          <div className="sidebar-tab-wrapper">
            <span 
              className="sidebar-tab sidebar-tab-active" 
              style={theme === 'dark' ? { 
                color: 'rgba(255, 255, 255, 0.4)', 
              } : {}}
            >
              Favorites
            </span>
          </div>
          <div className="sidebar-tab-wrapper">
            <span 
              className="sidebar-tab" 
              style={theme === 'dark' ? { 
                color: 'rgba(255, 255, 255, 0.2)',
                backgroundColor: 'transparent'
              } : {}}
            >
              Recently
            </span>
          </div>
        </div>

        <Menu
          mode="inline"
          theme={theme}
          selectedKeys={[selectedKey]}
          className="sidebar-menu"
          itemSelectedBg={theme === 'dark' ? '#262626' : undefined}
        >
          <Menu.Item
            key="overview"
            icon={<div className="sidebar-dot" style={theme === 'dark' ? { backgroundColor: 'rgba(255, 255, 255, 0.2)' } : {}} />}
            className="sidebar-item"
            style={theme === 'dark' ? { color: 'rgba(255, 255, 255, 1)' } : {}}
          >
            <Link to="/overview" style={theme === 'dark' ? { color: '#d9d9d9' } : {}}>Overview</Link>
          </Menu.Item>
          <Menu.Item
            key="projects"
            icon={<div className="sidebar-dot" style={theme === 'dark' ? { backgroundColor: 'rgba(255, 255, 255, 0.2)' } : {}} />}
            className="sidebar-item"
            style={theme === 'dark' ? { color: 'rgba(255, 255, 255, 1)' } : {}}
          >
            <Link to="/projects" style={theme === 'dark' ? { color: 'rgba(255, 255, 255, 1)' } : {}}>Projects</Link>
          </Menu.Item>
        </Menu>
      </div>

      {/* Main Menu */}
      <Menu
        mode="inline"
        theme={theme}
        selectedKeys={[selectedKey]}
        defaultOpenKeys={["user-profile"]}
        className="sidebar-menu"
        style={theme === 'dark' ? { 
          color: 'rgba(255, 255, 255, 1)',
          '--ant-primary-color': '#262626'
        } : {}}
      >
        {/* Dashboards Section */}
        {theme === 'dark' && (
          <style jsx>{`
            /* Override selected menu item background from sky blue to dark gray */
            .ant-menu-dark .ant-menu-item-selected,
            .ant-menu-dark .ant-menu-submenu-title:hover,
            .ant-menu-dark .ant-menu-item:hover,
            .ant-menu-dark .ant-menu-submenu-selected .ant-menu-submenu-title {
              background-color: rgba(64,64,64,1) !important;
              color: #ffffff !important;
            }
            /* Fix submenu title background when open and selected */
            .ant-menu-dark .ant-menu-submenu-open.ant-menu-submenu-selected .ant-menu-submenu-title {
              background-color: rgba(64,64,64,1) !important;
            }
            /* Change submenu background from dark blue to darker gray */
            .ant-menu-dark .ant-menu-sub.ant-menu-inline {
              background-color: rgba(64,64,64,1) !important;
            }
            /* Set submenu item backgrounds */
            .ant-menu-dark .ant-menu-sub .ant-menu-item {
              background-color: rgba(64,64,64,1) !important;
            }
            /* Override submenu selected item background */
            .ant-menu-dark .ant-menu-sub .ant-menu-item-selected {
              background-color: rgba(64,64,64,1) !important;
            }
            .ant-menu-dark .ant-menu-submenu-arrow {
                color: #ffffff  !important;
              }

              /* CHANGED: Make submenu vertical connecting lines light colored for dark theme */
              .ant-menu-dark.ant-menu-inline .ant-menu-submenu-title::after,
              .ant-menu-dark.ant-menu-inline .ant-menu-item::after {
                border-right-color: #ffffff !important;
              }

              /* CHANGED: Style the vertical line that connects submenu items */
              .ant-menu-dark .ant-menu-sub::before {
                border-left-color: #ffffff  !important;
              }
          `}</style>
        )}
        <Menu.ItemGroup
          title={
            <div 
              className="sidebar-group-title" 
              style={theme === 'dark' ? { 
                color: 'rgba(255, 255, 255, 0.4)',
                letterSpacing: '0.5px',
                marginTop: '16px'
              } : {}}
            >
              Dashboards
            </div>
          }
        >
          <Menu.Item 
            key="default" 
            icon={<DashboardIcon style={theme === 'dark' ? { filter: 'brightness(0) invert(0.8)' } : {}} />} 
            className="sidebar-subitem default"
            style={theme === 'dark' ? { color: 'rgba(255, 255, 255, 1)' } : {}}
          >
            <Link to="/" style={theme === 'dark' ? { color: 'rgba(255, 255, 255, 1)' } : {}}>Default</Link>
          </Menu.Item>
          <Menu.SubMenu 
            key="ecommerce" 
            icon={<ShoppingcartIcon style={theme === 'dark' ? { filter: 'brightness(0) invert(0.8)' } : {}} />} 
            title={<span style={theme === 'dark' ? { color: 'rgba(255, 255, 255, 1)' } : {}}>eCommerce</span>}
            className="sidebar-subitem"
          >
            <Menu.Item key="orders" style={theme === 'dark' ? { color: 'rgba(255, 255, 255, 1)' } : {}}>
              <Link to="/orders" style={theme === 'dark' ? { color: 'rgba(255, 255, 255, 1)' } : {}}>Orders</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu 
            key="projects" 
            icon={<FileIcon style={theme === 'dark' ? { filter: 'brightness(0) invert(0.8)' } : {}} />} 
            title={<span style={theme === 'dark' ? { color: 'rgba(255, 255, 255, 1)' } : {}}>Projects</span>}
            className="sidebar-subitem" 
          />
          <Menu.SubMenu 
            key="courses" 
            icon={<BookIcon style={theme === 'dark' ? { filter: 'brightness(0) invert(0.8)' } : {}} />} 
            title={<span style={theme === 'dark' ? { color: 'rgba(255, 255, 255, 1)' } : {}}>Online Courses</span>}
            className="sidebar-subitem-last" 
          />
        </Menu.ItemGroup>

        {/* Pages Section */}
        <Menu.ItemGroup
          title={
            <div 
              className="sidebar-group-title" 
              style={theme === 'dark' ? { 
                color: 'rgba(255, 255, 255, 0.4)',
                fontSize: '12px',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginTop: '16px'
              } : {}}
            >
              Pages
            </div>
          }
        >
          <Menu.SubMenu 
            key="user-profile" 
            icon={<ProfileSideBarIcon style={theme === 'dark' ? { filter: 'brightness(0) invert(0.8)' } : {}} />} 
            title={<span style={theme === 'dark' ? { color: 'rgba(255, 255, 255, 1)' } : {}}>User Profile</span>}
            className="sidebar-subitem"
          >
            <Menu.Item key="overview" style={theme === 'dark' ? { color: 'rgba(255, 255, 255, 1)' } : {}}>
              <Link to="/profile/overview" style={theme === 'dark' ? { color: 'rgba(255, 255, 255, 1)' } : {}}>Overview</Link>
            </Menu.Item>
            <Menu.Item key="projects" style={theme === 'dark' ? { color: 'rgba(255, 255, 255, 1)' } : {}}>
              <Link to="/profile/projects" style={theme === 'dark' ? { color: 'rgba(255, 255, 255, 1)' } : {}}>Projects</Link>
            </Menu.Item>
            <Menu.Item key="campaigns" style={theme === 'dark' ? { color: 'rgba(255, 255, 255, 1)' } : {}}>
              <Link to="/profile/campaigns" style={theme === 'dark' ? { color: 'rgba(255, 255, 255, 1)' } : {}}>Campaigns</Link>
            </Menu.Item>
            <Menu.Item key="documents" style={theme === 'dark' ? { color: 'rgba(255, 255, 255, 1)' } : {}}>
              <Link to="/profile/documents" style={theme === 'dark' ? { color: 'rgba(255, 255, 255, 1)s' } : {}}>Documents</Link>
            </Menu.Item>
            <Menu.Item key="followers" style={theme === 'dark' ? { color: 'rgba(255, 255, 255, 1)' } : {}}>
              <Link to="/profile/followers" style={theme === 'dark' ? { color: 'rgba(255, 255, 255, 1)' } : {}}>Followers</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu 
            key="Accounts" 
            icon={<AccountIcon style={theme === 'dark' ? { filter: 'brightness(0) invert(0.8)' } : {}} />} 
            title={<span style={theme === 'dark' ? { color: 'rgba(255, 255, 255, 1)' } : {}}>Accounts</span>}
            className="sidebar-subitem" 
          />
          <Menu.SubMenu 
            key="corporate" 
            icon={<CorporateIcon style={theme === 'dark' ? { filter: 'brightness(0) invert(0.8)' } : {}} />} 
            title={<span style={theme === 'dark' ? { color: 'rgba(255, 255, 255, 1)' } : {}}>Corporate</span>}
            className="sidebar-subitem" 
          />
          <Menu.SubMenu 
            key="blog" 
            icon={<BlogIcon style={theme === 'dark' ? { filter: 'brightness(0) invert(0.8)' } : {}} />} 
            title={<span style={theme === 'dark' ? { color: 'rgba(255, 255, 255, 1)' } : {}}>Blog</span>}
            className="sidebar-subitem" 
          />
          <Menu.SubMenu 
            key="social" 
            icon={<SocailIcon style={theme === 'dark' ? { filter: 'brightness(0) invert(0.8)' } : {}} />} 
            title={<span style={theme === 'dark' ? { color: 'rgba(255, 255, 255, 1)' } : {}}>Social</span>}
            className="sidebar-subitem" 
          />
        </Menu.ItemGroup>
      </Menu>
    </Sider>
  );
}