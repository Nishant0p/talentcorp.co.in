import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Share2, PartyPopper, Check, Copy, User, Heart } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { fetchSingleType, extractMediaUrl } from '../utils/strapi';

// Helper to convert an image URL to a File object for native sharing
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

    const colors = ['#6C63FF', '#9B5CFF', '#FF4FD8', '#4F8CFF', '#F7B733', '#ffffff', '#55efc4'];
    const particles = [];
    const particleCount = 240;

    for (let i = 0; i < particleCount; i++) {
      const isLeft = i < particleCount / 2;
      const angle = isLeft
        ? (Math.random() * 50 + 25) * (Math.PI / 180)
        : (Math.random() * 50 + 105) * (Math.PI / 180);

      const speed = Math.random() * 30 + 15;

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

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50 w-full h-full" />;
};

// Glowing Floating Particles
const GlowParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const list = [];
    for (let i = 0; i < 28; i++) {
      list.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 5 + 3,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 4,
        color: ['#6C63FF', '#9B5CFF', '#FF4FD8', '#F7B733', '#4F8CFF'][Math.floor(Math.random() * 5)],
      });
    }
    setParticles(list);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0.1, scale: 0.8 }}
          animate={{ opacity: [0.15, 0.85, 0.15], scale: [0.8, 1.5, 0.8] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
          className="absolute rounded-full"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 12px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
};

// Floating Translucent Balloons Background
const FloatingBalloons = () => {
  const [balloons, setBalloons] = useState([]);

  useEffect(() => {
    const list = [];
    const colors = ['#6C63FF', '#9B5CFF', '#FF4FD8', '#4F8CFF', '#F7B733'];
    for (let i = 0; i < 14; i++) {
      list.push({
        id: i,
        left: Math.random() * 92,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 6,
        duration: Math.random() * 4 + 8,
        size: Math.random() * 20 + 36,
      });
    }
    setBalloons(list);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      <style>{`
        @keyframes balloonFloat {
          0% { transform: translateY(110vh) rotate(0deg); opacity: 0; }
          15% { opacity: 0.25; }
          85% { opacity: 0.25; }
          100% { transform: translateY(-15vh) rotate(15deg); opacity: 0; }
        }
        .balloon-el {
          position: absolute;
          border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
          animation: balloonFloat infinite linear;
        }
        .balloon-el::after {
          content: '';
          position: absolute;
          bottom: -16px;
          left: 48%;
          width: 1px;
          height: 16px;
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
      {balloons.map((b) => (
        <div
          key={b.id}
          className="balloon-el"
          style={{
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size * 1.25}px`,
            backgroundColor: b.color,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            filter: 'blur(1px)',
            boxShadow: `inset -4px -4px 10px rgba(0,0,0,0.3), 0 0 15px ${b.color}`,
          }}
        />
      ))}
    </div>
  );
};

// Fireworks SVG Overlay
const FireworksDecoration = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-15 select-none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(150, 180)">
      <circle cx="0" cy="0" r="40" fill="none" stroke="#FF4FD8" strokeWidth="1" strokeDasharray="4 6" className="animate-spin-slow" />
      <circle cx="0" cy="0" r="70" fill="none" stroke="#6C63FF" strokeWidth="1" strokeDasharray="3 8" />
    </g>
    <g transform="translate(1050, 240)">
      <circle cx="0" cy="0" r="50" fill="none" stroke="#F7B733" strokeWidth="1" strokeDasharray="5 7" />
      <circle cx="0" cy="0" r="85" fill="none" stroke="#9B5CFF" strokeWidth="1" strokeDasharray="4 10" />
    </g>
  </svg>
);

const BirthdayCardPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Dynamic state from URL parameters or Strapi API
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const [tenure, setTenure] = useState('');

  const [confettiActive, setConfettiActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSharing, setIsSharing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Mouse Parallax for Hero section
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [4, -4]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-4, 4]), { stiffness: 100, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const triggerPopper = () => {
    setConfettiActive(false);
    setTimeout(() => setConfettiActive(true), 50);
  };

  const handleSharePosterImage = async () => {
    if (!image) return;
    try {
      setIsSharing(true);
      const safeName = (name || 'tspl-member').toLowerCase().replace(/\s+/g, '-');
      const fileName = `${safeName}-birthday-poster.jpg`;
      const file = await fetchImageAsFile(image, fileName);

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Happy Birthday ${name || 'Team Member'}!`,
          text: `Wishing a very Happy Birthday to ${name || 'our team member'}! 🎂🎉`,
        });
      } else {
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
      const qTenure = searchParams.get('tenure');

      if (qName || qRole || qMsg || qImg) {
        if (qName) setName(qName);
        if (qRole) setRole(qRole);
        if (qMsg) setMessage(qMsg);
        if (qImg) setImage(qImg);
        if (qTenure) setTenure(qTenure);
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
            if (b.tenure) setTenure(b.tenure);
            if (b.image) {
              const url = extractMediaUrl(b.image);
              if (url) setImage(url);
            }
          }
        } catch (err) {
          console.warn('Failed to load Strapi birthday spotlight:', err);
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
      <div className="min-h-screen bg-[#070B1A] flex items-center justify-center text-white font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-[#6C63FF] border-t-transparent rounded-full animate-spin shadow-[0_0_25px_#6C63FF]" />
          <p className="text-lg tracking-wider font-bold text-slate-300 animate-pulse">Loading Celebration...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#070B1A] text-slate-100 flex flex-col items-center justify-center py-16 sm:py-24 px-4 sm:px-8 font-sans overflow-x-hidden select-none"
    >
      {/* Dynamic Background Glow Blobs (15% Opacity, 80px Blur) */}
      <div className="absolute top-0 left-1/4 w-[550px] h-[550px] bg-[#6C63FF] opacity-15 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[550px] h-[550px] bg-[#9B5CFF] opacity-15 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-[#FF4FD8] opacity-15 rounded-full blur-[80px] pointer-events-none" />

      {/* Floating Sparkles & Balloon Decorations */}
      <GlowParticles />
      <FloatingBalloons />
      <FireworksDecoration />

      {/* Confetti Explosion Canvas */}
      <FullPageConfetti active={confettiActive} onClose={() => setConfettiActive(false)} />

      {/* Back Button Navigation */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        onClick={() => navigate('/news-events')}
        className="fixed top-6 left-6 z-40 flex items-center gap-2 text-slate-300 hover:text-white bg-[#10172D]/90 hover:bg-[#151E38] backdrop-blur-md border border-[#2E3B66] px-5 py-2.5 rounded-2xl transition-all cursor-pointer font-semibold shadow-lg text-sm"
      >
        <ArrowLeft size={18} />
        Back to News &amp; Events
      </motion.button>

      {/* Main Centered Container (max-width: 1200px, padding: 80px 40px, radius: 32px) */}
      <motion.main
        style={{ rotateX, rotateY }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full max-w-[1200px] px-6 sm:px-10 py-12 sm:py-20 rounded-[32px] flex flex-col items-center text-center"
      >
        {/* Top Celebration Badge */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#6C63FF]/30 bg-[#151E38]/90 backdrop-blur-md px-5 py-2 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#F7B733] shadow-[0_0_20px_rgba(108,99,255,0.2)]"
        >
          <Sparkles size={16} className="text-[#F7B733] animate-pulse" />
          ✨ TSPL Spotlight Celebration
        </motion.div>

        {/* Hero Title: Happy Birthday */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-4xl sm:text-5xl md:text-[56px] font-extrabold leading-none tracking-[-2px] text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] via-[#9B5CFF] to-[#FF4FD8] mb-10"
        >
          Happy Birthday
        </motion.h1>

        {/* Employee Card (Background: #10172D, Padding: 48px, Radius: 28px, Glass Effect) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="relative w-full max-w-[850px] mb-12 rounded-[28px] bg-[#10172D]/95 border border-white/10 backdrop-blur-[18px] p-8 sm:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.5)] flex flex-col items-center overflow-hidden"
        >
          {/* Animated Gradient Border Shimmer Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6C63FF] via-[#9B5CFF] via-[#FF4FD8] to-[#F7B733] animate-pulse" />

          {/* Employee Avatar & Name Card */}
          <div className="flex flex-col sm:flex-row items-center gap-5 mb-6 text-center sm:text-left">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#6C63FF] p-0.5 bg-gradient-to-r from-[#6C63FF] to-[#FF4FD8] shadow-lg shrink-0">
              {image ? (
                <img src={image} alt={name || 'Employee'} className="w-full h-full object-cover rounded-full" />
              ) : (
                <div className="w-full h-full bg-[#151E38] flex items-center justify-center text-[#6C63FF]">
                  <User size={32} />
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl sm:text-[34px] font-bold text-white leading-tight">
                {name || 'Team Member'}
              </h2>
              <div className="mt-1 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <span className="text-sm font-semibold text-slate-300 opacity-80">
                  {role || 'TSPL Team'}
                </span>
                {tenure && (
                  <span className="rounded-full bg-[#6C63FF]/20 border border-[#6C63FF]/40 px-3 py-0.5 text-xs font-bold text-[#4F8CFF]">
                    {tenure}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description Paragraph (18px, 400, line-height: 1.8, max-width: 650px) */}
          {message && (
            <p className="text-base sm:text-[18px] font-normal text-slate-300 leading-[1.8] max-w-[650px] text-center border-t border-white/5 pt-6">
              {message}
            </p>
          )}

          {/* Action Buttons Row (Height: 56px, Radius: 16px, Gap: 20px, Padding: 22px 34px) */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-[20px] w-full">
            {/* Primary Action Button */}
            <button
              onClick={handleSharePosterImage}
              disabled={isSharing}
              className="w-full sm:w-auto h-[56px] px-[34px] rounded-[16px] bg-[#6C63FF] hover:bg-[#7A72FF] text-white font-bold text-base flex items-center justify-center gap-3 transition-all duration-200 shadow-[0_20px_50px_rgba(108,99,255,0.25)] hover:-translate-y-[3px] cursor-pointer disabled:opacity-60"
            >
              <Share2 size={20} />
              {isSharing ? 'Preparing Poster...' : 'Share Poster Image'}
            </button>

            {/* Secondary Action Button */}
            <button
              onClick={triggerPopper}
              className="w-full sm:w-auto h-[56px] px-[34px] rounded-[16px] bg-transparent border border-[#2E3B66] hover:border-[#6C63FF] text-slate-200 hover:text-white font-bold text-base flex items-center justify-center gap-3 transition-all duration-200 hover:-translate-y-[3px] cursor-pointer"
            >
              <PartyPopper size={20} className="text-[#F7B733]" />
              Pop Confetti
            </button>

            {/* Copy Link Button */}
            <button
              onClick={handleCopyLink}
              title={copiedLink ? 'Link Copied!' : 'Copy Page Link'}
              className="h-[56px] w-[56px] rounded-[16px] bg-transparent border border-[#2E3B66] hover:border-[#6C63FF] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-[3px] cursor-pointer shrink-0"
            >
              {copiedLink ? <Check size={20} className="text-emerald-400" /> : <Copy size={20} />}
            </button>
          </div>
        </motion.div>

        {/* Large Birthday Poster Container (max-width: 850px, border-radius: 24px, shadow) */}
        {image && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="w-full max-w-[850px] overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#10172D] shadow-[0_30px_80px_rgba(0,0,0,0.45)] group relative"
          >
            <img
              src={image}
              alt={`${name || 'Employee'} Birthday Poster`}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.01]"
            />
          </motion.div>
        )}
      </motion.main>
    </div>
  );
};

export default BirthdayCardPage;
