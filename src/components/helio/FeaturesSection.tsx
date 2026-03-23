import React, { useEffect, useState, useRef } from 'react';
import { Shield, Clock, Banknote, Users, Award, Zap } from 'lucide-react';

const stats = [
  { value: '10M+', label: 'Customers Worldwide' },
  { value: '64', label: 'Countries & Territories' },
  { value: '150+', label: 'Years of Trust' },
  { value: '99.9%', label: 'Uptime Guarantee' },
];

const features = [
  { icon: Shield, title: 'Bank-Grade Security', desc: 'Multi-layer encryption and biometric authentication to keep your money safe.' },
  { icon: Clock, title: '24/7 Banking', desc: 'Access your accounts and make transactions anytime, from anywhere in the world.' },
  { icon: Banknote, title: 'Competitive Rates', desc: 'Best-in-class interest rates on savings, fixed deposits, and loan products.' },
  { icon: Users, title: 'Dedicated Support', desc: 'Personal relationship managers for Premier and wealth management clients.' },
  { icon: Award, title: 'Premium Rewards', desc: 'Earn points on every transaction and redeem for travel, shopping, and more.' },
  { icon: Zap, title: 'Instant Transfers', desc: 'Send money domestically and internationally with real-time processing.' },
];

const FeaturesSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        {/* Stats bar */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16 lg:mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl lg:text-5xl font-bold text-red-600 mb-2">{stat.value}</div>
              <div className="text-sm lg:text-base text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
            Why choose <span className="font-semibold text-red-600">HELIO</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Experience banking that puts you first with world-class features
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className={`bg-white rounded-xl p-6 lg:p-8 border border-gray-100 hover:border-red-100 hover:shadow-lg transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
