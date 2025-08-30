import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AV_logo from "/src/assets/AV_logo.png";
import Lenis from "lenis";

const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
};

function Swipeshare() {
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
                        {/* Image on left */}
                        <motion.div
                            ref={imageRef}
                            className="flex-1 flex justify-center lg:justify-end lg:pl-8 xl:pl-24"
                            style={{ y: imageY }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 1.8, ease: 'easeOut' }}
                        >
                            <div className="flex flex-col">
                                <img
                                    src="/src/assets/SwipeshareSS.png"
                                    className="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px] h-auto object-contain rounded-lg shadow-2xl"
                                    alt="Stylish app homepage UI"
                                />
                                <p className="text-xs sm:text-sm font-extralight text-white/60 text-center mt-3 font-montserrat">

                                </p>
                            </div>
                        </motion.div>

                        {/* Text on right */}
                        <div className="flex-1 text-center lg:text-left lg:pr-8 xl:pr-24">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: isMobile ? 0.1 : 0.8 }}
                                transition={{ duration: 1.8, ease: 'easeOut' }}
                            >
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4 sm:mb-6 text-white/92 font-montserrat">
                                    Our Story
                                </h2>
                                <p className="text-sm sm:text-base md:text-lg font-extralight opacity-90 tracking-[0.02rem] sm:tracking-[0.03rem] md:tracking-[0.045rem] leading-relaxed text-white/80 font-montserrat">
                                    "Why couldn't I just make an app for this?" I thought as I waited on a friend alongside a group of people.
                                    This friend in question had 30 extra dining hall meal swipes that they were going to "give" to the rest of us since the semester was ending in one week and the swipes would be rendered useless.
                                    <br />
                                    <br />
                                    Unfortunately, they had to be present at the dining hall and use their ID to permit us entry.
                                    I chatted with the crowd, learning that people would be willing to sell their surplus swipes for money, or buy these swipes for a cheap price.
                                    <br />
                                    <br />
                                    That's when the idea for Swipeshare was born.
                                    <br />
                                    <br />
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
                                    I got a team of developers together and we started building over the summer.
                                    Utilizing Flutter for maximum cross-platform compatibility and Firebase for its robust free tier and strong synergy with the Flutter frontend, we made much progress.
                                    <br />
                                    <br />
                                    Currently we are expanding the marketing team and planning to launch later this semester (Nov 2025).
                                    <br />
                                    <br />
                                    <br />
                                    Stay tuned for more updates!
                                </p>
                            </motion.div>
                            {/* <a
                            href="https://aryavenkatesan.github.io/VDart-AR-Demo/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-6 text-base sm:text-lg font-extralight text-white/90 font-montserrat underline underline-offset-4 decoration-white/40 hover:decoration-white/80 hover:text-white transition-all duration-300"
                        >
                            Signup for waitlist here →
                        </a> */}
                        </div>
                    </div>
                </div>

            </motion.div >


        </>
    )
}

export default Swipeshare;