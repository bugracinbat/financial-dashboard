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
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    name: "Randy Press",
    role: "Director",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 3,
    name: "Workman",
    role: "Designer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
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

export default function Dashboard() {
  const [transferAmount, setTransferAmount] = useState("525.50");

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
            <h3 className="font-semibold mb-6 text-gray-900">Quick Transfer</h3>
            <div className="flex flex-wrap -space-x-4 mb-8">
              {quickTransferUsers.map((user) => (
                <div key={user.id} className="relative group">
                  <div className="relative">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-16 h-16 rounded-full border-[3px] border-white"
                    />
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center min-w-max">
                      <p className="text-sm font-medium text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-16 h-16 rounded-full border-[3px] border-white bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-8">
              <p className="text-sm text-gray-500 mb-4">Write Amount</p>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="flex-1 w-full bg-gray-50 rounded-xl px-4 py-2.5">
                  <input
                    type="text"
                    placeholder="Enter Amount"
                    className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-500 focus:outline-none"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                  />
                </div>
                <button className="w-full sm:w-auto bg-[#1E293B] text-white px-5 py-2.5 rounded-xl text-sm font-medium inline-flex items-center justify-center hover:bg-[#1E293B]/90 transition-colors">
                  Send
                  <svg
                    className="w-4 h-4 ml-2 rotate-45"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
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
    </div>
  );
}
