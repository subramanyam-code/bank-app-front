import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { ArrowRight, Percent, Gift, CreditCard, Plane, ShoppingBag, Utensils } from 'lucide-react';

const offers = [
  {
    icon: CreditCard,
    title: 'Zero Annual Fee',
    desc: 'Get your HELIO Platinum Credit Card with zero annual fee for the first year.',
    tag: 'Credit Cards',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Percent,
    title: '7.5% FD Rate',
    desc: 'Earn up to 7.5% p.a. on Fixed Deposits. Special rates for senior citizens.',
    tag: 'Deposits',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Plane,
    title: 'Travel Rewards',
    desc: 'Earn 5X reward points on international spends with HELIO World Card.',
    tag: 'Travel',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: ShoppingBag,
    title: '20% Cashback',
    desc: 'Get 20% cashback on online shopping with HELIO Debit Card this weekend.',
    tag: 'Shopping',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: Gift,
    title: 'Refer & Earn',
    desc: 'Refer a friend and both earn up to ₹5,000 in rewards. No limits on referrals.',
    tag: 'Rewards',
    color: 'bg-pink-50 text-pink-600',
  },
  {
    icon: Utensils,
    title: 'Dining Deals',
    desc: 'Up to 25% off at 500+ partner restaurants across India with HELIO cards.',
    tag: 'Dining',
    color: 'bg-amber-50 text-amber-600',
  },
];

const OffersSection: React.FC = () => {
  const { setCurrentPage } = useAppContext();

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-3">
              Latest <span className="font-semibold">offers</span>
            </h2>
            <p className="text-gray-500 text-lg">Exclusive deals and rewards for HELIO customers</p>
          </div>
          <button
            onClick={() => setCurrentPage('offers')}
            className="hidden sm:flex items-center gap-2 text-red-600 font-semibold hover:gap-3 transition-all"
          >
            View all offers <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer, i) => {
            const Icon = offer.icon;
            return (
              <div
                key={i}
                className="group border border-gray-100 rounded-xl p-6 hover:shadow-lg hover:border-red-100 transition-all duration-300 cursor-pointer"
                onClick={() => setCurrentPage('offers')}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${offer.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${offer.color}`}>
                    {offer.tag}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {offer.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{offer.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="sm:hidden mt-8 text-center">
          <button
            onClick={() => setCurrentPage('offers')}
            className="text-red-600 font-semibold flex items-center gap-2 mx-auto"
          >
            View all offers <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
