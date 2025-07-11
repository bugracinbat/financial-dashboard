import {
  PaperAirplaneIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

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
  if (!showModal) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="transfer-modal-title"
    >
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-100">
        {transferSuccess ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Transfer Successful!
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              ${transferAmount} has been sent to {selectedUser?.name}
            </p>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">Transaction ID</p>
              <p className="text-sm font-mono text-gray-900">
                TXN-{Date.now()}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 
                id="transfer-modal-title"
                className="text-lg font-semibold text-gray-900"
              >
                {selectedUser ? "Confirm Transfer" : "Send Money"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
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
              <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <img
                  src={selectedUser.image}
                  alt={selectedUser.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900">
                    {selectedUser.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedUser.email}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 glass border border-white/20 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Note (Optional)
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 glass border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                  placeholder="Add a note for this transfer..."
                  value={transferNote}
                  onChange={(e) => setTransferNote(e.target.value)}
                />
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Quick amounts
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {[50, 100, 250, 500].map((amount) => (
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

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Transfer amount</span>
                  <span className="font-semibold">
                    ${transferAmount || "0.00"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm mt-1">
                  <span className="text-gray-600">Transfer fee</span>
                  <span className="font-semibold">$0.00</span>
                </div>
                <div className="border-t border-blue-200 mt-2 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="font-bold text-lg text-blue-600">
                      ${transferAmount || "0.00"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
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
                  className="flex-1 btn-primary rounded-xl text-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isTransferring ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      <span>Sending...</span>
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
}