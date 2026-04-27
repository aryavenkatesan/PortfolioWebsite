import { useMemo } from "react";
import { useMediaQuery } from "./useMediaQuery";

export type PerformanceTier = "high" | "balanced" | "low";

export function usePerformanceTier(): PerformanceTier {
    const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
    const hasCoarsePointer = useMediaQuery("(pointer: coarse)");

    return useMemo(() => {
        if (prefersReducedMotion || hasCoarsePointer) {
            return "low";
        }

        if (typeof navigator === "undefined") {
            return "balanced";
        }

        const hardwareConcurrency = navigator.hardwareConcurrency ?? 4;
        const deviceMemory = "deviceMemory" in navigator
            ? Number((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4)
            : 4;

        if (hardwareConcurrency <= 4 || deviceMemory <= 4) {
            return "low";
        }

        if (hardwareConcurrency >= 8 && deviceMemory >= 8) {
            return "high";
        }

        return "balanced";
    }, [hasCoarsePointer, prefersReducedMotion]);
}
