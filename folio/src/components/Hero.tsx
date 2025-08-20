import { easeIn, easeInOut, easeOut, motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import ContactSquares from "./ContactSquares"

function Hero() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    // Fade for name and subtitle (early)
    const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0], {
        ease: easeOut
    })

    // Tagline animations
    const taglineY = useTransform(scrollYProgress, [0, 0.55], [0, -100], {
        ease: easeInOut
    })
    const taglineOpacity = useTransform(scrollYProgress, [0, 0.65, 0.825], [1, 1, 0], {
        ease: easeOut
    })

    // Aura should only be visible in hero section
    const aura = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 1, 0], {
        ease: easeIn
    })

    return (
        <div ref={containerRef}>
            <div className="min-h-[calc(300vh-5rem)]">
                <div className="min-h-1.5 text-[rgb(205,205,205)]">
                    <div className="fixed inset-0 ">
                        {/* Aura/glow effect - only visible when in hero section */}
                        <motion.div style={{ opacity: aura }}>
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 3, delay: 1.6 }}
                            >
                                <div className="w-[1200px] h-[350px] bg-white/10 rounded-full blur-3xl mb-20" />
                            </motion.div>
                        </motion.div>
                        <div className="flex flex-col justify-center h-full relative">
                            {/* Fading elements with initial fade-in */}
                            <motion.div style={{ opacity }}>
                                <motion.h1
                                    className="font-montserrat font-thin text-8xl text-center tracking-[0.1rem]"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
                                >
                                    Arya Venkatesan
                                </motion.h1>
                                <motion.h2
                                    className="font-montserrat font-light text-2xl text-center tracking-[0.07rem] mt-4 mb-8"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        opacity: { duration: 1.5, delay: 1.45 },
                                        y: { duration: 0.65, delay: 1.45, ease: "easeOut" }
                                    }}
                                >
                                    Full-stack developer based in Cary, NC
                                </motion.h2>
                            </motion.div>

                            {/* Tagline with initial fade-in and movement */}
                            <motion.div
                                style={{
                                    y: taglineY,
                                    opacity: taglineOpacity
                                }}
                            >
                                <motion.h2
                                    className="font-montserrat font-light text-2xl tracking-[0.05rem] text-center mt-1 mb-7"
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        opacity: { duration: 2, delay: 1.6 },
                                        y: { duration: 0.5, delay: 1.6, ease: "easeOut" }
                                    }}
                                >
                                    I find better ways to do things
                                </motion.h2>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
            <motion.div
                className="sticky bottom-0"
                style={{ opacity }}
            >
                <motion.div initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 1.75 }}>
                    <footer className="flex flex-row justify-between items-center p-6 bg-black text-black -translate-x-2 z-40">
                        <ContactSquares onleft={true} />

                        {/* Animated SVG Arrow */}
                        <motion.svg
                            width="40"
                            height="100"
                            viewBox="0 0 40 100"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            shapeRendering="crispEdges"
                            animate={{
                                y: [0, 3, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            {/* Arrow body with proper drawing animation */}
                            <motion.path
                                d="M20 5 L20 85"
                                stroke="rgba(205, 205, 205, 0.8)"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                pathLength="1"
                                clipPath="url(#arrowClip)"
                                animate={{
                                    pathLength: [0, 1, 1, 1, 1, 1],
                                    opacity: [0, 1, 1, 1, 0, 0]
                                }}
                                transition={{
                                    duration: 5,
                                    times: [0, 0.2, 0.5, 0.6, 0.875, 1],
                                    repeat: Infinity,
                                    ease: 'easeInOut'
                                }}
                            />

                            {/* Overlay for erasing effect - draws in reverse */}
                            <clipPath id="arrowClip">
                                <motion.rect
                                    x="0"
                                    y="5"
                                    width="40"
                                    height="80"
                                    animate={{
                                        height: [0, 80, 80, 0, 0],
                                        y: [5, 5, 5, 85, 85],
                                        opacity: [1, 1, 1, 0, 1]
                                    }}
                                    transition={{
                                        duration: 5,
                                        times: [0, 0.3, 0.6, 0.875, 1],
                                        repeat: Infinity,
                                        ease: 'easeInOut'
                                    }}
                                />
                            </clipPath>

                            {/* Arrow head */}
                            <motion.path
                                d="M20 85 L12 77 M20 85 L28 77"
                                stroke="rgba(205, 205, 205, 0.8)"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                animate={{
                                    pathLength: [0, 1, 1, 1, 0, 0],
                                    opacity: [0, 1, 1, 1, 0.1, 0]
                                }}
                                transition={{
                                    duration: 5,
                                    times: [0, 0.15, 0.25, 0.6, 0.875, 1],
                                    repeat: Infinity,
                                    ease: 'easeInOut'
                                }}
                            />
                        </motion.svg>

                        <p className="-z-50">.</p>
                    </footer>
                    <motion.div className="absolute inset-0 flex items-baseline justify-center pointer-events-none" style={{ opacity: aura }}>
                        <div className="w-full h-[150px] bg-white/6 rounded-full blur-3xl mb-20" />
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Hero