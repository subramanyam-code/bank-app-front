import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Business Owner',
    text: 'HELIO Premier has transformed how I manage my business finances. The dedicated relationship manager understands my needs perfectly.',
    rating: 5,
    initials: 'PS',
    color: 'bg-red-100 text-red-600',
  },
  {
    name: 'Rajesh Patel',
    role: 'NRI - Dubai',
    text: 'The NRI services are exceptional. Transferring money to India has never been easier. The rates are competitive and transfers are instant.',
    rating: 5,
    initials: 'RP',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'Ananya Gupta',
    role: 'IT Professional',
    text: 'The mobile banking app is incredibly intuitive. I can manage all my accounts, investments, and bill payments from one place.',
    rating: 5,
    initials: 'AG',
    color: 'bg-green-100 text-green-600',
  },
  {
    name: 'Vikram Singh',
    role: 'Retired Professional',
    text: 'The fixed deposit rates at HELIO are the best I\'ve found. The senior citizen benefits make it even more attractive.',
    rating: 4,
    initials: 'VS',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    name: 'Meera Krishnan',
    role: 'Doctor',
    text: 'HELIO\'s wealth management team helped me plan my investments strategically. My portfolio has grown significantly.',
    rating: 5,
    initials: 'MK',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    name: 'Arjun Reddy',
    role: 'Startup Founder',
    text: 'The current account features are perfect for my startup. The overdraft facility and cash management tools are invaluable.',
    rating: 5,
    initials: 'AR',
    color: 'bg-teal-100 text-teal-600',
  },
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : typeof window !== 'undefined' && window.innerWidth >= 640 ? 2 : 1;
  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () => setCurrentIndex((i) => Math.min(maxIndex, i + 1));

  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-3">
              What our customers <span className="font-semibold">say</span>
            </h2>
            <p className="text-gray-500 text-lg">Trusted by millions across the globe</p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              disabled={currentIndex >= maxIndex}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCount + 2)}%)` }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-gray-50 rounded-xl p-6 lg:p-8 border border-gray-100"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`w-4 h-4 ${j < t.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${t.color}`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile navigation dots */}
        <div className="flex sm:hidden items-center justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentIndex ? 'bg-red-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
