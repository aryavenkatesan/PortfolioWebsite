import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AV_logo from "/src/assets/AV_logo.png";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
};

function VDart() {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const isMobile = window.innerWidth < 768

    // ✅ Initialize Lenis smooth scroll
    useEffect(() => {
        const lenis = new Lenis({
            smoothWheel: true,
            duration: 1.2,
            easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
        });

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
    const imageY = useTransform(scrollYProgress, [0, 1], [isMobile ? 0 : -150, isMobile ? 0 : 200]);

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
                    className="fixed top-0 left-0 w-full z-10 flex flex-row items-center justify-between px-8 py-8"
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
                        back
                    </motion.button>
                </motion.header>

                {/* MAIN CONTENT */}
                <div className="flex flex-col items-center px-8 pt-32 pb-12 lg:pb-28">
                    {/* <div className="pb-20">
                    <h1 className="text-4xl md:text-6xl font-extralight text-center tracking-wide font-montserrat">
                        VDart
                    </h1>
                </div> */}
                    <motion.div
                        ref={imageRef}
                        style={{ y: imageY }}
                        layoutId="work-image-project-alpha"
                        className="relative"
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 200,
                            duration: 0.8,
                        }}
                    >
                        <img
                            src="/src/assets/VDartSS.png"
                            className="max-w-4xl max-h-[20vh] lg:max-h-[80vh] object-contain rounded-lg shadow-2xl"
                            alt="VDart Project Screenshot"
                        />
                    </motion.div>
                </div>

                {/* DIVIDER SECTIONS */}
                <div className="container mx-auto pb-36 pt-10 font-montserrat font-light bg-neutral-1000 rounded-3xl text-center">
                    <div className="flex flex-col px-10 lg:flex-row items-start lg:items-stretch justify-center gap-12 lg:gap-0">
                        {/* Summary */}
                        <div className="flex-1 px-6 lg:px-12">
                            <motion.h2 className="text-3xl sm:text-4xl font-light mb-10 text-white/92"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 1.8, ease: 'easeOut' }}>
                                Summary
                            </motion.h2>
                            <motion.p className="text-lg font-extralight opacity-90 lg:text-left tracking-[0.045rem] leading-snug text-white/80"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 1.8, ease: 'easeOut' }}>
                                Although VDart is a staffing consulting company worth over $250 Million operating in 12 countries with over 600 employees, they still didn't have a company Intranet.
                                This project for a centralized internal communication website for easy access to all things VDart, from HR requests off to company-wide announcements, fell to the 2025 Intern team.
                            </motion.p>
                        </div>

                        {/* Vertical divider */}
                        <div className="hidden lg:block border-l border-white/20"></div>

                        {/* Tech Stack */}
                        <div className="flex-1 px-6 lg:px-12">
                            <motion.h2 className="text-3xl sm:text-4xl font-light mb-10 text-white/92"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 1.8, ease: 'easeOut' }}
                            >
                                Tech Stack
                            </motion.h2>
                            <motion.p className="text-lg font-extralight opacity-90 lg:text-left tracking-[0.045rem] leading-snug text-white/80"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 1.8, ease: 'easeOut' }}
                            >
                                Used HTML, CSS, and inbuilt Javascript to create the Intranet.
                                There were a lot of challenges especially with some of the integrations, but also with working with the team.
                                Being remote was especially challenging as it was difficult to build rapport and team chemistry — but we got the job done eventually.
                            </motion.p>
                        </div>
                    </div>
                </div>

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

export default VDart;