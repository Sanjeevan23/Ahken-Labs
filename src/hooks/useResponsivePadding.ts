// src/hooks/useResponsivePadding.ts
'use client';

import { useEffect, useState } from 'react';

export const MIN_CONTAINER_WIDTH = 1080;
export const MAX_PADDING = 200;
export const MIN_PADDING_DESKTOP = 40;
export const MOBILE_PADDING = 24;

// Breakpoints (match header behavior; you can tweak if needed)
const HAMBURGER_BREAKPOINT = 1160; // header used this for hamburger activation
const TABLET_MAX = 1024;
const MOBILE_MAX = 640;

export default function useResponsivePadding(scale = 1) {
  const [paddingLR, setPaddingLR] = useState(MAX_PADDING * scale);
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1920
  );

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      setScreenWidth(width);

      if (width < HAMBURGER_BREAKPOINT) {
        setPaddingLR(MOBILE_PADDING);
        return;
      }

      const availablePadding = (width - MIN_CONTAINER_WIDTH) / 2;
      const clampedPadding = Math.max(
        MIN_PADDING_DESKTOP,
        Math.min(MAX_PADDING * scale, availablePadding)
      );
      setPaddingLR(Math.round(clampedPadding));
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [scale]);

  const isMobile = screenWidth <= MOBILE_MAX;
  const isTablet = screenWidth > MOBILE_MAX && screenWidth <= TABLET_MAX;
  const isDesktop = screenWidth > TABLET_MAX;

  return {
    paddingLR,
    screenWidth,
    isMobile,
    isTablet,
    isDesktop,
  };
}
