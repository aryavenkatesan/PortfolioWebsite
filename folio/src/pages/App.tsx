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
  useEffect(() => {
    const lenis = new Lenis();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, []);

  const sectionRef = useRef(null);

  // Track scroll progress of the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: dividerProgress } = useScroll({
    target: sectionRef,
    offset: ["start 20vh", "end start"]
  });
  const dividerOpacity = useTransform(dividerProgress, [0, 0.2], [0, 0.75]);
  const dividerScale = useTransform(dividerProgress, [0, 0.2], [0, 1], {
    ease: easeOut
  });


  // Transform scroll progress to different speeds
  // Beams move slower (30% of scroll speed)
  const beamsY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  // Content moves at normal speed
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 500]);



  return (
    <div className="bg-black cursor-none">
      <CustomCursor />
      {/* Fixed Header with Blur Effect */}
      <div className="fixed top-0 w-full z-30">
        {/* Blur layers */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent backdrop-blur-lg"></div>

        {/* Header Content */}
        <div className="relative">
          <Header />
        </div>
      </div>

      {/* Content Container */}
      <div className="pt-20">
        {/* First Section with Sticky Footer */}
        <section className="relative z-5">
          {/* <div className="min-h-[calc(150vh-5rem)]"> */}
          <div>
            <Hero />
          </div>
        </section>



        <motion.div
          className="sticky top-[7rem] z-30"
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

        {/* Second Section */}
        <section
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

        {/* Third Section */}
        <section className="mt-40">
          <Profile />
        </section>
      </div>
    </div>
  )
}

export default App
