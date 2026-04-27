import Lenis from "lenis";
import { useEffect, useState, type ReactNode } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { SmoothScrollContext } from "../hooks/useSmoothScroll";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
    const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
    const [lenis, setLenis] = useState<Lenis | null>(null);

    useEffect(() => {
        if (prefersReducedMotion) {
            setLenis((current) => {
                current?.destroy();
                return null;
            });
            return;
        }

        const nextLenis = new Lenis({
            smoothWheel: true,
            easing: (t: number) => 1 - Math.pow(1 - t, 2),
        });

        let frameId = 0;
        const onFrame = (time: number) => {
            nextLenis.raf(time);
            frameId = window.requestAnimationFrame(onFrame);
        };

        setLenis(nextLenis);
        frameId = window.requestAnimationFrame(onFrame);

        return () => {
            window.cancelAnimationFrame(frameId);
            nextLenis.destroy();
            setLenis((current) => (current === nextLenis ? null : current));
        };
    }, [prefersReducedMotion]);

    return (
        <SmoothScrollContext.Provider value={lenis}>
            {children}
        </SmoothScrollContext.Provider>
    );
}
