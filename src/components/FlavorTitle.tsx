'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import { useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

const FlavorTitle = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const firstText = useRef<HTMLHeadingElement>(null);
    const secondText = useRef<HTMLHeadingElement>(null);

    const textPathRef = useRef<HTMLDivElement>(null);

    const isTablet = useMediaQuery({
        query: '(max-width: 1280px)',
    });

    useGSAP(() => {
        const firstTextSplit = SplitText.create(firstText.current, { type: 'chars' });
        const secondTextSplit = SplitText.create(secondText.current, { type: 'chars' });

        gsap.from(firstTextSplit.chars, {
            opacity: 0,
            yPercent: 200,
            stagger: 0.02,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 50%',
            },
        });

        gsap.from(secondTextSplit.chars, {
            opacity: 0,
            yPercent: 200,
            stagger: 0.02,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 40%',
            },
        });

        gsap.to(textPathRef.current, {
            duration: 1,
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 50%',
            },
        });

        if (!isTablet) {
            const titleTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.flavor-section',
                    start: 'top top',
                    end: 'bottom 80%',
                    scrub: true,
                },
            });

            titleTl
                .to(firstText.current, {
                    xPercent: -30,
                    ease: 'power1.inOut',
                })
                .to(
                    textPathRef.current,
                    {
                        xPercent: -25,
                        ease: 'power1.inOut',
                    },
                    '<'
                )
                .to(
                    secondText.current,
                    {
                        xPercent: -10,
                        ease: 'power1.inOut',
                    },
                    '<'
                );
        }
    });

    return (
        <div ref={containerRef} className="flex-col-center h-full w-full">
            <h1 ref={firstText} className="overflow-hidden pb-2 text-5xl font-bold uppercase md:text-8xl lg:text-9xl">
                we have 6
            </h1>
            <div
                ref={textPathRef}
                style={{
                    clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
                }}
                className="border-milk bg-mid-brown z-20 -mt-4 -rotate-2 border-8 p-3"
            >
                <h1 className="text-milk text-5xl font-bold uppercase md:text-8xl lg:text-9xl">freaking</h1>
            </div>
            <h1 ref={secondText} className="-mt-4 overflow-hidden pb-2 text-5xl font-bold uppercase md:text-8xl lg:text-9xl">
                delicious flavors
            </h1>
        </div>
    );
};

export default FlavorTitle;
