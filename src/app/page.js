import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedProperties from '../components/FeaturedProperties';
import ExploreCities from '../components/ExploreCities';
import AllProperties from '../components/AllProperties';
import Benefits from '../components/Benefits';
import StatsSection from '../components/StatsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import WhyInvestSection from '../components/WhyInvestSection';
import InvestmentProcessSection from '../components/InvestmentProcessSection';
import HowToGetStarted from '../components/HowToGetStarted';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedProperties />
      <ExploreCities />
      <AllProperties />
      <Benefits />
      <StatsSection />
      <WhyInvestSection />
      <HowToGetStarted />
      <TestimonialsSection />
      <InvestmentProcessSection />
      <Footer />
    </div>
  );
}
