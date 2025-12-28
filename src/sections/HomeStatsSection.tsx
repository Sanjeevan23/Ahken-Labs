'use client';

import { useEffect, useState } from 'react';
import CartBox from '@/components/CartBox';
import DotsLoader from '@/components/DotsLoader';
import { getSiteStats } from '@/api/siteStats';

const boxPadding = {
  paddingTop: 36,
  paddingBottom: 36,
  paddingLeft: 24,
  paddingRight: 24,
};

const title40 = {
  fontSize: 40,
  fontWeight: 600,
};

const subtitle20 = {
  fontSize: 20,
  fontWeight: 400,
};

export default function HomeStatsSection() {
  const [stats, setStats] = useState<{
    projectsDelivered: number;
    happyClients: number;
  } | null>(null);

  useEffect(() => {
    getSiteStats().then(setStats);
  }, []);

  return (
    <section className="mt-12 w-full flex flex-col items-center">
      {/* CARTBOX ROW */}
      <div className="flex flex-wrap justify-center gap-6">
        <CartBox {...boxPadding}>
          <div style={{ fontSize: 32, fontWeight: 600 }}>
            We focus on
            <br />
            value & impact
          </div>
        </CartBox>

        <CartBox {...boxPadding}>
          <div style={title40}>
            {stats ? `${stats.projectsDelivered}+` : <DotsLoader />}
          </div>
          <div style={subtitle20}>Projects Delivered</div>
        </CartBox>

        <CartBox {...boxPadding}>
          <div style={title40}>98%</div>
          <div style={subtitle20}>Client Retention</div>
        </CartBox>

        <CartBox {...boxPadding}>
          <div style={title40}>
            {stats ? `${stats.happyClients}+` : <DotsLoader />}
          </div>
          <div style={subtitle20}>Happy Clients</div>
        </CartBox>

        <CartBox {...boxPadding}>
          <div style={title40}>24/7</div>
          <div style={subtitle20}>Client Support</div>
        </CartBox>
      </div>

      {/* TEXT DETAIL ROW */}
      <div className="mt-16 ml-10 mr-10 max-w-[690px] text-center text-[20px] leading-[150%] font-normal">
        Ahken Labs combines data-driven digital marketing with world-class design
        and development to scale your business. From branding to custom apps, we
        handle the tech so you can handle the growth.
      </div>
    </section>
  );
}
