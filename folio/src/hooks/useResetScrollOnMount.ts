import { useEffect } from "react";
import { useSmoothScroll } from "./useSmoothScroll";

export function useResetScrollOnMount() {
    const lenis = useSmoothScroll();

    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
            return;
        }

        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, [lenis]);
}
