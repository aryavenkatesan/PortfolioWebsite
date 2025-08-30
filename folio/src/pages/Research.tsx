import { easeOut, motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AV_logo from "/src/assets/AV_logo.png";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
};

function Research() {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 560);
        };

        // Check on mount
        checkMobile();

        // Check on resize
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // ✅ Initialize Lenis smooth scroll
    useEffect(() => {
        const lenis = new Lenis({
            smoothWheel: true,
            duration: 1.2,
            easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
        });

        lenis.scrollTo(0, { immediate: true });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    // Track scroll progress
    const { scrollY } = useScroll();

    // Animate values based on scroll
    const bgOpacity = useTransform(scrollY, [0, 160], [0, 0.6]);
    const blurAmount = useTransform(scrollY, [0, 160], [0, 48]);
    const borderOpacity = useTransform(scrollY, [0, 160], [0.2, 0.2]);

    const { scrollYProgress } = useScroll({
        target: imageRef,
        offset: ["start end", "end start"], // when image enters/leaves viewport
    });

    // Image moves slower (e.g. scroll range mapped to smaller Y range)
    const imageY = useTransform(
        scrollYProgress,
        [0, 1],
        [isMobile ? 0 : -150, isMobile ? 0 : 70],
        { ease: easeOut }
    );


    return (
        <>
            <motion.div
                ref={containerRef}
                className="min-h-screen bg-black text-white"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                {/* HEADER */}
                <motion.header
                    className="fixed top-0 left-0 w-full z-10 flex flex-row items-center justify-between px-4 sm:px-8 py-6 sm:py-8"
                    style={{
                        backgroundColor: useTransform(
                            bgOpacity,
                            (opacity) => `rgba(0, 0, 0, ${opacity})`
                        ),
                        backdropFilter: useTransform(
                            blurAmount,
                            (blur) => `blur(${blur}px)`
                        ),
                        borderBottom: useTransform(
                            borderOpacity,
                            (opacity) => `1px solid rgba(255, 255, 255, ${opacity})`
                        ),
                    }}
                >
                    {/* Logo (clickable) */}
                    <motion.img
                        src={AV_logo}
                        alt="AV Logo"
                        className="h-8 cursor-pointer"
                        onClick={() =>
                            navigate("/", { state: { backfromwork: true } })
                        }
                        whileHover={{ scale: 1.05, opacity: 0.9 }}
                        transition={{ duration: 0.2 }}
                    />

                    {/* Back Button */}
                    <motion.button
                        whileHover={{ scale: 0.95, opacity: 0.85 }}
                        whileTap={{ scale: 1.0, opacity: 0.95 }}
                        onClick={() =>
                            navigate("/", { state: { backfromwork: true } })
                        }
                        className="font-montserrat font-light"
                    >
                        ← back
                    </motion.button>
                </motion.header>

                {/* MAIN CONTENT */}
                <div className="flex flex-col items-center px-4 sm:px-8 pt-24 sm:pt-32 pb-16">
                    <motion.div
                        ref={imageRef}
                        style={{ y: imageY }}
                        layoutId="work-image-project-alpha rounded-3xl"
                        className="relative overflow-hidden"
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 200,
                            duration: 0.8,
                        }}
                    >
                        <video
                            src="/src/assets/AutonomousDriving.mov"
                            className="w-full max-w-xs sm:max-w-2xl lg:max-w-4xl max-h-[50vh] sm:max-h-[65vh] lg:max-h-[80vh] object-contain rounded-lg shadow-2xl transform scale-101"
                            controls
                            muted
                            autoPlay
                            loop
                            playsInline
                        >
                            Your browser does not support the video tag.
                        </video>
                    </motion.div>
                </div>

                {/* DIVIDER SECTIONS */}
                <div className="container mx-auto pb-16 sm:pb-24 lg:pb-36 font-montserrat font-light bg-neutral-1000 rounded-xl sm:rounded-3xl text-center">
                    <div className="flex flex-col px-4 sm:px-10 lg:flex-row items-start lg:items-stretch justify-center gap-8 sm:gap-12 lg:gap-0">
                        {/* Summary */}
                        <div className="flex-1 px-4 sm:px-6 lg:px-12">
                            <motion.h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-6 sm:mb-10 text-white/92"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 1.8, ease: 'easeOut' }}>
                                Project Description
                            </motion.h2>
                            <motion.p className="text-base sm:text-lg font-extralight opacity-90 text-center lg:text-left tracking-[0.03rem] sm:tracking-[0.045rem] leading-relaxed sm:leading-snug text-white/80"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 1.8, ease: 'easeOut' }}>
                                Shown above is the F1Tenth gym environment- a simulator for a collegiate autonomous vehicle racing competition.
                                This was my first attempt at making a controller, and since I had minimal guidance, I had maximum creative control.
                                This is only the first part of the larger research project, which is to make many controllers and compare the efficacy between them.
                            </motion.p>
                        </div>

                        {/* Vertical divider */}
                        <div className="hidden lg:block border-l border-white/20"></div>

                        {/* Tech Stack */}
                        <div className="flex-1 px-4 sm:px-6 lg:px-12">
                            <motion.h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-6 sm:mb-10 text-white/92"

                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 1.8, ease: 'easeOut' }}
                            >
                                Technical Details
                            </motion.h2>
                            <motion.p className="text-base sm:text-lg font-extralight opacity-90 text-center lg:text-left tracking-[0.03rem] sm:tracking-[0.045rem] leading-relaxed sm:leading-snug text-white/80"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 1.8, ease: 'easeOut' }}
                            >
                                Project was based in Python.
                                Implemented various solutions using classical computing or machine learning (typically imitation learning).
                                Specific types of controllers include Pure Pursuit, Model Predictive Control, and the funky algorithm I engineering on my own as shown above (still works pretty well if I do say so myself).
                            </motion.p>
                        </div>
                    </div>
                </div>

                <div className='h-[50px]' />

                <motion.div
                    className="pointer-events-none fixed bottom-0 left-0 w-full h-64 bg-gradient-to-t from-white/11 to-transparent blur-9xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                </motion.div>

            </motion.div>
        </>

    );
}

export default Research;