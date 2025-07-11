import { useState, lazy, Suspense } from "react";
import {
  PlusIcon,
  PaperAirplaneIcon,
  StarIcon,
  ClockIcon,
  BellIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

// Lazy load chart components
const LineChart = lazy(() => import("../components/Charts/LineChart"));
const DoughnutChart = lazy(() => import("../components/Charts/DoughnutChart"));
const TransferModal = lazy(() => import("../components/TransferModal"));

const weeklyActivityData = {
  labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
  datasets: [
    {
      label: "Withdrawals",
      data: [450, 350, 320, 450, 200, 400, 380],
      borderColor: "#DC2626",
      backgroundColor: (context: { chart: { ctx: CanvasRenderingContext2D } }) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 250);
        gradient.addColorStop(0, "rgba(220, 38, 38, 0.2)");
        gradient.addColorStop(1, "rgba(220, 38, 38, 0)");
        return gradient;
      },
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 4,
      pointBackgroundColor: "#DC2626",
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      pointHoverRadius: 6,
      fill: true,
    },
    {
      label: "Deposits",
      data: [220, 120, 250, 350, 230, 230, 280],
      borderColor: "#0066FF",
      backgroundColor: (context: { chart: { ctx: CanvasRenderingContext2D } }) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 250);
        gradient.addColorStop(0, "rgba(0, 102, 255, 0.2)");
        gradient.addColorStop(1, "rgba(0, 102, 255, 0)");
        return gradient;
      },
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 4,
      pointBackgroundColor: "#0066FF",
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      pointHoverRadius: 6,
      fill: true,
    },
  ],
};

const expenseData = {
  labels: ["Entertainment", "Bill Expense", "Investment", "Others"],
  datasets: [
    {
      data: [30, 15, 20, 35],
      backgroundColor: ["#8B5CF6", "#F59E0B", "#0066FF", "#6B7280"],
      borderWidth: 2,
      borderColor: "#fff",
    },
  ],
};

const expenseCategories = [
  { name: "Entertainment", amount: 850, percentage: 30, color: "#8B5CF6", trend: "+5%" },
  { name: "Bill Expense", amount: 425, percentage: 15, color: "#F59E0B", trend: "-2%" },
  { name: "Investment", amount: 567, percentage: 20, color: "#0066FF", trend: "+12%" },
  { name: "Others", amount: 991, percentage: 35, color: "#6B7280", trend: "+3%" },
];

const balanceHistoryData = {
  labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
  datasets: [
    {
      label: "Balance",
      data: [200, 300, 450, 700, 250, 450, 600],
      borderColor: "#0066FF",
      backgroundColor: (context: { chart: { ctx: CanvasRenderingContext2D } }) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, "rgba(0, 102, 255, 0.3)");
        gradient.addColorStop(1, "rgba(0, 102, 255, 0)");
        return gradient;
      },
      tension: 0.4,
      fill: true,
      borderWidth: 3,
      pointRadius: 4,
      pointBackgroundColor: "#0066FF",
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: "#0066FF",
      pointHoverBorderColor: "#fff",
      pointHoverBorderWidth: 2,
    },
  ],
};

const recentTransactions = [
  {
    id: 1,
    name: "Deposit from my Card",
    date: "28 January 2021",
    amount: "-$850",
    type: "withdrawal",
    icon: "💳",
  },
  {
    id: 2,
    name: "Deposit Paypal",
    date: "25 January 2021",
    amount: "+$2,500",
    type: "deposit",
    icon: "P",
  },
  {
    id: 3,
    name: "Jemi Wilson",
    date: "21 January 2021",
    amount: "+$5,400",
    type: "deposit",
    icon: "👤",
  },
];

const insightData = {
  totalSpending: 2850,
  previousMonthSpending: 3200,
  topCategory: "Entertainment",
  savingsGoal: 5000,
  currentSavings: 3750,
  monthlyIncome: 8500,
  projectedSavings: 4200,
};

const spendingGoals = [
  {
    id: 1,
    title: "Emergency Fund",
    target: 10000,
    current: 7500,
    category: "savings",
    dueDate: "Dec 2024",
  },
  {
    id: 2,
    title: "Monthly Budget",
    target: 3000,
    current: 2150,
    category: "spending",
    dueDate: "This Month",
  },
];

const notifications = [
  {
    id: 1,
    type: "transaction",
    message: "Payment received from John Doe",
    amount: "+$1,250",
    time: "2 min ago",
    isNew: true,
  },
  {
    id: 2,
    type: "goal",
    message: "You're 75% toward your emergency fund goal",
    time: "1 hour ago",
    isNew: false,
  },
];

const quickTransferUsers = [
  {
    id: 1,
    name: "Livia Bator",
    role: "CEO",
    email: "livia.bator@company.com",
    isFavorite: true,
    lastTransferAmount: 850,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    name: "Randy Press",
    role: "Director",
    email: "randy.press@company.com",
    isFavorite: false,
    lastTransferAmount: 1200,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 3,
    name: "Sarah Wilson",
    role: "Designer",
    email: "sarah.wilson@company.com",
    isFavorite: true,
    lastTransferAmount: 450,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 4,
    name: "Mike Johnson",
    role: "Manager",
    email: "mike.johnson@company.com",
    isFavorite: false,
    lastTransferAmount: 300,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 5,
    name: "Emily Chen",
    role: "Developer",
    email: "emily.chen@company.com",
    isFavorite: true,
    lastTransferAmount: 750,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  plugins: {
    legend: {
      display: true,
      position: "top" as const,
      align: "end" as const,
      labels: {
        boxWidth: 12,
        boxHeight: 12,
        usePointStyle: true,
        pointStyle: "circle",
        padding: 15,
        color: "#64748B",
        font: {
          size: 11,
          family: "Inter",
          weight: 500,
        },
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      titleColor: "#1E293B",
      bodyColor: "#1E293B",
      borderColor: "#E2E8F0",
      borderWidth: 1,
      padding: 12,
      displayColors: true,
      usePointStyle: true,
      callbacks: {
        label: function(context: { dataset: { label: string }, parsed: { y: number } }) {
          return context.dataset.label + ': $' + context.parsed.y;
        }
      }
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 500,
      ticks: {
        stepSize: 100,
        callback: function (value: string | number) {
          return '$' + value;
        },
        color: "#64748B",
        font: {
          size: 11,
          family: "Inter",
        },
        padding: 8,
      },
      grid: {
        color: "rgba(226, 232, 240, 0.5)",
        drawBorder: false,
      },
      border: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#64748B",
        font: {
          size: 11,
          family: "Inter",
        },
        padding: 8,
      },
      border: {
        display: false,
      },
    },
  },
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      titleColor: "#1E293B",
      bodyColor: "#1E293B",
      borderColor: "#E2E8F0",
      borderWidth: 1,
      padding: 12,
      displayColors: true,
      usePointStyle: true,
      callbacks: {
        label: function(context: { label: string, parsed: number, dataset: { data: number[] } }) {
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
          const percentage = ((context.parsed / total) * 100).toFixed(1);
          return context.label + ': ' + percentage + '%';
        }
      }
    },
  },
  cutout: "70%",
  animation: {
    animateRotate: true,
    animateScale: true,
  },
};

const balanceHistoryOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      titleColor: "#1E293B",
      bodyColor: "#1E293B",
      borderColor: "#E2E8F0",
      borderWidth: 1,
      padding: 12,
      displayColors: false,
      callbacks: {
        label: function(context: { parsed: { y: number } }) {
          return `Balance: $${context.parsed.y}`;
        }
      }
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 800,
      ticks: {
        stepSize: 200,
        callback: function (value: string | number) {
          return `$${value}`;
        },
        color: "#64748B",
        font: {
          size: 11,
          family: "Inter",
        },
        padding: 8,
      },
      grid: {
        color: "rgba(226, 232, 240, 0.5)",
        drawBorder: false,
      },
      border: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#64748B",
        font: {
          size: 11,
          family: "Inter",
        },
        padding: 8,
      },
      border: {
        display: false,
      },
    },
  },
};

type QuickTransferUser = {
  id: number;
  name: string;
  role: string;
  email: string;
  isFavorite: boolean;
  lastTransferAmount: number;
  image: string;
};

export default function Dashboard() {
  const [transferAmount, setTransferAmount] = useState("525.50");
  const [selectedUser, setSelectedUser] = useState<QuickTransferUser | null>(
    null
  );
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [transferNote, setTransferNote] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showInsights, setShowInsights] = useState(true);
  const [activityPeriod, setActivityPeriod] = useState("weekly");

  const filteredUsers = showFavoritesOnly
    ? quickTransferUsers.filter((user) => user.isFavorite)
    : quickTransferUsers;

  const handleQuickTransfer = (user: QuickTransferUser) => {
    setSelectedUser(user);
    setTransferAmount(user.lastTransferAmount.toString());
    setShowTransferModal(true);
  };

  const handleTransferSubmit = async () => {
    if (!selectedUser || !transferAmount) return;

    setIsTransferring(true);

    // Simulate API call
    setTimeout(() => {
      setIsTransferring(false);
      setTransferSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setTransferSuccess(false);
        setShowTransferModal(false);
        setSelectedUser(null);
        setTransferAmount("");
        setTransferNote("");
      }, 3000);
    }, 2000);
  };

  const handleQuickAmount = (amount: number) => {
    setTransferAmount(amount.toString());
  };

  const spendingChange =
    ((insightData.totalSpending - insightData.previousMonthSpending) /
      insightData.previousMonthSpending) *
    100;
  const savingsProgress =
    (insightData.currentSavings / insightData.savingsGoal) * 100;

  return (
    <div className="space-y-6">
      {/* Header with notifications */}
      <div className="flex justify-between items-center">
        <div className="animate-fade-in">
          <h2 className="text-xl font-semibold text-[#1E293B]">
            Dashboard Overview
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back! Here's your financial summary
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors relative ${
                notifications.some((n) => n.isNew) ? "notification-pulse" : ""
              }`}
            >
              <BellIcon className="h-5 w-5" />
              {notifications.some((n) => n.isNew) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              )}
            </button>
            {showNotifications && (
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
          <button className="btn-primary rounded-lg text-sm">
            <span>See All</span>
          </button>
        </div>
      </div>

      {/* Smart Insights Widget */}
      {showInsights && (
        <div className="glass rounded-2xl p-6 shadow-xl card-hover border border-blue-100/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50 animate-scale-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <EyeIcon className="h-5 w-5 mr-2 text-blue-600" />
              Smart Insights
            </h3>
            <button
              onClick={() => setShowInsights(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/70 rounded-lg p-4 card-hover animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">This Month's Spending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${insightData.totalSpending.toLocaleString()}
                  </p>
                </div>
                <div
                  className={`flex items-center ${
                    spendingChange < 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {spendingChange < 0 ? (
                    <ArrowDownIcon className="h-4 w-4" />
                  ) : (
                    <ArrowUpIcon className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium ml-1">
                    {Math.abs(spendingChange).toFixed(1)}%
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">vs last month</p>
            </div>
            <div className="bg-white/70 rounded-lg p-4 card-hover animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Savings Progress</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {savingsProgress.toFixed(0)}%
                  </p>
                </div>
                <ArrowTrendingUpIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${savingsProgress}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-white/70 rounded-lg p-4 card-hover animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div>
                <p className="text-sm text-gray-600">Top Category</p>
                <p className="text-lg font-semibold text-gray-900">
                  {insightData.topCategory}
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  30% of total spending
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Goal Tracking Widget */}
      <div
        className="glass rounded-2xl p-6 shadow-xl card-hover animate-scale-in"
        style={{ animationDelay: "0.2s" }}
      >
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
          <ArrowTrendingUpIcon className="h-5 w-5 mr-2 text-green-600" />
          Financial Goals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {spendingGoals.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            return (
              <div
                key={goal.id}
                className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 card-hover animate-scale-in"
                style={{ animationDelay: `${goal.id * 0.1}s` }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{goal.title}</h4>
                    <p className="text-sm text-gray-500">{goal.dueDate}</p>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    {progress.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    ${goal.current.toLocaleString()}
                  </span>
                  <span className="text-gray-600">
                    ${goal.target.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center animate-fade-in">
        <h2 className="text-xl font-semibold text-[#1E293B]">My Cards</h2>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div
          className="w-full animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6 relative overflow-hidden h-full animate-gradient shadow-2xl shadow-purple-900/50 card-hover">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-sm opacity-80 mb-1">Balance</p>
                <p className="text-2xl font-semibold">$5,756</p>
              </div>
              <div className="absolute top-0 right-0 mt-6 mr-6">
                <svg className="w-8 h-5" viewBox="0 0 32 20" fill="none">
                  <circle cx="16" cy="10" r="6" fill="#FF9F00" />
                  <circle
                    cx="26"
                    cy="10"
                    r="6"
                    fill="#FF0000"
                    fillOpacity="0.8"
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm opacity-80">CARD HOLDER</p>
              <p className="font-medium">Eddy Cusuma</p>
              <div className="flex justify-between items-center">
                <p className="font-medium tracking-wider">
                  3778 **** **** 1234
                </p>
                <div className="text-sm opacity-80">
                  <span className="block">VALID THRU</span>
                  <p>12/22</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="w-full animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="rounded-2xl glass glass-hover p-6 relative overflow-hidden h-full shadow-xl">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-sm text-gray-500 mb-1">Balance</p>
                <p className="text-2xl font-semibold text-gray-900">$5,756</p>
              </div>
              <div className="absolute top-0 right-0 mt-6 mr-6">
                <svg className="w-8 h-5" viewBox="0 0 32 20" fill="none">
                  <circle cx="16" cy="10" r="6" fill="#FF9F00" />
                  <circle
                    cx="26"
                    cy="10"
                    r="6"
                    fill="#FF0000"
                    fillOpacity="0.8"
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-gray-500">CARD HOLDER</p>
              <p className="font-medium text-gray-900">Eddy Cusuma</p>
              <div className="flex justify-between items-center">
                <p className="font-medium tracking-wider text-gray-900">
                  3778 **** **** 1234
                </p>
                <div className="text-sm text-gray-500">
                  <span className="block">VALID THRU</span>
                  <p>12/22</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="w-full animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="rounded-2xl glass glass-hover p-6 h-full shadow-xl">
            <h3 className="font-semibold mb-4 text-gray-900">
              Recent Transaction
            </h3>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.icon === "P"
                          ? "bg-blue-100"
                          : transaction.icon === "💳"
                          ? "bg-yellow-100"
                          : "bg-green-100"
                      }`}
                    >
                      <span className="text-lg">{transaction.icon}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      transaction.type === "deposit"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div
          className="xl:col-span-2 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="glass rounded-2xl p-6 shadow-xl card-hover h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Weekly Activity
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Transaction overview for this week
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setActivityPeriod("daily")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activityPeriod === "daily" 
                      ? "text-white bg-blue-600" 
                      : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                  }`}>
                  Daily
                </button>
                <button 
                  onClick={() => setActivityPeriod("weekly")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activityPeriod === "weekly" 
                      ? "text-white bg-blue-600" 
                      : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                  }`}>
                  Weekly
                </button>
                <button 
                  onClick={() => setActivityPeriod("monthly")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activityPeriod === "monthly" 
                      ? "text-white bg-blue-600" 
                      : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                  }`}>
                  Monthly
                </button>
              </div>
            </div>
            
            {/* Activity Summary */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Total Transactions</p>
                <p className="text-lg font-bold text-gray-900">42</p>
                <p className="text-xs text-gray-500 mt-1">This week</p>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Total Deposits</p>
                <p className="text-lg font-bold text-blue-600">$1,680</p>
                <p className="text-xs text-green-600 mt-1">+18.2%</p>
              </div>
              <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Total Withdrawals</p>
                <p className="text-lg font-bold text-gray-900">$2,550</p>
                <p className="text-xs text-red-600 mt-1">+5.4%</p>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Net Flow</p>
                <p className="text-lg font-bold text-purple-600">-$870</p>
                <p className="text-xs text-gray-500 mt-1">Outflow</p>
              </div>
            </div>
            
            <div className="h-[250px]">
              <LineChart data={weeklyActivityData} options={chartOptions} />
            </div>
            
            {/* Trend Analysis */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ArrowTrendingUpIcon className="h-4 w-4 text-green-600" />
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">Key Insight:</span> Highest deposit on Tuesday ($350)
                  </p>
                </div>
                <p className="text-xs text-gray-500">
                  Avg. daily balance: <span className="font-medium text-gray-900">-$124</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="xl:col-span-1 animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="glass rounded-2xl p-6 shadow-xl card-hover h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Expense Statistics
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Total: $2,833 this month
                </p>
              </div>
              <select className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg border-0 focus:ring-2 focus:ring-blue-500">
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
              </select>
            </div>
            
            <div className="relative h-[180px] flex items-center justify-center mb-4">
              <DoughnutChart data={expenseData} options={doughnutOptions} />
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <p className="text-2xl font-bold text-gray-900">$2,833</p>
                <p className="text-xs text-gray-500">Total Spent</p>
              </div>
            </div>
            
            {/* Category Breakdown */}
            <div className="flex-grow">
              <div className="space-y-3">
                {expenseCategories.map((category, index) => (
                  <div
                    key={category.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{category.name}</p>
                        <p className="text-xs text-gray-500">{category.percentage}% of total</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">${category.amount}</p>
                      <p className={`text-xs font-medium ${
                        category.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {category.trend}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Budget Alert */}
            <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-center space-x-2">
                <BellIcon className="h-4 w-4 text-amber-600" />
                <p className="text-xs text-amber-800">
                  <span className="font-medium">Budget Alert:</span> You've spent 85% of your monthly budget
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Transfer & Balance History */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div
          className="xl:col-span-1 animate-slide-in"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="glass rounded-2xl p-6 shadow-xl card-hover h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">Quick Transfer</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  className={`p-2 rounded-lg transition-colors ${
                    showFavoritesOnly
                      ? "bg-yellow-100 text-yellow-600"
                      : "text-gray-400 hover:text-yellow-500 hover:bg-yellow-50"
                  }`}
                  title="Show favorites only"
                >
                  {showFavoritesOnly ? (
                    <StarIconSolid className="h-4 w-4" />
                  ) : (
                    <StarIcon className="h-4 w-4" />
                  )}
                </button>
                <button
                  className="p-2 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                  title="Add new contact"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Recent Recipients */}
            <div className="mb-6">
              <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wider">
                Recent Recipients
              </p>
              <div className="grid grid-cols-4 gap-3">
                {filteredUsers.slice(0, 4).map((user) => (
                  <div
                    key={user.id}
                    className="relative group cursor-pointer"
                    onClick={() => handleQuickTransfer(user)}
                  >
                    <div className="relative">
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-14 h-14 rounded-full border-2 border-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                      />
                      {user.isFavorite && (
                        <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
                          <StarIconSolid className="h-3 w-3 text-white" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-xs font-medium text-gray-900 truncate">
                        {user.name.split(" ")[0]}
                      </p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Amount Buttons */}
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wider">
                Quick Amounts
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[100, 250, 500].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleQuickAmount(amount)}
                    className="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Transfer Amount Input */}
            <div className="space-y-4 flex-grow">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">
                  Transfer Amount
                </p>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-medium">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 glass border border-white/20 rounded-xl text-lg font-semibold text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                  />
                </div>
              </div>

              <button
                onClick={() => setShowTransferModal(true)}
                disabled={!transferAmount || parseFloat(transferAmount) <= 0}
                className="w-full btn-primary rounded-xl text-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PaperAirplaneIcon className="h-4 w-4 mr-2" />
                <span>Send Money</span>
              </button>
            </div>

            {/* Recent Activity */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wider">
                Recent Activity
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">To Livia Bator</span>
                  </div>
                  <span className="font-medium text-gray-900">$850</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">To Emily Chen</span>
                  </div>
                  <span className="font-medium text-gray-900">$750</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="xl:col-span-2 animate-fade-in"
          style={{ animationDelay: "0.7s" }}
        >
          <div className="glass rounded-2xl p-6 shadow-xl card-hover h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Balance History
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Your balance trend over the last 7 months
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  1M
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  3M
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg">
                  6M
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  1Y
                </button>
              </div>
            </div>
            
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Current Balance</p>
                <p className="text-lg font-bold text-gray-900">$600</p>
                <p className="text-xs text-green-600 mt-1">+12% from last month</p>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-green-100/50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Highest Balance</p>
                <p className="text-lg font-bold text-gray-900">$700</p>
                <p className="text-xs text-gray-500 mt-1">in October</p>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Average Balance</p>
                <p className="text-lg font-bold text-gray-900">$421</p>
                <p className="text-xs text-gray-500 mt-1">Last 6 months</p>
              </div>
            </div>
            
            <div className="h-[280px] -mx-2">
              <LineChart data={balanceHistoryData} options={balanceHistoryOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Transfer Modal */}
      <Suspense fallback={null}>
        <TransferModal
          showModal={showTransferModal}
          setShowModal={setShowTransferModal}
          selectedUser={selectedUser}
          transferAmount={transferAmount}
          setTransferAmount={setTransferAmount}
          transferNote={transferNote}
          setTransferNote={setTransferNote}
          transferSuccess={transferSuccess}
          isTransferring={isTransferring}
          handleTransferSubmit={handleTransferSubmit}
          handleQuickAmount={handleQuickAmount}
        />
      </Suspense>
    </div>
  );
}
