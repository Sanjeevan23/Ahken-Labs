// src/components/Header/Header.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import colors from '@/constants/colors';
import Button from '@/components/common/Button';
import logoImg from '@/assets/icons/logo.svg';
import talkIcon from '@/assets/icons/Talk_to_us.svg';
import hamburgerIcon from '@/assets/icons/hamburger.svg';
import useScale from '@/hooks/useScale';
import HeaderMenuOverlay from './HeaderMenuOverlay';
import useResponsivePadding from '@/hooks/useResponsivePadding'; // <-- added

const tabs = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'Services' },
  { label: 'Portfolio', id: 'Portfolio' },
  { label: 'About us', id: 'about' },
];

// keep this constant to match behavior in previous code (hard hamburger activation breakpoint)
const HAMBURGER_BREAKPOINT = 1160;

export default function Header() {
  const scale = useScale();
  const [activeTab, setActiveTab] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const activeRef = useRef(activeTab);
  useEffect(() => {
    activeRef.current = activeTab;
  }, [activeTab]);

  /* ---------- SCROLL TO SECTION ---------- */
  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  /* ---------- RESPONSIVE LAYOUT (use hook) ---------- */
  // Use the hook (same scale you used previously)
  const { paddingLR, screenWidth } = useResponsivePadding(scale);

  // Derive the hamburger boolean the same way your previous effect did
  const useHamburger = screenWidth < HAMBURGER_BREAKPOINT;

  /* ---------- SCROLL SPY ---------- */
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const headerEl = document.getElementById('site-header');
        const headerHeight = headerEl ? headerEl.offsetHeight : 80;

        let closestId: string | null = null;
        let minDist = Infinity;

        for (const t of tabs) {
          const el = document.getElementById(t.id);
          if (!el) continue;

          const dist = Math.abs(el.getBoundingClientRect().top - headerHeight);
          if (dist < minDist) {
            minDist = dist;
            closestId = t.id;
          }
        }

        if (closestId && closestId !== activeRef.current) {
          setActiveTab(closestId);
        }

        ticking = false;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <>
      <div
        id="site-header"
        className="fixed top-0 left-0 w-full z-50"
        style={{
          paddingLeft: paddingLR,
          paddingRight: paddingLR,
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
            minHeight: 72,
          }}
        >
          {/* LOGO */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image src={logoImg} alt="logo" width={32} height={32} />
            <span
              style={{
                marginLeft: 8,
                fontSize: 32,
                fontWeight: 500,
                color: '#fff',
                whiteSpace: 'nowrap',
                userSelect: 'none'
              }}
            >
              Ahken Labs.
            </span>
          </div>

          {/* TABS */}
          {!useHamburger && (
            <div
              style={{
                display: 'flex',
                position: 'relative',
                marginTop: 16,
                marginBottom: 16,
                marginLeft: 120,
                marginRight: 60,
                userSelect: 'none'
              }}
            >
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
                  onClick={() => {
                    scrollTo(tab.id);
                    setActiveTab(tab.id);
                  }}
                  style={{
                    width: 120,
                    padding: '12px 20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    zIndex: 1,
                  }}
                >
                  <span style={{ color: '#fff', fontWeight: 500 }}>{tab.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* RIGHT SIDE */}
          {!useHamburger ? (
            <Button
              text="Talk to us"
              icon={talkIcon}
              onClick={() => scrollTo('Footer')}
              backgroundColor={colors.white}
              textColor={colors.button_text}
            />
          ) : (
            <button
              onClick={() => setMenuOpen(true)}
              style={{
                width: 56,
                height: 56,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 8,
                background: 'transparent',
              }}
            >
              <Image src={hamburgerIcon} alt="menu" width={33.6} height={33.6} />
            </button>
          )}
        </div>
      </div>

      <HeaderMenuOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        scrollTo={scrollTo}
      />
    </>
  );
}
