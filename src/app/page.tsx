//src/app/page.tsx
import HeroSection from '@/sections/HeroSection';
import ServicesSection from '@/sections/ServicesSection';
import PortfolioSection from '@/sections/PortfolioSection';
import AboutSection from '@/sections/AboutSection';
import ContactSection from '@/sections/ContactSection';
// import Header from '@/components/Header';

export default function HomePage() {
  return (
    <>
      {/* <Header /> */}

      <main>
        <section id="home">
          <HeroSection />
        </section>

        <section id="ServicesSection">
          <ServicesSection />
        </section>

        <section id="PortfolioSection">
          <PortfolioSection />
        </section>

        <section id="about">
          <AboutSection />
        </section>

        <section id="contact">
          <ContactSection />
        </section>
      </main>
    </>
  );
}
