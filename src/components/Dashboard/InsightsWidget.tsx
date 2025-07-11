import {
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

interface InsightData {
  totalSpending: number;
  previousMonthSpending: number;
  topCategory: string;
  savingsGoal: number;
  currentSavings: number;
  monthlyIncome: number;
  projectedSavings: number;
}

interface InsightsWidgetProps {
  data: InsightData;
  show: boolean;
  onClose: () => void;
}

export default function InsightsWidget({ data, show, onClose }: InsightsWidgetProps) {
  if (!show) return null;

  const spendingChange =
    ((data.totalSpending - data.previousMonthSpending) /
      data.previousMonthSpending) *
    100;
  const savingsProgress = (data.currentSavings / data.savingsGoal) * 100;

  return (
    <div className="glass rounded-2xl p-6 shadow-xl card-hover border border-blue-100/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50 animate-scale-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900 flex items-center">
          <EyeIcon className="h-5 w-5 mr-2 text-blue-600" />
          Smart Insights
        </h3>
        <button
          onClick={onClose}
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
                ${data.totalSpending.toLocaleString()}
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
              {data.topCategory}
            </p>
            <p className="text-sm text-blue-600 mt-1">
              30% of total spending
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}