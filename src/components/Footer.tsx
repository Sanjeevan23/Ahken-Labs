// src/components/Footer.tsx
'use client';

import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { useMemo } from 'react';

import Button from '@/components/common/Button';
import talkIcon from '@/assets/icons/Talk_to_us.svg';
import logoImg from '@/assets/icons/logo.svg';
import facebookIcon from '@/assets/icons/facebook.svg';
import instagramIcon from '@/assets/icons/instagram.svg';
import twitterIcon from '@/assets/icons/twitter.svg';
import LinkedIn from '@/assets/icons/LinkedIn.svg';

import footerPeople from '@/assets/images/footer_people_group.svg';
import footerPeopleMobile from '@/assets/images/footer_people_group_mobile.png';
import footerPeopleTablet from '@/assets/images/footer_people_group_tablet.svg';

import { siteInfo, socialLinks, footerLinks } from '@/api/footerData';
import useScale from '@/hooks/useScale';
import useResponsivePadding from '@/hooks/useResponsivePadding';
import { openWhatsApp } from '@/utils/whatsapp';

const iconMap: Record<string, StaticImageData> = {
    facebook: facebookIcon,
    instagram: instagramIcon,
    twitter: twitterIcon,
    LinkedIn: LinkedIn,
};

export default function Footer() {
    const scale = useScale();
    const { paddingLR, isMobile, isTablet, isDesktop } = useResponsivePadding(scale);

    // CTA text sizing: desktop keeps large (24 * scale), tablet/mobile -> 14
    const ctaTextSize = isDesktop ? Math.round(24 * scale) : 14;

    // button text & icon size for CTA
    const ctaButtonTextSize = isMobile || isTablet ? 14 : undefined;
    const ctaButtonIconSize = isMobile || isTablet ? 14 : undefined;

    // Logo sizes
    const logoIconSize = isDesktop ? 32 : 16;
    const logoTextSize = isDesktop ? 32 : 16;

    // Contact / links text sizes
    const contactTextSize = isDesktop ? 16 : 12;
    const linksTextSize = isDesktop ? 16 : 12;

    // CTA left image width percent (decrease for tablet/mobile)
    const leftImagePercent = useMemo(() => {
        if (isMobile) return 35;
        if (isTablet) return 40;
        return 50; // desktop
    }, [isMobile, isTablet]);

    // Footer container horizontal margin uses paddingLR (same idea as header)
    const horizontalMarginStyle = {
        marginLeft: paddingLR,
        marginRight: paddingLR,
    };

    // Mobile-only: left section stacked first, then middle+right in single row beneath
    return (
        <footer className="relative w-full" id="Footer" aria-label="Site footer">
            {/* ================= CTA OVERLAY SECTION ================= */}
            <div
                style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: isDesktop ? -114 : isTablet ? -100 : -100,
                    width: '100%',
                    paddingLeft: paddingLR,
                    paddingRight: paddingLR,
                    zIndex: 20,
                }}
            >
                <div
                    className="rounded-[40px] flex overflow-hidden"
                    style={{
                        background: 'linear-gradient(90deg,#5577E0 0%,#1C1C89 50%)',
                        alignItems: 'stretch',
                    }}
                >
                    {/* LEFT IMAGE - variable width */}
                    <div
                        style={{
                            width: `${leftImagePercent}%`,
                            minHeight: 160,
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* DESKTOP */}
                        <Image
                            src={footerPeople}
                            alt="People Desktop"
                            fill
                            priority
                            className="object-cover object-bottom transition-opacity duration-500 ease-in-out"
                            style={{ opacity: isDesktop ? 1 : 0 }}
                        />

                        {/* TABLET (iPad) */}
                        <Image
                            src={footerPeopleTablet}
                            alt="People Tablet"
                            fill
                            priority
                            className="object-cover object-bottom transition-opacity duration-500 ease-in-out"
                            style={{ opacity: isTablet ? 1 : 0 }}
                        />

                        {/* MOBILE */}
                        <Image
                            src={footerPeopleMobile}
                            alt="People Mobile"
                            fill
                            priority
                            className="object-cover object-bottom transition-opacity duration-500 ease-in-out"
                            style={{ opacity: isMobile ? 1 : 0 }}
                        />
                    </div>

                    {/* RIGHT CONTENT */}
                    <div
                        style={{
                            width: `${100 - leftImagePercent}%`,
                            padding: isMobile ? 16 : 40,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <p
                            style={{
                                fontSize: ctaTextSize,
                                color: '#ffffff',
                                fontWeight: 600,
                                lineHeight: '140%',
                                margin: 0,
                            }}
                        >
                            Not sure where to start? Talk to us for free, we’ll guide you with the right solutions for your business.
                        </p>

                        <div style={{ marginTop: 24 }}>
                            <Button
                                text="Talk to us"
                                icon={talkIcon}
                                className="bg-gradient-to-r from-[#ACFF47] to-[#ABFF5B]"
                                onClick={() => openWhatsApp('Hi there... I need you to guide me for my business.')}
                                textSize={ctaButtonTextSize}
                                iconSize={ctaButtonIconSize}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= FOOTER BASE ================= */}
            <div
                className="w-full"
                style={{
                    marginTop: isMobile ? 150 : 160,
                    background:
                        'radial-gradient(120% 80% at 50% 0%, rgba(36,66,155,0.35) 0%, rgba(6,15,54,0.9) 55%, #060F36 100%), linear-gradient(180deg,#24429A,#060F36)',
                }}
            >
                <div
                    style={{
                        ...horizontalMarginStyle,
                        paddingTop: isMobile ? 130 : 164,
                    }}
                >

                    {/* Use different structure for mobile vs others */}
                    {!isMobile ? (
                        <div className="flex justify-between text-white">
                            {/* LEFT SECTION */}
                            <div>
                                <div className="flex items-center">
                                    <Image src={logoImg} alt="logo" width={logoIconSize} height={logoIconSize} />
                                    <span
                                        className="ml-2 font-medium"
                                        style={{ fontSize: logoTextSize }}
                                    >
                                        {siteInfo.name}
                                    </span>
                                </div>

                                <p className="mt-2" style={{ fontSize: contactTextSize, fontWeight: 300 }}>
                                    {siteInfo.email}
                                </p>
                                <p className="mt-2" style={{ fontSize: contactTextSize, fontWeight: 300 }}>
                                    {siteInfo.phone}
                                </p>

                                <div className="flex gap-5 mt-5">
                                    {socialLinks.map(link => (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className=" transition-all duration-300 ease-out 
                                            hover:scale-110 hover:-translate-y-0.5 
                                            hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.35)] 
                                            active:scale-100 " >
                                            <Image
                                                src={iconMap[link.icon]}
                                                alt={link.name}
                                                width={36}
                                                height={36}
                                            />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* MIDDLE LINKS */}
                            <div className="space-y-2 ml-40">
                                {footerLinks.main.map(link => (
                                    <button
                                        key={link.id}
                                        onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                                        className="block select-none transition-all duration-0 hover:font-medium
                                        transition-all duration-300 ease-out 
                                        hover:scale-110 hover:-translate-y-0.5 
                                        hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.35)] 
                                        active:scale-100"
                                        style={{ fontSize: linksTextSize, fontWeight: 300, color: '#fff' }}
                                    >
                                        {link.label}
                                    </button>
                                ))}
                            </div>

                            {/* RIGHT LINKS */}
                            <div className="space-y-2">
                                {footerLinks.services.map((lines, idx) => (
                                    <p key={idx} style={{ fontSize: linksTextSize, fontWeight: 300, lineHeight: '140%', }}>
                                        {lines.map((line, i) => (
                                            <span key={i} className="block">
                                                {line}
                                            </span>
                                        ))}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ) : (
                        // Mobile layout: Left section first, then below it a row with middle + right
                        <div className="flex flex-col text-white">
                            {/* LEFT SECTION */}
                            <div>
                                <div className="flex items-center">
                                    <Image src={logoImg} alt="logo" width={logoIconSize} height={logoIconSize} />
                                    <span
                                        className="ml-2 font-medium"
                                        style={{ fontSize: logoTextSize }}
                                    >
                                        {siteInfo.name}
                                    </span>
                                </div>

                                <p className="mt-2" style={{ fontSize: contactTextSize, fontWeight: 300 }}>
                                    {siteInfo.email}
                                </p>
                                <p className="mt-2" style={{ fontSize: contactTextSize, fontWeight: 300 }}>
                                    {siteInfo.phone}
                                </p>

                                <div className="flex gap-5 mt-5">
                                    {socialLinks.map(link => (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className=" transition-all duration-300 ease-out 
                                            hover:scale-110 hover:-translate-y-0.5 
                                            hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.35)] 
                                            active:scale-100 "
                                        >
                                            <Image
                                                src={iconMap[link.icon]}
                                                alt={link.name}
                                                width={36}
                                                height={36}
                                            />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* spacing between left section and link-row */}
                            <div style={{ marginTop: 24 }} />

                            {/* MIDDLE + RIGHT links in single row (mobile) */}
                            <div className="flex justify-between">
                                <div className="flex-1 pr-4 pl-2">
                                    {footerLinks.main.map(link => (
                                        <button
                                            key={link.id}
                                            onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                                            className="block select-none mb-4 transition-all duration-300 ease-out
    hover:scale-110 hover:-translate-y-0.5
    hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]
    active:scale-100"
                                            style={{ fontSize: linksTextSize, fontWeight: 300, color: '#fff', textAlign: 'left', lineHeight: '140%', }}
                                        >
                                            {link.label}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex-1 pl-4 space-y-4">
                                    {footerLinks.services.map((lines, idx) => (
                                        <p key={idx} style={{ fontSize: linksTextSize, fontWeight: 300, lineHeight: '140%', }}>
                                            {lines.map((line, i) => (
                                                <span key={i} className="block">
                                                    {line}
                                                </span>
                                            ))}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Divider */}
                    <div className="border-t border-white/40 mt-10" />

                    {/* Bottom row (copyright, etc.) */}
                    <div className="text-center mt-5 pb-5 text-[#A6C0D6] text-[14px] font-light">
                        <span>© 2025 Ahken nexus (pvt) Ltd  •  All rights reserved.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
