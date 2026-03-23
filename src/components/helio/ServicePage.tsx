import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import {
  Landmark, CreditCard, TrendingUp, Globe, Gift, Smartphone,
  ArrowRight, CheckCircle, Shield, Clock, Percent, Banknote,
  Building2, Plane, Users, Award, Calculator, FileText,
  Home, GraduationCap, Car, Gem
} from 'lucide-react';

type PageType = 'banking' | 'borrowing' | 'investing' | 'nri' | 'offers' | 'online-banking';

const IMAGES = {
  banking: 'https://d64gsuwffb70l.cloudfront.net/69bd4c2bf4aa9ec2711101a2_1774013726826_644317a8.jpg',
  borrowing: 'https://d64gsuwffb70l.cloudfront.net/69bd4c2bf4aa9ec2711101a2_1774013645383_6cb29354.png',
  investing: 'https://d64gsuwffb70l.cloudfront.net/69bd4c2bf4aa9ec2711101a2_1774013888681_d262374b.jpg',
  nri: 'https://d64gsuwffb70l.cloudfront.net/69bd4c2bf4aa9ec2711101a2_1774013815474_20e97da6.jpg',
  offers: 'https://d64gsuwffb70l.cloudfront.net/69bd4c2bf4aa9ec2711101a2_1774013869845_9038d965.png',
  'online-banking': 'https://d64gsuwffb70l.cloudfront.net/69bd4c2bf4aa9ec2711101a2_1774013797372_efd6597a.jpg',
};

interface ServicePageData {
  title: string;
  subtitle: string;
  description: string;
  heroIcon: React.ElementType;
  products: { icon: React.ElementType; title: string; desc: string; features: string[] }[];
}

const serviceData: Record<PageType, ServicePageData> = {
  banking: {
    title: 'Banking',
    subtitle: 'Accounts & Services',
    description: 'Open a world of opportunities with HELIO banking accounts designed for every need.',
    heroIcon: Landmark,
    products: [
      {
        icon: Landmark,
        title: 'Savings Account',
        desc: 'Earn competitive interest rates while keeping your money accessible.',
        features: ['Up to 6% interest p.a.', 'Zero minimum balance option', 'Free debit card', 'Instant account opening'],
      },
      {
        icon: Building2,
        title: 'Current Account',
        desc: 'Designed for businesses with high transaction volumes.',
        features: ['Unlimited transactions', 'Overdraft facility', 'Multi-city cheque', 'Cash management'],
      },
      {
        icon: Shield,
        title: 'Fixed Deposit',
        desc: 'Lock in attractive rates for guaranteed returns.',
        features: ['Up to 7.5% interest', 'Flexible tenures', 'Auto-renewal option', 'Loan against FD'],
      },
      {
        icon: Clock,
        title: 'Recurring Deposit',
        desc: 'Build your savings with regular monthly deposits.',
        features: ['Start from ₹500/month', 'Flexible tenure', 'Competitive rates', 'Auto-debit facility'],
      },
      {
        icon: Users,
        title: 'Salary Account',
        desc: 'Premium benefits for salaried professionals.',
        features: ['Zero balance required', 'Premium debit card', 'Insurance cover', 'Exclusive offers'],
      },
      {
        icon: Gem,
        title: 'Premier Account',
        desc: 'Exclusive banking for high-net-worth individuals.',
        features: ['Dedicated RM', 'Global access', 'Lounge access', 'Wealth advisory'],
      },
    ],
  },
  borrowing: {
    title: 'Borrowing',
    subtitle: 'Cards & Loans',
    description: 'Flexible lending solutions and premium credit cards for your financial needs.',
    heroIcon: CreditCard,
    products: [
      {
        icon: CreditCard,
        title: 'Platinum Credit Card',
        desc: 'Premium rewards on every spend with worldwide acceptance.',
        features: ['5X reward points', 'Airport lounge access', 'Zero forex markup', 'Concierge service'],
      },
      {
        icon: Home,
        title: 'Home Loan',
        desc: 'Make your dream home a reality with competitive rates.',
        features: ['From 8.5% p.a.', 'Up to 30 years tenure', 'Quick approval', 'Top-up facility'],
      },
      {
        icon: Banknote,
        title: 'Personal Loan',
        desc: 'Quick disbursal for your personal financial needs.',
        features: ['From 10.5% p.a.', 'Up to ₹40 lakhs', 'Minimal documentation', 'Same-day disbursal'],
      },
      {
        icon: Car,
        title: 'Car Loan',
        desc: 'Drive your dream car with easy financing options.',
        features: ['From 8.75% p.a.', 'Up to 100% funding', 'Flexible EMI', 'Quick processing'],
      },
      {
        icon: GraduationCap,
        title: 'Education Loan',
        desc: 'Invest in your future with education financing.',
        features: ['From 9% p.a.', 'Covers all expenses', 'Moratorium period', 'Tax benefits'],
      },
      {
        icon: Gem,
        title: 'Gold Loan',
        desc: 'Unlock the value of your gold with instant loans.',
        features: ['From 7.5% p.a.', 'Instant disbursal', 'Secure storage', 'Flexible repayment'],
      },
    ],
  },
  investing: {
    title: 'Investing',
    subtitle: 'Wealth & Insurance',
    description: 'Grow and protect your wealth with expert investment and insurance solutions.',
    heroIcon: TrendingUp,
    products: [
      {
        icon: TrendingUp,
        title: 'Mutual Funds',
        desc: 'Diversified investment options for every risk profile.',
        features: ['1000+ fund options', 'SIP from ₹500', 'Expert research', 'Tax-saving funds'],
      },
      {
        icon: Shield,
        title: 'Life Insurance',
        desc: 'Comprehensive protection for you and your family.',
        features: ['Term plans', 'ULIPs', 'Endowment plans', 'Child plans'],
      },
      {
        icon: FileText,
        title: 'Bonds & Debentures',
        desc: 'Fixed income instruments for stable returns.',
        features: ['Government bonds', 'Corporate bonds', 'Tax-free bonds', 'Regular income'],
      },
      {
        icon: Calculator,
        title: 'Portfolio Management',
        desc: 'Professional management of your investment portfolio.',
        features: ['Expert managers', 'Customized strategy', 'Regular reviews', 'Risk management'],
      },
      {
        icon: Award,
        title: 'Demat Account',
        desc: 'Trade stocks and securities with ease.',
        features: ['Low brokerage', 'Research reports', 'Mobile trading', 'IPO access'],
      },
      {
        icon: Percent,
        title: 'Tax Planning',
        desc: 'Optimize your tax savings with smart investments.',
        features: ['ELSS funds', 'NPS', 'PPF', 'Tax-saving FDs'],
      },
    ],
  },
  nri: {
    title: 'NRI Services',
    subtitle: 'NRI Services & Transfers',
    description: 'Seamless banking across borders for Non-Resident Indians.',
    heroIcon: Globe,
    products: [
      {
        icon: Globe,
        title: 'NRE Account',
        desc: 'Maintain your foreign earnings in Indian rupees.',
        features: ['Tax-free interest', 'Full repatriability', 'Rupee denominated', 'Online access'],
      },
      {
        icon: Banknote,
        title: 'NRO Account',
        desc: 'Manage your Indian income while living abroad.',
        features: ['Indian income management', 'Partial repatriability', 'Joint account option', 'Investment access'],
      },
      {
        icon: Plane,
        title: 'Remittance Services',
        desc: 'Send money to India quickly and securely.',
        features: ['Competitive rates', 'Same-day credit', '24/7 transfers', 'Multiple currencies'],
      },
      {
        icon: Home,
        title: 'NRI Home Loan',
        desc: 'Buy property in India with special NRI rates.',
        features: ['Attractive rates', 'Easy documentation', 'Power of attorney', 'Online tracking'],
      },
      {
        icon: TrendingUp,
        title: 'NRI Investments',
        desc: 'Invest in Indian markets from anywhere in the world.',
        features: ['Mutual funds', 'Stocks & bonds', 'Real estate', 'Portfolio management'],
      },
      {
        icon: Shield,
        title: 'NRI Insurance',
        desc: 'Protect your family in India with comprehensive coverage.',
        features: ['Health insurance', 'Life insurance', 'Property insurance', 'Travel insurance'],
      },
    ],
  },
  offers: {
    title: 'Offers',
    subtitle: 'Offers & Rewards',
    description: 'Exclusive deals, cashback, and rewards for HELIO customers.',
    heroIcon: Gift,
    products: [
      {
        icon: CreditCard,
        title: 'Zero Annual Fee',
        desc: 'Get HELIO Platinum Card with zero annual fee for the first year.',
        features: ['No joining fee', 'Lifetime free option', 'Welcome bonus', 'Instant approval'],
      },
      {
        icon: Percent,
        title: '7.5% FD Rate',
        desc: 'Special fixed deposit rates for a limited time.',
        features: ['Senior citizen bonus', 'Flexible tenure', 'Auto-renewal', 'Online booking'],
      },
      {
        icon: Plane,
        title: 'Travel Rewards',
        desc: 'Earn 5X points on international spends.',
        features: ['Airport lounge', 'Travel insurance', 'Forex benefits', 'Hotel upgrades'],
      },
      {
        icon: Gift,
        title: 'Refer & Earn',
        desc: 'Earn up to ₹5,000 for every successful referral.',
        features: ['No limit on referrals', 'Instant credit', 'Both earn rewards', 'Easy sharing'],
      },
      {
        icon: Banknote,
        title: '20% Cashback',
        desc: 'Weekend cashback on online shopping with HELIO cards.',
        features: ['Max ₹1,000/month', 'All online stores', 'Auto-credited', 'No min spend'],
      },
      {
        icon: Award,
        title: 'Loyalty Program',
        desc: 'Earn and redeem points across 500+ partner brands.',
        features: ['Points never expire', 'Premium catalog', 'Travel redemption', 'Gift vouchers'],
      },
    ],
  },
  'online-banking': {
    title: 'Online Banking',
    subtitle: 'Banking made easy',
    description: 'Manage your finances anytime, anywhere with our secure digital platform.',
    heroIcon: Smartphone,
    products: [
      {
        icon: Smartphone,
        title: 'Mobile Banking',
        desc: 'Full-featured banking app for iOS and Android.',
        features: ['Biometric login', 'Instant transfers', 'Bill payments', 'Investment access'],
      },
      {
        icon: Globe,
        title: 'Internet Banking',
        desc: 'Comprehensive online banking portal.',
        features: ['Account management', 'Fund transfers', 'Statements', 'Service requests'],
      },
      {
        icon: CreditCard,
        title: 'Digital Cards',
        desc: 'Virtual cards for secure online transactions.',
        features: ['Instant issuance', 'Spending limits', 'Temporary cards', 'Tokenization'],
      },
      {
        icon: Shield,
        title: 'Security Features',
        desc: 'Multi-layer security for your peace of mind.',
        features: ['2FA authentication', 'Transaction alerts', 'Card controls', 'Fraud protection'],
      },
      {
        icon: Calculator,
        title: 'Financial Tools',
        desc: 'Smart tools to manage your money better.',
        features: ['Budget tracker', 'EMI calculator', 'Tax planner', 'Goal tracker'],
      },
      {
        icon: Users,
        title: 'Digital Support',
        desc: '24/7 customer support through digital channels.',
        features: ['Live chat', 'Video banking', 'Email support', 'Social media'],
      },
    ],
  },
};

interface ServicePageProps {
  page: PageType;
}

const ServicePage: React.FC<ServicePageProps> = ({ page }) => {
  const { setShowLoginModal, setLoginMode, isAuthenticated, setCurrentPage } = useAppContext();
  const data = serviceData[page];
  const HeroIcon = data.heroIcon;

  const handleCTA = () => {
    if (isAuthenticated) {
      setCurrentPage('dashboard');
    } else {
      setLoginMode('register');
      setShowLoginModal(true);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={IMAGES[page]} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/70" />
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-16 lg:py-24 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center">
                <HeroIcon className="w-6 h-6 text-red-400" />
              </div>
              <span className="text-red-400 font-medium text-sm">{data.subtitle}</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-light mb-4">
              {data.title}
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">{data.description}</p>
            <button
              onClick={handleCTA}
              className="bg-red-600 hover:bg-red-500 text-white font-semibold px-8 py-3.5 rounded-sm transition-all flex items-center gap-2 group"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-3">
              Our <span className="font-semibold">{data.title}</span> Products
            </h2>
            <p className="text-gray-500 text-lg">Choose the right solution for your needs</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {data.products.map((product, i) => {
              const Icon = product.icon;
              return (
                <div
                  key={i}
                  className="group bg-white border border-gray-100 rounded-xl p-6 lg:p-8 hover:shadow-xl hover:border-red-100 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-red-600 transition-colors">
                    <Icon className="w-6 h-6 text-red-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{product.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {product.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={handleCTA}
                    className="text-red-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    {isAuthenticated ? 'View Details' : 'Apply Now'} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
