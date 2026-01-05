'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function PortfolioUIOverlay({
    open,
    frames,
    onClose,
}: {
    open: boolean;
    frames: any[];
    onClose: () => void;
}) {
    const startX = useRef(0);
    const startY = useRef(0);

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
            >
                {frames.map((frame, idx) => (
                    <Image
                        key={idx}
                        src={frame}
                        alt={`frame-${idx}`}
                        className="w-full h-auto select-none"
                    />
                ))}
            </div>
        </div>
    );
}
