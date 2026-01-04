//src/components/common/CarouselDots.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
    containerRef: React.RefObject<HTMLDivElement | null>;
};

export default function CarouselDots({ containerRef }: Props) {
    const [pageCount, setPageCount] = useState(0);
    const [activePage, setActivePage] = useState(0);

    const itemsPerViewRef = useRef(1);
    const cardWidthRef = useRef(1);

    // useEffect(() => {
    //     const container = containerRef.current;
    //     if (!container) return;

    //     const update = () => {
    //         const card = container.querySelector<HTMLElement>(
    //             '[data-carousel-item]'
    //         );

    //         if (!card) {
    //             setPageCount(0);
    //             return;
    //         }

    //         const style = getComputedStyle(card);
    //         const marginRight = parseFloat(style.marginRight || '0');
    //         const cardWidth = card.offsetWidth + marginRight;
    //         const containerWidth = container.clientWidth || 1;

    //         const itemsPerView = Math.max(
    //             1,
    //             Math.floor(containerWidth / cardWidth)
    //         );

    //         const pages = Math.ceil(
    //             container.children.length / itemsPerView
    //         );

    //         itemsPerViewRef.current = itemsPerView;
    //         cardWidthRef.current = cardWidth;

    //         setPageCount(pages);

    //         setActivePage(
    //             Math.round(container.scrollLeft / (cardWidth * itemsPerView))
    //         );
    //     };

    //     update();

    //     const onScroll = () => {
    //         setActivePage(
    //             Math.round(
    //                 container.scrollLeft /
    //                 (cardWidthRef.current * itemsPerViewRef.current)
    //             )
    //         );
    //     };

    //     container.addEventListener('scroll', onScroll, { passive: true });
    //     window.addEventListener('resize', update);

    //     return () => {
    //         container.removeEventListener('scroll', onScroll);
    //         window.removeEventListener('resize', update);
    //     };
    // }, [containerRef]);

    // inside CarouselDots component (only diffs shown)

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const update = () => {
            const card = container.querySelector<HTMLElement>('[data-carousel-item]');
            const items = container.querySelectorAll<HTMLElement>('[data-carousel-item]');

            if (!card || items.length === 0) {
                setPageCount(0);
                return;
            }

            const style = getComputedStyle(card);
            const marginRight = parseFloat(style.marginRight || '0');
            const cardWidth = card.offsetWidth + marginRight;
            const containerWidth = container.clientWidth || 1;

            const itemsPerView = Math.max(1, Math.floor(containerWidth / cardWidth));
            const pages = Math.ceil(items.length / itemsPerView);

            itemsPerViewRef.current = itemsPerView;
            cardWidthRef.current = cardWidth;

            setPageCount(pages);

            setActivePage(Math.floor(container.scrollLeft / (cardWidth * itemsPerView)));
        };

        update();

        const onScroll = () => {
            setActivePage(
                Math.floor(
                    container.scrollLeft /
                    (cardWidthRef.current * itemsPerViewRef.current)
                )
            );
        };

        container.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', update);

        return () => {
            container.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', update);
        };
    }, [containerRef]);


    const scrollToPage = (index: number) => {
        const container = containerRef.current;
        if (!container) return;

        container.scrollTo({
            left:
                index *
                itemsPerViewRef.current *
                cardWidthRef.current,
            behavior: 'smooth',
        });
    };

    // Hide dots if not needed
    if (pageCount < 3) return null;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
            <div style={{ display: 'flex', gap: 10 }}>
                {Array.from({ length: pageCount }).map((_, i) => {
                    const active = i === activePage;

                    return (
                        <button
                            key={i}
                            onClick={() => scrollToPage(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            style={{
                                width: active ? 9 : 8,
                                height: active ? 9 : 8,
                                borderRadius: 999,
                                backgroundColor: active
                                    ? '#1C1C89'
                                    : 'rgba(0,0,0,0.25)',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 250ms ease',
                                transform: active ? 'scale(1.1)' : 'scale(1)',
                                userSelect: 'none',
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
