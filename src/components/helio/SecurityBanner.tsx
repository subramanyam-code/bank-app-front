import React from 'react';
import { Shield, Lock, Eye, Fingerprint } from 'lucide-react';

const securityFeatures = [
  {
    icon: Shield,
    title: 'RBI Regulated',
    desc: 'Fully regulated by the Reserve Bank of India',
  },
  {
    icon: Lock,
    title: '256-bit Encryption',
    desc: 'Bank-grade encryption for all transactions',
  },
  {
    icon: Eye,
    title: '24/7 Monitoring',
    desc: 'Real-time fraud detection and prevention',
  },
  {
    icon: Fingerprint,
    title: 'Biometric Auth',
    desc: 'Fingerprint and face recognition login',
  },
];

const SecurityBanner: React.FC = () => {
  return (
    <section className="py-12 bg-gray-900 text-white">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {securityFeatures.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{f.title}</div>
                  <div className="text-xs text-gray-400">{f.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SecurityBanner;
