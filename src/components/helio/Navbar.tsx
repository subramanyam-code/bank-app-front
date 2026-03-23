import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Search, Globe, ChevronDown, Menu, X, User, LogOut } from 'lucide-react';

const topBarLinks = ['Personal', 'Business', 'Asset Management', 'Private Bank', 'Securities & Capital Markets', 'GIFT City'];

const navItems = [
  { label: 'Banking', sub: 'Accounts & Services', page: 'banking' as const },
  { label: 'Borrowing', sub: 'Cards & Loans', page: 'borrowing' as const },
  { label: 'Investing', sub: 'Wealth & Insurance', page: 'investing' as const },
  { label: 'NRI', sub: 'NRI Services & Transfers', page: 'nri' as const },
  { label: 'Offers', sub: 'Offers & Rewards', page: 'offers' as const },
  { label: 'Online Banking', sub: 'Banking made easy', page: 'online-banking' as const },
];

const Navbar: React.FC = () => {
  const { isAuthenticated, user, currentPage, setCurrentPage, setShowLoginModal, setLoginMode, logout } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTopLink, setActiveTopLink] = useState('Personal');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogin = () => {
    setLoginMode('login');
    setShowLoginModal(true);
  };

  const handleNavClick = (page: typeof navItems[0]['page']) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex items-center justify-between h-10">
          <nav className="hidden lg:flex items-center gap-1">
            {topBarLinks.map((link) => (
              <button
                key={link}
                onClick={() => setActiveTopLink(link)}
                className={`text-xs font-medium px-3 py-2 transition-colors ${
                  activeTopLink === link
                    ? 'text-gray-900 border-b-2 border-red-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {link}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900 transition-colors">
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">English</span>
            </button>
            <button className="text-gray-600 hover:text-gray-900 transition-colors">
              <Search className="w-4 h-4" />
            </button>
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 text-xs font-medium text-gray-700 hover:text-gray-900"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{user?.full_name}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                    <button
                      onClick={() => { setCurrentPage('dashboard'); setShowUserMenu(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <User className="w-4 h-4" /> Dashboard
                    </button>
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={() => { logout(); setShowUserMenu(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="text-xs font-medium text-gray-700 hover:text-gray-900 flex items-center gap-1 transition-colors"
              >
                Log On <span className="text-red-600">›</span>
              </button>
            )}
            <button className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-1.5 rounded-sm transition-colors">
              Get the app
            </button>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-3 shrink-0"
          >
            <div className="relative w-10 h-10 lg:w-12 lg:h-12">
              <div className="absolute inset-0 bg-red-600 transform rotate-45 rounded-sm"></div>
              <div className="absolute inset-[3px] lg:inset-1 bg-white transform rotate-45 rounded-sm"></div>
              <div className="absolute inset-[6px] lg:inset-2 bg-red-600 transform rotate-45 rounded-sm flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 lg:w-5 lg:h-5 text-white transform -rotate-45" fill="currentColor">
                  <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l7 3.5v7.64l-7 3.5-7-3.5V7.68l7-3.5z"/>
                </svg>
              </div>
            </div>
            <span className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">HELIO</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.page)}
                className={`group px-3 xl:px-4 py-2 transition-all ${
                  currentPage === item.page ? 'border-b-2 border-red-600' : ''
                }`}
              >
                <span className={`text-sm xl:text-base font-semibold block ${
                  currentPage === item.page ? 'text-gray-900' : 'text-gray-800 group-hover:text-red-600'
                } transition-colors`}>
                  {item.label}
                </span>
                <span className="text-[11px] xl:text-xs text-gray-500 block">{item.sub}</span>
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.page)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === item.page
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="font-semibold block">{item.label}</span>
                <span className="text-xs text-gray-500">{item.sub}</span>
              </button>
            ))}
            {isAuthenticated && (
              <button
                onClick={() => { setCurrentPage('dashboard'); setMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold"
              >
                Dashboard
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
