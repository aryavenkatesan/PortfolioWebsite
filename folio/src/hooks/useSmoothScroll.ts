import { createContext, useContext } from "react";
import type Lenis from "lenis";

export const SmoothScrollContext = createContext<Lenis | null>(null);

export function useSmoothScroll() {
    return useContext(SmoothScrollContext);
}
