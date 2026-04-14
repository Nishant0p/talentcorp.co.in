import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import './App.css'
import GlobalTextureOverlay from './components/GlobalTextureOverlay'
const HomePage = lazy(() => import('./pages/HomePage'))
const JobDetailPage = lazy(() => import('./pages/JobDetailPage'))
const ContactUs = lazy(() => import('./pages/contactus'))
const NewsEventsPage = lazy(() => import('./pages/NewsEventsPage'))
const NatsLandingPage = lazy(() => import('./pages/nats'))
const NapsPage = lazy(() => import('./pages/naps'))
const BvocPage = lazy(() => import('./pages/bvoc'))
const DvocPage = lazy(() => import('./pages/dvoc'))
const FlexiItiPage = lazy(() => import('./pages/FLEXI'))
const SkilledPage = lazy(() => import('./pages/skilled'))
const AboutPage = lazy(() => import('./pages/about'))
const HousekeepingPage = lazy(() => import('./pages/housekeeping'))
const ManpowerPage = lazy(() => import('./pages/manpower'))
const PayrollPage = lazy(() => import('./pages/payroll'))
const ContractPage = lazy(() => import('./pages/contract'))
const B2BPage = lazy(() => import('./pages/b2b'))
const ClientPage = lazy(() => import('./pages/client'))
const CompliancePage = lazy(() => import('./pages/Compliance'))
const SecurityPage = lazy(() => import('./pages/security'))
const MapsPage = lazy(() => import('./pages/MAPS'))
const AedpPage = lazy(() => import('./pages/AEDP'))
const AchimentPage = lazy(() => import('./pages/achiment'))
const JobsPage = lazy(() => import('./pages/jobs'))
const NewsDetailPage = lazy(() => import('./pages/news/NewsDetailPage'))

const PRELOADER_DURATION_MS = 2800

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

function PageLoader({ showLogo = false }) {
  return (
    <div className="page-transition-overlay" role="status" aria-label="Loading page">
      <div className="preloader-layer preloader-layer--orange route-preloader-layer--orange" aria-hidden="true" />
      <div className="preloader-layer preloader-layer--blue route-preloader-layer--blue" aria-hidden="true" />
      <div className="preloader-layer preloader-layer--white route-preloader-layer--white" aria-hidden="true">
        {showLogo ? (
          <img
            src="/TSPL Logo preloader.png"
            alt="TSPL logo"
            className="preloader-logo route-preloader-logo"
          />
        ) : null}
      </div>
    </div>
  )
}

function AnimatedRoutes({ isLoading }) {
  const location = useLocation()
  const hasAnimatedInitialRoute = useRef(false)
  const [isPageTransitioning, setIsPageTransitioning] = useState(false)
  const showLogo = location.pathname === '/'

  useEffect(() => {
    if (isLoading) return

    if (!hasAnimatedInitialRoute.current) {
      hasAnimatedInitialRoute.current = true
      return
    }

    setIsPageTransitioning(true)
    const timer = window.setTimeout(() => {
      setIsPageTransitioning(false)
    }, 760)

    return () => window.clearTimeout(timer)
  }, [location.pathname, isLoading])

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {isPageTransitioning && (
          <motion.div
            key={`page-transition-${location.pathname}`}
            className="page-transition-overlay"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.26, ease: 'easeOut' }}
            aria-hidden="true"
          >
            <div className="preloader-layer preloader-layer--orange route-preloader-layer--orange" />
            <div className="preloader-layer preloader-layer--blue route-preloader-layer--blue" />
            <div className="preloader-layer preloader-layer--white route-preloader-layer--white">
              {showLogo ? (
                <img
                  src="/TSPL Logo preloader.png"
                  alt="TSPL logo"
                  className="preloader-logo route-preloader-logo"
                />
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 22, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -18, scale: 0.995 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
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
            <Route path="/payroll" element={<PayrollPage />} />
            <Route path="/contract" element={<ContractPage />} />
            <Route path="/b2b" element={<B2BPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/maps" element={<MapsPage />} />
            <Route path="/aedp" element={<AedpPage />} />
            <Route path="/client" element={<ClientPage />} />
            <Route path="/compliance" element={<CompliancePage />} />
            <Route path="/achievements" element={<AchimentPage />} />
            <Route path="/achiment" element={<AchimentPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/news-events" element={<NewsEventsPage />} />
            <Route path="/news-events/:newsId" element={<NewsDetailPage />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

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
      <ScrollToTop />
      <div className="page-shell">
        <GlobalTextureOverlay />
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
          <Suspense fallback={<PageLoader />}>
            <AnimatedRoutes isLoading={isLoading} />
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
