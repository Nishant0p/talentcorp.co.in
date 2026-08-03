import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Cake, ArrowLeft, Sparkles } from 'lucide-react';
import { fetchSingleType, extractMediaUrl } from '../utils/strapi';

// Upgraded Canvas Confetti Popper
const FullPageConfetti = ({ active, onClose }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = ['#f7d54b', '#ff6b6b', '#4dadf7', '#33d9b2', '#ff9f43', '#a55eea'];
    const particles = [];
    const particleCount = 200;

    // Spawn from bottom corners shooting up and inwards
    for (let i = 0; i < particleCount; i++) {
      const isLeft = i < particleCount / 2;
      const angle = isLeft 
        ? (Math.random() * 45 + 30) * Math.PI / 180 
        : (Math.random() * 45 + 105) * Math.PI / 180;
      
      const speed = Math.random() * 28 + 15;

      particles.push({
        x: isLeft ? 0 : canvas.width,
        y: canvas.height,
        vx: Math.cos(angle) * speed * (isLeft ? 1 : -1),
        vy: -Math.sin(angle) * speed,
        r: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 12 - 6,
        tiltAngleIncremental: Math.random() * 0.1 + 0.05,
        tiltAngle: 0,
        opacity: 1,
      });
    }

    let framesElapsed = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let activeParticles = 0;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.45; // gravity
        p.vx *= 0.98; // air resistance
        p.vy *= 0.98;

        p.tiltAngle += p.tiltAngleIncremental;
        p.tilt = Math.sin(p.tiltAngle) * 12;

        if (p.vy > 0 && p.y > canvas.height * 0.4) {
          p.opacity -= 0.012;
        }

        if (p.opacity > 0 && p.y <= canvas.height && p.x >= 0 && p.x <= canvas.width) {
          activeParticles++;
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.beginPath();
          ctx.lineWidth = p.r;
          ctx.strokeStyle = p.color;
          ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
          ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
          ctx.stroke();
          ctx.restore();
        }
      });

      framesElapsed++;
      if (activeParticles === 0 || framesElapsed > 300) {
        cancelAnimationFrame(animationFrameId);
        onClose();
      } else {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [active, onClose]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
};

// CSS Balloons Component
const FloatingBalloons = () => {
  const [balloons, setBalloons] = useState([]);

  useEffect(() => {
    const balloonColors = ['#ff7675', '#74b9ff', '#55efc4', '#ffeaa7', '#a29bfe', '#fd79a8', '#ffb8b8'];
    const list = [];
    for (let i = 0; i < 22; i++) {
      list.push({
        id: i,
        left: Math.random() * 95, // horizontal percentage position
        color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
        delay: Math.random() * 8, // staggered animation starts
        speed: Math.random() * 6 + 10, // speed variations
        size: Math.random() * 20 + 40, // width size
      });
    }
    setBalloons(list);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 select-none">
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(115vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-15vh) translateX(15px) rotate(15deg);
            opacity: 0;
          }
        }
        .balloon-node {
          position: absolute;
          border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
          animation: float-up 14s linear infinite;
        }
        .balloon-node::before {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 45%;
          width: 8px;
          height: 6px;
          background: inherit;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        .balloon-node::after {
          content: '';
          position: absolute;
          bottom: -20px;
          left: 49%;
          width: 1.5px;
          height: 18px;
          background: rgba(255, 255, 255, 0.35);
        }
      `}</style>
      {balloons.map((b) => (
        <div
          key={b.id}
          className="balloon-node"
          style={{
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size * 1.3}px`,
            backgroundColor: b.color,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.speed}s`,
            boxShadow: 'inset -5px -5px 15px rgba(0,0,0,0.18), 3px 3px 8px rgba(0,0,0,0.15)',
          }}
        />
      ))}
    </div>
  );
};

const BirthdayCardPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // State variables for details
  const [name, setName] = useState('Pooja Ingle');
  const [role, setRole] = useState('HR Recruiter');
  const [message, setMessage] = useState(
    'Join us in wishing a very Happy Birthday to our HR Recruiter, Pooja Ingle! We wish you continued growth, great success, and lasting happiness.'
  );
  const [image, setImage] = useState(
    'https://backend.tsplgroup.in/uploads/Whats_App_Image_2026_08_01_at_16_04_27_f763ed2bcf.jpeg'
  );

  const [confettiActive, setConfettiActive] = useState(false);
  const [loading, setLoading] = useState(true);

  // Trigger confetti popper
  const triggerPopper = () => {
    setConfettiActive(false);
    setTimeout(() => setConfettiActive(true), 50);
  };

  useEffect(() => {
    const initData = async () => {
      // 1. Try to read from query params
      const qName = searchParams.get('name');
      const qRole = searchParams.get('role');
      const qMsg = searchParams.get('msg');
      const qImg = searchParams.get('image');

      if (qName || qRole || qMsg || qImg) {
        if (qName) setName(qName);
        if (qRole) setRole(qRole);
        if (qMsg) setMessage(qMsg);
        if (qImg) setImage(qImg);
        setLoading(false);
        triggerPopper();
      } else {
        // 2. Query Strapi active spotlight if no params
        try {
          const data = await fetchSingleType(
            '/api/news-events-page?populate[birthdaySpotlight][populate]=image'
          );
          if (data && data.birthdaySpotlight) {
            const b = data.birthdaySpotlight;
            if (b.name) setName(b.name);
            if (b.role) setRole(b.role);
            if (b.message) setMessage(b.message);
            if (b.image) {
              const url = extractMediaUrl(b.image);
              if (url) setImage(url);
            }
          }
        } catch (err) {
          console.warn('Failed to load Strapi birthday spotlight, using fallbacks:', err);
        } finally {
          setLoading(false);
          triggerPopper();
        }
      }
    };

    initData();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1236] flex items-center justify-center text-white font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#f7d54b] border-t-transparent rounded-full animate-spin" />
          <p className="text-lg tracking-widest font-bold text-slate-300">Unwrapping Birthday Wishes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#060920] flex items-center justify-center py-16 px-4 overflow-hidden font-sans select-none">
      {/* Background visual texture overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950 to-black z-0 pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#f7d54b]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Balloons overlay */}
      <FloatingBalloons />

      {/* Canvas Popper */}
      <FullPageConfetti active={confettiActive} onClose={() => setConfettiActive(false)} />

      {/* Back Button */}
      <button
        onClick={() => navigate('/news-events')}
        className="absolute top-6 left-6 z-30 flex items-center gap-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 py-2.5 px-5 rounded-xl transition-all cursor-pointer font-semibold shadow-md"
      >
        <ArrowLeft size={18} />
        Back to TSPL
      </button>

      {/* Main card wrapper */}
      <div className="relative z-20 w-full max-w-5xl bg-slate-900/50 backdrop-blur-md rounded-3xl border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.6)] overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
        
        {/* Split Screen Grid */}
        <div className="flex flex-col lg:flex-row items-center justify-between">
          
          {/* Left Side: Greeting Details */}
          <div className="flex-1 p-8 sm:p-12 lg:p-16 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* Animated Birthday badge */}
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f7d54b]/15 text-[#f7d54b] text-xs sm:text-sm font-bold uppercase tracking-wider mb-6 animate-pulse">
              <Cake size={16} /> Happy Birthday
            </span>

            {/* Glowing Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-2 leading-none">
              HAPPY
            </h1>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#f7d54b] mb-6 leading-none drop-shadow-[0_2px_15px_rgba(247,213,75,0.2)]">
              BIRTHDAY!
            </h1>

            {/* Wishes Description */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed mb-8">
              {message}
            </p>

            {/* Interaction Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full">
              <a
                href={`mailto:?subject=Happy Birthday ${name}!&body=Dear ${name}, wishing you a very Happy Birthday!`}
                className="w-full sm:w-auto text-center bg-[#f7d54b] text-[#0d1236] font-bold py-3.5 px-8 rounded-xl transition-all duration-300 hover:bg-white hover:text-[#0d1236] shadow-lg hover:shadow-[#f7d54b]/10 cursor-pointer text-sm sm:text-base text-black"
              >
                Celebrate & Wish
              </a>
              <button
                onClick={triggerPopper}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 cursor-pointer text-sm sm:text-base"
              >
                <Sparkles size={16} className="text-[#f7d54b] animate-bounce" />
                Pop Confetti Again
              </button>
            </div>

          </div>

          {/* Right Side: High Quality poster wrapper */}
          <div className="flex-1 w-full p-8 lg:p-12 flex justify-center items-center bg-slate-950/20 lg:border-l border-white/5">
            <div className="relative group max-w-[420px] sm:max-w-[460px] w-full">
              {/* Outer soft glowing halo border */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#f7d54b] to-indigo-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500 pointer-events-none" />
              
              <img
                src={image}
                alt={`Birthday Card for ${name}`}
                className="relative w-full h-auto rounded-xl shadow-2xl object-contain border border-white/10 hover:scale-[1.01] transition-transform duration-300"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BirthdayCardPage;
