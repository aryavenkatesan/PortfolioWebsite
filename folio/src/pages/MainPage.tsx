'use client'

import { useCallback, useEffect, useRef } from "react"
import Beams from "../components/Beams"
import Header from "../components/Header"
import Profile from "../components/Profile"
import Works from "../components/Works"
import Hero from "../components/Hero"
import { easeOut, motion, useScroll, useTransform } from "framer-motion"
import { useLocation } from "react-router-dom"
import React from "react"
import { useSmoothScroll } from "../hooks/useSmoothScroll"
import { HeaderDivider } from "../components/ProjectChrome"
import { usePerformanceTier } from "../hooks/usePerformanceTier"
import { useInView } from "react-intersection-observer"

const MemoBeams = React.memo(Beams);

function MainPage() {
    const lenis = useSmoothScroll();
    const performanceTier = usePerformanceTier();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault(); // Prevent default scroll behavior
                if (lenis) {
                    lenis.scrollTo(window.scrollY + window.innerHeight * 1.5, {
                        duration: 1.5, // Same duration as your other scrolls
                    });
                }
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault(); // Prevent default scroll behavior  
                if (lenis) {
                    lenis.scrollTo(window.scrollY - window.innerHeight * 1.5, {
                        duration: 1.5,
                    });
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [lenis]);

    // Scroll to section function that Header can use
    const scrollToSection = useCallback((sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element && lenis) {
            let offset;
            switch (sectionId) {
                case 'home':
                    offset = 120;
                    break;
                case 'work':
                    offset = -250; // Scroll past the work section start
                    break;
                case 'about':
                    offset = 120;
                    break;
                default:
                    offset = 120;
            }
            const elementPosition = element.offsetTop - offset;

            lenis.scrollTo(elementPosition, {
                duration: 1.7,
                easing: (t: number) => 1 - Math.pow(1 - t, 3) // easeOutCubic
            });
            return;
        }

        element?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [lenis]);

    const HeroArrowScroll = useCallback(() => {
        const element = document.getElementById('work');

        if (element && lenis) {
            const offset = -250
            const elementPosition = element.offsetTop - offset;

            lenis.scrollTo(elementPosition, {
                duration: 5,
                easing: (t: number) => t < 0.5 ? t : 1 - Math.pow(-2 * t + 2, 3) / 2
            });
            return;
        }

        element?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [lenis]);

    const location = useLocation();
    useEffect(() => {
        if (location.pathname === "/" && location.state?.backfromwork) {
            // Coming specifically from /VDart
            setTimeout(() => {
                scrollToSection("work");
            }, 50); // wait ~0.6s (match your fade duration)
            window.history.replaceState({}, document.title);
        }
    }, [location, scrollToSection]);

    const sectionRef = useRef(null);
    const { ref: workInViewRef, inView: isWorkInView } = useInView({
        threshold: 0.05,
        rootMargin: "20% 0px",
    });

    // Track scroll progress of the section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const { scrollYProgress: dividerProgress } = useScroll({
        target: sectionRef,
        offset: ["start 50vh", "end start"]
    });
    const dividerOpacity = useTransform(dividerProgress, [0, 0.2], [0, 0.75]);
    const dividerScale = useTransform(dividerProgress, [0, 0.2], [0, 1], {
        ease: easeOut
    });

    // Transform scroll progress to different speeds
    // const beamsY = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const contentY = useTransform(scrollYProgress, [0, 1], [0, 500]);

    return (
        <div className="bg-black">
            {/* Fixed Header with Blur Effect */}
            <div className="fixed top-0 w-full z-30">
                {/* Blur layers */}
                <div className="absolute inset-0 bg-black/45"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-white/8 via-white/3 to-transparent backdrop-blur-sm"></div>

                {/* Header Content - Pass scrollToSection function */}
                <div className="relative">
                    <Header scrollToSection={scrollToSection} />
                </div>
            </div>

            {/* Content Container */}
            <div className="pt-20">
                {/* First Section - HOME */}
                <section id="home" className="relative z-5 min-h-screen">
                    <div>
                        <Hero onArrowClick={HeroArrowScroll} />
                    </div>
                </section>

                <HeaderDivider opacity={dividerOpacity} scaleX={dividerScale} />

                {/* Second Section - WORK */}
                <section
                    id="work"
                    ref={(node) => {
                        sectionRef.current = node;
                        workInViewRef(node);
                    }}
                    className="min-h-[calc(170vh-5rem)] [@media(min-height:666px)_and_(max-height:736px)]:min-h-[calc(250vh-5rem)] lg:min-h-[calc(180vh-5rem)] pt-40 relative overflow-hidden">
                    {/* Beams Background */}
                    <motion.div
                        key={location.key} // 👈 force remount on navigation
                        className="absolute top-0 left-0 right-0 bottom-0 bg-black z-10 opacity-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.38 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <MemoBeams
                            beamWidth={2}
                            beamHeight={20}
                            beamNumber={7}
                            lightColor="#b8b8b8"
                            speed={1.85}
                            noiseIntensity={1.2}
                            scale={0.3}
                            rotation={30}
                            quality={performanceTier}
                            paused={!isWorkInView}
                        />
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-0 left-0 right-0 h-100 bg-gradient-to-b from-black to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent"></div>
                        </div>
                    </motion.div>

                    {/* Works Content */}
                    <motion.div
                        className="relative z-10"
                        style={{ y: contentY }}
                    >
                        <Works />
                    </motion.div>
                </section>

                {/* Third Section - ABOUT */}
                <section id="about" className="mt-0">
                    <Profile />
                </section>
            </div>
        </div>
    )
}

export default MainPage
