'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/Button';
import messageIcon from '@/assets/icons/Talk_to_us.svg';
import colors from '@/constants/colors';
import useScale from '@/hooks/useScale';
import { openWhatsApp } from '@/utils/whatsapp';

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isManuallyPaused, setIsManuallyPaused] = useState(false);
    const scale = useScale();

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

    return (
        <section id="about" ref={sectionRef}>
            {/* VIDEO BOX */}
            <div
                style={{
                    marginLeft: 200 * scale,
                    marginRight: 200 * scale,
                    height: 668 * scale,
                    borderRadius: 40,
                    marginTop: 104,
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                {/* VIDEO */}
                <video
                    ref={videoRef}
                    src="/videos/about_video.mp4"
                    //    muted
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
                        top: 164 * scale,
                        left: 80 * scale,
                        background: '#FFFFFF66',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0px 0px 16px 0px #00000014',
                        borderRadius: 24,
                        padding: 40 * scale,
                        maxWidth: 680 * scale,
                    }}
                >
                    <h3
                        style={{
                            fontSize: 32 * scale,
                            fontWeight: 700,
                            color: '#111111',
                        }}
                    >
                        Why Choose Us?
                    </h3>

                    <p
                        style={{
                            marginTop: 20 * scale,
                            marginBottom: 40,
                            fontSize: 20 * scale,
                            fontWeight: 400,
                            color: '#111111',
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
                    />
                </div>
            </div>

            {/* NEXT SECTION GOES HERE */}
        </section>
    );
}
