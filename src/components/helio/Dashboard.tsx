import React, { useEffect, useState, useCallback } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import {
  Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight,
  Send, Receipt, CreditCard, Building2, Loader2, Filter,
  PiggyBank, Landmark, Clock, RefreshCw, X,
  Zap, Droplets, Flame, Wifi, Phone, CheckCircle, Bookmark,
  Trash2, ChevronRight, History, FileText
} from 'lucide-react';

const accountTypeIcons: Record<string, React.ElementType> = {
  savings: PiggyBank, current: Wallet, fixed_deposit: Landmark, recurring_deposit: Clock,
};
const accountTypeLabels: Record<string, string> = {
  savings: 'Savings Account', current: 'Current Account', fixed_deposit: 'Fixed Deposit', recurring_deposit: 'Recurring Deposit',
};
const billCategoryIcons: Record<string, React.ElementType> = {
  electricity: Zap, water: Droplets, gas: Flame, internet: Wifi, phone: Phone,
};
const billCategoryColors: Record<string, string> = {
  electricity: 'bg-yellow-50 text-yellow-600', water: 'bg-blue-50 text-blue-600',
  gas: 'bg-orange-50 text-orange-600', internet: 'bg-purple-50 text-purple-600', phone: 'bg-green-50 text-green-600',
};
const billCategoryLabels: Record<string, string> = {
  electricity: 'Electricity', water: 'Water', gas: 'Gas', internet: 'Internet', phone: 'Phone',
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

interface Payee { id: string; category: string; provider: string; consumer_number: string; nickname: string; }
interface BillRecord { id: string; category: string; provider: string; consumer_number: string; amount: number; status: string; paid_at: string; }

const Dashboard: React.FC = () => {
  const {
    user, accounts, transactions, dashboardSummary,
    fetchDashboard, fetchTransactions, performTransfer,
    isLoading, txnFilter, setTxnFilter, token
  } = useAppContext();

  const [showTransfer, setShowTransfer] = useState(false);
  const [transferData, setTransferData] = useState({ fromAccountId: '', amount: '', recipient: '', description: '' });
  const [transferLoading, setTransferLoading] = useState(false);

  // Bill payment state
  const [dashTab, setDashTab] = useState<'overview' | 'bills'>('overview');
  const [showBillPay, setShowBillPay] = useState(false);
  const [billStep, setBillStep] = useState<'category' | 'form' | 'confirm' | 'success'>('category');
  const [billData, setBillData] = useState({ category: '', provider: '', consumerNumber: '', amount: '', accountId: '', savePayee: true });
  const [billLoading, setBillLoading] = useState(false);
  const [providers, setProviders] = useState<Record<string, string[]>>({});
  const [payees, setPayees] = useState<Payee[]>([]);
  const [billHistory, setBillHistory] = useState<BillRecord[]>([]);
  const [billHistoryFilter, setBillHistoryFilter] = useState('all');
  const [billHistoryLoading, setBillHistoryLoading] = useState(false);
  const [lastBillResult, setLastBillResult] = useState<{ amount: number; provider: string; category: string } | null>(null);

  useEffect(() => { fetchDashboard(); }, [fetchDashboard]);

  const fetchProviders = useCallback(async () => {
    if (!token) return;
    try {
      const { data } = await supabase.functions.invoke('helio-bills', { body: { action: 'get_providers', token } });
      if (data?.providers) setProviders(data.providers);
    } catch {}
  }, [token]);

  const fetchPayees = useCallback(async () => {
    if (!token) return;
    try {
      const { data } = await supabase.functions.invoke('helio-bills', { body: { action: 'get_payees', token } });
      if (data?.payees) setPayees(data.payees);
    } catch {}
  }, [token]);

  const fetchBillHistory = useCallback(async (category?: string) => {
    if (!token) return;
    setBillHistoryLoading(true);
    try {
      const { data } = await supabase.functions.invoke('helio-bills', { body: { action: 'get_bill_history', token, category: category || billHistoryFilter } });
      if (data?.bills) setBillHistory(data.bills);
    } catch {} finally { setBillHistoryLoading(false); }
  }, [token, billHistoryFilter]);

  const openBillPay = () => {
    setShowBillPay(true);
    setBillStep('category');
    setBillData({ category: '', provider: '', consumerNumber: '', amount: '', accountId: '', savePayee: true });
    setLastBillResult(null);
    fetchProviders();
    fetchPayees();
  };

  const selectCategory = (cat: string) => {
    setBillData({ ...billData, category: cat, provider: '', consumerNumber: '', amount: '' });
    setBillStep('form');
  };

  const selectPayee = (payee: Payee) => {
    setBillData({ ...billData, category: payee.category, provider: payee.provider, consumerNumber: payee.consumer_number, savePayee: false });
    setBillStep('form');
  };

  const handleBillFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!billData.provider || !billData.consumerNumber || !billData.amount || !billData.accountId) return;
    setBillStep('confirm');
  };

  const handlePayBill = async () => {
    setBillLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('helio-bills', {
        body: {
          action: 'pay_bill', token,
          account_id: billData.accountId,
          category: billData.category,
          provider: billData.provider,
          consumer_number: billData.consumerNumber,
          amount: parseFloat(billData.amount),
          save_payee: billData.savePayee,
        }
      });
      if (error || data?.error) throw new Error(data?.error || 'Payment failed');
      setLastBillResult({ amount: parseFloat(billData.amount), provider: billData.provider, category: billData.category });
      setBillStep('success');
      toast({ title: 'Bill Paid Successfully', description: `${billCategoryLabels[billData.category]} bill of ${formatCurrency(parseFloat(billData.amount))} paid to ${billData.provider}` });
      fetchDashboard();
    } catch (err: any) {
      toast({ title: 'Payment Failed', description: err.message, variant: 'destructive' });
    } finally { setBillLoading(false); }
  };

  const deletePayee = async (payeeId: string) => {
    if (!token) return;
    try {
      await supabase.functions.invoke('helio-bills', { body: { action: 'delete_payee', token, payee_id: payeeId } });
      setPayees(prev => prev.filter(p => p.id !== payeeId));
      toast({ title: 'Payee Removed' });
    } catch {}
  };

  const handleFilterChange = (filter: string) => { setTxnFilter(filter); fetchTransactions(filter); };
  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferData.fromAccountId || !transferData.amount || !transferData.recipient) return;
    setTransferLoading(true);
    try {
      await performTransfer(transferData.fromAccountId, parseFloat(transferData.amount), transferData.description, transferData.recipient);
      setShowTransfer(false);
      setTransferData({ fromAccountId: '', amount: '', recipient: '', description: '' });
    } catch {} finally { setTransferLoading(false); }
  };

  useEffect(() => {
    if (dashTab === 'bills') { fetchBillHistory(); fetchPayees(); }
  }, [dashTab, fetchBillHistory, fetchPayees]);

  if (isLoading && !dashboardSummary) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center"><Loader2 className="w-8 h-8 animate-spin text-red-600 mx-auto mb-4" /><p className="text-gray-500">Loading your dashboard...</p></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Dashboard header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">Welcome back,</p>
              <h1 className="text-2xl lg:text-3xl font-semibold">{user?.full_name}</h1>
              <p className="text-gray-400 text-sm mt-1">Last login: {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowTransfer(true)} className="bg-red-600 hover:bg-red-500 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2">
                <Send className="w-4 h-4" /> Transfer
              </button>
              <button onClick={openBillPay} className="bg-white/10 hover:bg-white/20 text-white font-medium px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2">
                <Receipt className="w-4 h-4" /> Pay Bills
              </button>
              <button onClick={() => fetchDashboard()} className="bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2">
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
          {/* Dashboard tabs */}
          <div className="flex gap-1 mt-6 border-b border-white/10">
            <button onClick={() => setDashTab('overview')} className={`px-5 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${dashTab === 'overview' ? 'bg-gray-50 text-gray-900' : 'text-gray-400 hover:text-white'}`}>
              Overview
            </button>
            <button onClick={() => setDashTab('bills')} className={`px-5 py-2.5 text-sm font-medium rounded-t-lg transition-colors flex items-center gap-2 ${dashTab === 'bills' ? 'bg-gray-50 text-gray-900' : 'text-gray-400 hover:text-white'}`}>
              <FileText className="w-4 h-4" /> Bills & Payments
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        {dashTab === 'overview' ? (
          <>
            {/* Summary cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 -mt-1 pt-6">
              {[
                { icon: Wallet, label: 'Total Balance', value: formatCurrency(dashboardSummary?.totalBalance || 0), color: 'bg-red-50 text-red-600' },
                { icon: Building2, label: 'Accounts', value: String(dashboardSummary?.totalAccounts || 0), color: 'bg-blue-50 text-blue-600' },
                { icon: TrendingUp, label: 'Credits', value: `+${formatCurrency(dashboardSummary?.recentCredits || 0)}`, color: 'bg-green-50 text-green-600', textColor: 'text-green-600' },
                { icon: TrendingDown, label: 'Debits', value: `-${formatCurrency(dashboardSummary?.recentDebits || 0)}`, color: 'bg-orange-50 text-orange-600', textColor: 'text-orange-600' },
              ].map((card, i) => {
                const Icon = card.icon;
                return (
                  <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}><Icon className="w-5 h-5" /></div>
                      <span className="text-xs text-gray-500 font-medium">{card.label}</span>
                    </div>
                    <div className={`text-xl lg:text-2xl font-bold ${(card as any).textColor || 'text-gray-900'}`}>{card.value}</div>
                  </div>
                );
              })}
            </div>

            {/* Accounts */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Accounts</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {accounts.map((account) => {
                  const Icon = accountTypeIcons[account.account_type] || Wallet;
                  return (
                    <div key={account.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center"><Icon className="w-5 h-5 text-red-600" /></div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{accountTypeLabels[account.account_type] || account.account_type}</div>
                            <div className="text-xs text-gray-400">{account.account_number}</div>
                          </div>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${account.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>{account.status}</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{formatCurrency(account.balance)}</div>
                      <div className="text-xs text-gray-400 mt-1">{account.currency}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Send, label: 'Transfer', color: 'bg-red-50 text-red-600', action: () => setShowTransfer(true) },
                  { icon: Receipt, label: 'Pay Bills', color: 'bg-blue-50 text-blue-600', action: openBillPay },
                  { icon: CreditCard, label: 'Cards', color: 'bg-purple-50 text-purple-600', action: () => {} },
                  { icon: PiggyBank, label: 'Deposits', color: 'bg-green-50 text-green-600', action: () => {} },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <button key={i} onClick={item.action} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-red-100 transition-all flex flex-col items-center gap-2">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}><Icon className="w-5 h-5" /></div>
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Transactions */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  {['all', 'credit', 'debit', 'transfer'].map((f) => (
                    <button key={f} onClick={() => handleFilterChange(f)} className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${txnFilter === f ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {transactions.length === 0 ? (
                  <div className="p-8 text-center text-gray-400"><Receipt className="w-8 h-8 mx-auto mb-2 opacity-50" /><p>No transactions found</p></div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {transactions.map((txn) => (
                      <div key={txn.id} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${txn.type === 'credit' ? 'bg-green-50' : txn.type === 'debit' ? 'bg-red-50' : 'bg-blue-50'}`}>
                            {txn.type === 'credit' ? <ArrowDownRight className="w-5 h-5 text-green-600" /> : txn.type === 'debit' ? <ArrowUpRight className="w-5 h-5 text-red-600" /> : <Send className="w-5 h-5 text-blue-600" />}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{txn.description}</div>
                            <div className="text-xs text-gray-400">{txn.recipient} &middot; {new Date(txn.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-semibold ${txn.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>{txn.type === 'credit' ? '+' : '-'}{formatCurrency(txn.amount)}</div>
                          <div className={`text-xs font-medium ${txn.status === 'completed' ? 'text-green-500' : txn.status === 'pending' ? 'text-yellow-500' : 'text-red-500'}`}>{txn.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          /* ===== BILLS TAB ===== */
          <div className="pt-6 pb-12">
            {/* Bill category quick pay */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Pay a Bill</h2>
                <button onClick={openBillPay} className="text-red-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  New Payment <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                {Object.entries(billCategoryIcons).map(([cat, Icon]) => (
                  <button key={cat} onClick={() => { openBillPay(); setTimeout(() => selectCategory(cat), 100); }}
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-red-100 transition-all flex flex-col items-center gap-2 group">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${billCategoryColors[cat]} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium text-gray-700">{billCategoryLabels[cat]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Saved Payees */}
            {payees.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><Bookmark className="w-5 h-5 text-red-600" /> Saved Payees</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {payees.map((payee) => {
                    const Icon = billCategoryIcons[payee.category] || Receipt;
                    return (
                      <div key={payee.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                        <button onClick={() => { openBillPay(); setTimeout(() => selectPayee(payee), 100); }} className="flex items-center gap-3 flex-1 text-left">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${billCategoryColors[payee.category]}`}><Icon className="w-5 h-5" /></div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{payee.provider}</div>
                            <div className="text-xs text-gray-400">{billCategoryLabels[payee.category]} &middot; {payee.consumer_number}</div>
                          </div>
                        </button>
                        <button onClick={() => deletePayee(payee.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Bill History */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2"><History className="w-5 h-5 text-red-600" /> Payment History</h2>
                <div className="flex items-center gap-2">
                  {['all', 'electricity', 'water', 'gas', 'internet', 'phone'].map((f) => (
                    <button key={f} onClick={() => { setBillHistoryFilter(f); fetchBillHistory(f); }}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${billHistoryFilter === f ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {f === 'all' ? 'All' : billCategoryLabels[f]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {billHistoryLoading ? (
                  <div className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin text-red-600 mx-auto" /></div>
                ) : billHistory.length === 0 ? (
                  <div className="p-8 text-center text-gray-400"><Receipt className="w-8 h-8 mx-auto mb-2 opacity-50" /><p>No bill payments yet</p><p className="text-xs mt-1">Pay your first bill to see history here</p></div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {billHistory.map((bill) => {
                      const Icon = billCategoryIcons[bill.category] || Receipt;
                      return (
                        <div key={bill.id} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${billCategoryColors[bill.category]}`}><Icon className="w-5 h-5" /></div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{bill.provider}</div>
                              <div className="text-xs text-gray-400">{billCategoryLabels[bill.category]} &middot; {bill.consumer_number} &middot; {new Date(bill.paid_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-gray-900">-{formatCurrency(bill.amount)}</div>
                            <div className={`text-xs font-medium ${bill.status === 'completed' ? 'text-green-500' : 'text-yellow-500'}`}>{bill.status}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===== TRANSFER MODAL ===== */}
      {showTransfer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowTransfer(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-5 text-white flex items-center justify-between">
              <div><h3 className="text-lg font-semibold">Transfer Funds</h3><p className="text-red-100 text-sm">Send money securely</p></div>
              <button onClick={() => setShowTransfer(false)} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleTransfer} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Account</label>
                <select value={transferData.fromAccountId} onChange={(e) => setTransferData({ ...transferData, fromAccountId: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500" required>
                  <option value="">Select account</option>
                  {accounts.filter(a => a.account_type !== 'fixed_deposit').map((acc) => (
                    <option key={acc.id} value={acc.id}>{accountTypeLabels[acc.account_type]} - {formatCurrency(acc.balance)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
                <input type="text" value={transferData.recipient} onChange={(e) => setTransferData({ ...transferData, recipient: e.target.value })} placeholder="Recipient name or account"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (INR)</label>
                <input type="number" value={transferData.amount} onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })} placeholder="Enter amount" min="1"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                <input type="text" value={transferData.description} onChange={(e) => setTransferData({ ...transferData, description: e.target.value })} placeholder="What's this for?"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500" />
              </div>
              <button type="submit" disabled={transferLoading} className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                {transferLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : <><Send className="w-4 h-4" /> Transfer Now</>}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===== BILL PAY MODAL ===== */}
      {showBillPay && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowBillPay(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-5 text-white flex items-center justify-between sticky top-0 z-10">
              <div>
                <h3 className="text-lg font-semibold">
                  {billStep === 'category' && 'Pay Bills'}
                  {billStep === 'form' && `${billCategoryLabels[billData.category]} Bill`}
                  {billStep === 'confirm' && 'Confirm Payment'}
                  {billStep === 'success' && 'Payment Successful'}
                </h3>
                <p className="text-blue-100 text-sm">
                  {billStep === 'category' && 'Select a bill category'}
                  {billStep === 'form' && 'Enter payment details'}
                  {billStep === 'confirm' && 'Review and confirm'}
                  {billStep === 'success' && 'Your bill has been paid'}
                </p>
              </div>
              <button onClick={() => setShowBillPay(false)} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center"><X className="w-4 h-4" /></button>
            </div>

            <div className="p-6">
              {/* Step: Category */}
              {billStep === 'category' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {Object.entries(billCategoryIcons).map(([cat, Icon]) => (
                      <button key={cat} onClick={() => selectCategory(cat)}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all group">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${billCategoryColors[cat]} group-hover:scale-110 transition-transform`}><Icon className="w-6 h-6" /></div>
                        <span className="text-sm font-medium text-gray-700">{billCategoryLabels[cat]}</span>
                      </button>
                    ))}
                  </div>
                  {payees.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"><Bookmark className="w-4 h-4 text-blue-600" /> Saved Payees</h4>
                      <div className="space-y-2">
                        {payees.map((payee) => {
                          const Icon = billCategoryIcons[payee.category] || Receipt;
                          return (
                            <button key={payee.id} onClick={() => selectPayee(payee)}
                              className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-blue-300 hover:bg-blue-50/50 transition-all text-left">
                              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${billCategoryColors[payee.category]}`}><Icon className="w-4 h-4" /></div>
                              <div className="flex-1">
                                <div className="text-sm font-medium text-gray-900">{payee.provider}</div>
                                <div className="text-xs text-gray-400">{billCategoryLabels[payee.category]} &middot; {payee.consumer_number}</div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-gray-300" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step: Form */}
              {billStep === 'form' && (
                <form onSubmit={handleBillFormSubmit} className="space-y-4">
                  <button type="button" onClick={() => setBillStep('category')} className="text-sm text-blue-600 hover:underline mb-2 flex items-center gap-1">
                    &larr; Back to categories
                  </button>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                    <select value={billData.provider} onChange={(e) => setBillData({ ...billData, provider: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" required>
                      <option value="">Select provider</option>
                      {(providers[billData.category] || []).map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Consumer / Account Number</label>
                    <input type="text" value={billData.consumerNumber} onChange={(e) => setBillData({ ...billData, consumerNumber: e.target.value })}
                      placeholder="Enter your consumer number" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount (INR)</label>
                    <input type="number" value={billData.amount} onChange={(e) => setBillData({ ...billData, amount: e.target.value })}
                      placeholder="Enter bill amount" min="1" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pay From</label>
                    <select value={billData.accountId} onChange={(e) => setBillData({ ...billData, accountId: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" required>
                      <option value="">Select account</option>
                      {accounts.filter(a => a.account_type !== 'fixed_deposit').map((acc) => (
                        <option key={acc.id} value={acc.id}>{accountTypeLabels[acc.account_type]} - {formatCurrency(acc.balance)}</option>
                      ))}
                    </select>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={billData.savePayee} onChange={(e) => setBillData({ ...billData, savePayee: e.target.checked })}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="text-sm text-gray-600">Save this payee for future payments</span>
                  </label>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                    Review Payment <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* Step: Confirm */}
              {billStep === 'confirm' && (
                <div className="space-y-5">
                  <button type="button" onClick={() => setBillStep('form')} className="text-sm text-blue-600 hover:underline mb-2 flex items-center gap-1">
                    &larr; Edit details
                  </button>
                  <div className="bg-gray-50 rounded-xl p-5 space-y-3">
                    <div className="flex items-center gap-3 mb-4">
                      {(() => { const Icon = billCategoryIcons[billData.category] || Receipt; return <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${billCategoryColors[billData.category]}`}><Icon className="w-6 h-6" /></div>; })()}
                      <div>
                        <div className="text-lg font-semibold text-gray-900">{billData.provider}</div>
                        <div className="text-sm text-gray-500">{billCategoryLabels[billData.category]} Bill Payment</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><span className="text-gray-500">Consumer No.</span><div className="font-medium text-gray-900">{billData.consumerNumber}</div></div>
                      <div><span className="text-gray-500">Amount</span><div className="font-bold text-gray-900 text-lg">{formatCurrency(parseFloat(billData.amount || '0'))}</div></div>
                      <div className="col-span-2"><span className="text-gray-500">Pay From</span><div className="font-medium text-gray-900">{accountTypeLabels[accounts.find(a => a.id === billData.accountId)?.account_type || ''] || 'Account'}</div></div>
                    </div>
                  </div>
                  <button onClick={handlePayBill} disabled={billLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                    {billLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing Payment...</> : <><CheckCircle className="w-4 h-4" /> Confirm &amp; Pay {formatCurrency(parseFloat(billData.amount || '0'))}</>}
                  </button>
                  <p className="text-xs text-gray-400 text-center">By confirming, the amount will be deducted from your selected account.</p>
                </div>
              )}

              {/* Step: Success */}
              {billStep === 'success' && lastBillResult && (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Successful!</h3>
                  <p className="text-gray-500 mb-6">
                    Your {billCategoryLabels[lastBillResult.category]} bill of <strong>{formatCurrency(lastBillResult.amount)}</strong> has been paid to <strong>{lastBillResult.provider}</strong>.
                  </p>
                  <div className="flex gap-3">
                    <button onClick={() => { setBillStep('category'); setBillData({ category: '', provider: '', consumerNumber: '', amount: '', accountId: '', savePayee: true }); setLastBillResult(null); }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
                      Pay Another Bill
                    </button>
                    <button onClick={() => setShowBillPay(false)}
                      className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg transition-colors">
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
