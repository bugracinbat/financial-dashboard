export function InsightsWidgetSkeleton() {
  return (
    <div className="glass rounded-2xl p-6 shadow-xl border border-blue-100/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50 animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="w-5 h-5 bg-gray-300 rounded mr-2"></div>
          <div className="h-5 bg-gray-300 rounded w-32"></div>
        </div>
        <div className="w-4 h-4 bg-gray-300 rounded"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/70 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="space-y-2">
                <div className="h-3 bg-gray-300 rounded w-24"></div>
                <div className="h-6 bg-gray-300 rounded w-20"></div>
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
            </div>
            <div className="h-2 bg-gray-300 rounded w-16"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GoalTrackerSkeleton() {
  return (
    <div className="glass rounded-2xl p-6 shadow-xl animate-pulse">
      <div className="flex items-center mb-4">
        <div className="w-5 h-5 bg-gray-300 rounded mr-2"></div>
        <div className="h-5 bg-gray-300 rounded w-32"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="space-y-1">
                <div className="h-4 bg-gray-300 rounded w-24"></div>
                <div className="h-3 bg-gray-300 rounded w-16"></div>
              </div>
              <div className="h-4 bg-gray-300 rounded w-8"></div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2"></div>
            <div className="flex justify-between">
              <div className="h-3 bg-gray-300 rounded w-12"></div>
              <div className="h-3 bg-gray-300 rounded w-12"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardDisplaySkeleton() {
  return (
    <div className="w-full">
      <div className="rounded-2xl glass p-6 h-full shadow-xl animate-pulse">
        <div className="flex justify-between items-start mb-8">
          <div className="space-y-2">
            <div className="h-3 bg-gray-300 rounded w-12"></div>
            <div className="h-6 bg-gray-300 rounded w-16"></div>
          </div>
          <div className="w-8 h-5 bg-gray-300 rounded"></div>
        </div>
        <div className="space-y-3">
          <div className="h-3 bg-gray-300 rounded w-20"></div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-300 rounded w-32"></div>
            <div className="space-y-1">
              <div className="h-2 bg-gray-300 rounded w-12"></div>
              <div className="h-3 bg-gray-300 rounded w-8"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RecentTransactionsSkeleton() {
  return (
    <div className="w-full">
      <div className="rounded-2xl glass p-6 h-full shadow-xl animate-pulse">
        <div className="h-5 bg-gray-300 rounded w-32 mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="space-y-1">
                  <div className="h-3 bg-gray-300 rounded w-24"></div>
                  <div className="h-2 bg-gray-300 rounded w-16"></div>
                </div>
              </div>
              <div className="h-3 bg-gray-300 rounded w-12"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WeeklyActivitySkeleton() {
  return (
    <div className="xl:col-span-2">
      <div className="glass rounded-2xl p-6 shadow-xl h-full animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <div className="h-5 bg-gray-300 rounded w-32"></div>
            <div className="h-3 bg-gray-300 rounded w-48"></div>
          </div>
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-6 bg-gray-300 rounded w-16"></div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-lg p-3">
              <div className="h-2 bg-gray-300 rounded w-20 mb-1"></div>
              <div className="h-4 bg-gray-300 rounded w-8"></div>
              <div className="h-2 bg-gray-300 rounded w-12 mt-1"></div>
            </div>
          ))}
        </div>
        <div className="h-[250px] bg-gray-200 rounded-lg"></div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="h-3 bg-gray-300 rounded w-48"></div>
            </div>
            <div className="h-3 bg-gray-300 rounded w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExpenseStatisticsSkeleton() {
  return (
    <div className="xl:col-span-1">
      <div className="glass rounded-2xl p-6 shadow-xl h-full flex flex-col animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <div className="h-5 bg-gray-300 rounded w-32"></div>
            <div className="h-3 bg-gray-300 rounded w-40"></div>
          </div>
          <div className="h-6 bg-gray-300 rounded w-20"></div>
        </div>
        <div className="relative h-[180px] flex items-center justify-center mb-4">
          <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <div className="h-6 bg-gray-300 rounded w-16 mb-1"></div>
            <div className="h-2 bg-gray-300 rounded w-12"></div>
          </div>
        </div>
        <div className="flex-grow">
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <div className="space-y-1">
                    <div className="h-3 bg-gray-300 rounded w-20"></div>
                    <div className="h-2 bg-gray-300 rounded w-16"></div>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="h-3 bg-gray-300 rounded w-12"></div>
                  <div className="h-2 bg-gray-300 rounded w-8"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="h-2 bg-gray-300 rounded w-48"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function QuickTransferSkeleton() {
  return (
    <div className="xl:col-span-1">
      <div className="glass rounded-2xl p-6 shadow-xl h-full flex flex-col animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div className="h-5 bg-gray-300 rounded w-24"></div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-lg"></div>
            <div className="w-8 h-8 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
        <div className="mb-6">
          <div className="h-2 bg-gray-300 rounded w-32 mb-3"></div>
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-gray-300 rounded-full mx-auto mb-2"></div>
                <div className="h-2 bg-gray-300 rounded w-12 mx-auto mb-1"></div>
                <div className="h-2 bg-gray-300 rounded w-8 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <div className="h-2 bg-gray-300 rounded w-24 mb-3"></div>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 bg-gray-300 rounded-lg"></div>
            ))}
          </div>
        </div>
        <div className="space-y-4 flex-grow">
          <div>
            <div className="h-2 bg-gray-300 rounded w-28 mb-2"></div>
            <div className="h-12 bg-gray-300 rounded-xl"></div>
          </div>
          <div className="h-10 bg-gray-300 rounded-xl"></div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="h-2 bg-gray-300 rounded w-24 mb-3"></div>
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded w-20"></div>
                </div>
                <div className="h-3 bg-gray-300 rounded w-12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BalanceHistorySkeleton() {
  return (
    <div className="xl:col-span-2">
      <div className="glass rounded-2xl p-6 shadow-xl h-full animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <div className="h-5 bg-gray-300 rounded w-32"></div>
            <div className="h-3 bg-gray-300 rounded w-48"></div>
          </div>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-6 bg-gray-300 rounded w-8"></div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-lg p-3">
              <div className="h-2 bg-gray-300 rounded w-20 mb-1"></div>
              <div className="h-4 bg-gray-300 rounded w-12"></div>
              <div className="h-2 bg-gray-300 rounded w-16 mt-1"></div>
            </div>
          ))}
        </div>
        <div className="h-[280px] bg-gray-200 rounded-lg -mx-2"></div>
      </div>
    </div>
  );
}