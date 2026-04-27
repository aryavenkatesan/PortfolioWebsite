import { easeOut, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PageBottomGlow, ProjectHeader } from "../components/ProjectChrome";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useResetScrollOnMount } from "../hooks/useResetScrollOnMount";

const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
};

function Research() {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const isMobile = useMediaQuery("(max-width: 559px)");
    useResetScrollOnMount();

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
                <ProjectHeader />

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
                            src="/assets/AutonomousDriving.mov"
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

                <PageBottomGlow />

            </motion.div>
        </>

    );
}

export default Research;
