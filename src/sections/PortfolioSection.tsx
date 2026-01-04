'use client';

import Image from 'next/image';
import rightArrow from '@/assets/icons/right_arrow.svg';
import { portfolioData } from '@/api/portfolioData';
import { useState, useEffect } from 'react';
import useResponsivePadding from '@/hooks/useResponsivePadding';

export default function PortfolioSection() {
  const { isDesktop, isTablet, paddingLR } = useResponsivePadding();

  // Determine initial visible count & step based on device
  const initialVisible = isDesktop || isTablet ? 6 : 4;
  const STEP = isDesktop || isTablet ? 6 : 4;

  const [visibleCount, setVisibleCount] = useState(initialVisible);

  // reset visibleCount if device changes
  useEffect(() => {
    setVisibleCount(initialVisible);
  }, [initialVisible]);

  const visibleProjects = portfolioData.slice(0, visibleCount);
  const isFullyExpanded = visibleCount >= portfolioData.length;

  const sectionPaddingTop = isDesktop ? 64 : 40;
  const titlebottom = isDesktop ? 40 : 30;
  const sectionTitleSize = isDesktop ? 40 : isTablet ? 28 : 20;
  const linksTextSize = isDesktop ? 24 : isTablet ? 22 : 20;

  return (
    <section id="Portfolio">
      {/* HEADER */}
      <h2
        className="text-center"
        style={{
          fontSize: sectionTitleSize,
          fontWeight: 700,
          color: '#111111',
          marginTop: sectionPaddingTop,
          marginBottom: titlebottom,
        }}
      >
        Some of our projects
      </h2>

      {/* PROJECT SECTION */}
      <div
        style={{
          marginLeft: isDesktop ? paddingLR : 20,
          marginRight: isDesktop ? paddingLR : 20,
        }}
      >
        <div
          className="grid gap-y-16 gap-x-6"
          style={{
            gridTemplateColumns: isDesktop || isTablet
              ? 'repeat(2, minmax(0, 1fr))'
              : 'repeat(1, minmax(0, 1fr))',
            columnGap: 24,
            rowGap: isDesktop ? 64 : isTablet ? 50 : 40,
          }}
        >
          {visibleProjects.map(project => (
            <div key={project.id} className="w-full">
              {/* IMAGE */}
              <div className="relative w-full">
                <Image
                  src={project.image}
                  alt={project.name}
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-auto rounded-[24px] object-cover"
                />
                {/* ARROW LINK */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 left-4 flex items-center"
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 40,
                    paddingLeft: 24,
                    paddingRight: 20,
                    paddingTop: isDesktop ? 12 : isTablet ? 12 : 10,
                    paddingBottom: isDesktop ? 9 : isTablet ? 9 : 7,
                  }}
                >
                  <span
                    style={{
                      fontSize: linksTextSize,
                      fontWeight: 600,
                      color: '#111111',
                      marginRight: 4,
                      paddingBottom: 6,
                    }}
                  >
                    {project.name}
                  </span>
                  <Image
                    src={rightArrow}
                    alt="arrow"
                    width={linksTextSize}
                    height={linksTextSize}
                  />
                </a>
              </div>

              {/* BOTTOM TEXT */}
              <div style={{ marginTop: 24, paddingLeft: 8, paddingRight: 8 }}>
                <p style={{ fontSize: linksTextSize, fontWeight: 600, color: '#262347' }}>
                  {project.title}
                </p>
                <p
                  style={{
                    marginTop: isDesktop ? 16 : isTablet ? 14 : 12,
                    fontSize: isDesktop ? 20 : isTablet ? 18 : 16,
                    fontWeight: 400,
                    color: '#262347',
                  }}
                >
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>


        {/* SEE ALL BUTTON */}
        {portfolioData.length > initialVisible && (
          <div className="flex justify-center" style={{ marginTop: isDesktop ? 40 : isTablet ? 35 : 30 }}>
            <button
              onClick={() => {
                if (isFullyExpanded) {
                  setVisibleCount(initialVisible);
                } else {
                  setVisibleCount(prev => Math.min(prev + STEP, portfolioData.length));
                }
              }}
              className="flex items-center"
              style={{
                background: '#F7F7F7',
                paddingTop: isDesktop ? 19 : isTablet ? 18 : 16,
                paddingBottom: isDesktop ? 15 : isTablet ? 14 : 12,
                paddingLeft: 32,
                paddingRight: 32,
                borderRadius: 16,
              }}
            >
              <span
                style={{
                  fontSize: isDesktop ? 20 : isTablet ? 18 : 16,
                  fontWeight: 600,
                  color: '#111111',
                  marginRight: 4,
                  marginBottom: 4
                }}
              >
                {isFullyExpanded ? 'Hide the rest' : 'See all projects'}
              </span>

              <Image
                src={rightArrow}
                alt="arrow"
                width={isDesktop ? 20 : isTablet ? 18 : 16}
                height={isDesktop ? 20 : isTablet ? 18 : 16}
                style={{
                  transform: isFullyExpanded ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease',
                }}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
