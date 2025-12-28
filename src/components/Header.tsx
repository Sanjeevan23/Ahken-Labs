//components/Header.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import colors from '@/constants/colors';
import Button from '@/components/Button';
import logoImg from '@/assets/icons/logo.svg';
import talkIcon from '@/assets/icons/Talk_to_us.svg';
import useScale from '@/hooks/useScale';

const tabs = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'Services' },
  { label: 'Portfolio', id: 'Portfolio' },
  { label: 'About us', id: 'about' },
];

export default function Header() {
  const scale = useScale();
  const [activeTab, setActiveTab] = useState('home');
  const tabsRef = useRef<HTMLDivElement>(null);

  /* ---------- SCROLL TO SECTION ---------- */
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  /* ---------- SCROLL SPY ---------- */
  useEffect(() => {
    const sections = tabs.map(t => document.getElementById(t.id)).filter(Boolean);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach(section => observer.observe(section!));
    return () => observer.disconnect();
  }, []);

  return (
    /* HEADER GROUP */
    <div
      className="fixed top-0 left-0 w-full z-50"
      style={{
        paddingLeft: 200 * scale,
        paddingRight: 200 * scale,
        paddingTop: 20,
        paddingBottom: 16,
        backdropFilter: 'blur(20px)',
        background: '#11111103',
      }}
    >
      {/* HEADER CONTAINER */}
      <div
        style={{
          background: colors.primary,
          borderRadius: 24,
          backdropFilter: 'blur(100px)',
          paddingLeft: 24,
          paddingRight: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        {/* LOGO */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image src={logoImg} alt="logo" width={32} height={32} />
          <span style={{ marginLeft: 8, fontSize: 32, fontWeight: 500, color: '#fff' }}>
            Ahken Labs.
          </span>
        </div>

        {/* TABS */}
        <div
          ref={tabsRef}
          style={{
            display: 'flex',
            position: 'relative',
            marginTop: 16,
            marginBottom: 16,
          }}
        >
          {/* ACTIVE GLASS INDICATOR */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: 120,
              borderRadius: 40,
              border: '2px solid white',
              backdropFilter: 'blur(20px)',
              transform: `translateX(${tabs.findIndex(t => t.id === activeTab) * 120}px)`,
              transition: 'transform 0.35s cubic-bezier(.4,0,.2,1)',
            }}
          />

          {tabs.map(tab => (
            <div
              key={tab.id}
              onClick={() => scrollTo(tab.id)}
              style={{
                paddingTop: 12,
                paddingBottom: 12,
                paddingLeft: 20,
                paddingRight: 20,
                width: 120,
                textAlign: 'center',
                cursor: 'pointer',
                zIndex: 1,
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  userSelect: 'none',
                  color: colors.white,
                }}
              >
                {tab.label}
              </span>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <Button
          text="Talk to us"
          icon={talkIcon}
          onClick={() => scrollTo('contact')}
          backgroundColor={colors.white}
          textColor={colors.button_text}
        />
      </div>
    </div>
  );
}
