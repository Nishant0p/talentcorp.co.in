import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import JobDetailPage from './pages/JobDetailPage'
import ContactUs from './pages/contactus'
import NewsEventsPage from './pages/NewsEventsPage'
import NatsLandingPage from './pages/nats'
import NapsPage from './pages/naps'
import BvocPage from './pages/bvoc'
import DvocPage from './pages/dvoc'
import FlexiItiPage from './pages/FLEXI'
import SkilledPage from './pages/skilled'
import AboutPage from './pages/about'
import HousekeepingPage from './pages/housekeeping'
import ManpowerPage from './pages/manpower'

const PRELOADER_DURATION_MS = 2800

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false)
    }, PRELOADER_DURATION_MS)

    return () => window.clearTimeout(timer)
  }, [])

  return (
    <BrowserRouter>
      <div className="page-shell">
        {isLoading && (
          <div className="preloader" role="status" aria-label="Loading TSPL website">
            <div className="preloader-layer preloader-layer--orange" aria-hidden="true" />
            <div className="preloader-layer preloader-layer--blue" aria-hidden="true" />
            <div className="preloader-layer preloader-layer--white">
              <img
                src="/TSPL Logo preloader.png"
                alt="TSPL logo"
                className="preloader-logo"
              />
            </div>
          </div>
        )}

        <main className={`home ${isLoading ? 'home--hidden' : ''}`}>
          <Routes>
            <Route path="/" element={<HomePage animateWords={!isLoading} />} />
            <Route path="/job/:jobId" element={<JobDetailPage />} />
            <Route path="/nats" element={<NatsLandingPage />} />
            <Route path="/naps" element={<NapsPage />} />
            <Route path="/bvoc" element={<BvocPage />} />
            <Route path="/dvoc" element={<DvocPage />} />
            <Route path="/flexi-iti" element={<FlexiItiPage />} />
            <Route path="/skilled" element={<SkilledPage />} />
            <Route path="/housekeeping" element={<HousekeepingPage />} />
            <Route path="/manpower" element={<ManpowerPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/news-events" element={<NewsEventsPage />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
