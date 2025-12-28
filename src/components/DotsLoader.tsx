//components/DotsLoader.tsx
'use client';

export default function DotsLoader() {
  return (
    <span className="dots-wrapper">
      <span className="dot" />
      <span className="dot delay-150" />
      <span className="dot delay-300" />
      <span className="dot delay-450" />

      <style jsx>{`
        .dots-wrapper {
          display: inline-flex;
          gap: 6px;
          align-items: center;
        }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: currentColor;
          animation: bounce 1.2s infinite ease-in-out;
          opacity: 0.3;
        }

        .delay-150 {
          animation-delay: 0.15s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-450 {
          animation-delay: 0.45s;
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
            opacity: 0.3;
          }
          40% {
            transform: translateY(-6px);
            opacity: 1;
          }
        }
      `}</style>
    </span>
  );
}
