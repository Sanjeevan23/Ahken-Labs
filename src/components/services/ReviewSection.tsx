'use client';

import Image from 'next/image';
import CartBox from '@/components/common/CartBox';
import useEdgeAutoScroll from '@/hooks/useEdgeAutoScroll';
import { reviewData } from '@/api/reviewData';
import starIcon from '@/assets/icons/star.svg';
import useResponsivePadding from '@/hooks/useResponsivePadding';
import ScrollFade from '../common/ScrollFade';
import CarouselDots from '../common/CarouselDots';

export default function ReviewSection() {
  const { containerRef, handleMouseMove, stopScroll } =
    useEdgeAutoScroll(14, 120);
  const { isDesktop, isTablet, paddingLR } = useResponsivePadding();

  const boxpaddingTop = isDesktop ? 80 : 46;
  const sectionTitleSize = isDesktop ? 40 : isTablet ? 28 : 20;
  const reviewBox = isDesktop ? 400 : isTablet ? 320 : 280;
  const reviewname = isDesktop ? 20 : isTablet ? 18 : 16;
  const review = isDesktop ? 16 : isTablet ? 14 : 12;
  const cartboxborder = isDesktop ? 24 : 18;
  const imagewidth = isDesktop ? 48 : 32;

  return (
    <section
      style={{
        marginTop: boxpaddingTop,
        marginLeft: isDesktop ? paddingLR : 20,
        marginRight: isDesktop ? paddingLR : 20,
        position: 'relative',
      }}
    >
      {/* HEADING */}
      <h2
        style={{
          fontSize: sectionTitleSize,
          fontWeight: 700,
          color: '#111111',
          textAlign: 'center',
        }}
      >
        What our customers say
      </h2>

      {/* SCROLL WRAPPER */}
      <div
        style={{
          marginTop: isDesktop ? 40 : 30,
          position: 'relative',
        }}
      >
        <ScrollFade />

        {/* SCROLLABLE */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={stopScroll}
          className="flex gap-6 overflow-x-scroll scrollbar-hide"
        >
          {reviewData.map(item => (
            <div
              key={item.id}
              data-carousel-item
              style={{ flexShrink: 0, display: 'flex' }}
            >
              <CartBox
                width={reviewBox}
                borderRadius={cartboxborder}
                backgroundColor="#F7F7F7"
                paddingTop={isDesktop ? 24 : 18}
                paddingBottom={isDesktop ? 24 : 18}
                paddingLeft={isDesktop ? 24 : 18}
                paddingRight={isDesktop ? 24 : 18}
                style={{
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Top section: Name + Stars */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={imagewidth}
                      height={imagewidth}
                      style={{
                        borderRadius: 100,
                        marginRight: isDesktop ? 14 : 10,
                      }}
                    />
                    <span
                      style={{
                        fontSize: reviewname,
                        fontWeight: 500,
                        color: '#242424',
                      }}
                    >
                      {item.name}
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      gap: 5,
                      marginTop: isDesktop ? 20 : 16,
                    }}
                  >
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Image
                        key={i}
                        src={starIcon}
                        alt="star"
                        width={reviewname}
                        height={reviewname}
                      />
                    ))}
                  </div>
                </div>

                {/* Middle: Feedback */}
                <p
                  style={{
                    marginTop: 12,
                    fontSize: review,
                    fontWeight: 400,
                    color: '#343434',
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    flexGrow: 1,
                  }}
                >
                  {item.feedback}
                </p>

                {/* Bottom: Role */}
                <p
                  style={{
                    marginTop: isDesktop ? 20 : 16,
                    fontSize: review,
                    fontWeight: 400,
                    color: '#58585B',
                    alignSelf: 'flex-start',
                  }}
                >
                  {item.role}
                </p>
              </CartBox>
            </div>
          ))}
        </div>
        <CarouselDots containerRef={containerRef} />
      </div>
    </section>
  );
}
