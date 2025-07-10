import { useState, useMemo } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  BanknotesIcon,
  CreditCardIcon,
  BuildingLibraryIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";

type Account = {
  id: string;
  accountName: string;
  accountType: "checking" | "savings" | "investment" | "credit";
  bankName: string;
  accountNumber: string;
  balance: number;
  currency: string;
  isActive: boolean;
  lastUpdated: string;
  interestRate?: number;
  creditLimit?: number;
};

type AccountFormData = Omit<Account, "id" | "lastUpdated">;

const initialAccounts: Account[] = [
  {
    id: "1",
    accountName: "Primary Checking",
    accountType: "checking",
    bankName: "Chase Bank",
    accountNumber: "****1234",
    balance: 8420.50,
    currency: "USD",
    isActive: true,
    lastUpdated: "2025-01-10T10:30:00Z",
  },
  {
    id: "2",
    accountName: "Emergency Savings",
    accountType: "savings",
    bankName: "Wells Fargo",
    accountNumber: "****5678",
    balance: 25000.00,
    currency: "USD",
    isActive: true,
    lastUpdated: "2025-01-09T15:45:00Z",
    interestRate: 2.5,
  },
  {
    id: "3",
    accountName: "Investment Portfolio",
    accountType: "investment",
    bankName: "Charles Schwab",
    accountNumber: "****9012",
    balance: 45750.25,
    currency: "USD",
    isActive: true,
    lastUpdated: "2025-01-10T09:15:00Z",
    interestRate: 7.2,
  },
  {
    id: "4",
    accountName: "Travel Rewards Card",
    accountType: "credit",
    bankName: "American Express",
    accountNumber: "****3456",
    balance: -1250.75,
    currency: "USD",
    isActive: true,
    lastUpdated: "2025-01-08T14:20:00Z",
    creditLimit: 15000,
  },
  {
    id: "5",
    accountName: "High Yield Savings",
    accountType: "savings",
    bankName: "Ally Bank",
    accountNumber: "****7890",
    balance: 12500.00,
    currency: "USD",
    isActive: false,
    lastUpdated: "2025-01-05T11:00:00Z",
    interestRate: 4.2,
  },
];

const accountTypes = [
  { value: "checking", label: "Checking Account", icon: BanknotesIcon },
  { value: "savings", label: "Savings Account", icon: BuildingLibraryIcon },
  { value: "investment", label: "Investment Account", icon: ChartBarIcon },
  { value: "credit", label: "Credit Account", icon: CreditCardIcon },
];

const banks = [
  "Chase Bank",
  "Wells Fargo",
  "Bank of America",
  "Citibank",
  "Charles Schwab",
  "Fidelity",
  "American Express",
  "Ally Bank",
  "Capital One",
  "Other",
];

export default function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [showModal, setShowModal] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [hiddenBalances, setHiddenBalances] = useState<Set<string>>(new Set());

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AccountFormData>();

  const filteredAccounts = useMemo(() => {
    return accounts.filter((account) => {
      const matchesSearch =
        account.accountName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.bankName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === "all" || account.accountType === filterType;
      const matchesStatus = filterStatus === "all" || 
        (filterStatus === "active" ? account.isActive : !account.isActive);
      
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [accounts, searchQuery, filterType, filterStatus]);


  const creditUtilization = accounts
    .filter((account) => account.accountType === "credit")
    .reduce((total, account) => {
      if (account.creditLimit) {
        return total + (Math.abs(account.balance) / account.creditLimit) * 100;
      }
      return total;
    }, 0) / accounts.filter((account) => account.accountType === "credit").length || 0;

  const totalAssets = accounts
    .filter((account) => account.isActive)
    .reduce((sum, account) => {
      return account.accountType === "credit" 
        ? sum 
        : sum + account.balance;
    }, 0);

  const handleAddEdit = (data: AccountFormData) => {
    if (editingAccount) {
      setAccounts(
        accounts.map((account) =>
          account.id === editingAccount.id
            ? { 
                ...data, 
                id: account.id, 
                lastUpdated: new Date().toISOString(),
                accountNumber: data.accountNumber.startsWith("****") 
                  ? data.accountNumber 
                  : `****${data.accountNumber.slice(-4)}`
              }
            : account
        )
      );
    } else {
      const newAccount: Account = {
        ...data,
        id: Date.now().toString(),
        lastUpdated: new Date().toISOString(),
        accountNumber: data.accountNumber.startsWith("****") 
          ? data.accountNumber 
          : `****${data.accountNumber.slice(-4)}`
      };
      setAccounts([newAccount, ...accounts]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      setAccounts(accounts.filter((account) => account.id !== id));
    }
  };

  const handleEdit = (account: Account) => {
    setEditingAccount(account);
    setValue("accountName", account.accountName);
    setValue("accountType", account.accountType);
    setValue("bankName", account.bankName);
    setValue("accountNumber", account.accountNumber);
    setValue("balance", account.balance);
    setValue("currency", account.currency);
    setValue("isActive", account.isActive);
    setValue("interestRate", account.interestRate || 0);
    setValue("creditLimit", account.creditLimit || 0);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingAccount(null);
    reset();
  };

  const toggleBalanceVisibility = (accountId: string) => {
    const newHidden = new Set(hiddenBalances);
    if (newHidden.has(accountId)) {
      newHidden.delete(accountId);
    } else {
      newHidden.add(accountId);
    }
    setHiddenBalances(newHidden);
  };

  const getAccountIcon = (type: string) => {
    const accountType = accountTypes.find(t => t.value === type);
    return accountType?.icon || BanknotesIcon;
  };

  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold text-[#1E293B]">Accounts</h2>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary rounded-lg text-sm flex items-center gap-2"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Add Account</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass rounded-xl p-6 shadow-xl card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Assets</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {formatCurrency(totalAssets)}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-blue-500 p-3 rounded-xl">
              <BanknotesIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6 shadow-xl card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Active Accounts</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {accounts.filter(a => a.isActive).length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-xl">
              <BuildingLibraryIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6 shadow-xl card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Credit Utilization</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {creditUtilization.toFixed(1)}%
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-xl">
              <CreditCardIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="glass rounded-xl p-4 shadow-xl">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search accounts..."
              className="w-full pl-10 pr-4 py-2.5 glass border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2.5 glass border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            {accountTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <select
            className="px-4 py-2.5 glass border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as "all" | "active" | "inactive")}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAccounts.map((account) => {
          const IconComponent = getAccountIcon(account.accountType);
          const isBalanceHidden = hiddenBalances.has(account.id);
          
          return (
            <div key={account.id} className="glass rounded-xl p-6 shadow-xl card-hover">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-xl ${
                    account.accountType === "checking" ? "bg-gradient-to-br from-blue-500 to-blue-600" :
                    account.accountType === "savings" ? "bg-gradient-to-br from-green-500 to-green-600" :
                    account.accountType === "investment" ? "bg-gradient-to-br from-purple-500 to-purple-600" :
                    "bg-gradient-to-br from-orange-500 to-orange-600"
                  }`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{account.accountName}</h3>
                    <p className="text-sm text-gray-500">{account.bankName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    account.isActive 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {account.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Account Number</span>
                  <span className="text-sm font-medium text-gray-900">{account.accountNumber}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Balance</span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-lg font-bold ${
                      account.accountType === "credit" 
                        ? account.balance < 0 ? "text-red-600" : "text-green-600"
                        : account.balance > 0 ? "text-green-600" : "text-red-600"
                    }`}>
                      {isBalanceHidden ? "••••••" : formatCurrency(account.balance, account.currency)}
                    </span>
                    <button
                      onClick={() => toggleBalanceVisibility(account.id)}
                      className="p-1 rounded hover:bg-gray-100 transition-colors"
                    >
                      {isBalanceHidden ? (
                        <EyeIcon className="h-4 w-4 text-gray-400" />
                      ) : (
                        <EyeSlashIcon className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {account.interestRate && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Interest Rate</span>
                    <span className="text-sm font-medium text-green-600">{account.interestRate}%</span>
                  </div>
                )}

                {account.creditLimit && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Credit Limit</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(account.creditLimit, account.currency)}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Last Updated</span>
                  <span className="text-sm text-gray-600">{formatDate(account.lastUpdated)}</span>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleEdit(account)}
                  className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(account.id)}
                  className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="glass rounded-2xl p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-[#1E293B] mb-6">
              {editingAccount ? "Edit Account" : "Add New Account"}
            </h3>
            
            <form onSubmit={handleSubmit(handleAddEdit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Name
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2.5 glass border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 ${
                    errors.accountName ? "border-red-500" : "border-white/20"
                  }`}
                  placeholder="e.g., Primary Checking"
                  {...register("accountName", {
                    required: "Account name is required",
                  })}
                />
                {errors.accountName && (
                  <p className="mt-1 text-xs text-red-500">{errors.accountName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Type
                </label>
                <select
                  className={`w-full px-3 py-2.5 glass border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 ${
                    errors.accountType ? "border-red-500" : "border-white/20"
                  }`}
                  {...register("accountType", { required: "Account type is required" })}
                >
                  <option value="">Select account type</option>
                  {accountTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.accountType && (
                  <p className="mt-1 text-xs text-red-500">{errors.accountType.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Name
                </label>
                <select
                  className={`w-full px-3 py-2.5 glass border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 ${
                    errors.bankName ? "border-red-500" : "border-white/20"
                  }`}
                  {...register("bankName", { required: "Bank name is required" })}
                >
                  <option value="">Select bank</option>
                  {banks.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
                {errors.bankName && (
                  <p className="mt-1 text-xs text-red-500">{errors.bankName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number (Last 4 digits)
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2.5 glass border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 ${
                    errors.accountNumber ? "border-red-500" : "border-white/20"
                  }`}
                  placeholder="1234"
                  {...register("accountNumber", {
                    required: "Account number is required",
                  })}
                />
                {errors.accountNumber && (
                  <p className="mt-1 text-xs text-red-500">{errors.accountNumber.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Balance
                </label>
                <input
                  type="number"
                  step="0.01"
                  className={`w-full px-3 py-2.5 glass border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 ${
                    errors.balance ? "border-red-500" : "border-white/20"
                  }`}
                  placeholder="0.00"
                  {...register("balance", {
                    required: "Balance is required",
                    valueAsNumber: true,
                  })}
                />
                {errors.balance && (
                  <p className="mt-1 text-xs text-red-500">{errors.balance.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select
                  className={`w-full px-3 py-2.5 glass border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 ${
                    errors.currency ? "border-red-500" : "border-white/20"
                  }`}
                  {...register("currency", { required: "Currency is required" })}
                >
                  <option value="">Select currency</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="CAD">CAD</option>
                </select>
                {errors.currency && (
                  <p className="mt-1 text-xs text-red-500">{errors.currency.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full px-3 py-2.5 glass border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  placeholder="0.00"
                  {...register("interestRate", { valueAsNumber: true })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Credit Limit (for credit accounts)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full px-3 py-2.5 glass border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  placeholder="0.00"
                  {...register("creditLimit", { valueAsNumber: true })}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  {...register("isActive")}
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                  Account is active
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary rounded-xl text-sm"
                >
                  <span>{editingAccount ? "Update" : "Add"} Account</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}