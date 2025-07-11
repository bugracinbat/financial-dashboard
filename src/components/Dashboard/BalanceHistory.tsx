import { lazy, Suspense } from "react";

const LineChart = lazy(() => import("../Charts/LineChart"));

interface BalanceHistoryProps {
  data: any;
  options: any;
  animationDelay?: string;
}

export default function BalanceHistory({
  data,
  options,
  animationDelay = "0s",
}: BalanceHistoryProps) {
  return (
    <div
      className="xl:col-span-2 animate-fade-in"
      style={{ animationDelay }}
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
          <Suspense fallback={<div className="h-full flex items-center justify-center">Loading chart...</div>}>
            <LineChart data={data} options={options} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}