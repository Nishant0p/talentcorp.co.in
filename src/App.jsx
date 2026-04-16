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

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <Routes location={location}>
          <Route key="home" path="/" element={<HomePage animateWords={!isLoading} />} />
          <Route key="job-detail" path="/job/:jobId" element={<JobDetailPage />} />
          <Route key="nats" path="/nats" element={<NatsLandingPage />} />
          <Route key="naps" path="/naps" element={<NapsPage />} />
          <Route key="bvoc" path="/bvoc" element={<BvocPage />} />
          <Route key="dvoc" path="/dvoc" element={<DvocPage />} />
          <Route key="flexi" path="/flexi-iti" element={<FlexiItiPage />} />
          <Route key="skilled" path="/skilled" element={<SkilledPage />} />
          <Route key="housekeeping" path="/housekeeping" element={<HousekeepingPage />} />
          <Route key="manpower" path="/manpower" element={<ManpowerPage />} />
          <Route key="payroll" path="/payroll" element={<PayrollPage />} />
          <Route key="contract" path="/contract" element={<ContractPage />} />
          <Route key="b2b" path="/b2b" element={<B2BPage />} />
          <Route key="security" path="/security" element={<SecurityPage />} />
          <Route key="maps" path="/maps" element={<MapsPage />} />
          <Route key="aedp" path="/aedp" element={<AedpPage />} />
          <Route key="client" path="/client" element={<ClientPage />} />
          <Route key="compliance" path="/compliance" element={<CompliancePage />} />
          <Route key="achievements" path="/achievements" element={<AchimentPage />} />
          <Route key="achiment" path="/achiment" element={<AchimentPage />} />
          <Route key="about" path="/about" element={<AboutPage />} />
          <Route key="jobs" path="/jobs" element={<JobsPage />} />
          <Route key="news-events" path="/news-events" element={<NewsEventsPage />} />
          <Route key="news-detail" path="/news-events/:newsId" element={<NewsDetailPage />} />
          <Route key="contact" path="/contact" element={<ContactUs />} />
          <Route key="contact-us" path="/contact-us" element={<ContactUs />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
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
