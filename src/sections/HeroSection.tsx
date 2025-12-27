// sections/HeroSection.tsx
import Image from 'next/image';
import heroImg from '@/assets/images/hero.png';
import Button from '@/components/Button';
import callIcon from '@/assets/icons/call_black.png';
import colors from '@/constants/colors';

export default function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        // minHeight: '90vh',
        background: 'linear-gradient(360deg, #3A41AA 0%, #071A3E 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <Image
        src={heroImg}
        alt="hero"
        fill
        style={{ objectFit: 'cover', zIndex: 0 }}
        priority
      />

      {/* Overlay Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            marginTop: 0,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Text */}
          <p
            style={{
              color: colors.white,
              fontSize: 36,
              fontWeight: 600,
              lineHeight: '1.3',
              marginBottom: 36,
              maxWidth: 800,
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
            // onClick={() => console.log('button press')}
            className="bg-gradient-to-r from-[#ACFF47] to-[#ABFF5B]"
            textColor={colors.black}
          />
        </div>
      </div>
    </section>
  );
}
