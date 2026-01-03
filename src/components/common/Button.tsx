//components/common/Button.tsx
'use client';
import fonts from '@/constants/fonts';
import Image, { StaticImageData } from 'next/image';

export interface ButtonProps {
  text: string;
  icon: StaticImageData;
  onClick?: () => void;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
  textSize?: number;
  iconSize?: number;
}

export default function Button({
  text,
  icon,
  onClick,
  backgroundColor = '#FFFFFF',
  textColor = '#000000',
  className = '',
  textSize,
  iconSize,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor,
        borderRadius: 16,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 32,
        paddingRight: 32
      }}
      className={`flex items-center px-[32px] py-[14px] ${className}`}
    >
      {/* ICON */}
      <Image
        src={icon}
        alt="icon"
        width={iconSize ?? 24}
        height={iconSize ?? 24}
        style={{ marginRight: 8 }}
      />

      {/* TEXT */}
      <span
        style={{
          fontSize: textSize ?? 20,
          fontWeight: fonts.weight.button_weight,
          color: textColor,
          whiteSpace: 'nowrap',
          alignSelf: 'center',
          userSelect: 'none'
        }}
      >
        {text}
      </span>
    </button>
  );
}
