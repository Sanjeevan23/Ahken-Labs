// sections/HeroSection.tsx
'use client';
import Image from 'next/image';
import heroImg from '@/assets/images/hero.svg';
import heroTabletImg from '@/assets/images/hero_tablet.svg';
import heroMobileImg from '@/assets/images/hero_mobile.jpg';
import Button from '@/components/common/Button';
import callIcon from '@/assets/icons/Talk_to_us.svg';
import colors from '@/constants/colors';
import useResponsivePadding from '@/hooks/useResponsivePadding';
import { openWhatsApp } from '@/utils/whatsapp';

export default function HeroSection() {
  const { isDesktop, isTablet, isMobile } = useResponsivePadding();

  const currentImage = isDesktop
    ? heroImg
    : isTablet
      ? heroTabletImg
      : heroMobileImg;

  // Text & button sizing
  const headingFontSize = isDesktop ? 36 : isTablet ? 26 : 16;
  const buttonTextSize = isDesktop ? 20 : 14;
  const buttonIconSize = isDesktop ? 24 : 14;
  const headingMarginBottom = isDesktop ? 36 : 20;

  const sectionMinHeight = isMobile ? '0vh' : isTablet ? '80vh' : '95vh';
  const overlayMinHeight = isMobile ? '63vh' : isTablet ? '74vh' : '80vh';

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: sectionMinHeight,
        overflow: 'hidden',
        transition: 'min-height 0.5s ease',
      }}
    >
      {/* Background Images: layered for smooth fade */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {[heroImg, heroTabletImg, heroMobileImg].map((img) => (
          <Image
            key={img.src}
            src={img}
            alt="hero"
            fill
            style={{
              objectFit: 'cover',
              transition: 'opacity 0.8s ease',
              opacity: currentImage.src === img.src ? 1 : 0,
            }}
            priority
          />
        ))}
      </div>

      {/* Overlay Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: overlayMinHeight,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'min-height 0.5s ease',
        }}
      >
        <div
          style={{
            marginTop: 0,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '90%',
            transition: 'all 0.5s ease',
          }}
        >
          {/* Text */}
          <p
            style={{
              color: colors.white,
              fontSize: headingFontSize,
              fontWeight: 600,
              lineHeight: '150%',
              marginBottom: headingMarginBottom,
              textAlign: 'center',
              transition: 'all 0.5s ease',
            }}
          >
            We build content solutions and tech products
            <br />
            to elevate your brand
          </p>

          {/* Button */}
          <Button
            text="Get Our Free Strategy"
            icon={callIcon}
            className="bg-gradient-to-r from-[#ACFF47] to-[#ABFF5B]"
            textColor={colors.button_text}
            textSize={buttonTextSize}
            iconSize={buttonIconSize}
            onClick={() => openWhatsApp('Hi there..')}
          />
        </div>
      </div>
    </section>
  );
}
