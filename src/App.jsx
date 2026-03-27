import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import JobDetailPage from './pages/JobDetailPage'

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
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
