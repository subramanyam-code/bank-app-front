import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { 
  Landmark, CreditCard, TrendingUp, Globe, Gift, Smartphone,
  ArrowRight
} from 'lucide-react';

const IMAGES = {
  banking: 'https://d64gsuwffb70l.cloudfront.net/69bd4c2bf4aa9ec2711101a2_1774013726826_644317a8.jpg',
  borrowing: 'https://d64gsuwffb70l.cloudfront.net/69bd4c2bf4aa9ec2711101a2_1774013645383_6cb29354.png',
  investing: 'https://d64gsuwffb70l.cloudfront.net/69bd4c2bf4aa9ec2711101a2_1774013888681_d262374b.jpg',
  nri: 'https://d64gsuwffb70l.cloudfront.net/69bd4c2bf4aa9ec2711101a2_1774013815474_20e97da6.jpg',
  offers: 'https://d64gsuwffb70l.cloudfront.net/69bd4c2bf4aa9ec2711101a2_1774013869845_9038d965.png',
  app: 'https://d64gsuwffb70l.cloudfront.net/69bd4c2bf4aa9ec2711101a2_1774013797372_efd6597a.jpg',
};

type PageType = 'banking' | 'borrowing' | 'investing' | 'nri' | 'offers' | 'online-banking';

const services: { title: string; sub: string; desc: string; icon: React.ElementType; page: PageType; image: string }[] = [
  {
    title: 'Banking',
    sub: 'Accounts & Services',
    desc: 'Open a savings or current account with premium benefits and seamless digital banking.',
    icon: Landmark,
    page: 'banking',
    image: IMAGES.banking,
  },
  {
    title: 'Borrowing',
    sub: 'Cards & Loans',
    desc: 'Premium credit cards and competitive loan products tailored to your financial goals.',
    icon: CreditCard,
    page: 'borrowing',
    image: IMAGES.borrowing,
  },
  {
    title: 'Investing',
    sub: 'Wealth & Insurance',
    desc: 'Grow your wealth with expert investment advice and comprehensive insurance solutions.',
    icon: TrendingUp,
    page: 'investing',
    image: IMAGES.investing,
  },
  {
    title: 'NRI Services',
    sub: 'NRI Services & Transfers',
    desc: 'Seamless banking across borders with international transfers and NRI account management.',
    icon: Globe,
    page: 'nri',
    image: IMAGES.nri,
  },
  {
    title: 'Offers',
    sub: 'Offers & Rewards',
    desc: 'Exclusive rewards, cashback offers, and partner discounts for HELIO customers.',
    icon: Gift,
    page: 'offers',
    image: IMAGES.offers,
  },
  {
    title: 'Online Banking',
    sub: 'Banking made easy',
    desc: 'Manage your finances anytime, anywhere with our secure digital banking platform.',
    icon: Smartphone,
    page: 'online-banking',
    image: IMAGES.app,
  },
];

const ServicesSection: React.FC = () => {
  const { setCurrentPage } = useAppContext();

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
            Explore our <span className="font-semibold">services</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Comprehensive financial solutions designed for your every need
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <button
                key={service.title}
                onClick={() => setCurrentPage(service.page)}
                className="group text-left bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <span className="text-white font-semibold text-lg block leading-tight">{service.title}</span>
                      <span className="text-white/80 text-xs">{service.sub}</span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.desc}</p>
                  <span className="text-red-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
