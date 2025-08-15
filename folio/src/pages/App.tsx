'use client'

import { useEffect, useRef } from "react"
import Beams from "../components/Beams"
import Header from "../components/Header"
import Profile from "../components/Profile"
import Works from "../components/Works"
import Lenis from "lenis"
import Hero from "../components/Hero"
import { easeOut, motion, useScroll, useTransform } from "framer-motion"
import CustomCursor from "../components/Cursor"

function App() {
  // Store Lenis instance in ref so Header can access it
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      // duration: 1, // Smooth scroll duration
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // Custom easing
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  // Scroll to section function that Header can use
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element && lenisRef.current) {
      let offset;
      switch (sectionId) {
        case 'home':
          offset = 120;
          break;
        case 'work':
          offset = -250; // Scroll past the work section start
          break;
        case 'about':
          offset = 120;
          break;
        default:
          offset = 120;
      }
      const elementPosition = element.offsetTop - offset;

      lenisRef.current.scrollTo(elementPosition, {
        duration: 1.7,
        easing: (t: number) => 1 - Math.pow(1 - t, 3) // easeOutCubic
      });
    }
  };

  const sectionRef = useRef(null);

  // Track scroll progress of the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: dividerProgress } = useScroll({
    target: sectionRef,
    offset: ["start 50vh", "end start"]
  });
  const dividerOpacity = useTransform(dividerProgress, [0, 0.2], [0, 0.75]);
  const dividerScale = useTransform(dividerProgress, [0, 0.2], [0, 1], {
    ease: easeOut
  });

  // Transform scroll progress to different speeds
  const beamsY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 500]);

  return (
    <div className="bg-black cursor-none">
      <CustomCursor />
      {/* Fixed Header with Blur Effect */}
      <div className="fixed top-0 w-full z-30">
        {/* Blur layers */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent backdrop-blur-lg"></div>

        {/* Header Content - Pass scrollToSection function */}
        <div className="relative">
          <Header scrollToSection={scrollToSection} />
        </div>
      </div>

      {/* Content Container */}
      <div className="pt-20">
        {/* First Section - HOME */}
        <section id="home" className="relative z-5 min-h-screen">
          <div>
            <Hero />
          </div>
        </section>

        <motion.div
          className="fixed top-[7rem] left-0 right-0 z-30"
          style={{ opacity: dividerOpacity }}
        >
          {/* Blur for divider too */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xl"></div>
          <motion.div
            className="relative h-px bg-gray-400 mx-5"
            style={{
              scaleX: dividerScale,
              transformOrigin: "center"
            }}
          />
        </motion.div>

        {/* Second Section - WORK */}
        <section
          id="work"
          ref={sectionRef}
          className="min-h-[calc(220vh-5rem)] pt-40 relative overflow-hidden">
          {/* Beams Background */}
          <motion.div
            style={{ y: beamsY }}
            className="absolute top-0 left-0 right-0 bottom-0 opacity-60 bg-black z-10">
            <Beams
              beamWidth={2}
              beamHeight={60}
              beamNumber={20}
              lightColor="#cdcdcd"
              speed={3}
              noiseIntensity={1.75}
              scale={0.2}
              rotation={30}
            />

            {/* Gradient overlays to fade beams into black background */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Top gradient */}
              <div className="absolute top-0 left-0 right-0 h-100 bg-gradient-to-b from-black to-transparent"></div>
              {/* Bottom gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent"></div>
            </div>
          </motion.div>

          {/* Works Content */}
          <motion.div
            className="relative z-10"
            style={{ y: contentY }}
          >
            <Works />
          </motion.div>
        </section>

        {/* Third Section - ABOUT */}
        <section id="about" className="mt-40">
          <Profile />
        </section>
      </div>
    </div>
  )
}

export default App