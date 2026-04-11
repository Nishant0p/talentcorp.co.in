import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import JobBoard from '../components/JobBoard';
import Navbar from '../components/Navbar';
import CompanyMarquee from '../components/CompanyMarquee';
import StrengthsAccordion from '../components/StrengthsAccordion';
import WorkforceSection from '../components/WorkforceSection';
import NewsSection from '../components/NewsSection';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';

export default function HomePage() {
  const navigate = useNavigate();
  const [transition, setTransition] = React.useState(null);

  const startWhirlpool = React.useCallback((action, event) => {
    const x = event?.clientX ?? window.innerWidth / 2;
    const y = event?.clientY ?? window.innerHeight / 2;
    const maxRadius = Math.hypot(window.innerWidth, window.innerHeight);
    const baseSize = 32;
    const maxScale = (maxRadius * 2) / baseSize;

    setTransition({
      action,
      phase: 'expand',
      x,
      y,
      maxRadius,
      maxScale,
      tone: action === 'jobs' ? 'orange' : 'white',
    });
  }, []);

  const onOverlayExpandComplete = React.useCallback(() => {
    setTransition((current) => {
      if (!current || current.phase !== 'expand') return current;

      if (current.action === 'jobs') {
        const el = document.getElementById('open-jobs');
        if (el) {
          el.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
        return { ...current, phase: 'fade' };
      }

      navigate('/b2b');
      return current;
    });
  }, [navigate]);

  const onOverlayFadeComplete = React.useCallback(() => {
    setTransition(null);
  }, []);

  return (
    <div className="relative">
      <Navbar />
      <HeroSection
        onFindJobs={(e) => startWhirlpool('jobs', e)}
        onHireTalent={(e) => startWhirlpool('hire', e)}
      />

      <CompanyMarquee />

      <WorkforceSection />

      <StrengthsAccordion />

      <section id="open-jobs" className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Open Jobs</h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Browse current openings and apply in minutes.
          </p>
          <div className="mt-8">
            <JobBoard />
          </div>
        </div>
      </section>

      <NewsSection />

      <Testimonials />

      <FAQSection />

      <Footer />

      <AnimatePresence>
        {transition && (
          <div key="whirlpool" className="pointer-events-none fixed inset-0 z-[9999]">
            <div
              className="absolute"
              style={{
                left: transition.x,
                top: transition.y,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <motion.div
                className="h-8 w-8 rounded-full will-change-transform"
                initial={{
                  scale: 0,
                  rotate: 0,
                  opacity: 1,
                }}
                animate={
                  transition.phase === 'expand'
                    ? {
                        scale: transition.maxScale,
                        rotate: transition.tone === 'orange' ? 12 : 8,
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                      }
                }
                exit={{ opacity: 0 }}
                transition={
                  transition.phase === 'expand'
                    ? { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
                    : { duration: 0.35, ease: 'easeOut' }
                }
                onAnimationComplete={() => {
                  if (transition.phase === 'expand') onOverlayExpandComplete();
                  if (transition.phase === 'fade') onOverlayFadeComplete();
                }}
                style={{
                  background:
                    transition.tone === 'orange'
                      ? 'radial-gradient(circle at center, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.02) 45%, rgba(0,0,0,0) 70%), linear-gradient(135deg, rgba(249,115,22,1) 0%, rgba(234,88,12,1) 55%, rgba(249,115,22,1) 100%)'
                      : 'radial-gradient(circle at center, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.01) 45%, rgba(0,0,0,0) 70%), linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(248,250,252,1) 55%, rgba(255,255,255,1) 100%)',
                  filter: transition.tone === 'orange' ? 'saturate(1.08)' : 'none',
                }}
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
