import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [hoverImage, setHoverImage] = useState<string | null>(null);
    const [isHoveringWork, setIsHoveringWork] = useState(false);

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });

            const target = e.target as HTMLElement;

            // Check for general clickable elements
            const isClickable = target.closest('a, button, [role="button"], input, textarea, select, [onClick], .cursor-pointer');
            setIsHovering(!!isClickable);

            // Check specifically for work items
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

        return () => {
            window.removeEventListener('mousemove', mouseMove);
        };
    }, []);

    return (
        <>
            {/* Main cursor */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
                animate={{
                    x: mousePosition.x - (isHovering ? 6 : 12),
                    y: mousePosition.y - (isHovering ? 6 : 12),
                    width: isHovering ? 12 : 24,
                    height: isHovering ? 12 : 24,
                    backgroundColor: isHovering ? '#343434' : '#ffffff',
                    mixBlendMode: isHovering ? 'normal' : 'difference',
                }}
                transition={{
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
                            x: mousePosition.x + 30, // Position to the right of cursor
                            y: mousePosition.y - 100, // Slightly above cursor
                        }}
                        exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        transition={{
                            type: "spring",
                            damping: 90,
                            stiffness: 300,
                            mass: 0.5,
                        }}
                    >
                        <div className="relative">
                            <img
                                src={hoverImage}
                                alt="Work preview"
                                className="w-64 h-40 object-cover rounded-lg shadow-2xl border-2 border-white/20"
                            />
                            {/* Optional: Add a subtle glow effect */}
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CustomCursor;