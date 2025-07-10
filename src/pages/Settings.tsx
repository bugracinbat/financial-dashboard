import { useState } from "react";
import {
  UserCircleIcon,
  CameraIcon,
  BellIcon,
  ShieldCheckIcon,
  EyeIcon,
  EyeSlashIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  LockClosedIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";

type ProfileFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  bio: string;
};

type PreferencesFormData = {
  currency: string;
  language: string;
  timezone: string;
  dateFormat: string;
  numberFormat: string;
};

type SecurityFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type NotificationSettings = {
  emailTransactions: boolean;
  emailWeeklyReports: boolean;
  emailSecurityAlerts: boolean;
  pushTransactions: boolean;
  pushBudgetAlerts: boolean;
  pushSecurityAlerts: boolean;
  smsSecurityAlerts: boolean;
  smsLargeTransactions: boolean;
};

const initialProfile = {
  firstName: "Charlotte",
  lastName: "Reed",
  email: "charlotte.reed@example.com",
  phone: "+1 (555) 123-4567",
  dateOfBirth: "1990-01-20",
  address: "123 Main Street",
  city: "San Francisco",
  country: "United States",
  postalCode: "94105",
  bio: "Financial analyst passionate about smart investing and budgeting.",
};

const initialPreferences = {
  currency: "USD",
  language: "en",
  timezone: "America/New_York",
  dateFormat: "MM/DD/YYYY",
  numberFormat: "1,234.56",
};

const initialNotifications: NotificationSettings = {
  emailTransactions: true,
  emailWeeklyReports: true,
  emailSecurityAlerts: true,
  pushTransactions: false,
  pushBudgetAlerts: true,
  pushSecurityAlerts: true,
  smsSecurityAlerts: false,
  smsLargeTransactions: true,
};

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
];

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "ja", name: "日本語" },
  { code: "zh", name: "中文" },
];

const timezones = [
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
  { value: "Europe/Paris", label: "Central European Time (CET)" },
  { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
  { value: "Asia/Shanghai", label: "China Standard Time (CST)" },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginSessions] = useState([
    {
      id: "1",
      device: "MacBook Pro",
      location: "San Francisco, CA",
      lastActive: "2 minutes ago",
      current: true,
    },
    {
      id: "2",
      device: "iPhone 15 Pro",
      location: "San Francisco, CA",
      lastActive: "1 hour ago",
      current: false,
    },
    {
      id: "3",
      device: "Chrome on Windows",
      location: "New York, NY",
      lastActive: "3 days ago",
      current: false,
    },
  ]);

  const profileForm = useForm<ProfileFormData>({
    defaultValues: initialProfile,
  });

  const preferencesForm = useForm<PreferencesFormData>({
    defaultValues: initialPreferences,
  });

  const securityForm = useForm<SecurityFormData>();

  const onProfileSubmit = (data: ProfileFormData) => {
    console.log("Profile updated:", data);
    // Handle profile update
  };

  const onPreferencesSubmit = (data: PreferencesFormData) => {
    console.log("Preferences updated:", data);
    // Handle preferences update
  };

  const onSecuritySubmit = (data: SecurityFormData) => {
    console.log("Password changed:", data);
    securityForm.reset();
    // Handle password change
  };

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const tabs = [
    { id: "profile", name: "Profile", icon: UserCircleIcon },
    { id: "preferences", name: "Preferences", icon: GlobeAltIcon },
    { id: "notifications", name: "Notifications", icon: BellIcon },
    { id: "security", name: "Security", icon: ShieldCheckIcon },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#1E293B]">Settings</h2>
      </div>

      {/* Tab Navigation */}
      <div className="glass rounded-xl p-1 shadow-xl">
        <nav className="flex space-x-1">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                }`}
              >
                <IconComponent className="h-4 w-4 mr-2" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="glass rounded-xl p-6 shadow-xl">
          <div className="flex items-center space-x-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <UserCircleIcon className="w-16 h-16 text-white" />
              </div>
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow">
                <CameraIcon className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {initialProfile.firstName} {initialProfile.lastName}
              </h3>
              <p className="text-gray-500">{initialProfile.email}</p>
              <p className="text-sm text-gray-400 mt-1">Last updated 2 hours ago</p>
            </div>
          </div>

          <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 glass border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                  {...profileForm.register("firstName", { required: true })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 glass border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                  {...profileForm.register("lastName", { required: true })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 glass border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                  {...profileForm.register("email", { required: true })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 glass border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                  {...profileForm.register("phone")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 glass border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                  {...profileForm.register("dateOfBirth")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  className="w-full px-4 py-3 glass border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                  {...profileForm.register("country")}
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Japan">Japan</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 glass border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                  {...profileForm.register("city")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Postal Code
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 glass border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                  {...profileForm.register("postalCode")}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 glass border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                {...profileForm.register("address")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 glass border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 resize-none"
                placeholder="Tell us about yourself..."
                {...profileForm.register("bio")}
              />
            </div>

            <div className="flex justify-end">
              <button type="submit" className="btn-primary rounded-xl text-sm">
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === "preferences" && (
        <div className="space-y-6">
          <div className="glass rounded-xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Regional Settings</h3>
            <form onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <CurrencyDollarIcon className="w-4 h-4 inline mr-2" />
                    Currency
                  </label>
                  <select
                    className="w-full px-4 py-3 glass border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                    {...preferencesForm.register("currency")}
                  >
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.symbol} {currency.name} ({currency.code})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <GlobeAltIcon className="w-4 h-4 inline mr-2" />
                    Language
                  </label>
                  <select
                    className="w-full px-4 py-3 glass border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                    {...preferencesForm.register("language")}
                  >
                    {languages.map((language) => (
                      <option key={language.code} value={language.code}>
                        {language.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    className="w-full px-4 py-3 glass border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                    {...preferencesForm.register("timezone")}
                  >
                    {timezones.map((timezone) => (
                      <option key={timezone.value} value={timezone.value}>
                        {timezone.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Format
                  </label>
                  <select
                    className="w-full px-4 py-3 glass border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                    {...preferencesForm.register("dateFormat")}
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY (US)</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY (UK)</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
                    <option value="DD.MM.YYYY">DD.MM.YYYY (DE)</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="btn-primary rounded-xl text-sm">
                  <span>Save Preferences</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="space-y-6">
          <div className="glass rounded-xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Email Notifications</h3>
            <div className="space-y-4">
              {[
                { key: "emailTransactions" as keyof NotificationSettings, title: "Transaction Alerts", description: "Get notified of all transactions" },
                { key: "emailWeeklyReports" as keyof NotificationSettings, title: "Weekly Reports", description: "Receive weekly financial summaries" },
                { key: "emailSecurityAlerts" as keyof NotificationSettings, title: "Security Alerts", description: "Important security notifications" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange(item.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications[item.key] ? "bg-gradient-to-r from-blue-500 to-purple-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications[item.key] ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Push Notifications</h3>
            <div className="space-y-4">
              {[
                { key: "pushTransactions" as keyof NotificationSettings, title: "Transaction Alerts", description: "Real-time transaction notifications" },
                { key: "pushBudgetAlerts" as keyof NotificationSettings, title: "Budget Alerts", description: "When you exceed budget limits" },
                { key: "pushSecurityAlerts" as keyof NotificationSettings, title: "Security Alerts", description: "Suspicious activity alerts" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange(item.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications[item.key] ? "bg-gradient-to-r from-blue-500 to-purple-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications[item.key] ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">SMS Notifications</h3>
            <div className="space-y-4">
              {[
                { key: "smsSecurityAlerts" as keyof NotificationSettings, title: "Security Alerts", description: "Critical security notifications via SMS" },
                { key: "smsLargeTransactions" as keyof NotificationSettings, title: "Large Transactions", description: "Transactions over $1,000" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange(item.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications[item.key] ? "bg-gradient-to-r from-blue-500 to-purple-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications[item.key] ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="space-y-6">
          {/* Change Password */}
          <div className="glass rounded-xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h3>
            <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    className="w-full px-4 py-3 pr-12 glass border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                    {...securityForm.register("currentPassword", { required: true })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    className="w-full px-4 py-3 pr-12 glass border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                    {...securityForm.register("newPassword", { required: true, minLength: 8 })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full px-4 py-3 pr-12 glass border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                    {...securityForm.register("confirmPassword", { required: true })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button type="submit" className="btn-primary rounded-xl text-sm">
                  <span>Update Password</span>
                </button>
              </div>
            </form>
          </div>

          {/* Two-Factor Authentication */}
          <div className="glass rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </div>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  twoFactorEnabled ? "bg-gradient-to-r from-green-500 to-green-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            {twoFactorEnabled && (
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-900">Two-factor authentication is enabled</p>
                    <p className="text-xs text-green-700">Your account is secured with SMS verification</p>
                  </div>
                </div>
                <button className="text-red-600 text-sm hover:text-red-700 transition-colors">
                  Disable Two-Factor Authentication
                </button>
              </div>
            )}
          </div>

          {/* Login Sessions */}
          <div className="glass rounded-xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Login Sessions</h3>
            <div className="space-y-4">
              {loginSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {session.device.includes("iPhone") ? (
                        <DevicePhoneMobileIcon className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ComputerDesktopIcon className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-900">{session.device}</p>
                        {session.current && (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{session.location}</p>
                      <p className="text-xs text-gray-400">Last active: {session.lastActive}</p>
                    </div>
                  </div>
                  {!session.current && (
                    <button className="text-red-600 hover:text-red-700 transition-colors p-2">
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <button className="text-red-600 text-sm hover:text-red-700 transition-colors flex items-center">
                <LockClosedIcon className="w-4 h-4 mr-2" />
                Sign out of all other sessions
              </button>
            </div>
          </div>

          {/* Account Deletion */}
          <div className="glass rounded-xl p-6 shadow-xl border-red-200">
            <h3 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">Delete Account</h4>
                <p className="text-sm text-gray-500 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}