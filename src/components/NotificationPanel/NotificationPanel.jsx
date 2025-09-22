import React from 'react';
import { Layout } from "antd";
import { notifications, activities, contacts } from '../../mock/notificationData';
import './NotificationPanel.css';

const { Sider } = Layout;

export default function NotificationPanel({ isOpen, onClose, theme = "light" }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div className={`notification-panel-overlay ${isOpen ? 'notification-panel-overlay--active' : ''}`} onClick={onClose} />
      
      {/* Desktop Sider and Mobile Modal */}
      <Sider
        width={280}
        theme={theme === "dark" ? "dark" : "light"}
        className={`notification-panel ${theme === "dark" ? "notification-panel--dark" : ""} ${isOpen ? 'notification-panel--open' : ''}`}
      >
        <div className="notification-panel__header">
          <h3 className="notification-panel__title" style={{color: theme === "dark" ? 'rgba(255,255,255,1)' : 'inherit'}}>
            Notifications
          </h3>
          {/* Close button for mobile */}
          <button 
            className={`notification-panel__close ${theme === "dark" ? "notification-panel__close--dark" : ""}`}
            onClick={onClose}
            aria-label="Close notifications"
          >
            ×
          </button>
        </div>

        <div className="notification-panel__content">
          <div className="notification-panel__section">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`notification-item ${theme === "dark" ? "notification-item--dark" : ""}`}
              >
                <div 
                  className={`notification-item__icon ${theme === "dark" ? "notification-item__icon--dark" : ""}`}
                  style={{
                    backgroundColor: theme === 'dark' ? undefined : notification.iconBg,
                    color: theme === 'dark' ? undefined : notification.iconColor,
                  }}
                >
                  {React.cloneElement(notification.icon, { style: { fontSize: '13px' } })}
                </div>
                <div className="notification-item__content">
                  <p className={`notification-item__title ${theme === "dark" ? "notification-item__title--dark" : ""}`}>
                    {notification.title}
                  </p>
                  <p className={`notification-item__time ${theme === "dark" ? "notification-item__time--dark" : ""}`}>
                    {notification.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="notification-panel__section">
            <h3 className={`notification-panel__section-title ${theme === "dark" ? "notification-panel__section-title--dark" : ""}`}>
              Activities
            </h3>
            {activities.map((activity, index) => (
              <div 
                key={activity.id}
                className={`activity-item ${theme === "dark" ? "activity-item--dark" : ""}`}
              >
                {index < activities.length - 1 && (
                    <div className={`activity-item__line ${theme === "dark" ? "activity-item__line--dark" : ""}`} />
                )}
                {typeof activity.icon === 'string' ? (
                  <img 
                    src={activity.icon || activity.avatar} 
                    alt="User"
                    className="activity-item__avatar"
                  />
                ) : (
                  <div className="activity-item__avatar-wrapper">
                    {activity.icon || activity.avatar}
                  </div>
                )}
                <div className="activity-item__content">
                  <p className={`activity-item__title ${theme === "dark" ? "activity-item__title--dark" : ""}`}>
                    {activity.title}
                  </p>
                  <p className={`activity-item__time ${theme === "dark" ? "activity-item__time--dark" : ""}`}>
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className={`notification-panel__section-title ${theme === "dark" ? "notification-panel__section-title--dark" : ""}`}>
              Contacts
            </h3>
            {contacts.map((contact) => (
              <div 
                key={contact.id}
                className={`contact-item ${theme === "dark" ? "contact-item--dark" : ""}`}
              >
                {typeof contact.icon === 'string' ? (
                  <img 
                    src={contact.icon || contact.avatar} 
                    alt={contact.name}
                    className="contact-item__avatar"
                  />
                ) : (
                  <div className="contact-item__avatar-wrapper">
                    {contact.icon || contact.avatar}
                  </div>
                )}
                <span className={`contact-item__name ${theme === "dark" ? "contact-item__name--dark" : ""}`}>
                  {contact.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Sider>
    </>
  );
}