import React, { useEffect, useRef, useState } from 'react'

export default function RozgaarPreloader({ onFinish }) {
  const onFinishRef = useRef(onFinish)
  const [phase, setPhase] = useState('enter')

  useEffect(() => {
    onFinishRef.current = onFinish
  }, [onFinish])

  useEffect(() => {
    const enterTimer = window.setTimeout(() => {
      setPhase('drive')
    }, 40)

    const textTimer = window.setTimeout(() => {
      setPhase((currentPhase) => (currentPhase === 'exit' ? currentPhase : 'drive-text'))
    }, 1100)

    const exitTimer = window.setTimeout(() => {
      setPhase('exit')
    }, 3000)

    const finishTimer = window.setTimeout(() => {
      if (typeof onFinishRef.current === 'function') onFinishRef.current()
    }, 3650)

    return () => {
      window.clearTimeout(enterTimer)
      window.clearTimeout(textTimer)
      window.clearTimeout(exitTimer)
      window.clearTimeout(finishTimer)
    }
  }, [])

  const contentVisible = phase === 'drive-text' || phase === 'exit'
  const containerExit = phase === 'exit'
  const carDrive = phase === 'drive' || phase === 'drive-text'

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center overflow-hidden bg-white transition-transform duration-[650ms] ease-in-out ${
        containerExit ? '-translate-y-[110%]' : 'translate-y-0'
      }`}
    >
      <style>{`\n        @keyframes preloaderFloat {\n          from { transform: translateY(-50%) translateX(-50%) translateY(0); }\n          to { transform: translateY(-50%) translateX(-50%) translateY(-6px); }\n        }\n      `}</style>

      <div
        className={`absolute right-4 z-30 max-w-[90vw] text-right transition-all duration-700 ease-out sm:right-8 sm:max-w-xl lg:right-16 lg:max-w-lg ${
          contentVisible ? 'translate-y-0 opacity-100' : 'translate-y-11 opacity-0'
        }`}
      >
        <h1 className="text-4xl font-extrabold leading-tight text-blue-900 sm:text-5xl lg:text-6xl">
          ROZGAAR <span className="text-orange-600">YATRA</span>
        </h1>
        <div className="my-4 ml-auto h-2 w-32 bg-orange-500"></div>
        <p className="text-base font-medium text-gray-700 sm:text-lg lg:text-xl">
          Connecting multiple states, bringing job opportunities directly to the youth.
          Your journey toward a career starts here.
        </p>
      </div>

      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 z-20 w-[680px] transition-transform duration-[1500ms] ease-out will-change-transform ${
          carDrive ? 'translate-x-[-20vw] translate-y-[-50%]' : 'translate-x-[120vw] translate-y-[-50%]'
        }`}
        style={{ animation: 'preloaderFloat 0.9s ease-in-out infinite alternate' }}
      >
        <img
          src="/Rojgaar Yatra car.png"
          alt="Rozgaar Yatra Car"
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
