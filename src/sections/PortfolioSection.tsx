'use client';

import Image from 'next/image';
import rightArrow from '@/assets/icons/right_arrow.svg';
import { portfolioData } from '@/api/portfolioData';
import { useState } from 'react';
import useScale from '@/hooks/useScale';

const STEP = 6;

export default function PortfolioSection() {
  const scale = useScale();
  const [visibleCount, setVisibleCount] = useState(6);
  const visibleProjects = portfolioData.slice(0, visibleCount);
  const isFullyExpanded = visibleCount >= portfolioData.length;

  return (
    <section id="Portfolio">
      {/* HEADER */}
      <h2
        className="text-center"
        style={{
          fontSize: 40,
          fontWeight: 700,
          color: '#111111',
          marginTop: 64,
          marginBottom: 40,
        }}
      >
        Some of our projects
      </h2>

      {/* PROJECT SECTION */}
      <div
        style={{
          marginLeft: 200 * scale,
          marginRight: 200 * scale,
        }}
      >
        <div
          className="grid grid-cols-2"
          style={{
            columnGap: 24,
            rowGap: 64,
          }}
        >
          {visibleProjects.map(project => (
            <div key={project.id}>
              {/* IMAGE */}
              <div className="relative">
                <Image
                  src={project.image}
                  alt={project.name}
                  width={748 * scale}
                  height={748}
                  className="rounded-[24px]"
                />

                {/* LEFT ARROW GROUP */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 left-4 flex items-center"
                  style={{
                    padding: '12px 20px 9px 24px',
                    background: '#FFFFFF',
                    borderRadius: 40,
                  }}
                >
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 600,
                      color: '#111111',
                      marginRight: 4,
                      paddingBottom:6
                    }}
                  >
                    {project.name}
                  </span>
                  <Image src={rightArrow} alt="arrow" width={24} height={24} />
                </a>
              </div>

              {/* BOTTOM TEXT */}
              <div
                style={{
                  marginTop: 24,
                  paddingLeft: 8,
                  paddingRight: 8,
                }}
              >
                <p
                  style={{
                    fontSize: 24,
                    fontWeight: 600,
                    color: '#262347',
                  }}
                >
                  {project.title}
                </p>

                <p
                  style={{
                    marginTop: 16,
                    fontSize: 20,
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
        {portfolioData.length > 6 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => {
                if (isFullyExpanded) {
                  setVisibleCount(6);
                } else {
                  setVisibleCount(prev => prev + STEP);
                }
              }}
              className="flex items-center"
              style={{
                background: '#F7F7F7',
                paddingTop: 19,
                paddingBottom: 15,
                paddingLeft: 32,
                paddingRight: 32,
                borderRadius: 16,
              }}
            >
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: '#111111',
                  marginRight: 4,
                  marginBottom:4
                }}
              >
                {isFullyExpanded ? 'Hide the rest' : 'See all projects'}
              </span>

              <Image
                src={rightArrow}
                alt="arrow"
                width={24}
                height={24}
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
