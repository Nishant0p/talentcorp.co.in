import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Share2, PartyPopper, Check, Copy, User, Heart, Cake, Send, ChevronLeft, ChevronRight, X, Mail, MessageCircle } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
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

    // Populate initial batch (fewer, for an elegant start)
    const initialCount = 60;
    for (let i = 0; i < initialCount; i++) {
      const isLeft = i < initialCount / 2;
      const angle = isLeft
        ? (Math.random() * 45 + 30) * (Math.PI / 180)
        : (Math.random() * 45 + 105) * (Math.PI / 180);

      const speed = Math.random() * 18 + 10;

      particles.push({
        x: isLeft ? 0 : canvas.width,
        y: canvas.height,
        vx: Math.cos(angle) * speed * (isLeft ? 1 : -1),
        vy: -Math.sin(angle) * speed,
        r: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 12 - 6,
        tiltAngleIncremental: Math.random() * 0.1 + 0.04,
        tiltAngle: 0,
        opacity: 1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Continuously spawn new slow particles from the bottom corners
      if (particles.length < 180 && Math.random() < 0.45) {
        const isLeft = Math.random() < 0.5;
        const angle = isLeft
          ? (Math.random() * 40 + 35) * (Math.PI / 180) // 35 to 75 degrees
          : (Math.random() * 40 + 105) * (Math.PI / 180); // 105 to 145 degrees
        const speed = Math.random() * 12 + 8; // slow drift speed

        particles.push({
          x: isLeft ? 0 : canvas.width,
          y: canvas.height,
          vx: Math.cos(angle) * speed * (isLeft ? 1 : -1),
          vy: -Math.sin(angle) * speed,
          r: Math.random() * 5 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          tilt: Math.random() * 10 - 5,
          tiltAngleIncremental: Math.random() * 0.08 + 0.03,
          tiltAngle: 0,
          opacity: 1,
        });
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.22; // low gravity float
        p.vx *= 0.985;
        p.vy *= 0.985;

        p.tiltAngle += p.tiltAngleIncremental;
        p.tilt = Math.sin(p.tiltAngle) * 12;

        if (p.vy > 0 && p.y > canvas.height * 0.2) {
          p.opacity -= 0.007; // elegant fade-out
        }

        // Clean up out of bounds or dead particles
        if (p.opacity <= 0 || p.y > canvas.height + 20 || p.x < -20 || p.x > canvas.width + 20) {
          particles.splice(i, 1);
          continue;
        }

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

      animationFrameId = requestAnimationFrame(animate);
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
  const [birthdays, setBirthdays] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [confettiActive, setConfettiActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSharing, setIsSharing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isWishesModalOpen, setIsWishesModalOpen] = useState(false);
  const [customWish, setCustomWish] = useState('');
  const [copiedWish, setCopiedWish] = useState(false);

  // Derived properties from active birthday
  const activeBirthday = birthdays[currentIndex] || {};
  const type = activeBirthday.type || 'birthday';
  const name = activeBirthday.name || '';
  const role = activeBirthday.role || '';
  const message = activeBirthday.message || '';
  const image = activeBirthday.image || '';
  const tenure = activeBirthday.tenure || '';
  const phone = activeBirthday.phone || '';

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
      const fileName = `${safeName}-${type}-poster.jpg`;
      const file = await fetchImageAsFile(image, fileName);

      const encodedName = encodeURIComponent(name);
      const encodedRole = encodeURIComponent(role);
      const encodedImage = encodeURIComponent(image);
      const encodedMsg = encodeURIComponent(message);
      const pageUrl = `${window.location.origin}/birthday-card?type=${type}&name=${encodedName}&role=${encodedRole}&image=${encodedImage}&msg=${encodedMsg}`;

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: type === 'welcome' ? `Welcome Aboard ${name || 'Team Member'}!` : `Happy Birthday ${name || 'Team Member'}!`,
          text: type === 'welcome' 
            ? `Wishing a warm Welcome to ${name || 'our new team member'}! 🤝✨\n\nOpen card here: ${pageUrl}`
            : `Wishing a very Happy Birthday to ${name || 'our team member'}! 🎂🎉\n\nOpen card here: ${pageUrl}`,
        });
      } else {
        const shareText = type === 'welcome'
          ? `Wishing a warm Welcome to ${role ? role + ' ' : ''}${name}! 🤝✨ Click to open card: ${pageUrl}`
          : `Wishing a very Happy Birthday to ${role ? role + ' ' : ''}${name}! 🎂🎉 Click to open wishing card: ${pageUrl}`;
        try {
          await navigator.clipboard.writeText(shareText);
        } catch (clipErr) {
          console.warn('Clipboard write failed:', clipErr);
        }

        const url = window.URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        alert(`🎉 Poster downloaded & wishes copied to clipboard!\n\nYou can now upload the photo directly and paste the wishing text.`);
      }
    } catch (err) {
      console.warn('Share poster failed:', err);
      window.open(image, '_blank');
    } finally {
      setIsSharing(false);
    }
  };

  const handleCopyLink = () => {
    const encodedName = encodeURIComponent(name);
    const encodedRole = encodeURIComponent(role);
    const encodedImage = encodeURIComponent(image);
    const encodedMsg = encodeURIComponent(message);
    const pageUrl = `${window.location.origin}/birthday-card?type=${type}&name=${encodedName}&role=${encodedRole}&image=${encodedImage}&msg=${encodedMsg}`;

    const shareText = type === 'welcome'
      ? `Wishing a warm Welcome to ${role ? role + ' ' : ''}${name}! 🤝✨ Click to open welcome card: ${pageUrl}`
      : `Wishing a very Happy Birthday to ${role ? role + ' ' : ''}${name}! 🎂🎉 Click to open wishing card: ${pageUrl}`;
    navigator.clipboard.writeText(shareText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const handleSendWishes = () => {
    const defaultWish = type === 'welcome'
      ? `Welcome to the TSPL family, ${name}! Thrilled to have you onboard and looking forward to working with you! 🤝✨`
      : `Wishing you a very Happy Birthday, ${name}! Hope you have a fantastic day ahead! 🎂🎉`;
    setCustomWish(defaultWish);

    if (phone) {
      const cleanPhone = phone.replace(/\D/g, '');
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(defaultWish)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      setIsWishesModalOpen(true);
    }
  };

  const sendWhatsAppWish = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(customWish)}`;
    window.open(whatsappUrl, '_blank');
  };

  const sendEmailWish = () => {
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(type === 'welcome' ? `Welcome ${name}!` : `Happy Birthday ${name}!`)}&body=${encodeURIComponent(customWish)}`;
    window.open(mailtoUrl, '_blank');
  };

  const copyCustomWish = () => {
    navigator.clipboard.writeText(customWish);
    setCopiedWish(true);
    setTimeout(() => setCopiedWish(false), 2000);
  };

  const handleNext = () => {
    if (birthdays.length <= 1) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % birthdays.length);
    triggerPopper();
  };

  const handlePrev = () => {
    if (birthdays.length <= 1) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + birthdays.length) % birthdays.length);
    triggerPopper();
  };

  useEffect(() => {
    const initData = async () => {
      const parseParamArray = (paramName) => {
        const allVal = searchParams.getAll(paramName);
        if (allVal.length === 0) return [];
        if (allVal.length === 1 && allVal[0].includes(',')) {
          return allVal[0].split(',').map(s => decodeURIComponent(s.trim()));
        }
        return allVal;
      };

      const qTypes = parseParamArray('type');
      const qNames = parseParamArray('name');
      const qRoles = parseParamArray('role');
      const qMsgs = parseParamArray('msg');
      const qImgs = parseParamArray('image');
      const qTenures = parseParamArray('tenure');
      const qPhones = parseParamArray('phone');

      if (qNames.length > 0 || qRoles.length > 0 || qMsgs.length > 0 || qImgs.length > 0) {
        const items = [];
        const maxLength = Math.max(qNames.length, qRoles.length, qMsgs.length, qImgs.length, qTenures.length, qPhones.length);
        for (let i = 0; i < maxLength; i++) {
          items.push({
            type: qTypes[i] || 'birthday',
            name: qNames[i] || '',
            role: qRoles[i] || '',
            message: qMsgs[i] || '',
            image: qImgs[i] || '',
            tenure: qTenures[i] || '',
            phone: qPhones[i] || '',
          });
        }
        setBirthdays(items);
        setLoading(false);
        triggerPopper();
      } else {
        try {
          const data = await fetchSingleType(
            '/api/news-events-page?populate[birthdaySpotlight][populate]=image&populate[welcomeSpotlight][populate]=image'
          );
          let items = [];
          if (data) {
            if (data.birthdaySpotlight) {
              const b = data.birthdaySpotlight;
              if (Array.isArray(b)) {
                items.push(...b.map(item => ({ ...item, type: 'birthday', image: item.image ? extractMediaUrl(item.image) : '' })));
              } else if (b.name) {
                items.push({ ...b, type: 'birthday', image: b.image ? extractMediaUrl(b.image) : '' });
              }
            }
            if (data.welcomeSpotlight) {
              const w = data.welcomeSpotlight;
              if (Array.isArray(w)) {
                items.push(...w.map(item => ({ ...item, type: 'welcome', image: item.image ? extractMediaUrl(item.image) : '' })));
              } else if (w.name) {
                items.push({ ...w, type: 'welcome', image: w.image ? extractMediaUrl(w.image) : '' });
              }
            }
          }
          if (items.length > 0) {
            setBirthdays(items);
          } else {
            setBirthdays([
              {
                type: 'birthday',
                name: 'Pooja Ingle',
                role: 'HR Recruiter',
                message: 'Join us in wishing a very Happy Birthday to our HR Recruiter, Pooja Ingle! We wish you continued growth, great success, and lasting happiness.',
                image: 'https://backend.tsplgroup.in/uploads/Whats_App_Image_2026_08_01_at_16_04_27_f763ed2bcf.jpeg',
              }
            ]);
          }
        } catch (err) {
          console.warn('Failed to load Strapi spotlights:', err);
          setBirthdays([
            {
              type: 'birthday',
              name: 'Pooja Ingle',
              role: 'HR Recruiter',
              message: 'Join us in wishing a very Happy Birthday to our HR Recruiter, Pooja Ingle! We wish you continued growth, great success, and lasting happiness.',
              image: 'https://backend.tsplgroup.in/uploads/Whats_App_Image_2026_08_01_at_16_04_27_f763ed2bcf.jpeg',
            }
          ]);
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

      {/* Fixed Navigation Arrows (Desktop Flanking) */}
      {birthdays.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex h-14 w-14 items-center justify-center rounded-full border border-slate-700/60 bg-[#10172D]/90 text-slate-300 hover:text-white hover:border-[#f7d54b] transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xl"
            aria-label="Previous birthday"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={handleNext}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex h-14 w-14 items-center justify-center rounded-full border border-slate-700/60 bg-[#10172D]/90 text-slate-300 hover:text-white hover:border-[#f7d54b] transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xl"
            aria-label="Next birthday"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}

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

      {/* Main Centered Container */}
      <motion.main
        style={{ rotateX, rotateY }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full max-w-[650px] px-4 py-8 rounded-[32px] flex flex-col items-center text-center"
      >
        {/* Top Celebration Badge */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#f7d54b]/40 bg-[#1a150c]/80 backdrop-blur-md px-6 py-2.5 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#f7d54b] shadow-[0_0_20px_rgba(247,213,75,0.15)]"
        >
          {type === 'welcome' ? (
            <>
              <Sparkles size={16} className="text-[#f7d54b] animate-bounce" />
              TSPL Welcome Spotlight
            </>
          ) : (
            <>
              <Cake size={16} className="text-[#f7d54b] animate-bounce" />
              TSPL Spotlight Celebration
            </>
          )}
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight text-white mb-2 text-center uppercase"
        >
          {type === 'welcome' ? `WELCOME ABOARD, ${name}!` : `HAPPY BIRTHDAY, ${name}!`}
        </motion.h1>

        {/* Role Subtitle */}
        {role && (
          <div className={`mb-6 text-xs sm:text-sm font-extrabold tracking-widest uppercase text-center ${type === 'welcome' ? 'text-blue-400' : 'text-[#f7d54b]'}`}>
            {role}
          </div>
        )}

        {/* Photo Poster Container with overlapping Copy button */}
        <AnimatePresence mode="wait">
          {image && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.4 }}
              className={`relative w-full max-w-[320px] sm:max-w-[400px] mb-8 overflow-visible rounded-2xl border-2 border-double p-1 shadow-xl z-10 ${
                type === 'welcome' 
                  ? 'border-blue-500/30 bg-gradient-to-br from-blue-500 to-indigo-600' 
                  : 'border-[#f7d54b]/30 bg-gradient-to-br from-[#f7d54b] to-orange-500'
              }`}
            >
              <img
                src={image}
                alt={`${name || 'Employee'} Poster`}
                className="w-full h-auto object-cover rounded-xl"
              />
              <button
                onClick={handleCopyLink}
                className={`absolute -top-3 -right-3 z-20 h-9 w-9 rounded-full bg-[#10172D]/95 border flex items-center justify-center transition-all cursor-pointer shadow-lg hover:bg-[#1a223f] ${
                  type === 'welcome'
                    ? 'border-blue-400/60 text-blue-400 hover:border-blue-400'
                    : 'border-[#f7d54b]/60 text-[#f7d54b] hover:border-[#f7d54b]'
                }`}
                title="Copy Page Link"
              >
                <Copy size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Description Paragraph */}
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="text-xs sm:text-base font-normal text-slate-300 leading-[1.8] max-w-[500px] mb-8 text-center px-4"
          >
            {message || (type === 'welcome'
              ? `Welcome to the TSPL family! We are thrilled to have you lead our operations.`
              : `Join us in wishing a very Happy Birthday to our ${role}, ${name}! We wish you continued growth, great success, and lasting happiness.`)}
          </motion.p>
        </AnimatePresence>

        {/* Action Buttons Block (Stacked Vertically) */}
        <div className="flex flex-col gap-4 w-full max-w-[400px] px-4 mb-6">
          {/* Send Wishes Button */}
          <button
            onClick={handleSendWishes}
            className="h-[56px] w-full rounded-[16px] bg-[#f7d54b] hover:bg-[#ffe26b] active:scale-98 text-[#070B1A] font-extrabold text-base flex items-center justify-center gap-3 transition-all duration-200 shadow-[0_15px_30px_rgba(247,213,75,0.15)] cursor-pointer"
          >
            <Send size={18} />
            Send Wishes
          </button>

          {/* Share Poster Image Button */}
          {image && (
            <button
              onClick={handleSharePosterImage}
              disabled={isSharing}
              className="h-[56px] w-full rounded-[16px] bg-[#e65100] hover:bg-[#f57c00] active:scale-98 text-white font-extrabold text-base flex items-center justify-center gap-3 transition-all duration-200 shadow-[0_15px_30px_rgba(230,81,0,0.2)] cursor-pointer disabled:opacity-60"
            >
              <Share2 size={18} />
              {isSharing ? 'Preparing Poster...' : 'Share Poster Image'}
            </button>
          )}

          {/* Pop Confetti Button */}
          <button
            onClick={triggerPopper}
            className="h-[56px] w-full rounded-[16px] bg-white/10 hover:bg-white/15 border border-white/10 active:scale-98 text-white font-extrabold text-base flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer"
          >
            <PartyPopper size={18} className="text-[#f7d54b]" />
            Pop Confetti
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        {birthdays.length > 1 && (
          <div className="flex gap-2.5 mb-6 z-30">
            {birthdays.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  triggerPopper();
                }}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex ? 'w-6 bg-[#f7d54b]' : 'w-2.5 bg-slate-600 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Copy Page Link (Flanked by navigation on mobile) */}
        <div className="flex items-center gap-6 mb-8 z-30">
          {birthdays.length > 1 && (
            <button
              onClick={handlePrev}
              className="h-12 w-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center active:scale-90 cursor-pointer md:hidden"
              aria-label="Previous birthday"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          <button
            onClick={handleCopyLink}
            title={copiedLink ? 'Link Copied!' : 'Copy Page Link'}
            className="h-[56px] w-[56px] rounded-[16px] bg-[#10172D]/90 border border-slate-700/50 hover:border-[#f7d54b] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
          >
            {copiedLink ? <Check size={20} className="text-emerald-400" /> : <Copy size={20} />}
          </button>

          {birthdays.length > 1 && (
            <button
              onClick={handleNext}
              className="h-12 w-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center active:scale-90 cursor-pointer md:hidden"
              aria-label="Next birthday"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </motion.main>

      {/* Wishes Modal */}
      <AnimatePresence>
        {isWishesModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWishesModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full max-w-lg bg-[#10172D] border border-slate-700/60 rounded-[28px] p-6 sm:p-8 shadow-[0_25px_50px_rgba(0,0,0,0.6)] text-left overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsWishesModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Send Birthday Wishes
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Customize your birthday message for <span className="text-[#f7d54b] font-semibold">{name}</span>:
              </p>

              {/* Message text area */}
              <textarea
                value={customWish}
                onChange={(e) => setCustomWish(e.target.value)}
                className="w-full h-32 px-4 py-3 bg-slate-900 border border-slate-700/80 rounded-2xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#f7d54b] transition-all resize-none text-sm leading-relaxed mb-6 font-sans"
                placeholder="Write your wishes here..."
              />

              {/* Action Choices */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={sendWhatsAppWish}
                  className="h-12 w-full rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer shadow-lg"
                >
                  <MessageCircle size={18} />
                  Send via WhatsApp
                </button>

                <button
                  onClick={sendEmailWish}
                  className="h-12 w-full rounded-xl bg-[#6C63FF] hover:bg-[#5b52f2] text-white font-bold flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer shadow-lg"
                >
                  <Mail size={18} />
                  Send via Email
                </button>

                <button
                  onClick={copyCustomWish}
                  className="h-12 w-full rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer"
                >
                  {copiedWish ? (
                    <>
                      <Check size={18} className="text-emerald-400" />
                      Wishes Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={18} />
                      Copy Wishes Text
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BirthdayCardPage;
