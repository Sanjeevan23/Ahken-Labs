'use client';

export default function ScrollFade({ background = '#FFFFFF' }) {
  return (
    <>
      {/* LEFT FADE */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 80,
          zIndex: 2,
          pointerEvents: 'none',
          background: `linear-gradient(to right, ${background} 0%, transparent 100%)`,
        }}
      />

      {/* RIGHT FADE */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 80,
          zIndex: 2,
          pointerEvents: 'none',
          background: `linear-gradient(to left, ${background} 0%, transparent 100%)`,
        }}
      />
    </>
  );
}
