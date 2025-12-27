//components/Button.tsx
'use client';
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
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor,
        borderRadius: 16
      }}
      className={`flex items-center px-[32px] py-[16px] ${className}`}
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
          fontWeight: 600,
          color: textColor,
          alignSelf: 'center',
          userSelect: 'none',
        }}
      >
        {text}
      </span>
    </button>
  );
}
