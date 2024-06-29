// src/pages/NotificationsPage.jsx
import React, { useState } from "react";
import "./CSS/Notification.css";

const Notifications = () => {
  // const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState("");

  // const getNotification = async () => {
  //   try {
  //     const response = await fetch("http//localhost:3001/notifications");
  //     const data = await response.json();
  //     setNotifications(data);
  //   } catch (error) {
  //     console.error("Failed to fetch notifications", error);
  //   }
  // };

  // useEffect(() => {
  //   getNotification();
  // }, []);
  return (
    <div className="notification">
      <ul className="notification-list">
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
      </ul>
      <div className="notification-content">
        {message && <div className="show-content">{message}</div>}
      </div>
    </div>
  );
};

export default Notifications;
