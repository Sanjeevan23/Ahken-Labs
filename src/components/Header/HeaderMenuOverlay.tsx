'use client';

import { useEffect } from 'react';
import talkIcon from '@/assets/icons/Talk_to_us.svg';
import colors from '@/constants/colors';
import Button from '@/components/common/Button';

type Tab = { label: string; id: string };

export default function HeaderMenuOverlay({
  open,
  onClose,
  tabs,
  activeTab,
  setActiveTab,
  scrollTo,
}: {
  open: boolean;
  onClose: () => void;
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (id: string) => void;
  scrollTo: (id: string) => void;
}) {
  /* lock body scroll */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  /* esc close */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <>
      {/* backdrop */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-[60]
          transition-all duration-300 ease-out
          ${open
            ? 'bg-black/25 backdrop-blur-[4px] pointer-events-auto'
            : 'bg-transparent pointer-events-none'}
        `}
      />

      {/* panel */}
      <aside
        role="dialog"
        aria-modal="true"
        className={`
          fixed top-0 right-0 z-[70]
          h-[100dvh] w-[280px] max-w-[85%]
          flex flex-col box-border
          p-6
          rounded-l-xl
          backdrop-blur-[10px]
          bg-white/40
          shadow-[0_0_16px_#00000014]
          transition-transform duration-[420ms] ease-[cubic-bezier(.2,.9,.2,1)]
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* header */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-[20px] font-semibold text-[#111]">Menu</div>

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="
              w-10 h-8 pb-2 mt-2 rounded-[10px]
              flex items-center justify-center
              text-[40px]
              transition
              hover:bg-black/5
              active:scale-95
            "
          >
            ×
          </button>
        </div>

        {/* tabs */}
        <nav className="flex flex-col gap-[10px] mt-[6px]">
          {tabs.map(t => {
            const isActive = t.id === activeTab;

            return (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id);
                  scrollTo(t.id);
                }}
                className={`
                  text-left px-[14px] py-[12px]
                  rounded-[12px]
                  text-[18px] font-medium
                  transition-all duration-300 ease-out
                  active:scale-[0.98]
                  ${isActive
                    ? `
                        text-white
                        bg-[radial-gradient(120%_80%_at_50%_0%,rgba(36,66,155,0.35)_0%,rgba(6,15,54,0.9)_55%,#060F36_100%),linear-gradient(180deg,#24429A,#060F36)]
                      `
                    : `
                        text-[#111]
                        hover:bg-black/5
                      `
                  }
                `}
              >
                {t.label}
              </button>
            );
          })}
        </nav>

        {/* footer button */}
        <div className="mt-auto w-full">
          <Button
            text="Talk to us"
            icon={talkIcon}
            onClick={() => {
              onClose();
              scrollTo('Footer');
            }}
            backgroundColor={colors.white}
            textColor={colors.button_text}
            className="w-full justify-center"
          />
        </div>
      </aside>
    </>
  );
}
