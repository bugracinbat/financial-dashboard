import { useState } from "react";
import {
  PlusIcon,
  PaperAirplaneIcon,
  StarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

export interface QuickTransferUser {
  id: number;
  name: string;
  role: string;
  email: string;
  isFavorite: boolean;
  lastTransferAmount: number;
  image: string;
}

interface QuickTransferProps {
  users: QuickTransferUser[];
  transferAmount: string;
  onTransferAmountChange: (amount: string) => void;
  onTransfer: (user: QuickTransferUser) => void;
  onShowModal: () => void;
  animationDelay?: string;
}

export default function QuickTransfer({
  users,
  transferAmount,
  onTransferAmountChange,
  onTransfer,
  onShowModal,
  animationDelay = "0s",
}: QuickTransferProps) {
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredUsers = showFavoritesOnly
    ? users.filter((user) => user.isFavorite)
    : users;

  const handleQuickAmount = (amount: number) => {
    onTransferAmountChange(amount.toString());
  };

  return (
    <div
      className="xl:col-span-1 animate-slide-in"
      style={{ animationDelay }}
    >
      <div className="glass rounded-2xl p-6 shadow-xl card-hover h-full flex flex-col">
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
                onClick={() => onTransfer(user)}
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
        <div className="space-y-4 flex-grow">
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
                onChange={(e) => onTransferAmountChange(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={onShowModal}
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
  );
}