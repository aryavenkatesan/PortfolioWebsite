import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AV_logo from "/src/assets/AV_logo.png";
import Lenis from "lenis";

const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
};

function Phizzicare() {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
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

    const navigate = useNavigate();

    const { scrollY } = useScroll();

    const bgOpacity = useTransform(scrollY, [0, 160], [0, 0.6]);
    const blurAmount = useTransform(scrollY, [0, 160], [0, 48]);
    const borderOpacity = useTransform(scrollY, [0, 160], [0.2, 0.2]);

    const { scrollYProgress } = useScroll({
        target: imageRef,
        offset: ["start end", "end start"],
    });

    const imageY = useTransform(scrollYProgress, [0, 1], [isMobile ? 0 : -60, isMobile ? 0 : 160]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        "/src/assets/Pc1.png",
        "/src/assets/Pc2.png",
        "/src/assets/Pc3.png",
        "/src/assets/Pc4.png",
        "/src/assets/Pc5.png"
    ];



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
                    className="fixed top-0 left-0 w-full z-10 flex flex-row items-center justify-between px-4 sm:px-8 py-8"
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


                {/* Update the container div */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-36 xl:pb-40 pt-32 lg:pt-48">
                    <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">

                        <div className="flex-1 text-center lg:text-right lg:pl-8 xl:pl-24 order-2 lg:order-1">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: isMobile ? 0.1 : 0.8 }}
                                transition={{ duration: 1.8, ease: 'easeOut' }}
                            >
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4 sm:mb-6 text-white/92 font-montserrat">
                                    The Motivation
                                </h2>
                                <p className="text-sm sm:text-base md:text-lg font-extralight opacity-90 tracking-[0.02rem] sm:tracking-[0.03rem] md:tracking-[0.045rem] leading-relaxed text-white/80 font-montserrat">
                                    In the middle of brainstorming ideas for a hackathon, two of my group-mates simultaneously got a notification from Duolingo.
                                    We immediately took a break in the middle of the meeting to quickly get the lesson done and out of the way, and then kept trying to come up with ideas.
                                    <br />
                                    <br />
                                    That's when it hit us - forming habits to do daily tasks that need to be done is a hard thing, and yet there's an easily accessible way right on our phones.
                                    Through incentivization of doing something as mundane as your physical therapy exercises, we could motivate more people to recover sooner, and keep those same people healthy.
                                </p>
                            </motion.div>
                            <div className="py-2 sm:py-3" />
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: isMobile ? 0.2 : 0.5 }}
                                transition={{ duration: 1.8, ease: 'easeOut', delay: 0.1 }}
                            >
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4 sm:mb-6 text-white/92 font-montserrat">
                                    Development
                                </h2>
                                <p className="text-sm sm:text-base md:text-lg font-extralight opacity-90 tracking-[0.02rem] sm:tracking-[0.03rem] md:tracking-[0.045rem] leading-relaxed text-white/80 font-montserrat">
                                    The full MVP for this idea was completed in 24 hours, by a team of 4 including myself.
                                    We used TSX with React Native and Expo.
                                    For chatbot support, we system prompted Gemini through API calls.
                                    We also figured out how to use Computer Vision to check if a user was actually performing their tasks using OpenCV, but unfortunatley ran out of time trying to record video through React Native.
                                </p>
                            </motion.div>
                        </div>

                        <motion.div
                            ref={imageRef}
                            className="flex-1 flex justify-center lg:justify-start lg:pr-8 xl:pr-24 order-1 lg:order-2"
                            style={{ y: imageY }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 1.8, ease: 'easeOut' }}
                        >
                            <div className="flex flex-col">
                                <img
                                    src="/src/assets/phizzicareSS.png"
                                    className="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px] h-auto object-contain rounded-lg shadow-2xl"
                                    alt="Stylish app homepage UI"
                                />
                                <p className="text-xs sm:text-sm font-extralight text-white/60 text-center mt-3 font-montserrat">

                                </p>
                            </div>
                        </motion.div>

                    </div>
                </div>

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
                        className="relative max-w-4xl mx-auto px-4 sm:px-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1.8, ease: 'easeOut' }}
                    >
                        <div className="flex items-center justify-center">
                            {/* Left Arrow */}
                            <button
                                onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
                                className="absolute left-0 sm:left-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 m-2 sm:p-3 transition-all duration-300"
                            >
                                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            {/* Image Container */}
                            <div className="flex justify-center items-center h-[500px] lg:h-[650px]">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentIndex}
                                        src={images[currentIndex]}
                                        className="h-full w-auto object-contain rounded-lg shadow-xl"
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
                                className="absolute right-0 sm:right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 m-2 sm:p-3 transition-all duration-300"
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

            </motion.div >

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

export default Phizzicare;