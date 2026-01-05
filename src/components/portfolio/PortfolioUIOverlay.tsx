'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { StaticImageData } from 'next/image';
import logoImg from '@/assets/icons/logo.svg';

export default function PortfolioUIOverlay({
    open,
    frames,
    onClose,
}: {
    open: boolean;
    frames: (StaticImageData | string)[];
    onClose: () => void;
}) {
    const startX = useRef(0);
    const startY = useRef(0);

    // track loaded state per frame
    const [loaded, setLoaded] = useState<boolean[]>(
        () => Array(frames.length).fill(false)
    );

    useEffect(() => {
        // reset loaded when frames change
        setLoaded(Array(frames.length).fill(false));
    }, [frames]);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    if (!open) return null;

    const handleTouchStart = (e: React.TouchEvent) => {
        startX.current = e.touches[0].clientX;
        startY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const dx = e.changedTouches[0].clientX - startX.current;
        const dy = e.changedTouches[0].clientY - startY.current;

        if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy)) {
            onClose();
        }
    };

    const markLoaded = (idx: number) => {
        setLoaded(prev => {
            if (prev[idx]) return prev;
            const copy = [...prev];
            copy[idx] = true;
            return copy;
        });
    };

    return (
        <div
            className="fixed inset-0 z-[999] px-5 overflow-y-auto
                    opacity-0 animate-overlay-in"
            style={{
                background: 'rgba(10,10,20,0.6)',
                backdropFilter: 'blur(12px)',
            }}
            onClick={onClose}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* CLOSE BUTTON */}
            <button
                onClick={onClose}
                className="
                    sticky top-6 ml-auto z-[1000]
                    w-10 h-10
                    flex items-center justify-center
                    rounded-full
                    text-[24px] font-extrabold text-white
                    select-none pb-1

                    bg-white/10 backdrop-blur-[40px]
                    shadow-[0_8px_24px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.25)]

                    transition-all duration-200 ease-[cubic-bezier(.4,0,.2,1)]
                    hover:scale-110 hover:-translate-y-0.5 hover:bg-white/20
                    active:scale-90 active:bg-white/5
                    focus:outline-none "
            >
                ×
            </button>

            {/* CENTERED CONTENT */}
            <div
                className="
                    mx-auto max-w-[1200px]
                    px-6 md:px-10
                    scale-[0.98] opacity-0 animate-content-in "
                onClick={e => e.stopPropagation()}
                style={{ position: 'relative' }}
            >
                {/* FRAMES: each frame has its own loader centered over it until it loads */}
                <div className="w-full">
                    {frames.map((frame, idx) => (
                        <div key={idx} className="relative w-full">
                            {/* per-frame loader (absolute center inside wrapper) */}
                            {!loaded[idx] && (
                                <div
                                    className="absolute inset-0 z-[999] flex items-center justify-center"
                                    aria-hidden
                                >
                                    <div
                                        style={{
                                            width: 96,
                                            height: 96,
                                            borderRadius: 999,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            background:
                                                'linear-gradient(145deg, rgba(255,255,255,0.14), rgba(255,255,255,0.04))',
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
                                                animation: 'logoRotate 1400ms linear infinite',
                                                animationDirection: 'alternate',
                                            }}
                                        >
                                            <Image
                                                src={logoImg}
                                                alt="Ahken Labs"
                                                width={48}
                                                height={48}
                                                priority
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Image itself — fade in when this frame is loaded */}
                            <Image
                                src={frame}
                                alt={`frame-${idx}`}
                                className={`w-full h-auto select-none transition-opacity duration-300 ease-[cubic-bezier(.4,0,.2,1)]
                                    ${loaded[idx] ? 'opacity-100' : 'opacity-0'}`}
                                onLoadingComplete={() => markLoaded(idx)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
