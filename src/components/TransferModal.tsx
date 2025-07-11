import {
  PaperAirplaneIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface QuickTransferUser {
  id: number;
  name: string;
  role: string;
  email: string;
  isFavorite: boolean;
  lastTransferAmount: number;
  image: string;
}

interface TransferModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  selectedUser: QuickTransferUser | null;
  transferAmount: string;
  setTransferAmount: (amount: string) => void;
  transferNote: string;
  setTransferNote: (note: string) => void;
  transferSuccess: boolean;
  isTransferring: boolean;
  handleTransferSubmit: () => void;
  handleQuickAmount: (amount: number) => void;
}

export default function TransferModal({
  showModal,
  setShowModal,
  selectedUser,
  transferAmount,
  setTransferAmount,
  transferNote,
  setTransferNote,
  transferSuccess,
  isTransferring,
  handleTransferSubmit,
  handleQuickAmount,
}: TransferModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  if (!showModal) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 bg-gradient-to-br from-black/20 via-black/10 to-black/20 backdrop-blur-md z-50 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="transfer-modal-title"
      style={{ 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh',
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
    >
      <div className="glass rounded-2xl p-6 max-w-md w-full shadow-2xl border border-white/30 animate-scale-in transform transition-all duration-300 hover:shadow-3xl">
        {transferSuccess ? (
          <div className="text-center animate-scale-in">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
              <CheckCircleIcon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Transfer Successful!
            </h3>
            <p className="text-base text-gray-700 mb-6 font-medium">
              ${transferAmount} has been sent to {selectedUser?.name}
            </p>
            <div className="glass border border-white/30 rounded-xl p-4 bg-gradient-to-br from-green-50/50 to-blue-50/30">
              <p className="text-xs text-gray-600 font-semibold mb-1">Transaction ID</p>
              <p className="text-sm font-mono text-gray-900 font-bold bg-white/60 px-3 py-1 rounded-lg inline-block">
                TXN-{Date.now()}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 
                  id="transfer-modal-title"
                  className="text-lg font-bold text-gray-900 mb-1"
                >
                  {selectedUser ? "Confirm Transfer" : "Send Money"}
                </h3>
                <p className="text-xs text-gray-500">
                  {selectedUser ? `Transfer funds to ${selectedUser.name}` : "Quick and secure money transfer"}
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all duration-200 hover:scale-110"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {selectedUser && (
              <div className="flex items-center space-x-3 mb-6 p-4 glass rounded-xl border border-white/30 animate-slide-in">
                <div className="relative">
                  <img
                    src={selectedUser.image}
                    alt={selectedUser.name}
                    className="w-12 h-12 rounded-full ring-2 ring-white/50 shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    {selectedUser.name}
                  </p>
                  <p className="text-xs text-gray-600 mb-1">
                    {selectedUser.email}
                  </p>
                  <p className="text-xs text-blue-600 font-medium">
                    Last transfer: ${selectedUser.lastTransferAmount}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Transfer Amount
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 glass border border-white/30 rounded-xl text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-200 group-hover:border-white/50"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Transfer Note (Optional)
                </label>
                <textarea
                  rows={2}
                  className="w-full px-4 py-3 glass border border-white/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 resize-none transition-all duration-200 hover:border-white/50"
                  placeholder="Add a note for this transfer..."
                  value={transferNote}
                  onChange={(e) => setTransferNote(e.target.value)}
                />
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-2">
                  Quick amounts
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {[50, 100, 250, 500].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleQuickAmount(amount)}
                      className="px-3 py-2 text-sm font-semibold text-gray-700 glass border border-white/30 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-all duration-200 hover:scale-105 hover:shadow-lg"
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass border border-white/30 rounded-xl p-4 bg-gradient-to-br from-blue-50/50 to-purple-50/30">
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="text-gray-700 font-medium">Transfer amount</span>
                  <span className="font-bold text-gray-900">
                    ${transferAmount || "0.00"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-gray-700 font-medium">Transfer fee</span>
                  <span className="font-bold text-green-600">Free</span>
                </div>
                <div className="border-t border-white/40 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">
                      Total Amount
                    </span>
                    <span className="font-bold text-lg text-blue-600 bg-white/60 px-2 py-1 rounded-lg">
                      ${transferAmount || "0.00"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 glass border border-white/40 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 hover:scale-105 transition-all duration-200 hover:shadow-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTransferSubmit}
                  disabled={
                    !transferAmount ||
                    parseFloat(transferAmount) <= 0 ||
                    isTransferring
                  }
                  className="flex-1 btn-primary rounded-xl text-sm font-semibold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl py-3 px-4"
                >
                  {isTransferring ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="h-4 w-4 mr-2" />
                      <span>Send ${transferAmount || "0.00"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // Render modal using portal to avoid layout container issues
  return createPortal(modalContent, document.body);
}