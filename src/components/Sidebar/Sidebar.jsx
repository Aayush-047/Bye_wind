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
      className="sidebar"
    >
      {/* Header */}
      <div className="sidebar-header">
        <ProfileIcon className="sidebar-header-icon" />
        <span className="sidebar-header-text">ByeWind</span>
      </div>

      {/* Favorites/Recently Section */}
      <div className="sidebar-section">
        <div className="sidebar-tabs">
          <div className="sidebar-tab-wrapper">
            <span className="sidebar-tab sidebar-tab-active">Favorites</span>
          </div>
          <div className="sidebar-tab-wrapper">
            <span className="sidebar-tab">Recently</span>
          </div>
        </div>

        <Menu
          mode="inline"
          theme={theme}
          selectedKeys={[selectedKey]}
          className="sidebar-menu"
        >
          <Menu.Item
            key="overview"
            icon={<div className="sidebar-dot" />}
            className="sidebar-item"
          >
            <Link to="/overview">Overview</Link>
          </Menu.Item>
          <Menu.Item
            key="projects"
            icon={<div className="sidebar-dot" />}
            className="sidebar-item"
          >
            <Link to="/projects">Projects</Link>
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
      >
        {/* Dashboards Section */}
        <Menu.ItemGroup
          title={<div className="sidebar-group-title">Dashboards</div>}
        >
          <Menu.Item key="default" icon={<DashboardIcon />} className="sidebar-subitem default">
            <Link to="/">Default</Link>
          </Menu.Item>
          <Menu.SubMenu key="ecommerce" icon={<ShoppingcartIcon />} title="eCommerce" className="sidebar-subitem">
            <Menu.Item key="orders"><Link to="/orders">Orders</Link></Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="projects" icon={<FileIcon />} title="Projects" className="sidebar-subitem" />
          <Menu.SubMenu key="courses" icon={<BookIcon />} title="Online Courses" className="sidebar-subitem-last" />
        </Menu.ItemGroup>

        {/* Pages Section */}
        <Menu.ItemGroup
          title={<div className="sidebar-group-title">Pages</div>}
        >
          <Menu.SubMenu key="user-profile" icon={<ProfileSideBarIcon />} title="User Profile" className="sidebar-subitem">
            <Menu.Item key="overview"><Link to="/profile/overview">Overview</Link></Menu.Item>
            <Menu.Item key="projects"><Link to="/profile/projects">Projects</Link></Menu.Item>
            <Menu.Item key="campaigns"><Link to="/profile/campaigns">Campaigns</Link></Menu.Item>
            <Menu.Item key="documents"><Link to="/profile/documents">Documents</Link></Menu.Item>
            <Menu.Item key="followers"><Link to="/profile/followers">Followers</Link></Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="Accounts" icon={<AccountIcon />} title="Accounts" className="sidebar-subitem" />
          <Menu.SubMenu key="corporate" icon={<CorporateIcon />} title="Corporate" className="sidebar-subitem" />
          <Menu.SubMenu key="blog" icon={<BlogIcon />} title="Blog" className="sidebar-subitem" />
          <Menu.SubMenu key="social" icon={<SocailIcon />} title="Social" className="sidebar-subitem" />
        </Menu.ItemGroup>
      </Menu>
    </Sider>
  );
}
