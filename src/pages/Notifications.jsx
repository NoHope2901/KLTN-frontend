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
      await fetch(`http://localhost:3001/notifications/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // const data = await response.json();
      // setNotifications(data);

      // Cập nhật trạng thái của thông báo trong mảng notifications
      // setNotifications((prevNotifications) =>
      //   prevNotifications.map((notif) => (notif._id === id ? { ...notif, isRead: true } : notif))
      // );
      // getNotification();
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
  }, [readNotif]);

  return (
    <div className="notification">
      <ul className="notification-list">
        {notifications.map((notif) => (
          <li
            key={notif._id}
            onClick={() => {
              setMessage(notif.message);

              handleReadNotification(notif._id);
              setReadNotif(notif._id);
              // getNotification();
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
