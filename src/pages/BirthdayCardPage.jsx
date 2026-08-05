import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Cake, ArrowLeft, Sparkles, Share2, PartyPopper, Heart, Send, Check, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchSingleType, extractMediaUrl } from '../utils/strapi';

// Helper to convert an image URL (even cross-origin) to a File object for native sharing
const fetchImageAsFile = async (url, fileName = 'birthday-poster.jpg') => {
  try {
    const response = await fetch(url, { mode: 'cors' });
    if (response.ok) {
      const blob = await response.blob();
      return new File([blob], fileName, { type: blob.type || 'image/jpeg' });
    }
  } catch (err) {
    console.warn('Direct fetch failed for image share, attempting canvas fallback:', err);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width || 800;
        canvas.height = img.naturalHeight || img.height || 1000;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(new File([blob], fileName, { type: 'image/jpeg' }));
            } else {
              reject(new Error('Canvas blob creation failed'));
            }
          },
          'image/jpeg',
          0.95
        );
      } catch (canvasErr) {
        reject(canvasErr);
      }
    };
    img.onerror = (imgErr) => reject(imgErr);
    img.src = url;
  });
};

// Canvas Confetti Popper
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

    const colors = ['#f7d54b', '#ff6b6b', '#4dadf7', '#33d9b2', '#ff9f43', '#a55eea', '#ff7675', '#fd79a8'];
    const particles = [];
    const particleCount = 220;

    for (let i = 0; i < particleCount; i++) {
      const isLeft = i < particleCount / 2;
      const angle = isLeft 
        ? (Math.random() * 50 + 25) * Math.PI / 180 
        : (Math.random() * 50 + 105) * Math.PI / 180;
      
      const speed = Math.random() * 30 + 16;

      particles.push({
        x: isLeft ? 0 : canvas.width,
        y: canvas.height,
        vx: Math.cos(angle) * speed * (isLeft ? 1 : -1),
        vy: -Math.sin(angle) * speed,
        r: Math.random() * 7 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 14 - 7,
        tiltAngleIncremental: Math.random() * 0.12 + 0.05,
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
        p.vy += 0.42;
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.tiltAngle += p.tiltAngleIncremental;
        p.tilt = Math.sin(p.tiltAngle) * 14;

        if (p.vy > 0 && p.y > canvas.height * 0.35) {
          p.opacity -= 0.01;
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
      if (activeParticles === 0 || framesElapsed > 320) {
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

// Floating Sparkles Particle Background
const SparkleParticles = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const list = [];
    for (let i = 0; i < 30; i++) {
      list.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5,
      });
    }
    setStars(list);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0.1, scale: 0.8 }}
          animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.4, 0.8] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
          className="absolute rounded-full bg-amber-300 shadow-[0_0_8px_#f7d54b]"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
          }}
        />
      ))}
    </div>
  );
};

// Floating Balloons Component
const FloatingBalloons = () => {
  const [balloons, setBalloons] = useState([]);

  useEffect(() => {
    const balloonColors = ['#ff7675', '#74b9ff', '#55efc4', '#ffeaa7', '#a29bfe', '#fd79a8', '#ffb8b8'];
    const list = [];
    for (let i = 0; i < 22; i++) {
      list.push({
        id: i,
        left: Math.random() * 95,
        color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
        delay: Math.random() * 8,
        speed: Math.random() * 6 + 10,
        size: Math.random() * 20 + 40,
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
            opacity: 0.85;
          }
          90% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(-15vh) translateX(20px) rotate(18deg);
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
  const [isSharing, setIsSharing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const triggerPopper = () => {
    setConfettiActive(false);
    setTimeout(() => setConfettiActive(true), 50);
  };

  // Share Poster Image directly
  const handleSharePosterImage = async () => {
    try {
      setIsSharing(true);
      const fileName = `${name.toLowerCase().replace(/\s+/g, '-')}-birthday-poster.jpg`;
      const file = await fetchImageAsFile(image, fileName);

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Happy Birthday ${name}!`,
          text: `Wishing a very Happy Birthday to ${name}! 🎂🎉`,
        });
      } else {
        // Download image file as fallback
        const url = window.URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.warn('Share poster failed:', err);
      window.open(image, '_blank');
    } finally {
      setIsSharing(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  useEffect(() => {
    const initData = async () => {
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
      <div className="min-h-screen bg-[#070a24] flex items-center justify-center text-white font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-[#f7d54b] border-t-transparent rounded-full animate-spin shadow-[0_0_20px_#f7d54b]" />
          <p className="text-xl tracking-wider font-bold text-amber-200 animate-pulse">Unwrapping Birthday Celebration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#06081e] flex items-center justify-center py-12 px-4 overflow-hidden font-sans select-none">
      {/* Dynamic Background Glows & Particles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-950/60 via-[#070a24] to-black z-0 pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[550px] h-[550px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[550px] h-[550px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Sparkles & Balloons */}
      <SparkleParticles />
      <FloatingBalloons />

      {/* Canvas Popper */}
      <FullPageConfetti active={confettiActive} onClose={() => setConfettiActive(false)} />

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        onClick={() => navigate('/news-events')}
        className="absolute top-6 left-6 z-30 flex items-center gap-2 text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 py-2.5 px-5 rounded-2xl transition-all cursor-pointer font-semibold shadow-lg"
      >
        <ArrowLeft size={18} />
        Back to News & Events
      </motion.button>

      {/* Main Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full max-w-5xl bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-amber-500/20 shadow-[0_30px_90px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        {/* Top Celebration Ribbon Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-500" />

        <div className="flex flex-col lg:flex-row items-center justify-between">
          
          {/* Left Side: Greeting Details */}
          <div className="flex-1 p-8 sm:p-12 lg:p-14 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* Animated Birthday Pill Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(247,213,75,0.2)]"
            >
              <Cake size={16} className="text-amber-400 animate-bounce" />
              TSPL Spotlight Celebration
            </motion.div>

            {/* Glowing Main Titles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none">
                HAPPY
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 mb-4 leading-none drop-shadow-[0_4px_25px_rgba(247,213,75,0.3)]">
                BIRTHDAY!
              </h1>
            </motion.div>

            {/* Employee Name & Role Highlight Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="my-3 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md inline-block"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">{name}</h2>
              <p className="text-xs sm:text-sm font-semibold text-amber-400 tracking-wider uppercase">{role}</p>
            </motion.div>

            {/* Wishes Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed my-4 max-w-lg"
            >
              {message}
            </motion.p>

            {/* Interactive Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 w-full mt-4"
            >
              <a
                href={`mailto:?subject=Happy Birthday ${name}!&body=Dear ${name}, wishing you a very Happy Birthday!`}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-[#0d1236] font-extrabold py-3.5 px-7 rounded-2xl transition-all duration-300 shadow-[0_4px_20px_rgba(247,213,75,0.3)] hover:scale-105 active:scale-95 cursor-pointer text-sm sm:text-base"
              >
                <Send size={16} />
                Send Wishes
              </a>

              <button
                onClick={handleSharePosterImage}
                disabled={isSharing}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold py-3.5 px-7 rounded-2xl transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 cursor-pointer text-sm sm:text-base disabled:opacity-70"
              >
                <Share2 size={16} />
                {isSharing ? 'Preparing Image...' : 'Share Poster Image'}
              </button>

              <button
                onClick={triggerPopper}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-amber-400/50 font-bold py-3.5 px-6 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-sm sm:text-base shadow-md"
              >
                <PartyPopper size={18} className="text-amber-300" />
                Pop Confetti
              </button>

              <button
                onClick={handleCopyLink}
                title={copiedLink ? "Link Copied!" : "Copy Page Link"}
                className={`p-3.5 rounded-2xl border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-sm ${
                  copiedLink
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                    : 'bg-white/5 border-white/15 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {copiedLink ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </motion.div>

          </div>

          {/* Right Side: Glowing Poster Display */}
          <div className="flex-1 w-full p-6 sm:p-10 lg:p-12 flex justify-center items-center bg-slate-950/40 lg:border-l border-white/10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative group max-w-[420px] sm:max-w-[450px] w-full"
            >
              {/* Outer Glowing Halos */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-80 transition duration-700 animate-pulse pointer-events-none" />
              
              <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-slate-900 shadow-2xl">
                <img
                  src={image}
                  alt={`Birthday Poster for ${name}`}
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Subtle sheen highlight effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default BirthdayCardPage;
