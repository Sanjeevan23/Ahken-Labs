'use client';

import Image from 'next/image';
import useEdgeAutoScroll from '@/hooks/useEdgeAutoScroll';
import { brandsData } from '@/api/brandsData';
import useScale from '@/hooks/useScale';
import useResponsivePadding from '@/hooks/useResponsivePadding';
import ScrollFade from '../common/ScrollFade';

export default function BrandsSection() {
  const scale = useScale();
  const { containerRef, handleMouseMove, stopScroll } =
    useEdgeAutoScroll(12, 120);
  const { isDesktop, paddingLR, isTablet } = useResponsivePadding();

  const sectionTitleSize = isDesktop ? 40 : isTablet ? 28 : 20;
  const sectionPaddingTop = isDesktop ? 64 : 40;
  const imagepaddingTop = isDesktop ? 40 : 30;
  const imageheight = isDesktop ? 80 : isTablet ? 60 : 50;

  return (
    <section style={{ marginTop: sectionPaddingTop }}>
      <h2
        style={{
          textAlign: 'center',
          fontSize: sectionTitleSize,
          fontWeight: 700,
          color: '#111111',
        }}
      >
        Some brands we&apos;ve worked with
      </h2>
      <div
        style={{
          marginTop: imagepaddingTop,
          position: 'relative',
        }}
      >
        <ScrollFade />
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={stopScroll}
          style={{
            paddingLeft: isDesktop ? paddingLR : 20,
            paddingRight: isDesktop ? paddingLR : 20,
            display: 'flex',
            gap: 64 * scale,
            overflowX: 'scroll',
            userSelect: 'none',
          }}
          className="scrollbar-hide"
        >
          {brandsData.map(brand => (
            <Image
              key={brand.id}
              src={brand.image}
              alt="Brand"
              height={imageheight}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
