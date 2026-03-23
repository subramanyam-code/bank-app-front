import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { X, Eye, EyeOff, Loader2, Mail, Lock, User, Phone } from 'lucide-react';

const LoginModal: React.FC = () => {
  const { showLoginModal, setShowLoginModal, loginMode, setLoginMode, login, register, isLoading } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!showLoginModal) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Invalid email format';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (loginMode === 'register' && !fullName.trim()) errs.fullName = 'Full name is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      if (loginMode === 'login') {
        await login(email, password);
      } else {
        await register(email, password, fullName, phone);
      }
      // Reset form
      setEmail('');
      setPassword('');
      setFullName('');
      setPhone('');
      setErrors({});
    } catch {
      // Error handled in context
    }
  };

  const getPasswordStrength = () => {
    if (!password) return { width: '0%', color: 'bg-gray-200', label: '' };
    if (password.length < 6) return { width: '25%', color: 'bg-red-500', label: 'Weak' };
    if (password.length < 8) return { width: '50%', color: 'bg-orange-500', label: 'Fair' };
    if (/(?=.*[A-Z])(?=.*[0-9])/.test(password)) return { width: '100%', color: 'bg-green-500', label: 'Strong' };
    return { width: '75%', color: 'bg-yellow-500', label: 'Good' };
  };

  const strength = getPasswordStrength();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setShowLoginModal(false)}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white relative">
          <button
            onClick={() => setShowLoginModal(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-white transform rotate-45 rounded-sm"></div>
              <div className="absolute inset-[2px] bg-red-600 transform rotate-45 rounded-sm"></div>
              <div className="absolute inset-[4px] bg-white transform rotate-45 rounded-sm"></div>
            </div>
            <span className="text-xl font-bold">HELIO</span>
          </div>
          <h2 className="text-2xl font-semibold">
            {loginMode === 'login' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-red-100 text-sm mt-1">
            {loginMode === 'login'
              ? 'Log in to access your HELIO banking dashboard'
              : 'Join HELIO and experience premium banking'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {loginMode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors ${
                    errors.fullName ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
              </div>
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-200'
                }`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`w-full pl-10 pr-12 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors ${
                  errors.password ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            {loginMode === 'register' && password && (
              <div className="mt-2">
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${strength.color} transition-all duration-300 rounded-full`}
                    style={{ width: strength.width }}
                  />
                </div>
                <span className="text-xs text-gray-500 mt-1">{strength.label}</span>
              </div>
            )}
          </div>

          {loginMode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {loginMode === 'login' ? 'Logging in...' : 'Creating account...'}
              </>
            ) : (
              loginMode === 'login' ? 'Log On' : 'Create Account'
            )}
          </button>

          <div className="text-center text-sm text-gray-500">
            {loginMode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setLoginMode('register'); setErrors({}); }}
                  className="text-red-600 font-semibold hover:underline"
                >
                  Register now
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setLoginMode('login'); setErrors({}); }}
                  className="text-red-600 font-semibold hover:underline"
                >
                  Log in
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
