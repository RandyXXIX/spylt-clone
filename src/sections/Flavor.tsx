'use client';

import FlavorSlider from '@/components/FlavorSlider';
import FlavorTitle from '@/components/FlavorTitle';

const Flavor = () => {
    return (
        <section className="bg-milk flavor-section relative z-20 min-h-screen w-screen">
            <div className="flex h-full w-full flex-col items-center xl:flex-row">
                <div className="my-16 mb-32 min-w-[55%] flex-none md:mb-64 lg:mx-16">
                    <FlavorTitle />
                </div>
                <div>
                    <FlavorSlider />
                </div>
            </div>
        </section>
    );
};

export default Flavor;
