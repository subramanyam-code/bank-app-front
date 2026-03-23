import React from 'react';
import { Smartphone, Shield, Zap, Bell } from 'lucide-react';

const APP_IMAGE = 'https://d64gsuwffb70l.cloudfront.net/69bd4c2bf4aa9ec2711101a2_1774013797372_efd6597a.jpg';

const features = [
  { icon: Zap, text: 'Instant transfers & payments' },
  { icon: Shield, text: 'Bank-grade security' },
  { icon: Bell, text: 'Real-time notifications' },
  { icon: Smartphone, text: 'Biometric authentication' },
];

const AppBanner: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-light mb-4 leading-tight">
              Banking at your <span className="font-semibold">fingertips</span>
            </h2>
            <p className="text-red-100 text-lg mb-8 leading-relaxed">
              Download the HELIO mobile app and experience seamless banking. 
              Available on iOS and Android.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium">{f.text}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-4">
              <button className="bg-white text-red-600 font-semibold px-6 py-3 rounded-lg hover:bg-red-50 transition-colors text-sm flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                App Store
              </button>
              <button className="bg-white text-red-600 font-semibold px-6 py-3 rounded-lg hover:bg-red-50 transition-colors text-sm flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M3.18 23.75c-.36-.17-.68-.52-.68-1.13V1.38c0-.61.32-.96.68-1.13l11.2 11.75L3.18 23.75zm1.81-1.9L15.5 12 5 2.15v19.7zm11.94-8.5l2.74-1.57-2.74-1.57L14.5 12l2.43 1.35zm-1.06 2.15L5.5 21.35l13.12-7.5-2.75-1.35z"/>
                </svg>
                Google Play
              </button>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative w-72 lg:w-80">
              <img
                src={APP_IMAGE}
                alt="HELIO Mobile App"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-lg">
                <div className="text-xs text-gray-500">App Rating</div>
                <div className="text-lg font-bold text-gray-900">4.8/5</div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-lg">
                <div className="text-xs text-gray-500">Downloads</div>
                <div className="text-lg font-bold text-gray-900">10M+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppBanner;
