import { useState, lazy, Suspense } from "react";

// Import loading skeletons and progressive loader
import {
  InsightsWidgetSkeleton,
  GoalTrackerSkeleton,
  CardDisplaySkeleton,
  RecentTransactionsSkeleton,
  WeeklyActivitySkeleton,
  ExpenseStatisticsSkeleton,
  QuickTransferSkeleton,
  BalanceHistorySkeleton,
} from "../components/Dashboard/LoadingSkeletons";
import ProgressiveLoader from "../components/Dashboard/ProgressiveLoader";

// Import non-lazy components (lightweight)
import NotificationPanel from "../components/Dashboard/NotificationPanel";

// Lazy load all Dashboard components
const InsightsWidget = lazy(() => import("../components/Dashboard/InsightsWidget"));
const GoalTracker = lazy(() => import("../components/Dashboard/GoalTracker"));
const CardDisplay = lazy(() => import("../components/Dashboard/CardDisplay"));
const RecentTransactions = lazy(() => import("../components/Dashboard/RecentTransactions"));
const WeeklyActivity = lazy(() => import("../components/Dashboard/WeeklyActivity"));
const ExpenseStatistics = lazy(() => import("../components/Dashboard/ExpenseStatistics"));
const QuickTransfer = lazy(() => import("../components/Dashboard/QuickTransfer"));
const BalanceHistory = lazy(() => import("../components/Dashboard/BalanceHistory"));
const TransferModal = lazy(() => import("../components/TransferModal"));

// Import types
type QuickTransferUser = {
  id: number;
  name: string;
  role: string;
  email: string;
  isFavorite: boolean;
  lastTransferAmount: number;
  image: string;
};

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
    type: "withdrawal" as const,
    icon: "💳",
  },
  {
    id: 2,
    name: "Deposit Paypal",
    date: "25 January 2021",
    amount: "+$2,500",
    type: "deposit" as const,
    icon: "P",
  },
  {
    id: 3,
    name: "Jemi Wilson",
    date: "21 January 2021",
    amount: "+$5,400",
    type: "deposit" as const,
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


export default function Dashboard() {
  const [transferAmount, setTransferAmount] = useState("525.50");
  const [selectedUser, setSelectedUser] = useState<QuickTransferUser | null>(
    null
  );
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [transferNote, setTransferNote] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showInsights, setShowInsights] = useState(true);
  const [activityPeriod, setActivityPeriod] = useState("weekly");


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
          <NotificationPanel
            notifications={notifications}
            show={showNotifications}
            onToggle={() => setShowNotifications(!showNotifications)}
          />
          <button className="btn-primary rounded-lg text-sm">
            <span>See All</span>
          </button>
        </div>
      </div>

      {/* Smart Insights Widget */}
      <ProgressiveLoader
        fallback={<InsightsWidgetSkeleton />}
        delay={0}
      >
        <Suspense fallback={<InsightsWidgetSkeleton />}>
          <InsightsWidget
            data={insightData}
            show={showInsights}
            onClose={() => setShowInsights(false)}
          />
        </Suspense>
      </ProgressiveLoader>

      {/* Goal Tracking Widget */}
      <ProgressiveLoader
        fallback={<GoalTrackerSkeleton />}
        delay={200}
      >
        <Suspense fallback={<GoalTrackerSkeleton />}>
          <GoalTracker goals={spendingGoals} />
        </Suspense>
      </ProgressiveLoader>

      <div className="flex justify-between items-center animate-fade-in">
        <h2 className="text-xl font-semibold text-[#1E293B]">My Cards</h2>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <ProgressiveLoader
          fallback={<CardDisplaySkeleton />}
          delay={400}
        >
          <Suspense fallback={<CardDisplaySkeleton />}>
            <CardDisplay
              variant="dark"
              balance="$5,756"
              cardHolder="Eddy Cusuma"
              cardNumber="3778 **** **** 1234"
              validThru="12/22"
              animationDelay="0.1s"
            />
          </Suspense>
        </ProgressiveLoader>

        <ProgressiveLoader
          fallback={<CardDisplaySkeleton />}
          delay={500}
        >
          <Suspense fallback={<CardDisplaySkeleton />}>
            <CardDisplay
              variant="light"
              balance="$5,756"
              cardHolder="Eddy Cusuma"
              cardNumber="3778 **** **** 1234"
              validThru="12/22"
              animationDelay="0.2s"
            />
          </Suspense>
        </ProgressiveLoader>

        <ProgressiveLoader
          fallback={<RecentTransactionsSkeleton />}
          delay={600}
        >
          <Suspense fallback={<RecentTransactionsSkeleton />}>
            <RecentTransactions
              transactions={recentTransactions}
              animationDelay="0.3s"
            />
          </Suspense>
        </ProgressiveLoader>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <ProgressiveLoader
          fallback={<WeeklyActivitySkeleton />}
          delay={800}
        >
          <Suspense fallback={<WeeklyActivitySkeleton />}>
            <WeeklyActivity
              data={weeklyActivityData}
              options={chartOptions}
              activityPeriod={activityPeriod}
              onPeriodChange={setActivityPeriod}
              animationDelay="0.4s"
            />
          </Suspense>
        </ProgressiveLoader>
        <ProgressiveLoader
          fallback={<ExpenseStatisticsSkeleton />}
          delay={900}
        >
          <Suspense fallback={<ExpenseStatisticsSkeleton />}>
            <ExpenseStatistics
              data={expenseData}
              options={doughnutOptions}
              categories={expenseCategories}
              totalAmount={2833}
              animationDelay="0.5s"
            />
          </Suspense>
        </ProgressiveLoader>
      </div>

      {/* Quick Transfer & Balance History */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <ProgressiveLoader
          fallback={<QuickTransferSkeleton />}
          delay={1000}
        >
          <Suspense fallback={<QuickTransferSkeleton />}>
            <QuickTransfer
              users={quickTransferUsers}
              transferAmount={transferAmount}
              onTransferAmountChange={setTransferAmount}
              onTransfer={handleQuickTransfer}
              onShowModal={() => setShowTransferModal(true)}
              animationDelay="0.6s"
            />
          </Suspense>
        </ProgressiveLoader>
        <ProgressiveLoader
          fallback={<BalanceHistorySkeleton />}
          delay={1100}
        >
          <Suspense fallback={<BalanceHistorySkeleton />}>
            <BalanceHistory
              data={balanceHistoryData}
              options={balanceHistoryOptions}
              animationDelay="0.7s"
            />
          </Suspense>
        </ProgressiveLoader>
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
