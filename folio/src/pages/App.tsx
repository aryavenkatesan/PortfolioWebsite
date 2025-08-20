import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import MainPage from './MainPage'
import Cursor from '../components/Cursor'
import VDart from '../components/VDart'
import { useEffect, useState } from 'react'

function AppRoutes() {
  const location = useLocation();
  const [showCursor, setShowCursor] = useState<boolean>(false);

  useEffect(() => {
    // Function to check viewport
    const checkIsDesktop = () => {
      setShowCursor(window.innerWidth >= 1024); // >= 1024px = desktop (Tailwind 'lg')
    };

    // Run on mount
    checkIsDesktop();
    // Run on resize
    window.addEventListener("resize", checkIsDesktop);

    return () => {
      window.removeEventListener("resize", checkIsDesktop);
    };
  }, []);

  return (
    <div className={`bg-black ${showCursor ? "cursor-none" : "cursor-auto"}`}>
      {showCursor && <Cursor />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<MainPage />} />
          <Route path="/VDart" element={<VDart />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

function App() {
  return <AppRoutes />
}

export default App