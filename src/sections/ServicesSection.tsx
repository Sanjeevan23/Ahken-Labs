'use client';

import Image from 'next/image';
import CartBox from '@/components/common/CartBox';
import goArrow from '@/assets/icons/go_arrow.svg';
import { servicesData } from '@/api/servicesData';
import useScale from '@/hooks/useScale';
import useEdgeAutoScroll from '@/hooks/useEdgeAutoScroll';
import ailogo from '@/assets/images/logo_ai.svg';
import BrandsSection from '@/components/services/BrandsSection';
import ReviewSection from '@/components/services/ReviewSection';
import useResponsivePadding from '@/hooks/useResponsivePadding';
import CarouselDots from '@/components/common/CarouselDots';

export default function ServicesSection() {
  const scale = useScale();
  const { containerRef, handleMouseMove, stopScroll } = useEdgeAutoScroll();
  const { isDesktop, isTablet, paddingLR } = useResponsivePadding();

  const sectionTitleSize = isDesktop ? 40 : isTablet ? 28 : 20;
  const sectionPaddingTop = isDesktop ? 64 : 40;
  const cartboxborder = isDesktop ? 24 : isTablet ? 18 : 14;
  const nexticonsize = isDesktop ? 40 : isTablet ? 32 : 24;
  const boxpaddingTop = isDesktop ? 40 : 30;
  const boxpaddingBottom = isDesktop ? 10 : 10;
  const ailogoSize = isDesktop ? 400 : isTablet ? 200 : 150;
  const ailogoTop = isDesktop ? 54 : 40;

  return (
    <section id="Services" style={{ paddingTop: sectionPaddingTop }}>
      <h2
        className="text-center font-bold text-[#111111]"
        style={{ fontSize: sectionTitleSize }}
      >
        What we can build for you
      </h2>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={stopScroll}
        className="flex gap-6 overflow-x-scroll scrollbar-hide"
        style={{
          paddingLeft: isDesktop ? paddingLR : 20,
          paddingRight: isDesktop ? paddingLR : 20,
          paddingTop: boxpaddingTop,
          paddingBottom: boxpaddingBottom,
        }}
      >
        {servicesData.map(service => (
          <div
            key={service.title}
            data-carousel-item
            className="flex-shrink-0 overflow-hidden"
            style={{
              width: isDesktop ? '32.8%' : isTablet ? '32.8%' : '75%',
              borderRadius: isDesktop ? 40 : isTablet ? 30 : 20,
              background: '#FFFFFF',
              backdropFilter: 'blur(40px)',
              boxShadow: '0px 0px 16px 0px #00000014',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div className="flex justify-center mt-5">
              <Image
                src={service.image}
                alt={service.title}
                height={245.33}
                className="object-contain"
              />
            </div>

            <CartBox
              marginTop={isDesktop ? 24 : 16}
              marginBottom={isDesktop ? 24 : 16}
              marginLeft={isDesktop ? 24 : 16}
              marginRight={isDesktop ? 24 : 16}
              paddingTop={isDesktop ? 30 : 20}
              paddingBottom={isDesktop ? 20 : 14}
              paddingLeft={isDesktop ? 20 : 14}
              paddingRight={isDesktop ? 20 : 14}
              borderRadius={cartboxborder}
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <h3 style={{ fontSize: isDesktop ? 24 : isTablet ? 16 : 14, fontWeight: 600 }}>
                {service.title}
              </h3>

              <p
                style={{
                  fontSize: isDesktop ? 20 : isTablet ? 14 : 14,
                  fontWeight: 400,
                  marginTop: 16 * scale,
                  flexGrow: 1,
                }}
              >
                {service.description}
              </p>

              <p
                style={{
                  fontSize: isDesktop ? 20 : isTablet ? 14 : 14,
                  fontWeight: 500,
                  marginTop: isDesktop ? 26 : isTablet ? 20 : 20,
                  fontStyle: 'italic',
                }}
              >
                {service.tags}
              </p>

              <div style={{ marginTop: 24 }}>
                <Image src={goArrow} alt="Go" width={nexticonsize} height={nexticonsize} />
              </div>
            </CartBox>
          </div>
        ))}
      </div>
      {/* Carousel Dots */}
      <CarouselDots containerRef={containerRef} />

      {/* AI Logo */}
      <div
        style={{
          marginTop: ailogoTop,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Image src={ailogo} alt="AI Logo" width={ailogoSize} height={ailogoSize} />
      </div>

      <BrandsSection />
      <ReviewSection />
    </section>
  );
}
