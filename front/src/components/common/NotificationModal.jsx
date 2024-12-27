// NotificationModal.jsx
import React from 'react';

const NotificationModal = ({ message }) => {
  return (
    <div className="fixed top-0 right-0 m-4 p-4 bg-pink-200 text-white rounded-lg shadow-lg">
      <p>{message}</p>
    </div>
  );
};

export default NotificationModal;
