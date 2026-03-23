import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import Navbar from '@/components/helio/Navbar';
import HeroSection from '@/components/helio/HeroSection';
import ServicesSection from '@/components/helio/ServicesSection';
import FeaturesSection from '@/components/helio/FeaturesSection';
import OffersSection from '@/components/helio/OffersSection';
import TestimonialsSection from '@/components/helio/TestimonialsSection';
import CTASection from '@/components/helio/CTASection';
import AppBanner from '@/components/helio/AppBanner';
import SecurityBanner from '@/components/helio/SecurityBanner';
import NewsletterSection from '@/components/helio/NewsletterSection';
import Footer from '@/components/helio/Footer';
import LoginModal from '@/components/helio/LoginModal';
import Dashboard from '@/components/helio/Dashboard';
import ServicePage from '@/components/helio/ServicePage';

const AppLayout: React.FC = () => {
  const { currentPage, isAuthenticated } = useAppContext();

  const renderPage = () => {
    if (currentPage === 'dashboard' && isAuthenticated) {
      return <Dashboard />;
    }

    if (['banking', 'borrowing', 'investing', 'nri', 'offers', 'online-banking'].includes(currentPage)) {
      return (
        <>
          <ServicePage page={currentPage as 'banking' | 'borrowing' | 'investing' | 'nri' | 'offers' | 'online-banking'} />
          <SecurityBanner />
          <NewsletterSection />
        </>
      );
    }

    // Home page
    return (
      <>
        <HeroSection />
        <ServicesSection />
        <FeaturesSection />
        <OffersSection />
        <TestimonialsSection />
        <CTASection />
        <AppBanner />
        <SecurityBanner />
        <NewsletterSection />
      </>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {renderPage()}
      </main>
      <Footer />
      <LoginModal />
    </div>
  );
};

export default AppLayout;
