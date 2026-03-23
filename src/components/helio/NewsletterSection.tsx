import React, { useState } from 'react';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address');
      return;
    }
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <section className="py-16 lg:py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail className="w-7 h-7 text-red-600" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-3">
            Stay <span className="font-semibold">informed</span>
          </h2>
          <p className="text-gray-500 mb-8">
            Subscribe to our newsletter for the latest banking updates, offers, and financial insights.
          </p>

          {status === 'success' ? (
            <div className="flex items-center justify-center gap-3 text-green-600 bg-green-50 rounded-xl p-4">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Thank you! You've been subscribed successfully.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
                  placeholder="Enter your email address"
                  className={`w-full pl-11 pr-4 py-3.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors ${
                    status === 'error' ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 shrink-0"
              >
                {status === 'loading' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Subscribing...</>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p className="text-red-500 text-sm mt-2">{errorMsg}</p>
          )}
          <p className="text-xs text-gray-400 mt-4">
            By subscribing, you agree to our Privacy Policy. We respect your inbox.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
