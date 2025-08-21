import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({
        // start in the middle of viewport
        x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
        y: typeof window !== "undefined" ? window.innerHeight * 0.7 : 0,
    });
    const [isHovering, setIsHovering] = useState(false);
    const [hoverImage, setHoverImage] = useState<string | null>(null);
    const [isHoveringWork, setIsHoveringWork] = useState(false);
    const [hasMounted, setHasMounted] = useState(false); // to control fade-in once

    useEffect(() => {
        setHasMounted(true); // trigger fade-in when component mounts
    }, []);

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });

            const target = e.target as HTMLElement;

            // Check clickable
            const isClickable = target.closest(
                'a, button, [role="button"], input, textarea, select, [onClick], .cursor-pointer'
            );
            setIsHovering(!!isClickable);

            // Work preview
            const workElement = target.closest('[data-cursor-hover="work"]');
            if (workElement) {
                const imageUrl = workElement.getAttribute('data-cursor-image');
                setHoverImage(imageUrl);
                setIsHoveringWork(true);
            } else {
                setHoverImage(null);
                setIsHoveringWork(false);
            }
        };

        window.addEventListener('mousemove', mouseMove);
        return () => window.removeEventListener('mousemove', mouseMove);
    }, []);

    // Timer: refresh hover state even when scrolling without moving mouse
    useEffect(() => {
        const interval = setInterval(() => {
            const elem = document.elementFromPoint(mousePosition.x, mousePosition.y) as HTMLElement | null;
            if (elem) {
                const isClickable = elem.closest(
                    'a, button, [role="button"], input, textarea, select, [onClick], .cursor-pointer'
                );
                setIsHovering(!!isClickable);

                const workElement = elem.closest('[data-cursor-hover="work"]');
                if (workElement) {
                    const imageUrl = workElement.getAttribute('data-cursor-image');
                    setHoverImage(imageUrl);
                    setIsHoveringWork(true);
                    return;
                }
            }
            setHoverImage(null);
            setIsHoveringWork(false);
        }, 200);

        return () => clearInterval(interval);
    }, [mousePosition]);

    return (
        <>
            {/* Main cursor */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
                initial={{ opacity: 0 }} // fade in from invisible
                animate={{
                    opacity: hasMounted ? 1 : 0,
                    x: mousePosition.x - (isHovering ? 6 : 12),
                    y: mousePosition.y - (isHovering ? 6 : 12),
                    width: isHovering ? 12 : 24,
                    height: isHovering ? 12 : 24,
                    backgroundColor: isHovering ? '#343434' : '#eeeeee',
                    mixBlendMode: isHovering ? 'normal' : 'difference',
                }}
                transition={{
                    opacity: { duration: 2.5, ease: 'easeIn' }, // smooth fade in once
                    type: "spring",
                    damping: isHovering ? 100 : 40,
                    stiffness: isHovering ? 300 : 200,
                    mass: 0.5,
                }}
            />

            {/* Image follower */}
            <AnimatePresence>
                {isHoveringWork && hoverImage && (
                    <motion.div
                        className="fixed pointer-events-none z-40"
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            rotate: 0,
                            x: mousePosition.x + 30,
                            y: mousePosition.y,
                        }}
                        exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        transition={{
                            type: "spring",
                            damping: 90,
                            stiffness: 300,
                            mass: 0.5,
                        }}
                        style={{
                            translateY: "-40%",  // <-- centers vertically on cursor line
                        }}
                    >
                        <div className="relative">
                            <img
                                src={hoverImage}
                                alt="Work preview"
                                className="max-w-[20rem] max-h-[20rem] object-contain rounded-lg shadow-2xl border-4 border-white/20"
                            />
                            {/* Subtle overlay */}
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CustomCursor;