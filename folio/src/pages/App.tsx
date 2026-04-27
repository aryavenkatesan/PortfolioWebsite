import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import MainPage from './MainPage'
import Cursor from '../components/Cursor'
import VDart from './VDart'
import Swipeshare from './Swipeshare'
import Scenic from './Scenic'
import Research from './Research'
import Portfolio from './Portfolio'
import Phizzicare from './Phizzicare'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { SmoothScrollProvider } from '../components/SmoothScrollProvider'

function AppRoutes() {
  const location = useLocation();
  const showCursor = useMediaQuery("(min-width: 1024px) and (pointer: fine)");

  return (
    <div className={`bg-black ${showCursor ? "cursor-none" : "cursor-auto"}`}>
      {showCursor && <Cursor />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<MainPage />} />
          <Route path="/Swipeshare" element={<Swipeshare />} />
          <Route path="/VDart" element={<VDart />} />
          <Route path="/Scenic" element={<Scenic />} />
          <Route path="/Research" element={<Research />} />
          <Route path="/Portfolio" element={<Portfolio />} />
          <Route path="/Phizzicare" element={<Phizzicare />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

function App() {
  return (
    <SmoothScrollProvider>
      <AppRoutes />
    </SmoothScrollProvider>
  )
}

export default App
