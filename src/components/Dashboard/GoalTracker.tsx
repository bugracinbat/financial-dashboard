import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

interface SpendingGoal {
  id: number;
  title: string;
  target: number;
  current: number;
  category: string;
  dueDate: string;
}

interface GoalTrackerProps {
  goals: SpendingGoal[];
}

export default function GoalTracker({ goals }: GoalTrackerProps) {
  return (
    <div
      className="glass rounded-2xl p-6 shadow-xl card-hover animate-scale-in"
      style={{ animationDelay: "0.2s" }}
    >
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
        <ArrowTrendingUpIcon className="h-5 w-5 mr-2 text-green-600" />
        Financial Goals
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal) => {
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
  );
}