'use client';

import { useEffect, useState } from 'react';
import CartBox from '@/components/common/CartBox';
import DotsLoader from '@/components/common/DotsLoader';
import { getSiteStats } from '@/api/siteStats';
import useResponsivePadding from '@/hooks/useResponsivePadding';

export default function HomeStatsSection() {
  const { isDesktop, isTablet } = useResponsivePadding();
  const [stats, setStats] = useState<{
    projectsDelivered: number;
    happyClients: number;
  } | null>(null);

  useEffect(() => {
    getSiteStats().then(setStats);
  }, []);

  // Responsive padding for CartBoxes
  const boxPadding = isDesktop
    ? { paddingTop: 36, paddingBottom: 36, paddingLeft: 24, paddingRight: 24 } :
    isTablet ? { paddingTop: 28, paddingBottom: 28, paddingLeft: 16, paddingRight: 16 }
      : { paddingTop: 20, paddingBottom: 20, paddingLeft: 14, paddingRight: 14 };

  // Font sizes
  const focusTextSize = isDesktop ? 32 : isTablet ? 26 : 16;
  const titleSize = isDesktop ? 40 : isTablet ? 30 : 26;
  const subtitleSize = isDesktop ? 20 : isTablet ? 15 : 14;
  const detailTextSize = isDesktop ? 20 : isTablet ? 15 : 14;

  // Margin top for detail row
  const detailMarginTop = isDesktop ? 64 : 20;

  return (
    <section className={`w-full flex flex-col items-center ${isDesktop ? 'mt-10' : isTablet ? 'mt-0' : 'mt-0'}`}>
      {/* CARTBOX ROW */}
      <div className="flex flex-wrap justify-center gap-6">
        <CartBox {...boxPadding}>
          <div style={{ fontSize: focusTextSize, fontWeight: 600, textAlign: 'left' }}>
            We focus on
            <br />
            value & impact
          </div>
        </CartBox>

        <CartBox {...boxPadding}>
          <div style={{ fontSize: titleSize, fontWeight: 600 }}>
            {stats ? `${stats.projectsDelivered}+` : <DotsLoader />}
          </div>
          <div style={{ fontSize: subtitleSize }}>Projects Delivered</div>
        </CartBox>

        <CartBox {...boxPadding}>
          <div style={{ fontSize: titleSize, fontWeight: 600 }}>98%</div>
          <div style={{ fontSize: subtitleSize }}>Client Retention</div>
        </CartBox>

        <CartBox {...boxPadding}>
          <div style={{ fontSize: titleSize, fontWeight: 600 }}>
            {stats ? `${stats.happyClients}+` : <DotsLoader />}
          </div>
          <div style={{ fontSize: subtitleSize }}>Happy Clients</div>
        </CartBox>

        <CartBox {...boxPadding}>
          <div style={{ fontSize: titleSize, fontWeight: 600 }}>24/7</div>
          <div style={{ fontSize: subtitleSize }}>Client Support</div>
        </CartBox>
      </div>

      {/* TEXT DETAIL ROW */}
      <div
        className="text-center"
        style={{
          marginTop: detailMarginTop,
          marginLeft: isDesktop ? 40 : 10,
          marginRight: isDesktop ? 40 : 10,
          maxWidth: isDesktop ? 690 : 600,
          fontSize: detailTextSize,
          lineHeight: '150%',
          fontWeight: 400,
        }}
      >
        Ahken Labs combines data-driven digital marketing with world-class design
        and development to scale your business. From branding to custom apps, we
        handle the tech so you can handle the growth.
      </div>
    </section>
  );
}
