// src/components/LoadingOverlay.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import logoImg from '@/assets/icons/logo.svg';

const MIN_VISIBLE_MS = 200;
const FADE_DURATION_MS = 200;
const MAX_WAIT_MS = 600;

const LOADING_MESSAGES = [
  'Boiling the database ☕',
  'Waking up sleepy servers 😴',
  'Feeding the hamsters 🐹',
  'Aligning the pixels 🎯',
  'Almost there… promise 🤞',
];

export default function LoadingOverlay() {
  const [visible, setVisible] = useState(true);
  const [hiding, setHiding] = useState(false);

  const [messageIndex, setMessageIndex] = useState<number>(() =>
    LOADING_MESSAGES.length > 1 ? Math.floor(Math.random() * LOADING_MESSAGES.length) : 0
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setMessageIndex((prev) => {
        if (LOADING_MESSAGES.length <= 1) return prev;
        let next = prev;
        while (next === prev) {
          next = Math.floor(Math.random() * LOADING_MESSAGES.length);
        }
        return next;
      });
    }, 700);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let mounted = true;
    const start = performance.now();
    let timeoutId: number | null = null;
    const cleanupFns: Array<() => void> = [];

    const waitForWindowLoad = () =>
      new Promise<void>((res) => {
        if (document.readyState === 'complete') {
          res();
          return;
        }
        const onLoad = () => res();
        window.addEventListener('load', onLoad, { once: true });
        cleanupFns.push(() => window.removeEventListener('load', onLoad));
      });

    const waitForFonts = () => {
      const doc = document as unknown as { fonts?: { ready?: Promise<void> } };
      const fonts = doc.fonts;
      if (fonts && typeof fonts.ready?.then === 'function') {
        return fonts.ready as Promise<void>;
      }
      return Promise.resolve();
    };

    const whenImgReady = (img: HTMLImageElement) =>
      new Promise<void>((res) => {
        if (img.complete) {
          res();
          return;
        }
        const onLoadOrErr = () => res();
        img.addEventListener('load', onLoadOrErr, { once: true });
        img.addEventListener('error', onLoadOrErr, { once: true });
        cleanupFns.push(() => {
          img.removeEventListener('load', onLoadOrErr);
          img.removeEventListener('error', onLoadOrErr);
        });
      });

    const waitForImages = () => {
      const imgs = Array.from(document.images) as HTMLImageElement[];
      if (!imgs.length) return Promise.resolve();
      return Promise.all(imgs.map(whenImgReady));
    };

    const allResourcesPromise = Promise.all([waitForWindowLoad(), waitForFonts(), waitForImages()]);

    const timeoutPromise = new Promise<void>((res) => {
      timeoutId = window.setTimeout(() => res(), MAX_WAIT_MS);
    });

    Promise.race([allResourcesPromise, timeoutPromise])
      .then(() => {
        if (!mounted) return;
        const elapsed = performance.now() - start;
        const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);

        window.setTimeout(() => {
          if (!mounted) return;
          setHiding(true);
          window.setTimeout(() => {
            if (!mounted) return;
            setVisible(false);
          }, FADE_DURATION_MS);
        }, wait);
      })
      .catch(() => {
        if (!mounted) return;
        setHiding(true);
        window.setTimeout(() => setVisible(false), FADE_DURATION_MS);
      })
      .finally(() => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      });

    return () => {
      mounted = false;
      if (timeoutId) clearTimeout(timeoutId);
      cleanupFns.forEach((fn) => {
        try { fn(); } catch { /* ignore */ }
      });
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // dynamic viewport height for mobile (dvh) + fallback
        height: '100dvh',
        minHeight: '100vh',
        zIndex: 9999,
        // use grid + placeItems for very stable centering
        display: 'grid',
        placeItems: 'center',
        background: 'rgba(6, 15, 54, 0.45)',
        backdropFilter: 'blur(14px) saturate(140%)',
        WebkitBackdropFilter: 'blur(14px) saturate(140%)',
        transition: `opacity ${FADE_DURATION_MS}ms ease`,
        pointerEvents: hiding ? 'none' : 'auto',
        opacity: hiding ? 0 : 1,
        boxSizing: 'border-box',
        // safe-area insets for notched devices (iOS)
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
        <div
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: 'rgba(255,255,255,0.92)',
            textShadow: '0 1px 2px rgba(0,0,0,0.25)',
            marginBottom: 40,
            letterSpacing: '0.5px',
            textAlign: 'center',
          }}
        >
          Welcome to Ahken Labs.
        </div>

        {/* LOADER CIRCLE */}
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            background: 'linear-gradient(145deg, rgba(255,255,255,0.14), rgba(255,255,255,0.04))',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.18)',
            boxShadow: `0 8px 32px rgba(15, 23, 42, 0.35), inset 0 1px 0 rgba(255,255,255,0.25)`,
            animation: 'float 2400ms ease-in-out infinite',
            overflow: 'visible',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transformOrigin: '50% 50%',
              animation: 'loaderRotate 1400ms linear infinite',
              animationDirection: 'alternate',
            }}
          >
            <Image src={logoImg} alt="Ahken Labs" width={48} height={48} priority />
          </div>

          <span
            aria-hidden
            style={{
              position: 'absolute',
              borderRadius: 999,
              width: 120,
              height: 120,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: `0 0 32px rgba(160, 220, 255, 0.25), 0 0 12px rgba(160, 220, 255, 0.15)`,
              animation: 'ringScale 1600ms ease-out infinite',
              pointerEvents: 'none',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            marginTop: 8,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.92)',
              textShadow: '0 1px 2px rgba(0,0,0,0.25)',
              letterSpacing: '0.2px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ transition: 'opacity 160ms ease' }}>
              {LOADING_MESSAGES[messageIndex]}
            </span>

            <span className="loading-dots" aria-hidden style={{ opacity: 0.85 }}>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </div>

          <div
            style={{
              fontSize: 12,
              color: 'rgba(230,238,255,0.75)',
              opacity: 0.85,
            }}
          >
            Please wait a moment
          </div>
        </div>
      </div>

      <style>{`
        @keyframes loaderRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes ringScale {
          0% { transform: translate(-50%, -50%) scale(0.94); }
          50% { transform: translate(-50%, -50%) scale(1.02); }
          100% { transform: translate(-50%, -50%) scale(0.94); }
        }
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }

        .loading-dots span {
          display: inline-block;
          margin-left: 2px;
          opacity: 0.85;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
