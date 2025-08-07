'use client';

import NavBar from '@/components/NavBar';
import Benefit from '@/sections/Benefit';
import Flavor from '@/sections/Flavor';
import Footer from '@/sections/Footer';
import Hero from '@/sections/Hero';
import Message from '@/sections/Message';
import Nutrition from '@/sections/Nutrition';
import Testimonial from '@/sections/Testimonial';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollSmoother, ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Home = () => {
    useGSAP(() => {
        ScrollSmoother.create({
            smooth: 3,
            effects: true,
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
        });
    });

    return (
        <main>
            <NavBar />
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <Hero />
                    <Message />
                    <Flavor />
                    <Nutrition />
                    <Benefit />
                    <Testimonial />
                    <Footer />
                </div>
            </div>
        </main>
    );
};

export default Home;
