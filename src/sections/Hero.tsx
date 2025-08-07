'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import { useRef } from 'react';

const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const heading = useRef<HTMLHeadingElement>(null);
    const textPathRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const heroTitle = SplitText.create(heading.current, { type: 'chars' });

        const tl = gsap.timeline({ delay: 1 });

        tl.to(contentRef.current, {
            opacity: 1,
            y: 0,
            ease: 'power1.inOut',
        })
            .to(
                textPathRef.current,
                {
                    duration: 1,
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                    ease: 'circ.inOut',
                },
                '-=0.5'
            )
            .from(
                heroTitle.chars,
                {
                    opacity: 0,
                    yPercent: 200,
                    stagger: 0.02,
                    ease: 'power4.out',
                },
                '-=0.5'
            );

        const sectionTl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: '1% top',
                end: 'bottom top',
                scrub: true,
            },
        });

        sectionTl.to(containerRef.current, {
            scale: 0.9,
            rotate: 10,
            yPercent: 30,
            ease: 'power1.inOut',
        });
    });

    return (
        <section className="bg-main">
            <div ref={containerRef} className="bg-milk relative flex h-dvh w-screen items-center justify-center">
                <div ref={contentRef} className="flex flex-col items-center opacity-0">
                    <h1 ref={heading} className="overflow-hidden text-5xl font-bold uppercase md:text-8xl lg:text-9xl">
                        freaking delicious
                    </h1>
                    <div
                        ref={textPathRef}
                        style={{ clipPath: 'polygon(50% 0, 50% 0, 50% 100%, 50% 100%)' }}
                        className="border-milk bg-mid-brown -rotate-2 border-8 p-3"
                    >
                        <h1 className="text-milk text-5xl font-bold uppercase md:text-8xl lg:text-9xl">protein + caffine</h1>
                    </div>
                    <h1 className="font-paragraph md:text-md mt-4 max-w-xs text-center text-sm md:max-w-lg lg:text-lg">
                        Live life to the fullest with SPYLT: Shatter boredom and embrace your inner kid with every deliciously smooth chug.
                    </h1>
                    <div className="bg-light-brown mt-10 rounded-full px-8 py-2 lg:px-16 lg:py-4">
                        <p className="text-lg font-bold uppercase lg:text-xl">chug a spylt</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
