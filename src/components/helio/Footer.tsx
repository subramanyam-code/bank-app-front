import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

const footerLinks = {
  'Banking': ['Savings Account', 'Current Account', 'Fixed Deposits', 'Recurring Deposits', 'NRE/NRO Accounts', 'Salary Account'],
  'Borrowing': ['Personal Loan', 'Home Loan', 'Car Loan', 'Education Loan', 'Credit Cards', 'Gold Loan'],
  'Investing': ['Mutual Funds', 'Insurance', 'Bonds', 'Demat Account', 'Portfolio Management', 'Tax Planning'],
  'Quick Links': ['About HELIO', 'Careers', 'Media Centre', 'Investor Relations', 'CSR', 'Contact Us'],
};

const Footer: React.FC = () => {
  const { setCurrentPage } = useAppContext();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-red-600 transform rotate-45 rounded-sm"></div>
                <div className="absolute inset-[3px] bg-gray-900 transform rotate-45 rounded-sm"></div>
                <div className="absolute inset-[6px] bg-red-600 transform rotate-45 rounded-sm"></div>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">HELIO</span>
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Opening up a world of opportunity for our customers, investors, and communities.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                <span>HELIO Tower, BKC, Mumbai 400051</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <span>1800-123-HELIO (4354)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <span>support@heliobank.com</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-4 text-sm">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => {
                        if (title === 'Banking') setCurrentPage('banking');
                        else if (title === 'Borrowing') setCurrentPage('borrowing');
                        else if (title === 'Investing') setCurrentPage('investing');
                        else setCurrentPage('home');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-gray-500 text-center md:text-left">
            &copy; 2026 HELIO Bank. All rights reserved. | 
            <button className="hover:text-gray-300 ml-1 transition-colors">Privacy Policy</button> | 
            <button className="hover:text-gray-300 ml-1 transition-colors">Terms of Use</button> | 
            <button className="hover:text-gray-300 ml-1 transition-colors">Cookie Policy</button>
          </div>
          <div className="flex items-center gap-4">
            {[Facebook, Twitter, Linkedin, Instagram, Youtube].map((Icon, i) => (
              <button
                key={i}
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-colors"
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
