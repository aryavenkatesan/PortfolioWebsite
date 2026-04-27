import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PageBottomGlow, ProjectHeader } from "../components/ProjectChrome";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useResetScrollOnMount } from "../hooks/useResetScrollOnMount";

const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
};

function Swipeshare() {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const isMobile = useMediaQuery("(max-width: 1023px)");
    useResetScrollOnMount();

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

                <ProjectHeader />


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
                                    src="/assets/SwipeshareSS.png"
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

            <PageBottomGlow />


        </>
    )
}

export default Swipeshare;
