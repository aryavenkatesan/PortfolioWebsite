import { easeIn, easeOut, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PageBottomGlow, ProjectHeader } from "../components/ProjectChrome";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useResetScrollOnMount } from "../hooks/useResetScrollOnMount";

const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
};

function Scenic() {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const graphImageRef = useRef(null);
    const isMobile = useMediaQuery("(max-width: 559px)");
    useResetScrollOnMount();

    const { scrollYProgress } = useScroll({
        target: imageRef,
        offset: ["start end", "end start"], // when image enters/leaves viewport
    });

    const { scrollYProgress: graphScrollYProgress } = useScroll({
        target: graphImageRef,
        offset: ["start end", "end start"],
    });

    // Image moves slower (e.g. scroll range mapped to smaller Y range)
    const imageY = useTransform(
        scrollYProgress,
        [0, 1],
        [isMobile ? 0 : -150, isMobile ? 0 : 70],
        { ease: easeOut }
    );


    const graphImageY = useTransform(graphScrollYProgress, [0, 1], [isMobile ? 0 : -120, isMobile ? 0 : 80], { ease: easeIn });



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


                {/* MAIN CONTENT */}
                <div className="flex flex-col items-center px-4 sm:px-8 pt-24 sm:pt-32 pb-8 sm:pb-12 lg:pb-28">
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
                            src="/assets/Scenic.png"
                            className="w-full max-w-xs sm:max-w-2xl lg:max-w-6xl max-h-[50vh] sm:max-h-[65vh] lg:max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            alt="VDart Project Screenshot"
                        />
                    </motion.div>
                </div>

                {/* DIVIDER SECTIONS */}
                <div className="container mx-auto pb-16 sm:pb-24 lg:pb-36 lg:pt-16 font-montserrat font-light bg-neutral-1000 rounded-xl sm:rounded-3xl text-center">
                    <div className="flex flex-col px-4 sm:px-10 lg:flex-row items-start lg:items-stretch justify-center gap-8 sm:gap-12 lg:gap-0">
                        {/* Summary */}
                        <div className="flex-1 px-4 sm:px-6 lg:px-12">
                            <motion.h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-6 sm:mb-10 text-white/92"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 1.8, ease: 'easeOut' }}>
                                What is Scenic?
                            </motion.h2>
                            <motion.p className="text-base sm:text-lg font-extralight opacity-90 text-center lg:text-left tracking-[0.03rem] sm:tracking-[0.045rem] leading-relaxed sm:leading-snug text-white/80"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.9 }}
                                transition={{ duration: 1.8, ease: 'easeOut' }}>
                                Scenic is an open-source, domain-specific, probabilistic programming language for describing scenes.
                                From autonomous driving, to aviation, and even some VR applications, Scenic allows you to generate scenarios that allow models to practice specifically what their current training overlooks.
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
                                How did I contribute?
                            </motion.h2>
                            <motion.p className="text-base sm:text-lg font-extralight opacity-90 text-center lg:text-left tracking-[0.03rem] sm:tracking-[0.045rem] leading-relaxed sm:leading-snug text-white/80"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.9 }}
                                transition={{ duration: 1.8, ease: 'easeOut' }}
                            >
                                For the driving domain specifically, there was a lot of outdated code for the controllers that needed to be overhauled.
                                With the guidance of a PhD student who had been working on the project a long time, I successfully refactored, wrote, and documented a solid chunk of the project.

                            </motion.p>
                        </div>
                    </div>
                </div>

                <div className="lg:h-[160px]" />

                <div className="container mx-auto px-4 sm:px-8 pb-24 lg:pb-56">
                    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                        {/* Image on left */}
                        <motion.div
                            ref={graphImageRef}
                            className="flex-1 flex justify-center"
                            style={{ y: graphImageY }}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.35 }}
                            transition={{ duration: 1.8, ease: 'easeOut' }}
                        >
                            <div className="flex flex-col items-center">
                                <img
                                    src="/assets/ScenicGraph.png"
                                    className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[700px] h-auto object-contain rounded-lg shadow-2xl"
                                    alt="VDart AR Feature"
                                />
                                <p className="text-sm font-extralight text-white/60 text-center mt-3 font-montserrat">
                                    Deviation from centerline over 15 seconds after being randomly placed on a road.
                                </p>
                            </div>
                        </motion.div>

                        {/* Text on right */}
                        <motion.div
                            className="flex-1 text-center lg:text-left lg:-translate-y-20"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 1.8, ease: 'easeOut' }}
                        >
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-6 text-white/92 font-montserrat">
                                Impact Report
                            </h2>
                            <p className="text-base sm:text-lg font-extralight opacity-90 tracking-[0.03rem] sm:tracking-[0.045rem] leading-relaxed text-white/80 font-montserrat">
                                This graph shows that after an intial adjustment period, the deviation off the centerline of the Pure Pursuit controller was significantly less and more consistent than the PID controller.
                                These numbers were calculated by taking the mean of 100 trials of each controller.
                                It is clear that the Pure Pursuit controller I implemented performed much better than the existing PID controller.
                            </p>
                            <a
                                href="https://github.com/BerkeleyLearnVerify/Scenic/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-6 text-base sm:text-lg font-extralight text-white/90 font-montserrat underline underline-offset-4 decoration-white/40 hover:decoration-white/80 hover:text-white transition-all duration-300"
                            >
                                Check out the repo here →
                            </a>
                        </motion.div>
                    </div>
                </div>

            </motion.div >

            <PageBottomGlow />
        </>
    )
}

export default Scenic;
