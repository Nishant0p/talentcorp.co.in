import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function RozgaarPreloader({ onFinish }) {
  const [carLoaded, setCarLoaded] = useState(false)
  const carRef = useRef(null)
  const contentRef = useRef(null)
  const containerRef = useRef(null)
  const onFinishRef = useRef(onFinish)

  // Keep the ref up-to-date without re-running the effect
  useEffect(() => {
    onFinishRef.current = onFinish
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(containerRef.current, { opacity: 1, yPercent: 0 })
      gsap.set(contentRef.current, { x: 0, y: 44, opacity: 0 })
      // Car starts off-screen right; xPercent -50 keeps its own centre as the anchor
      gsap.set(carRef.current, { xPercent: -50, yPercent: -50, x: '120vw', y: 0 })

      let idleTween = null

      const introTl = gsap.timeline({
        onComplete: () => {
          idleTween = gsap.to(carRef.current, {
            y: -6,
            duration: 0.9,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            force3D: true,
          })
        }
      })

      // Car sweeps all the way to the left third so the right side is clear for text
      introTl.to(carRef.current, {
        x: '-20vw',
        duration: 1.5,
        ease: 'power2.out',
      })

      // Text reveals only after car has moved past centre (>1.1 s into the drive)
      introTl.to(
        contentRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
        },
        1.1  // start fading in text once car is well past centre
      )

      // EXIT: move the car left once, reveal the text, then lift the overlay away.
      const handleExit = () => {
        if (idleTween) {
          idleTween.kill()
          idleTween = null
        }
        const exitTl = gsap.timeline()

        // Main car moves to far left in a single pass.
        exitTl.to(carRef.current, {
          y: 0,
          x: '-120vw',
          duration: 1.25,
          ease: 'power4.inOut',
          overwrite: 'auto',
        })

        // Keep info visible briefly before switching to the hero page.
        exitTl.to(containerRef.current, {
          opacity: 1,
          duration: 0.9,
          ease: 'none',
        })

        // Complete preloader by sliding the whole overlay upward.
        exitTl.to(containerRef.current, {
          yPercent: -110,
          duration: 0.65,
          ease: 'power3.inOut',
        })

        exitTl.call(() => {
          if (typeof onFinishRef.current === 'function') onFinishRef.current()
        })
      }

      const timer = setTimeout(handleExit, 3000)
      return () => clearTimeout(timer)
    }, containerRef)

    return () => ctx.revert()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // run once only — onFinish is accessed via ref

  return (
    <div ref={containerRef} className="fixed inset-0 z-[999] flex items-center overflow-hidden bg-white">
      <div ref={contentRef} className="absolute right-4 z-30 max-w-[90vw] text-right opacity-0 will-change-transform sm:right-8 sm:max-w-xl lg:right-16 lg:max-w-lg">
        <h1 className="text-4xl font-extrabold leading-tight text-blue-900 sm:text-5xl lg:text-6xl">
          ROZGAAR <span className="text-orange-600">YATRA</span>
        </h1>
        <div className="my-4 ml-auto h-2 w-32 bg-orange-500"></div>
        <p className="text-base font-medium text-gray-700 sm:text-lg lg:text-xl">
          Connecting multiple states, bringing job opportunities directly to the youth.
          Your journey toward a career starts here.
        </p>
      </div>

      <div ref={carRef} className="pointer-events-none absolute left-1/2 top-1/2 z-20 w-[680px] will-change-transform">
        <img
          ref={(el) => {
            if (el && el.complete && !carLoaded) {
              setTimeout(() => setCarLoaded(true), 0);
            }
          }}
          src="/Rojgaar Yatra car.png"
          alt="Rozgaar Yatra Car"
          onLoad={() => setCarLoaded(true)}
          style={{
            filter: carLoaded ? 'none' : 'blur(8px)',
            opacity: carLoaded ? 1 : 0.5,
            transform: carLoaded ? 'scale(1)' : 'scale(0.99)',
            transition: 'filter 1s ease-out, opacity 1s ease-out, transform 1s ease-out'
          }}
          className="h-auto w-full transform-gpu drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]"
        />
        <div className="absolute bottom-[-10px] left-[10%] h-[20px] w-[80%] rounded-[100%] bg-black/10 blur-xl"></div>
      </div>

      <div className="absolute bottom-10 right-10 flex items-center gap-3">
        <div className="h-3 w-3 animate-pulse rounded-full bg-blue-600"></div>
        <span className="text-sm font-bold uppercase tracking-widest text-gray-400">Mapping Career Routes...</span>
      </div>
    </div>
  )
}
