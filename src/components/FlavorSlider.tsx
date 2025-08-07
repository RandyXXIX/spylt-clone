'use client';

import { FLAVORLISTS } from '@/constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

const FlavorSlider = () => {
    const flavorSliderRef = useRef<HTMLDivElement>(null);

    const isTablet = useMediaQuery({
        query: '(max-width: 1280px)',
    });

    useGSAP(() => {
        if (!flavorSliderRef.current) return;

        const scrollAmount = flavorSliderRef.current.scrollWidth - window.innerWidth;

        if (!isTablet) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.flavor-section',
                    start: 'top top',
                    end: `+=${scrollAmount + 1200}px`,
                    scrub: true,
                    pin: true,
                },
            });

            tl.to('.flavor-section', {
                x: `-${scrollAmount + 1200}px`,
                ease: 'power1.inOut',
            });
        }
    });

    return (
        <div ref={flavorSliderRef} className="flex flex-col gap-32 md:gap-64 xl:flex-row">
            {FLAVORLISTS.map((flavor) => (
                <div
                    key={flavor.name}
                    className={`relative h-[30vh] w-[80vw] md:h-[45vh] md:w-[70vw] lg:h-[60vh] lg:w-[60vw] ${flavor.rotation}`}
                >
                    <Image
                        src={`/images/${flavor.color}-bg.svg`}
                        alt={``}
                        fill
                        className="absolute bottom-0 w-full rounded-2xl object-cover"
                    />
                    <div className="absolute bottom-0 left-1/2 h-[40vh] w-[50vw] -translate-x-1/2 md:h-[60vh] md:w-[50vw] lg:h-[80vh] lg:w-[30vw]">
                        <Image src={`/images/${flavor.color}-drink.webp`} alt={``} fill />
                    </div>
                    <Image src={`/images/${flavor.color}-elements.webp`} alt={``} fill className="absolute bottom-0" />
                    <h1 className="text-milk absolute bottom-5 left-5 text-4xl font-bold uppercase md:text-6xl">{flavor.name}</h1>
                </div>
            ))}
        </div>
    );
};

export default FlavorSlider;
