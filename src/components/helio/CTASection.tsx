import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { ArrowRight, CheckCircle } from 'lucide-react';

const benefits = [
  'Zero balance savings account',
  'Free international debit card',
  'Complimentary airport lounge access',
  'Dedicated relationship manager',
];

const CTASection: React.FC = () => {
  const { isAuthenticated, setShowLoginModal, setLoginMode, setCurrentPage } = useAppContext();

  const handleCTA = () => {
    if (isAuthenticated) {
      setCurrentPage('dashboard');
    } else {
      setLoginMode('register');
      setShowLoginModal(true);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-5xl font-light text-white mb-6 leading-tight">
              Open your <span className="font-semibold text-red-400">HELIO Premier</span> account today
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Join millions of customers who trust HELIO for their banking needs. 
              Experience premium banking with exclusive benefits.
            </p>
            <ul className="space-y-3 mb-10">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={handleCTA}
              className="bg-red-600 hover:bg-red-500 text-white font-semibold px-10 py-4 rounded-sm transition-all duration-300 hover:shadow-lg hover:shadow-red-600/30 flex items-center gap-2 group text-lg"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Open an Account'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="relative">
            <img
              src="https://d64gsuwffb70l.cloudfront.net/69bd4c2bf4aa9ec2711101a2_1774013699254_49276e79.png"
              alt="HELIO Premier Banking"
              className="rounded-2xl shadow-2xl w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl hidden lg:block">
              <div className="text-xs text-gray-500 mb-1">Account opened in</div>
              <div className="text-2xl font-bold text-gray-900">5 minutes</div>
              <div className="text-xs text-green-600 font-semibold">100% Digital</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
