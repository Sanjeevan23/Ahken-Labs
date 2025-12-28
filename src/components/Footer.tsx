'use client';

import Image from 'next/image';
import type { StaticImageData } from 'next/image';

import Button from '@/components/Button';
import talkIcon from '@/assets/icons/Talk_to_us.svg';
import logoImg from '@/assets/icons/logo.svg';
import facebookIcon from '@/assets/icons/facebook.svg';
import instagramIcon from '@/assets/icons/instagram.svg';
import twitterIcon from '@/assets/icons/twitter.svg';
import tripadvisorIcon from '@/assets/icons/tripadvisor.svg';

import footerPeople from '@/assets/images/footer_people_group.svg';

import { siteInfo, socialLinks, footerLinks } from '@/api/footerData';
import useScale from '@/hooks/useScale';

const iconMap: Record<string, StaticImageData> = {
    facebook: facebookIcon,
    instagram: instagramIcon,
    twitter: twitterIcon,
    tripadvisor: tripadvisorIcon,
};

export default function Footer() {
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    const scale = useScale();

    return (
        <footer className="relative w-full">
            {/* ================= CTA OVERLAY SECTION ================= */}
            <div
                style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: '-114px',
                    width: '100%',
                    paddingLeft: 200 * scale,
                    paddingRight: 200 * scale,
                }}
            >
                <div className="rounded-[40px] 
                bg-[linear-gradient(90deg,#5577E0_0%,#1C1C89_50%)] 
                flex overflow-hidden">

                    {/* LEFT IMAGE */}
                    <div className="w-1/2 relative">
                        <Image
                            src={footerPeople}
                            alt="People"
                            fill
                            className="object-cover object-bottom"
                            priority
                        />
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="w-1/2 p-10 flex flex-col justify-between">
                        <p className="text-white text-[20px] font-semibold leading-[140%]">
                            Not sure where to start? Talk to us for free, we’ll guide you with the right solutions for your business.
                        </p>
                        <div style={{ marginTop: 24 }}>
                            <Button
                                text="Talk to us"
                                icon={talkIcon}
                                className="bg-gradient-to-r from-[#ACFF47] to-[#ABFF5B]"
                                onClick={() => scrollTo('contact')}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= FOOTER BASE ================= */}
            <div
                className="w-full 
                bg-[radial-gradient(120%_80%_at_50%_0%,rgba(36,66,155,0.35)_0%,rgba(6,15,54,0.9)_55%,#060F36_100%),linear-gradient(180deg,#24429A,#060F36)]"
            >
                <div  style={{marginRight: 200 * scale, marginLeft: 200 * scale}} className="pt-[164px]">
                    <div className="flex justify-between text-white">

                        {/* LEFT SECTION */}
                        <div>
                            {/* Logo */}
                            <div className="flex items-center">
                                <Image src={logoImg} alt="logo" width={32} height={32} />
                                <span className="ml-2 text-[32px] font-medium">
                                    {siteInfo.name}
                                </span>
                            </div>

                            {/* Contact */}
                            <p className="mt-2 text-[16px] font-light">{siteInfo.email}</p>
                            <p className="mt-2 text-[16px] font-light">{siteInfo.phone}</p>

                            {/* Social Icons */}
                            <div className="flex gap-5 mt-1">
                                {socialLinks.map(link => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transition-transform hover:scale-110"
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

                        {/* MIDDLE LINKS */}
                        <div className="space-y-2 ml-40">
                            {footerLinks.main.map(link => (
                                <button
                                    key={link.id}
                                    onClick={() => scrollTo(link.id)}
                                    className="block text-[16px] font-light text-white select-none 
                                transition-all duration-0 
                                hover:font-medium"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>

                        {/* RIGHT LINKS */}
                        <div className="space-y-2">
                            {footerLinks.services.map((lines, idx) => (
                                <p
                                    key={idx}
                                    className="text-[16px] font-light text-white leading-snug"
                                >
                                    {lines.map((line, i) => (
                                        <span key={i} className="block">
                                            {line}
                                        </span>
                                    ))}
                                </p>
                            ))}
                        </div>
                    </div>
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
