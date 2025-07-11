import { lazy, Suspense } from "react";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

const LineChart = lazy(() => import("../Charts/LineChart"));

interface WeeklyActivityProps {
  data: any;
  options: any;
  activityPeriod: string;
  onPeriodChange: (period: string) => void;
  animationDelay?: string;
}

export default function WeeklyActivity({
  data,
  options,
  activityPeriod,
  onPeriodChange,
  animationDelay = "0s",
}: WeeklyActivityProps) {
  return (
    <div
      className="xl:col-span-2 animate-fade-in"
      style={{ animationDelay }}
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
              onClick={() => onPeriodChange("daily")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activityPeriod === "daily" 
                  ? "text-white bg-blue-600" 
                  : "text-gray-600 bg-gray-100 hover:bg-gray-200"
              }`}>
              Daily
            </button>
            <button 
              onClick={() => onPeriodChange("weekly")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activityPeriod === "weekly" 
                  ? "text-white bg-blue-600" 
                  : "text-gray-600 bg-gray-100 hover:bg-gray-200"
              }`}>
              Weekly
            </button>
            <button 
              onClick={() => onPeriodChange("monthly")}
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
          <Suspense fallback={<div className="h-full flex items-center justify-center">Loading chart...</div>}>
            <LineChart data={data} options={options} />
          </Suspense>
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
  );
}