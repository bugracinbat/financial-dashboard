import { useState, useRef, useEffect } from "react";
import { BellIcon } from "@heroicons/react/24/outline";

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: 1,
    type: "transaction",
    title: "Payment Received",
    message: "You received $1,250 from John Doe",
    time: "5 min ago",
    read: false,
  },
  {
    id: 2,
    type: "alert",
    title: "Budget Alert",
    message: "You've spent 85% of your monthly budget",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "reminder",
    title: "Bill Due Soon",
    message: "Your credit card payment is due in 3 days",
    time: "3 hours ago",
    read: true,
  },
];

export default function NotificationDropdown() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotifications] = useState(
    notifications.filter((n) => !n.read).length
  );
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={notificationsRef}>
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="p-2.5 rounded-xl glass-hover transition-transform hover:scale-110 relative"
      >
        <BellIcon className="h-5 w-5 text-gray-400" />
        {unreadNotifications > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">
              Notifications
            </h3>
            <span className="text-xs text-blue-600 font-medium">
              {unreadNotifications} new
            </span>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                  !notification.read ? "bg-blue-50/50" : ""
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      !notification.read
                        ? "bg-blue-600"
                        : "bg-gray-300"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 bg-gray-50">
            <button className="w-full text-center text-sm text-blue-600 font-medium hover:text-blue-700">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}