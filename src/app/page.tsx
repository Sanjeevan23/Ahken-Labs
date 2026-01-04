//src/app/page.tsx
import HeroSection from '@/sections/HeroSection';
import ServicesSection from '@/sections/ServicesSection';
import PortfolioSection from '@/sections/PortfolioSection';
import AboutSection from '@/sections/AboutSection';
import HomeStatsSection from '@/sections/HomeStatsSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <main>
        <section id="home">
          <HeroSection />
          <HomeStatsSection />
        </section>

        <section id="Services">
          <ServicesSection />
        </section>

        <section id="Portfolio">
          <PortfolioSection />
        </section>

        <section id="about">
          <AboutSection />
        </section>

        <section id="Footer">
          <Footer />
        </section>

      </main>
    </>
  );
}
