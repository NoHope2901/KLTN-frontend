// src/pages/NotificationsPage.jsx
import React, { useState, useEffect } from "react";
import "./CSS/Notification.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState("");
  const [readNotif, setReadNotif] = useState("");
  const token = localStorage.getItem("token");

  const getNotification = async () => {
    try {
      const response = await fetch("http://localhost:3001/notifications", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  const handleReadNotification = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/notifications/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // if (response.ok) {
      //   getNotification();
      // }
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };
  const handleDeleteNotification = async () => {
    try {
      const response = await fetch("http://localhost:3001/notifications/delete", {
        method: "Delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getNotification();
    } catch (error) {}
  };

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <div className="notification">
      <ul className="notification-list">
        {notifications.map((notif) => (
          <li
            key={notif._id}
            onClick={() => {
              notif.isRead = true;
              setMessage(notif.message);
              handleReadNotification(notif._id);
            }}
            className={notif.isRead ? "" : "bold"}
          >
            {notif.message}
          </li>
        ))}
      </ul>
      <button className="delete-notif" onClick={() => handleDeleteNotification()}>
        Xóa Thông báo đã đọc
      </button>
      <div className="notification-content">{message && <div className="show-content">{message}</div>}</div>
    </div>
  );
};

export default Notifications;
