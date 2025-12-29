//components/CartBox.tsx
'use client';

import React from 'react';

type Align =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'stretch'
  | 'baseline';

type Justify =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

type CartBoxProps = {
  width?: number | string;
  borderRadius?: number;
  backgroundColor?: string;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  alignItems?: Align;
  justifyContent?: Justify;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export default function CartBox({
  width,
  borderRadius = 24,
  backgroundColor = '#F7F7F7',
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  paddingTop = 0,
  paddingBottom = 0,
  paddingLeft = 0,
  paddingRight = 0,
  alignItems = 'flex-start',
  justifyContent = 'center',
  children,
  style,
}: CartBoxProps) {
  return (
    <div
      style={{
        width,
        borderRadius,
        background: backgroundColor,
        backdropFilter: 'blur(80px)',
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        display: 'flex',
        flexDirection: 'column',
        alignItems,
        justifyContent,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
