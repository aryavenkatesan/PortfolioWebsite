import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { MotionValue } from "framer-motion";

export function ProjectHeader() {
    const navigate = useNavigate();
    const { scrollY } = useScroll();

    const backgroundOpacity = useTransform(scrollY, [0, 160], [0, 0.72]);
    const overlayOpacity = useTransform(scrollY, [0, 160], [0.18, 0.42]);
    const borderOpacity = useTransform(scrollY, [0, 160], [0.12, 0.22]);
    const backgroundColor = useTransform(
        backgroundOpacity,
        (opacity) => `rgba(0, 0, 0, ${opacity})`
    );
    const borderBottom = useTransform(
        borderOpacity,
        (opacity) => `1px solid rgba(255, 255, 255, ${opacity})`
    );

    return (
        <motion.header
            className="fixed top-0 left-0 w-full z-20"
            style={{
                backgroundColor,
                borderBottom,
            }}
        >
            <motion.div
                className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/8 via-white/3 to-transparent backdrop-blur-sm"
                style={{ opacity: overlayOpacity }}
            />
            <div className="relative flex flex-row items-center justify-between px-4 sm:px-8 py-6 sm:py-8 text-white">
                <motion.img
                    src="/assets/AV_logo.png"
                    alt="AV Logo"
                    className="h-8 cursor-pointer"
                    onClick={() => navigate("/", { state: { backfromwork: true } })}
                    whileHover={{ scale: 1.05, opacity: 0.9 }}
                    transition={{ duration: 0.2 }}
                />

                <motion.button
                    whileHover={{ scale: 0.95, opacity: 0.85 }}
                    whileTap={{ scale: 1, opacity: 0.95 }}
                    onClick={() => navigate("/", { state: { backfromwork: true } })}
                    className="font-montserrat font-light"
                >
                    ← back
                </motion.button>
            </div>
        </motion.header>
    );
}

export function PageBottomGlow() {
    return (
        <motion.div
            className="pointer-events-none fixed bottom-0 left-0 right-0 z-10 h-52 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.05)_28%,rgba(255,255,255,0)_72%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
        />
    );
}

export function HeaderDivider({
    opacity,
    scaleX,
}: {
    opacity: MotionValue<number>;
    scaleX: MotionValue<number>;
}) {
    return (
        <motion.div
            className="fixed top-[5.5rem] lg:top-[7rem] left-0 right-0 z-20"
            style={{ opacity }}
        >
            <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />
            <motion.div
                className="relative h-px bg-gray-400 mx-2 lg:mx-5"
                style={{
                    scaleX,
                    transformOrigin: "center",
                }}
            />
        </motion.div>
    );
}
