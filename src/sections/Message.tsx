'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import { useRef } from 'react';

const Message = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const firstText = useRef<HTMLHeadingElement>(null);
    const secondText = useRef<HTMLHeadingElement>(null);
    const paragraph = useRef<HTMLHeadingElement>(null);

    const textPathRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const firstTextSplit = SplitText.create(firstText.current, { type: 'words' });
        const secondTextSplit = SplitText.create(secondText.current, { type: 'words' });
        const paragraphSplit = SplitText.create(paragraph.current, { type: 'words, line', linesClass: 'paragraph-line' });

        gsap.to(firstTextSplit.words, {
            color: '#faeade',
            ease: 'power1.in',
            stagger: 1,
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top center',
                end: '30% center',
                scrub: true,
            },
        });

        gsap.to(secondTextSplit.words, {
            color: '#faeade',
            ease: 'power1.in',
            stagger: 1,
            scrollTrigger: {
                trigger: secondText.current,
                start: 'top center',
                end: 'bottom center',
                scrub: true,
            },
        });

        const clipPathTl = gsap.timeline({
            delay: 1,
            scrollTrigger: {
                trigger: textPathRef.current,
                start: 'top 70%',
            },
        });

        clipPathTl.to(textPathRef.current, {
            duration: 1,
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            ease: 'circ.inOut',
        });

        const paragraphTl = gsap.timeline({
            scrollTrigger: {
                trigger: paragraph.current,
                start: 'top center',
            },
        });

        paragraphTl.from(paragraphSplit.words, {
            yPercent: 300,
            rotate: 3,
            ease: 'power1.inOut',
            duration: 1,
            stagger: 0.01,
        });
    });

    return (
        <section ref={containerRef} className="bg-red-brown relative z-20 flex h-dvh w-screen items-center justify-center">
            <div className="flex-col-center">
                <div className="flex-col-center">
                    <h1
                        ref={firstText}
                        className="text-milk/10 max-w-xs text-center text-5xl font-bold uppercase md:max-w-2xl md:text-8xl lg:max-w-4xl lg:text-9xl"
                    >
                        Stir up your fraless past and
                    </h1>
                    <div
                        ref={textPathRef}
                        style={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
                        className="bg-light-brown border-red-brown z-10 rotate-6 border-8 p-3"
                    >
                        <h1 className="text-red-brown text-5xl font-bold uppercase md:text-8xl lg:text-9xl">Fuel Up</h1>
                    </div>
                    <h1
                        ref={secondText}
                        className="text-milk/10 -mt-4 max-w-2xs text-center text-5xl font-bold uppercase md:max-w-xl md:text-8xl lg:max-w-7xl lg:text-9xl"
                    >
                        your future with every gulp of Perfect Protein
                    </h1>
                </div>
                <div className="flex-row-center">
                    <p
                        ref={paragraph}
                        className="font-paragraph md:text-md text-milk mt-10 max-w-xs overflow-hidden text-center text-lg md:max-w-lg lg:text-lg"
                    >
                        Rev up your rebel spirit and feed the adventure of life with SPYLT, where you’re one chug away from epic nostalgia
                        and fearless fun.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Message;
