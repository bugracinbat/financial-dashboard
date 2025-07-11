interface Transaction {
  id: number;
  name: string;
  date: string;
  amount: string;
  type: "withdrawal" | "deposit";
  icon: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
  animationDelay?: string;
}

export default function RecentTransactions({
  transactions,
  animationDelay = "0s",
}: RecentTransactionsProps) {
  return (
    <div
      className="w-full animate-fade-in"
      style={{ animationDelay }}
    >
      <div className="rounded-2xl glass glass-hover p-6 h-full shadow-xl">
        <h3 className="font-semibold mb-4 text-gray-900">
          Recent Transaction
        </h3>
        <div className="space-y-4">
          {transactions.map((transaction) => (
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
  );
}