'use client';

import { useState } from 'react';
import Image from 'next/image';
import { faqData } from '@/api/faqData';
import downArrow from '@/assets/icons/down_arrow.svg';
import useResponsivePadding from '@/hooks/useResponsivePadding';

export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const { isDesktop, paddingLR, isTablet } = useResponsivePadding();

    const sectionPaddingTop = isDesktop ? 64 : 40;
    const titlebottom = isDesktop ? 40 : 30;
    const sectionTitleSize = isDesktop ? 40 : isTablet ? 28 : 20;

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section style={{ marginTop: sectionPaddingTop }}>
            {/* HEADING */}
            <h2
                style={{
                    fontWeight: 700,
                    fontSize: sectionTitleSize,
                    color: '#111111',
                    textAlign: 'center',
                }}
            >
                Frequently asked questions
            </h2>

            {/* QA SECTION */}
            <div
                style={{
                    marginTop: titlebottom,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginLeft: isDesktop ? paddingLR : 0,
                    marginRight: isDesktop ? paddingLR : 0,
                }}
            >
                {faqData.map((faq, index) => {
                    const isOpen = activeIndex === index;

                    return (
                        <div
                            key={index}
                            style={{
                                width: "80%",
                                borderTop: '1px solid #E6E6E6',
                                paddingTop: isDesktop ? 20 : isTablet ? 18 : 16,
                                paddingBottom: isDesktop ? 20 : isTablet ? 18 : 16,
                                cursor: 'pointer',
                            }}
                            onClick={() => toggleFAQ(index)}
                        >
                            {/* QUESTION ROW */}
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <p
                                    style={{
                                        fontWeight: 400,
                                        fontSize: isDesktop ? 20 : 16,
                                        color: '#242424',
                                    }}
                                >
                                    {faq.question}
                                </p>

                                <Image
                                    src={downArrow}
                                    alt="arrow"
                                    width={isDesktop ? 20 : 16}
                                    height={isDesktop ? 20 : 16}
                                    style={{
                                        transform: isOpen ? 'rotate(-180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.4s ease',
                                    }}
                                />
                            </div>

                            {/* ANSWER */}
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                                    transition: 'grid-template-rows 0.4s ease',
                                }}
                            >
                                <div style={{ overflow: 'hidden' }}>
                                    <p
                                        style={{
                                            marginTop: isDesktop ? 16 : isTablet ? 14 : 12,
                                            fontWeight: 400,
                                            fontSize: isDesktop ? 16 : 14,
                                            color: '#6A6A6A',
                                        }}
                                    >
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>
        </section>
    );
}
