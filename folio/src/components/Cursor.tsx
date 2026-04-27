import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [hoverImage, setHoverImage] = useState<string | null>(null);
    const [isHoveringWork, setIsHoveringWork] = useState(false);
    const isFinePointer = useMediaQuery("(pointer: fine)");
    const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
    const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight * 0.7 : 0);
    const smoothX = useSpring(mouseX, { damping: 30, stiffness: 320, mass: 0.25 });
    const smoothY = useSpring(mouseY, { damping: 30, stiffness: 320, mass: 0.25 });
    const previewX = useSpring(mouseX, { damping: 36, stiffness: 220, mass: 0.35 });
    const previewY = useSpring(mouseY, { damping: 36, stiffness: 220, mass: 0.35 });
    const pointerRef = useRef({ x: mouseX.get(), y: mouseY.get() });

    const mainCursorAnimate = useMemo(
        () => ({
            opacity: 1,
            width: isHovering ? 12 : 24,
            height: isHovering ? 12 : 24,
            backgroundColor: isHovering ? '#343434' : '#eeeeee',
            mixBlendMode: isHovering ? 'normal' as const : 'difference' as const,
        }),
        [isHovering]
    );

    useEffect(() => {
        if (!isFinePointer) {
            return;
        }

        document.documentElement.classList.add("cursor-none");

        return () => {
            document.documentElement.classList.remove("cursor-none");
        };
    }, [isFinePointer]);

    useEffect(() => {
        if (!isFinePointer) {
            return;
        }

        const updateHoverState = (target: HTMLElement | null) => {
            const isClickable = target?.closest(
                'a, button, [role="button"], input, textarea, select, [onClick], .cursor-pointer'
            );
            setIsHovering(Boolean(isClickable));

            const workElement = target?.closest('[data-cursor-hover="work"]');
            if (workElement) {
                const imageUrl = workElement.getAttribute('data-cursor-image');
                setHoverImage(imageUrl);
                setIsHoveringWork(Boolean(imageUrl));
                return;
            }

            setHoverImage(null);
            setIsHoveringWork(false);
        };

        const mouseMove = (e: MouseEvent) => {
            pointerRef.current = { x: e.clientX, y: e.clientY };
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            updateHoverState(e.target as HTMLElement);
        };

        const handleViewportChange = () => {
            const element = document.elementFromPoint(pointerRef.current.x, pointerRef.current.y) as HTMLElement | null;
            updateHoverState(element);
        };

        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('scroll', handleViewportChange, { passive: true });

        return () => {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('scroll', handleViewportChange);
        };
    }, [isFinePointer, mouseX, mouseY]);

    if (!isFinePointer) {
        return null;
    }

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
                initial={{ opacity: 0 }}
                animate={mainCursorAnimate}
                transition={{
                    opacity: { duration: 1.2, ease: 'easeIn' },
                    width: { duration: 0.18 },
                    height: { duration: 0.18 },
                    backgroundColor: { duration: 0.18 },
                }}
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: isHovering ? -6 : -12,
                    translateY: isHovering ? -6 : -12,
                }}
            />

            <AnimatePresence>
                {isHoveringWork && hoverImage && (
                    <motion.div
                        className="fixed pointer-events-none z-40"
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        transition={{
                            type: "spring",
                            damping: 135,
                            stiffness: 300,
                            mass: 0.5,
                        }}
                        style={{
                            x: previewX,
                            y: previewY,
                            translateX: 30,
                            translateY: "-40%",
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
