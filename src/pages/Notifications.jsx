// src/pages/NotificationsPage.jsx
import React, { useState } from "react";
import "./CSS/Notification.css";

const Notifications = () => {
  // const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

<<<<<<< HEAD
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
=======
  // const getNotification = async () => {
  //   try {
  //     const response = await fetch("http//localhost:3001/notifications");
  //     const data = await response.json();
  //     setNotifications(data);
  //   } catch (error) {
  //     console.error("Failed to fetch notifications", error);
  //   }
  // };
>>>>>>> 8201345f1c28830f0898bf566aa05f4a465e4d04

  const handleReadNotification = async (id) => {
    try {
      await fetch(`http://localhost:3001/notifications/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Cập nhật trạng thái của thông báo trong mảng notifications
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) => (notif._id === id ? { ...notif, isRead: true } : notif))
      );
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <div className="notification">
      <ul className="notification-list">
<<<<<<< HEAD
        {notifications.map((notif) => (
          <li
            key={notif._id}
            onClick={() => {
              setMessage(notif.message);
              handleReadNotification(notif._id);
            }}
            className={notif.isRead ? "" : "bold"}
          >
            {notif.message}
          </li>
        ))}
=======
        {/* {notifications.map((notif) => (
           <li key={notif._id}>notif.message</li>
        ))} */}
        {/* console.log(notifications); */}
        <li onClick={(e) => setMessage(e.target.innerHTML)} className="bold">
          message here some thing here very long
        </li>
        <li onClick={(e) => setMessage(e.target.innerHTML)}>message here</li>
        <li onClick={(e) => setMessage(e.target.innerHTML)}>
          message here very short
        </li>
>>>>>>> 8201345f1c28830f0898bf566aa05f4a465e4d04
      </ul>
      <div className="notification-content">
        {message && <div className="show-content">{message}</div>}
      </div>
    </div>
  );
};

export default Notifications;
