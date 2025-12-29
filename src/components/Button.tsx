//components/Button.tsx
'use client';
import fonts from '@/constants/fonts';
import useScale from '@/hooks/useScale';
import Image, { StaticImageData } from 'next/image';

export interface ButtonProps {
  text: string;
  icon: StaticImageData;
  onClick?: () => void;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

export default function Button({
  text,
  icon,
  onClick,
  backgroundColor = '#FFFFFF',
  textColor = '#000000',
  className = '',
}: ButtonProps) {
  const scale = useScale();
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor,
        borderRadius: 16,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 32 * scale,
        paddingRight: 32 * scale
      }}
      className={`flex items-center px-[32px] py-[14px] ${className}`}
    >
      {/* ICON */}
      <Image
        src={icon}
        alt="icon"
        width={24}
        height={24}
        style={{ marginRight: 8 }}
      />

      {/* TEXT */}
      <span
        style={{
          fontSize: 20,
          fontWeight: fonts.weight.button_weight,
          color: textColor,
          alignSelf: 'center',
          userSelect: 'none'
        }}
      >
        {text}
      </span>
    </button>
  );
}
