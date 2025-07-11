import { BellIcon } from "@heroicons/react/24/outline";

interface Notification {
  id: number;
  type: string;
  message: string;
  amount?: string;
  time: string;
  isNew: boolean;
}

interface NotificationPanelProps {
  notifications: Notification[];
  show: boolean;
  onToggle: () => void;
}

export default function NotificationPanel({
  notifications,
  show,
  onToggle,
}: NotificationPanelProps) {
  const hasNewNotifications = notifications.some((n) => n.isNew);

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`p-2 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors relative ${
          hasNewNotifications ? "notification-pulse" : ""
        }`}
      >
        <BellIcon className="h-5 w-5" />
        {hasNewNotifications && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
        )}
      </button>
      {show && (
        <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 animate-in slide-in-from-top-2">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
          </div>
          <div className="p-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg mb-2 transition-colors ${
                  notification.isNew ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      {notification.message}
                    </p>
                    {notification.amount && (
                      <p className="text-lg font-semibold text-green-600 mt-1">
                        {notification.amount}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {notification.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}