import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from "chart.js";
import { useState } from "react";
import {
  PlusIcon,
  PaperAirplaneIcon,
  StarIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import {
  StarIcon as StarIconSolid,
} from "@heroicons/react/24/solid";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

const weeklyActivityData = {
  labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
  datasets: [
    {
      label: "Withdraw",
      data: [450, 350, 320, 450, 200, 400, 380],
      borderColor: "#1E293B",
      backgroundColor: "#1E293B",
      tension: 0,
      borderWidth: 2,
      pointRadius: 0,
    },
    {
      label: "Deposit",
      data: [220, 120, 250, 350, 230, 230, 280],
      borderColor: "#0066FF",
      backgroundColor: "#0066FF",
      tension: 0,
      borderWidth: 2,
      pointRadius: 0,
    },
  ],
};

const expenseData = {
  labels: ["Entertainment", "Bill Expense", "Investment", "Others"],
  datasets: [
    {
      data: [30, 15, 20, 35],
      backgroundColor: ["#1E293B", "#F59E0B", "#0066FF", "#111827"],
      borderWidth: 0,
    },
  ],
};

const balanceHistoryData = {
  labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
  datasets: [
    {
      label: "Balance",
      data: [200, 300, 450, 700, 250, 450, 600],
      borderColor: "#0066FF",
      backgroundColor: "rgba(0, 102, 255, 0.1)",
      tension: 0.4,
      fill: true,
      borderWidth: 2,
      pointRadius: 0,
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
  plugins: {
    legend: {
      display: true,
      position: "top" as const,
      align: "start" as const,
      labels: {
        boxWidth: 8,
        boxHeight: 8,
        usePointStyle: true,
        pointStyle: "circle",
        padding: 20,
        color: "#64748B",
        font: {
          size: 12,
          family: "Inter",
          weight: 500,
        },
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#1E293B",
      titleColor: "#fff",
      bodyColor: "#fff",
      padding: 12,
      displayColors: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 500,
      ticks: {
        stepSize: 100,
        callback: function (value: string | number) {
          return value;
        },
        color: "#64748B",
        font: {
          size: 12,
          family: "Inter",
        },
        padding: 10,
      },
      grid: {
        color: "#E2E8F0",
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
          size: 12,
          family: "Inter",
        },
        padding: 10,
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
      backgroundColor: "#1E293B",
      titleColor: "#fff",
      bodyColor: "#fff",
      padding: 12,
      displayColors: false,
    },
  },
  cutout: "75%",
};

const balanceHistoryOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 800,
      ticks: {
        stepSize: 200,
        callback: function (value: string | number) {
          return value;
        },
        color: "#64748B",
        font: {
          size: 12,
          family: "Inter",
        },
      },
      grid: {
        color: "#E2E8F0",
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
          size: 12,
          family: "Inter",
        },
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
  const [selectedUser, setSelectedUser] = useState<QuickTransferUser | null>(null);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [transferNote, setTransferNote] = useState("");

  const filteredUsers = showFavoritesOnly 
    ? quickTransferUsers.filter(user => user.isFavorite)
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#1E293B]">My Cards</h2>
        <button className="btn-primary rounded-lg text-sm">
          <span>See All</span>
        </button>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="w-full">
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

        <div className="w-full">
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

        <div className="w-full">
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
        <div className="xl:col-span-2">
          <div className="glass rounded-2xl p-6 shadow-xl card-hover">
            <h3 className="font-semibold mb-6 text-gray-900">
              Weekly Activity
            </h3>
            <div className="h-[300px]">
              <Line data={weeklyActivityData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="xl:col-span-1">
          <div className="glass rounded-2xl p-6 shadow-xl card-hover">
            <h3 className="font-semibold mb-6 text-gray-900">
              Expense Statistics
            </h3>
            <div className="relative h-[300px] flex items-center justify-center">
              <Doughnut data={expenseData} options={doughnutOptions} />
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <p className="text-3xl font-semibold text-gray-900">30%</p>
                <p className="text-sm text-gray-500">Entertainment</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Transfer & Balance History */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1">
          <div className="glass rounded-2xl p-6 shadow-xl card-hover">
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
            <div className="space-y-4">
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
        <div className="xl:col-span-2">
          <div className="glass rounded-2xl p-6 shadow-xl card-hover">
            <h3 className="font-semibold mb-6 text-gray-900">
              Balance History
            </h3>
            <div className="h-[300px]">
              <Line data={balanceHistoryData} options={balanceHistoryOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-100">
            {transferSuccess ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircleIcon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Transfer Successful!
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  ${transferAmount} has been sent to {selectedUser?.name}
                </p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Transaction ID</p>
                  <p className="text-sm font-mono text-gray-900">TXN-{Date.now()}</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedUser ? "Confirm Transfer" : "Send Money"}
                  </h3>
                  <button
                    onClick={() => setShowTransferModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {selectedUser && (
                  <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={selectedUser.image}
                      alt={selectedUser.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{selectedUser.name}</p>
                      <p className="text-sm text-gray-500">{selectedUser.email}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                        $
                      </span>
                      <input
                        type="number"
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-3 glass border border-white/20 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Note (Optional)
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 glass border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                      placeholder="Add a note for this transfer..."
                      value={transferNote}
                      onChange={(e) => setTransferNote(e.target.value)}
                    />
                  </div>

                  {/* Quick Amount Buttons */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Quick amounts</p>
                    <div className="grid grid-cols-4 gap-2">
                      {[50, 100, 250, 500].map((amount) => (
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

                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Transfer amount</span>
                      <span className="font-semibold">${transferAmount || "0.00"}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-1">
                      <span className="text-gray-600">Transfer fee</span>
                      <span className="font-semibold">$0.00</span>
                    </div>
                    <div className="border-t border-blue-200 mt-2 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900">Total</span>
                        <span className="font-bold text-lg text-blue-600">${transferAmount || "0.00"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setShowTransferModal(false)}
                      className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleTransferSubmit}
                      disabled={!transferAmount || parseFloat(transferAmount) <= 0 || isTransferring}
                      className="flex-1 btn-primary rounded-xl text-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isTransferring ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <PaperAirplaneIcon className="h-4 w-4 mr-2" />
                          <span>Send ${transferAmount || "0.00"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
