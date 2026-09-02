import React from 'react';
import Navbar from './components/Navbar/Navbar';
import HeroSlider from './components/HeroSlider/HeroSlider';
import CollageSection from './components/CollageSection/CollageSection';
import ProductStrip from './components/ProductStrip/ProductStrip';
import CategoryGrid from './components/CategoryGrid/CategoryGrid';
import TrendingGram from './components/TrendingGram/TrendingGram';
import MarketingBanner from './components/MarketingBanner/MarketingBanner';
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <div className="house-of-urvaah-app">
      <Navbar />
      <main>
        <HeroSlider />
        <CollageSection />
        <TrendingGram />
        <ProductStrip />
        <CategoryGrid />
        <MarketingBanner />
      </main>
      <Footer />
    </div>
  );
}
