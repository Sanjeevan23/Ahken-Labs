// src/components/LoadingOverlay.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import logoImg from '@/assets/icons/logo.svg';

const MIN_VISIBLE_MS = 50;
const FADE_DURATION_MS = 50;
const MAX_WAIT_MS = 100;

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

  // initialize randomly once (lazy init) to avoid calling setState inside an effect
  const [messageIndex, setMessageIndex] = useState<number>(() =>
    LOADING_MESSAGES.length > 1 ? Math.floor(Math.random() * LOADING_MESSAGES.length) : 0
  );

  useEffect(() => {
    // rotate to a different random message every 700ms
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

    // wait for window 'load' (full load) or resolve immediately if already complete
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

    // typed access to document.fonts to avoid using `any`
    const waitForFonts = () => {
      const doc = document as unknown as { fonts?: { ready?: Promise<void> } };
      const fonts = doc.fonts;
      if (fonts && typeof fonts.ready?.then === 'function') {
        return fonts.ready as Promise<void>;
      }
      return Promise.resolve();
    };

    // wait for each image in document.images
    const whenImgReady = (img: HTMLImageElement) =>
      new Promise<void>((res) => {
        if (img.complete) {
          // either loaded or error already
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

    // Core wait: window load + fonts + images
    const allResourcesPromise = Promise.all([waitForWindowLoad(), waitForFonts(), waitForImages()]);

    // Timeout fallback so loader never stays forever
    const timeoutPromise = new Promise<void>((res) => {
      timeoutId = window.setTimeout(() => res(), MAX_WAIT_MS);
    });

    // Race: either all resources done OR we hit the max wait
    Promise.race([allResourcesPromise, timeoutPromise])
      .then(() => {
        if (!mounted) return;
        const elapsed = performance.now() - start;
        const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);

        // ensure minimum visible time, then fade out
        window.setTimeout(() => {
          if (!mounted) return;
          setHiding(true);
          // remove DOM node after fade completes
          window.setTimeout(() => {
            if (!mounted) return;
            setVisible(false);
          }, FADE_DURATION_MS);
        }, wait);
      })
      .catch(() => {
        // on any unexpected error, hide gracefully
        if (!mounted) return;
        setHiding(true);
        window.setTimeout(() => setVisible(false), FADE_DURATION_MS);
      })
      .finally(() => {
        // cleanup timeout if still running
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
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(6, 15, 54, 0.45)',
        backdropFilter: 'blur(14px) saturate(140%)',
        WebkitBackdropFilter: 'blur(14px) saturate(140%)',
        transition: `opacity ${FADE_DURATION_MS}ms ease`,
        pointerEvents: hiding ? 'none' : 'auto',
        opacity: hiding ? 0 : 1,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
        {/* WELCOME TEXT */}
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
            boxShadow: `0 8px 32px rgba(15, 23, 42, 0.35), 
      inset 0 1px 0 rgba(255,255,255,0.25)`,
            animation: 'loaderRing 1400ms cubic-bezier(.2,.9,.3,1) infinite, float 2400ms ease-in-out infinite',
          }}
        >
          <Image src={logoImg} alt="Ahken Labs" width={48} height={48} />
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
              boxShadow: ` 0 0 32px rgba(160, 220, 255, 0.25), 
        0 0 12px rgba(160, 220, 255, 0.15)`,
              animation: 'loaderPulse 1600ms ease-out infinite',
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

            <span className="loading-dots" aria-hidden>
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
        @keyframes loaderPulse {
          0% { transform: translate(-50%, -50%) scale(0.85); opacity: 0.35; }
          50% { transform: translate(-50%, -50%) scale(1.03); opacity: 0.7; }
          100% { transform: translate(-50%, -50%) scale(0.85); opacity: 0.35; }
        }
        @keyframes loaderRing {
          0% { transform: rotate(0deg); filter: drop-shadow(0 0 0 rgba(0,0,0,0)); }
          50% { transform: rotate(6deg); filter: drop-shadow(0 8px 24px rgba(0,0,0,0.25)); }
          100% { transform: rotate(0deg); filter: drop-shadow(0 0 0 rgba(0,0,0,0)); }
        }
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }

        /* dots animation */
        .loading-dots span {
          display: inline-block;
          margin-left: 2px;
          opacity: 0.25;
          animation: dotBlink 1.4s infinite both;
        }
        .loading-dots span:nth-child(2) { animation-delay: 0.18s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.36s; }

        @keyframes dotBlink {
          0% { opacity: 0.2; transform: translateY(0); }
          20% { opacity: 1; transform: translateY(-3px); }
          100% { opacity: 0.2; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
