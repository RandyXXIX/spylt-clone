'use client';

import { NUTRIENTLISTS } from '@/constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const Nutrition = () => {
    const [nutrientLists, setNutrientLists] = useState(NUTRIENTLISTS);

    const containerRef = useRef<HTMLElement>(null);
    const heading = useRef<HTMLHeadingElement>(null);
    const textPathRef = useRef<HTMLDivElement>(null);
    const paragraph = useRef<HTMLParagraphElement>(null);

    const isMobile = useMediaQuery({
        query: '(max-width: 768px)',
    });

    useGSAP(() => {
        const headingSplit = SplitText.create(heading.current, { type: 'chars' });
        const paragraphSplit = SplitText.create(paragraph.current, { type: 'words, line', linesClass: 'paragraph-line' });

        gsap.from(headingSplit.chars, {
            opacity: 0,
            yPercent: 200,
            stagger: 0.02,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: '20% 50%',
            },
        });

        const clipPathTl = gsap.timeline({
            delay: 1,
            scrollTrigger: {
                trigger: textPathRef.current,
                start: 'top 50%',
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

    useEffect(() => {
        if (isMobile) {
            setNutrientLists(nutrientLists.slice(0, 3));
        } else {
            setNutrientLists(nutrientLists);
        }
    }, [isMobile]);

    return (
        <section ref={containerRef} className="bg-milk-yellow relative min-h-dvh w-screen 2xl:h-[120dvh]">
            <Image src="/images/slider-dip.png" alt="" width={1920} height={480} className="mb-10 object-cover" />
            <Image
                src="/images/big-img.png"
                alt=""
                width={1920}
                height={1080}
                className="absolute bottom-0 h-1/2 w-full object-cover md:h-2/3 xl:h-full"
            />

            <div className="relative flex flex-col px-16 py-8 xl:flex-row xl:justify-between">
                <div className="flex w-fit flex-col">
                    <h1 ref={heading} className="overflow-hidden text-5xl font-bold uppercase md:text-8xl lg:text-9xl">
                        it still does
                    </h1>
                    <div
                        ref={textPathRef}
                        style={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
                        className="bg-mid-brown border-milk-yellow z-10 -rotate-3 border-8 p-3"
                    >
                        <h1 className="text-milk-yellow text-5xl font-bold uppercase md:text-8xl lg:text-9xl">body good</h1>
                    </div>
                </div>

                <div>
                    <p
                        ref={paragraph}
                        className="font-paragraph md:text-md mt-10 max-w-xs overflow-hidden text-start text-lg md:max-w-lg xl:text-end xl:text-lg"
                    >
                        Milk contains a wide array of nutrients, including vitamins, minerals, and protein, and this is lactose free
                    </p>
                </div>
            </div>

            <div className="flex-row-center absolute bottom-5 w-full">
                <div className="flex-row-center bg-milk border-milk-yellow mx-auto gap-16 rounded-full border-8 px-8 py-4 md:px-16 md:py-8">
                    {nutrientLists.map((nutrient) => (
                        <div key={nutrient.label} className="font-paragraph text-mid-brown flex flex-col">
                            <h1 className="md:text-md mb-2 text-sm lg:text-lg">{nutrient.label}</h1>
                            <p className="text-sm">up to</p>
                            <h1 className="text-md font-bold md:text-xl lg:text-2xl">{nutrient.amount}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Nutrition;
