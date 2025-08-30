import { AnimatePresence, easeOut, motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AV_logo from "/src/assets/AV_logo.png";


const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
};


function Portfolio() {
    const navigate = useNavigate();

    const containerRef = useRef(null);
    const graphImageRef = useRef(null);

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

    const { scrollY } = useScroll();

    // Animate values based on scroll
    const bgOpacity = useTransform(scrollY, [0, 160], [0, 0.6]);
    const blurAmount = useTransform(scrollY, [0, 160], [0, 48]);
    const borderOpacity = useTransform(scrollY, [0, 160], [0.2, 0.2]);

    const { scrollYProgress: graphScrollYProgress } = useScroll({
        target: graphImageRef,
        offset: ["start end", "end start"],
    });

    const graphImageY = useTransform(
        graphScrollYProgress,
        [0, 1],
        [isMobile ? 0 : -150, isMobile ? 0 : 70],
        { ease: easeOut }
    );

    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        "/src/assets/P1.png",
        "/src/assets/P4.png",
        "/src/assets/P2.png",
        "/src/assets/P3.png",
        "/src/assets/portfolioSS.png",
    ];

    return (
        <>
            <motion.div
                ref={containerRef}
                className="min-h-[90vh] bg-black text-white"
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


                <div className="flex flex-col items-center px-4 sm:px-8 pt-32 pb-8 sm:pb-12 lg:pb-28">
                    <motion.div
                        ref={graphImageRef}
                        style={{ y: graphImageY }}
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
                            src="/src/assets/PortfolioFigma.png"
                            className="w-full max-w-xs sm:max-w-2xl lg:max-w-4xl max-h-[50vh] sm:max-h-[65vh] lg:max-h-[80vh] object-contain rounded-lg shadow-2xl"
                            alt="Cluttered Figma Board"
                        />
                        <p className="text-xs sm:text-sm font-extralight text-white/60 text-center mt-2 sm:mt-3 font-montserrat">
                            3 Months spent designing, 3 weeks spent building
                        </p>
                    </motion.div>
                </div>

                {/* DIVIDER SECTIONS */}
                <div className="container mx-auto pb-12 sm:pb-24 font-montserrat font-light bg-neutral-1000 rounded-xl sm:rounded-3xl text-center">
                    <div className="flex flex-col px-4 sm:px-10 lg:flex-row items-start lg:items-stretch justify-center gap-8 sm:gap-12 lg:gap-0">
                        {/* Summary */}
                        <div className="flex-1 px-2 sm:px-6 lg:px-12 flex flex-col items-center">
                            <motion.h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-6 sm:mb-10 text-white/92"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 1.8, ease: 'easeOut' }}>
                                Course of Action
                            </motion.h2>
                            <motion.p className="text-base sm:text-lg font-extralight opacity-90 text-center max-w-2xl mx-auto tracking-[0.03rem] sm:tracking-[0.045rem] leading-relaxed sm:leading-snug text-white/80"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.8 }}
                                transition={{ duration: 1.8, ease: 'easeOut' }}>
                                This project intially was focused around web dev (as an online portfolio should be), but it quickly evolved into a UI/UX bootcamp.
                                I spent my summer learning about theory surrounding everything- spacing, typeface, colors, attention, you name it.
                                As a result, Figma became second nature to me even though it wasn't focus of the project.
                            </motion.p>
                        </div>
                    </div>
                </div>

            </motion.div >

            {/* Gallery Section */}
            <div className="w-full pb-20 lg:pb-10 pt-0 lg:pt-30">
                <motion.h2
                    className="text-2xl sm:text-3xl md:text-4xl font-light mb-8 lg:mb-6 text-white/92 font-montserrat text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1.8, ease: 'easeOut' }}
                >
                    Gallery
                </motion.h2>
                <motion.div
                    className="relative max-w-5xl mx-auto px-4 sm:px-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1.8, ease: 'easeOut' }}
                >
                    <div className="flex items-center justify-center gap-4 sm:gap-8">
                        {/* Left Arrow */}
                        <button
                            onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300 flex-shrink-0"
                        >
                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Image Container */}
                        <div className="flex justify-center items-center h-[300px] lg:h-[650px]">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentIndex}
                                    src={images[currentIndex]}
                                    className="w-auto object-contain rounded-lg shadow-xl"
                                    alt={`Gallery image ${currentIndex + 1}`}
                                    initial={{ opacity: 0, scale: 0.99 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                />
                            </AnimatePresence>
                        </div>

                        {/* Right Arrow */}
                        <button
                            onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300 flex-shrink-0"
                        >
                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Image Indicators */}
                    <div className="flex justify-center gap-2 mt-6">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white w-8' : 'bg-white/40'
                                    }`}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>

            <div className="h-[180px] lg:h-[0px]" />

            <motion.div
                className="pointer-events-none fixed bottom-0 left-0 w-full h-64 bg-gradient-to-t from-white/11 to-transparent blur-9xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            >
            </motion.div>
        </>
    )
}

export default Portfolio;