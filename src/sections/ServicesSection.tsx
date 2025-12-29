'use client';

import Image from 'next/image';
import { useRef } from 'react';
import CartBox from '@/components/CartBox';
import goArrow from '@/assets/icons/go_arrow.svg';
import { servicesData } from '@/api/servicesData';
import useScale from '@/hooks/useScale';

export default function ServicesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const scale = useScale();

  const startScroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;

    const speed = 18;

    const step = () => {
      if (!container) return;

      container.scrollLeft += direction === 'right' ? speed : -speed;
      rafRef.current = requestAnimationFrame(step);
    };

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(step);
    }
  };

  const stopScroll = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const edge = 120;

    if (x > rect.width - edge) {
      startScroll('right');
    } else if (x < edge) {
      startScroll('left');
    } else {
      stopScroll();
    }
  };

  return (
    <section id="Services" className="py-20">

      <h2 className="text-center text-[40px] font-bold text-[#111111]">
        What we can build for you
      </h2>

      <div
        ref={scrollRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={stopScroll}
        className="flex gap-6 overflow-x-scroll scrollbar-hide"
        style={{
          paddingLeft: 200 * scale,
          paddingRight: 200 * scale,
          paddingTop: 40,
          paddingBottom: 40,
        }}
      >
        {servicesData.map(service => (
          <div
            key={service.title}
            className="flex-shrink-0 overflow-hidden"
            style={{
              width: 490.67 * scale,
              borderRadius: 40 * scale,
              background: '#FFFFFF',
              backdropFilter: 'blur(40px)',
              boxShadow: '0px 0px 16px 0px #00000014',
            }}
          >

            <div className="flex justify-center mt-5">
              <Image
                src={service.image}
                alt={service.title}
                width={490.67 * scale}
                height={245.33}
                className="object-contain"
              />
            </div>

            <CartBox
              marginTop={24 * scale}
              marginBottom={24 * scale}
              marginLeft={24 * scale}
              marginRight={24 * scale}
              paddingTop={40 * scale}
              paddingBottom={20 * scale}
              paddingLeft={20 * scale}
              paddingRight={20 * scale}
              borderRadius={24 * scale}
            >
              <h3 style={{ fontSize: 24 * scale, fontWeight: '600' }}>{service.title}</h3>

              <p style={{ fontSize: 20 * scale, fontWeight: '400', marginTop: 16 * scale }}>{service.description}</p>

              <p style={{ fontSize: 20 * scale, fontWeight: '500', marginTop: 32 * scale }} className="italic font-medium">
                {service.tags}
              </p>

              <div style={{ marginTop: 24 * scale }}>
                <Image src={goArrow} alt="Go" width={40 * scale} height={40} />
              </div>
            </CartBox>
          </div>
        ))}
      </div>
    </section>
  );
}
