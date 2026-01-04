'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/common/Button';
import messageIcon from '@/assets/icons/Talk_to_us.svg';
import colors from '@/constants/colors';
import useScale from '@/hooks/useScale';
import { openWhatsApp } from '@/utils/whatsapp';
import FAQSection from '@/components/Aboutus/FAQSection';
import useResponsivePadding from '@/hooks/useResponsivePadding';

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isManuallyPaused, setIsManuallyPaused] = useState(false);
    const scale = useScale();
    const { isDesktop, isTablet, paddingLR, isMobile } = useResponsivePadding();

    /* ---------- PLAY VIDEO ONLY WHEN SECTION IS VISIBLE ---------- */
    useEffect(() => {
        const section = sectionRef.current;
        const video = videoRef.current;
        if (!section || !video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isManuallyPaused) {
                    video.play().catch(() => { });
                } else {
                    video.pause();
                }
            },
            {
                threshold: 0.5, // section must be clearly visible
            }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, [isManuallyPaused]);

    /* ---------- CLICK TO TOGGLE PLAY / PAUSE ---------- */
    const handleVideoClick = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            setIsManuallyPaused(false);
            video.play().catch(() => { });
        } else {
            setIsManuallyPaused(true);
            video.pause();
        }
    };

    const sectionPaddingTop = isDesktop ? 80 : 64;
    const ctaButtonTextSize = isMobile || isTablet ? 14 : undefined;
    const ctaButtonIconSize = isMobile || isTablet ? 14 : undefined;

    return (
        <section id="about" ref={sectionRef}>
            {/* VIDEO BOX */}
            <div
                style={{
                    marginLeft: isDesktop ? paddingLR : 20,
                    marginRight: isDesktop ? paddingLR : 20,
                    height: isDesktop ? 500 : isTablet ? 368 : 340,
                    borderRadius: isDesktop ? 40 : isTablet ? 40 : 24,
                    marginTop: sectionPaddingTop,
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                {/* VIDEO */}
                <video
                    ref={videoRef}
                    src="/videos/about_video.mp4"
                    muted
                    loop
                    playsInline
                    onClick={handleVideoClick}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        cursor: 'pointer',
                    }}
                />

                {/* OVERLAY GLASS BOX */}
                <div
                    style={{
                        position: 'absolute',
                        top: "20%",
                        left: isMobile? "13%": 80 * scale,
                        background: '#FFFFFF66',
                        backdropFilter: isMobile? 'blur(10px)': 'blur(20px)',
                        boxShadow: '0px 0px 16px 0px #00000014',
                        borderRadius: isMobile? 14 :24,
                        padding: isMobile? 12: 40 * scale,
                        maxWidth: isDesktop? 510 : isTablet? 500 : '75%',
                    }}
                >
                    <h3
                        style={{
                            fontSize: isDesktop ? 32 : isTablet ? 24 : 18,
                            fontWeight: 700,
                            color: '#111111',
                        }}
                    >
                        Why Choose Us?
                    </h3>

                    <p
                        style={{
                            marginTop: isDesktop ? 20 : isTablet ? 16 : 12,
                            marginBottom: isDesktop ? 40 : isTablet ? 24 : 16,
                            fontSize: isDesktop ? 20 : isTablet ? 18 : 13,
                            fontWeight: 400,
                            color: '#0e022bff',
                        }}
                    >
                        We deliver smart, creative digital solutions built around your
                        business. Our team combines strategy, design, and technology to help
                        your brand stand out and grow.
                    </p>

                    <Button
                        text="Message us in WhatsApp"
                        icon={messageIcon}
                        className="bg-gradient-to-r from-[#ACFF47] to-[#ABFF5B]"
                        textColor={colors.button_text}
                        onClick={() => openWhatsApp('Hi there...')}
                        textSize={ctaButtonTextSize}
                        iconSize={ctaButtonIconSize}
                    />
                </div>
            </div>
            <FAQSection />
        </section>
    );
}
