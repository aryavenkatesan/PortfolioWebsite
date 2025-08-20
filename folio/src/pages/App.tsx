import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import MainPage from './MainPage'
import Cursor from '../components/Cursor'
import VDart from '../components/VDart'

function AppRoutes() {
  const location = useLocation();

  return (
    <div className="bg-black cursor-none">
      <Cursor />
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