import { lazy, Suspense } from "react";
import { BellIcon } from "@heroicons/react/24/outline";

const DoughnutChart = lazy(() => import("../Charts/DoughnutChart"));

interface ExpenseCategory {
  name: string;
  amount: number;
  percentage: number;
  color: string;
  trend: string;
}

interface ExpenseStatisticsProps {
  data: any;
  options: any;
  categories: ExpenseCategory[];
  totalAmount: number;
  animationDelay?: string;
}

export default function ExpenseStatistics({
  data,
  options,
  categories,
  totalAmount,
  animationDelay = "0s",
}: ExpenseStatisticsProps) {
  return (
    <div
      className="xl:col-span-1 animate-fade-in"
      style={{ animationDelay }}
    >
      <div className="glass rounded-2xl p-6 shadow-xl card-hover h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900">
              Expense Statistics
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Total: ${totalAmount.toLocaleString()} this month
            </p>
          </div>
          <select className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg border-0 focus:ring-2 focus:ring-blue-500">
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
          </select>
        </div>
        
        <div className="relative h-[180px] flex items-center justify-center mb-4">
          <Suspense fallback={<div className="h-full flex items-center justify-center">Loading chart...</div>}>
            <DoughnutChart data={data} options={options} />
          </Suspense>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <p className="text-2xl font-bold text-gray-900">${totalAmount.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Total Spent</p>
          </div>
        </div>
        
        {/* Category Breakdown */}
        <div className="flex-grow">
          <div className="space-y-3">
            {categories.map((category, index) => (
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
  );
}