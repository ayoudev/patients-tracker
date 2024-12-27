import { useState, useEffect } from "react";
import Header from "../components/common/Header";

const AlertPage = () => {
  const [notifications, setNotifications] = useState([]); // State to store notifications
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch notifications from the backend
    const fetchNotifications = async () => {
      try {
        const response = await fetch("http://localhost:8080/notifications");

        if (!response.ok) {
          console.error("Failed to fetch notifications:", response.status);
          return;
        }

        const data = await response.json();
        
        // Sort notifications by timestamp (newest first)
        const sortedNotifications = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        // Get only the last 5 notifications
        setNotifications(sortedNotifications.slice(0, 5)); // Limit to the 5 most recent notifications
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchNotifications();
  }, []); // Fetch once when the component mounts

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Alerts" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <h2 className="text-xl font-semibold text-white-800 mb-4">Notifications</h2>

        {loading ? (
          <p className="text-gray-600">Loading notifications...</p>
        ) : notifications.length > 0 ? (
          <ul className="space-y-4">
            {notifications.map((notification, index) => (
              <li
                key={index}
                className="bg-red-500 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-red-700 flex items-center space-x-4 cursor-pointer hover:shadow-xl transition"
              >
                <p>
                  <strong>Patient:</strong> {notification.patientName || "Unknown"}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(notification.timestamp).toLocaleString()}
                </p>
                <p>
                  <strong>Details:</strong> {notification.message}
                </p>
                <p>
                  <strong>Coordinates:</strong> {`(${notification.latitude}, ${notification.longitude})`}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No notifications to display.</p>
        )}
      </main>
    </div>
  );
};

export default AlertPage;
