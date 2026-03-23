import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { ArrowRight } from 'lucide-react';

const HERO_IMAGE = 'https://d64gsuwffb70l.cloudfront.net/69bd4c2bf4aa9ec2711101a2_1774013600974_172c9500.jpg';

const HeroSection: React.FC = () => {
  const { setCurrentPage } = useAppContext();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 min-h-[500px] lg:min-h-[600px]">
          {/* Left content */}
          <div className={`flex flex-col justify-center px-6 lg:px-12 xl:px-16 py-12 lg:py-16 transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-light text-gray-900 leading-[1.15] mb-6">
              Not just banking,
              <br />
              <span className="font-normal">your world</span>
              <br />
              <span className="font-normal">elevated</span>
            </h1>
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
              HELIO Premier. Designed to open doors to wealth opportunities in India and beyond, 
              support your well-being and move seamlessly with you across borders.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setCurrentPage('banking')}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3.5 rounded-sm transition-all duration-300 hover:shadow-lg hover:shadow-red-600/20 flex items-center gap-2 group"
              >
                Know more
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setCurrentPage('offers')}
                className="border-2 border-gray-300 hover:border-red-600 text-gray-700 hover:text-red-600 font-semibold px-8 py-3.5 rounded-sm transition-all duration-300"
              >
                View Offers
              </button>
            </div>
          </div>

          {/* Right image */}
          <div className={`relative transition-all duration-1000 delay-300 ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <div className="h-full min-h-[300px] lg:min-h-full">
              <img
                src={HERO_IMAGE}
                alt="HELIO Premier Banking"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-transparent to-transparent lg:from-white/30 lg:via-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
