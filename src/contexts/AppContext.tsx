import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  email: string;
  full_name: string;
}

interface Account {
  id: string;
  account_type: string;
  account_number: string;
  balance: number;
  currency: string;
  status: string;
}

interface Transaction {
  id: string;
  account_id: string;
  type: 'credit' | 'debit' | 'transfer';
  amount: number;
  description: string;
  recipient: string;
  status: string;
  created_at: string;
}

interface DashboardSummary {
  totalBalance: number;
  totalAccounts: number;
  recentCredits: number;
  recentDebits: number;
}

type Page = 'home' | 'dashboard' | 'banking' | 'borrowing' | 'investing' | 'nri' | 'offers' | 'online-banking';

interface AppContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  currentPage: Page;
  showLoginModal: boolean;
  loginMode: 'login' | 'register';
  accounts: Account[];
  transactions: Transaction[];
  dashboardSummary: DashboardSummary | null;
  txnFilter: string;
  setCurrentPage: (page: Page) => void;
  setShowLoginModal: (show: boolean) => void;
  setLoginMode: (mode: 'login' | 'register') => void;
  setTxnFilter: (filter: string) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string, phone?: string) => Promise<void>;
  logout: () => void;
  fetchDashboard: () => Promise<void>;
  fetchTransactions: (type?: string) => Promise<void>;
  performTransfer: (fromAccountId: string, amount: number, description: string, recipient: string) => Promise<void>;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('helio_token'));
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginMode, setLoginMode] = useState<'login' | 'register'>('login');
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [dashboardSummary, setDashboardSummary] = useState<DashboardSummary | null>(null);
  const [txnFilter, setTxnFilter] = useState('all');

  const isAuthenticated = !!user && !!token;

  // Verify token on mount
  useEffect(() => {
    if (token) {
      verifyToken(token);
    }
  }, []);

  const verifyToken = async (t: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('helio-auth', {
        body: { action: 'verify', token: t }
      });
      if (error || !data?.user) {
        localStorage.removeItem('helio_token');
        setToken(null);
        setUser(null);
      } else {
        setUser(data.user);
      }
    } catch {
      localStorage.removeItem('helio_token');
      setToken(null);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('helio-auth', {
        body: { action: 'login', email, password }
      });
      if (error) throw new Error('Login failed');
      if (data?.error) throw new Error(data.error);
      
      localStorage.setItem('helio_token', data.token);
      setToken(data.token);
      setUser(data.user);
      setShowLoginModal(false);
      setCurrentPage('dashboard');
      toast({ title: 'Welcome back!', description: `Logged in as ${data.user.full_name}` });
    } catch (err: any) {
      toast({ title: 'Login Failed', description: err.message || 'Invalid credentials', variant: 'destructive' });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, fullName: string, phone?: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('helio-auth', {
        body: { action: 'register', email, password, full_name: fullName, phone }
      });
      if (error) throw new Error('Registration failed');
      if (data?.error) throw new Error(data.error);

      localStorage.setItem('helio_token', data.token);
      setToken(data.token);
      setUser(data.user);
      setShowLoginModal(false);
      setCurrentPage('dashboard');
      toast({ title: 'Welcome to HELIO!', description: 'Your accounts have been created successfully.' });
    } catch (err: any) {
      toast({ title: 'Registration Failed', description: err.message || 'Could not create account', variant: 'destructive' });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('helio_token');
    setToken(null);
    setUser(null);
    setAccounts([]);
    setTransactions([]);
    setDashboardSummary(null);
    setCurrentPage('home');
    toast({ title: 'Logged out', description: 'You have been logged out successfully.' });
  };

  const fetchDashboard = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('helio-banking', {
        body: { action: 'get_dashboard', token }
      });
      if (error || data?.error) throw new Error(data?.error || 'Failed to fetch dashboard');
      setAccounts(data.accounts);
      setTransactions(data.transactions);
      setDashboardSummary(data.summary);
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const fetchTransactions = useCallback(async (type?: string) => {
    if (!token) return;
    try {
      const { data, error } = await supabase.functions.invoke('helio-banking', {
        body: { action: 'get_transactions', token, type: type || txnFilter, limit: 20 }
      });
      if (error || data?.error) throw new Error(data?.error || 'Failed to fetch transactions');
      setTransactions(data.transactions);
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  }, [token, txnFilter]);

  const performTransfer = async (fromAccountId: string, amount: number, description: string, recipient: string) => {
    if (!token) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('helio-banking', {
        body: { action: 'transfer', token, from_account_id: fromAccountId, amount, description, recipient }
      });
      if (error || data?.error) throw new Error(data?.error || 'Transfer failed');
      toast({ title: 'Transfer Successful', description: `Transferred ${amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}` });
      await fetchDashboard();
    } catch (err: any) {
      toast({ title: 'Transfer Failed', description: err.message, variant: 'destructive' });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user, token, isAuthenticated, isLoading,
        currentPage, showLoginModal, loginMode,
        accounts, transactions, dashboardSummary, txnFilter,
        setCurrentPage, setShowLoginModal, setLoginMode, setTxnFilter,
        login, register, logout,
        fetchDashboard, fetchTransactions, performTransfer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
