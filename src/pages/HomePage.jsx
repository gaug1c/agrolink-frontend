import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ProductsSection from '../components/home/ProductsSection';
import ProducersSection from '../components/home/ProducersSection';
import HowItWorks from '../components/home/HowItWorks';
import PartnersSection from '../components/home/PartnersSection';
import Newsletter from '../components/home/Newsletter';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <ProductsSection />
      <ProducersSection />
      <HowItWorks />
      <PartnersSection />
      <Newsletter />
    </div>
  );
};

export default HomePage;