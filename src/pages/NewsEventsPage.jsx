import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Award, Calendar, MapPin, ChevronLeft, ChevronRight, Cake, Star, Share2, Copy, Check, Download, X } from 'lucide-react';
import { extractMediaUrl, fetchNews, fetchSingleType } from '../utils/strapi';
import localNews from '../data/localNews';

const defaultNewsEventsContent = {
  pageContent: {
    heroTitleLeft: 'NEWS',
    heroTitleRight: '& EVENTS',
  },
  hero: {
    featureImage: '/news and event/news nap.png',
    featureTag: 'Featured',
    featureTitle: 'NAPS/NATS Top Rank Recognition',
    eventCount: '247',
    eventCountLabel: 'Events This Year',
    quickAccessTitle: 'QUICK ACCESS',
    quickAccessItems: ['Announcements', 'Calendar', 'Gallery'],
    milestonesLeft: 'Milestones, Moments',
    milestonesRight: 'Memories',
    milestonesSubtitle: 'All in one place',
    awardTitle: 'Record and Rank Holder',
    awardSubtitle: 'World Record and Top Regional Performance',
  },
  spotlightFeature: {
    image: '/news and event/image (1).png',
    tag: 'Awards',
    date: 'March 15, 2026',
    title: 'Medhavi Skills University Inaugurates Work Integrated ITI (CTS) programme under Flexi-MoU scheme of DGT',
    readMoreUrl: '/news-events/medhavi-flexi-iti',
  },
  spotlightCards: [
    {
      category: 'News',
      title: "Poster Trailer of Dr. Mahiboob Sayyad's Third Book 'Apprenticeship Act 1961' Launched in Goa",
      date: 'April 5, 2026',
      img: 'https://backend.tsplgroup.in/uploads/Whats_App_Image_2026_05_17_at_21_29_50_a23ccb68f7.jpeg',
      readMoreUrl: '/news-events/poster-trailer-2026',
    },
    {
      category: 'Events',
      title: 'Annual Skill Summit 2026 Draws 5000+ Participants in Pune',
      date: 'February 28, 2026',
      img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400',
      readMoreUrl: '/news-events',
    },
    {
      category: 'Partnerships',
      title: 'TSPL Partners with Leading IT Companies for Campus Placements',
      date: 'February 20, 2026',
      img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400',
      readMoreUrl: '/news-events',
    },
  ],
  allUpdates: [
    {
      type: 'news',
      category: 'News',
      title: "Poster Trailer of Dr. Mahiboob Sayyad's Third Book 'Apprenticeship Act 1961' Launched in Goa",
      date: 'April 5, 2026',
      image: 'https://backend.tsplgroup.in/uploads/Whats_App_Image_2026_05_17_at_21_29_50_a23ccb68f7.jpeg',
    },
    {
      type: 'news',
      category: 'Events',
      title: 'Annual Skill Summit 2026 Draws 5000+ Participants in Pune',
      date: 'February 28, 2026',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400',
    },
    {
      type: 'quote',
      text: '“Empowering 1 Million Youth by 2027 — Our Mission Continues”',
      bgColor: 'bg-[#006bb8]',
    },
    {
      type: 'news',
      category: 'Partnerships',
      title: 'TSPL Partners with Leading IT Companies for Campus Placements',
      date: 'February 20, 2026',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400',
    },
    {
      type: 'news',
      category: 'Nature',
      title: 'Expanding our green initiative footprint across rural sectors',
      date: 'February 15, 2026',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400',
    },
    {
      type: 'quote',
      text: '“World Book of Records holder with 40,000+ trainees and 450+ clients served”',
      bgColor: 'bg-orange-500',
    },
    {
      type: 'news',
      category: 'Milestones',
      title: 'Strategic growth vision for the upcoming fiscal year',
      date: 'February 10, 2026',
      image: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=400',
    },
  ],
  upcomingEvents: [],
  pastEvents: [
    {
      date: '20',
      month: 'JUL',
      title: 'TSPL Group Yearly Trip 2026 – A Memorable Monsoon Adventure to Kaas Plateau & Mahabaleshwar',
      loc: 'TSPL GROUP, Pune',
    },
    {
      date: '28',
      month: 'MAR',
      title: 'TSPL Group Family Get-Together & Inauguration of the 31st Office at Talegaon',
      loc: 'TSPL GROUP, Pune',
    },
    {
      date: '08',
      month: 'MAR',
      title: 'International Women’s Day Celebration 2026 at TSPL Group',
      loc: 'TSPL GROUP, Pune',
    },
  ],
  birthdayUpcoming: [
    { name: 'Priya Sharma', dept: 'Operations', date: 'Oct 12', initial: 'PS' },
    { name: 'Rahul Verma', dept: 'Training', date: 'Oct 15', initial: 'RV' },
    { name: 'Anita Desai', dept: 'HR', date: 'Oct 18', initial: 'AD' },
  ],
  birthdaySpotlight: {
    name: 'Pooja Ingle',
    role: 'HR Recruiter',
    message: 'Join us in wishing a very Happy Birthday to our HR Recruiter, Pooja Ingle! We wish you continued growth, great success, and lasting happiness.',
    image: 'https://backend.tsplgroup.in/uploads/Whats_App_Image_2026_08_01_at_16_04_27_f763ed2bcf.jpeg',
  },
  welcomeUpcoming: [
    { name: 'Amit Patel', dept: 'Engineering', date: 'Oct 01', initial: 'AP' },
    { name: 'Sanjana Rao', dept: 'Marketing', date: 'Oct 05', initial: 'SR' },
  ],
  welcomeSpotlight: {
    name: 'Vikram Malhotra',
    role: 'Operations Director',
    message: 'Welcome to the TSPL family! We are thrilled to have you lead our operations.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=900',
  },
  inTheNewsLogos: [
    'Times of India',
    'Economic Times',
    'Business Standard',
    'Hindustan Times',
    'India Today',
    'NDTV',
  ],
  inTheNewsArticles: [
    {
      quote:
        "TSPL Group has emerged as a game-changer in India's skilling ecosystem, bridging the gap between education and employment.",
      source: 'Economic Times',
      date: 'March 2026',
    },
    {
      quote:
        'With innovative training methodologies and industry partnerships, TSPL is setting new benchmarks in workforce development.',
      source: 'Business Standard',
      date: 'February 2026',
    },
    {
      quote:
        "The company's commitment to rural skilling initiatives is transforming lives across India's heartland.",
      source: 'India Today',
      date: 'January 2026',
    },
  ],
};
const quickAccessTargets = {
  Announcements: 'announcements',
  Calendar: 'calendar',
  Gallery: 'gallery',
};

// Confetti Effect (Party Popper) Component
const ConfettiEffect = ({ active, onClose }) => {
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
    const particleCount = 160;

    // Spawn particles shooting up from the bottom-left and bottom-right corners
    for (let i = 0; i < particleCount; i++) {
      const isLeft = i < particleCount / 2;
      // Angle: shooting inwards and upwards (35 to 75 deg on left, 105 to 145 deg on right)
      const angle = isLeft
        ? (Math.random() * 40 + 35) * Math.PI / 180
        : (Math.random() * 40 + 105) * Math.PI / 180;

      const speed = Math.random() * 22 + 13;

      particles.push({
        x: isLeft ? 0 : canvas.width,
        y: canvas.height,
        vx: Math.cos(angle) * speed * (isLeft ? 1 : -1),
        vy: -Math.sin(angle) * speed,
        r: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5,
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

        // Fade out as they fall down past the middle of the screen
        if (p.vy > 0 && p.y > canvas.height * 0.5) {
          p.opacity -= 0.015;
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
      if (activeParticles === 0 || framesElapsed > 250) {
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



const resolveNewsEventsContent = (prismicData) => {
  if (!prismicData) return defaultNewsEventsContent;

  const data = prismicData.data || prismicData;
  return {
    ...defaultNewsEventsContent,
    ...data,
    pageContent: {
      ...defaultNewsEventsContent.pageContent,
      ...(data.pageContent || {}),
    },
    hero: {
      ...defaultNewsEventsContent.hero,
      ...(data.hero || {}),
    },
    spotlightFeature: {
      ...defaultNewsEventsContent.spotlightFeature,
      ...(data.spotlightFeature || {}),
    },
    spotlightCards: data.spotlightCards?.length ? data.spotlightCards : defaultNewsEventsContent.spotlightCards,
    allUpdates: data.allUpdates?.length ? data.allUpdates : defaultNewsEventsContent.allUpdates,
    upcomingEvents: data.upcomingEvents?.length ? data.upcomingEvents : defaultNewsEventsContent.upcomingEvents,
    pastEvents: data.pastEvents?.length ? data.pastEvents : defaultNewsEventsContent.pastEvents,
    birthdayUpcoming: data.birthdayUpcoming?.length ? data.birthdayUpcoming : defaultNewsEventsContent.birthdayUpcoming,
    birthdaySpotlight: {
      ...defaultNewsEventsContent.birthdaySpotlight,
      ...(data.birthdaySpotlight || {}),
    },
    welcomeUpcoming: data.welcomeUpcoming?.length ? data.welcomeUpcoming : defaultNewsEventsContent.welcomeUpcoming,
    welcomeSpotlight: {
      ...defaultNewsEventsContent.welcomeSpotlight,
      ...(data.welcomeSpotlight || {}),
    },
    inTheNewsLogos: data.inTheNewsLogos?.length ? data.inTheNewsLogos : defaultNewsEventsContent.inTheNewsLogos,
    inTheNewsArticles: data.inTheNewsArticles?.length ? data.inTheNewsArticles : defaultNewsEventsContent.inTheNewsArticles,
  };
};

const NewsEventsPage = ({ prismicData = null }) => {
  const navigate = useNavigate();
  const heroParallaxRef = useRef(null);
  const birthdaySectionRef = useRef(null);
  const [pageData, setPageData] = useState(null);
  const content = useMemo(() => resolveNewsEventsContent(pageData || prismicData), [pageData, prismicData]);
  const [latestNews, setLatestNews] = useState([]);
  const [showAllNews, setShowAllNews] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (hasTriggeredConfetti || !content.birthdaySpotlight) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setConfettiActive(true);
          setHasTriggeredConfetti(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    const timer = setTimeout(() => {
      if (birthdaySectionRef.current) {
        observer.observe(birthdaySectionRef.current);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [hasTriggeredConfetti, content.birthdaySpotlight]);

  const newsAndUpdatesItems = useMemo(
    () => latestNews.filter((item) => !item.tag || item.tag === 'News' || item.tag === 'Updates' || item.tag === 'Partnerships'),
    [latestNews]
  );



  useEffect(() => {
    if (newsAndUpdatesItems.length <= 1) {
      setCarouselIndex(0);
      return;
    }
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % Math.min(newsAndUpdatesItems.length, 3));
    }, 5000);
    return () => clearInterval(timer);
  }, [newsAndUpdatesItems]);
  const displayedNewsItems = useMemo(
    () => (showAllNews ? newsAndUpdatesItems : newsAndUpdatesItems.slice(0, 3)),
    [newsAndUpdatesItems, showAllNews]
  );
  const eventItems = useMemo(() => latestNews.filter((item) => item.tag === 'Events' || item.tag === 'Event'), [latestNews]);

  const realUpcomingEvents = useMemo(() => {
    const now = new Date();
    const upcomingEvents = latestNews.filter((item) => {
      const isEventOrUpdate =
        item.tag === 'Events' ||
        item.tag === 'Event' ||
        item.category === 'Events' ||
        item.tag === 'Updates' ||
        item.tag === 'Announcement' ||
        item.tag === 'Announcements';
      const itemDate = new Date(item.date);
      return isEventOrUpdate && !isNaN(itemDate.getTime()) && itemDate > now;
    });

    const sortedUpcoming = [...upcomingEvents].sort((a, b) => {
      const dateA = a.date ? new Date(a.date) : new Date(0);
      const dateB = b.date ? new Date(b.date) : new Date(0);
      return dateA - dateB;
    });

    return sortedUpcoming.map((item) => {
      let day = '21';
      let month = 'JUN';
      if (item.date) {
        const d = new Date(item.date);
        if (!isNaN(d.getTime())) {
          day = String(d.getDate()).padStart(2, '0');
          month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
        } else {
          const match = item.date.match(/([A-Za-z]+)\s+(\d+)/);
          if (match) {
            month = match[1].substring(0, 3).toUpperCase();
            day = String(match[2]).padStart(2, '0');
          }
        }
      }
      return {
        date: day,
        month: month,
        title: item.title,
        loc: item.venue || item.location || item.loc || 'TSPL GROUP, Pune',
        readMoreUrl: item.documentId || item.id ? `/news-events/${item.documentId || item.id}` : null,
      };
    });
  }, [latestNews]);

  const realPastEvents = useMemo(() => {
    const now = new Date();
    const pastEvents = latestNews.filter((item) => {
      const isEvent =
        item.tag === 'Events' ||
        item.tag === 'Event' ||
        item.category === 'Events';
      const itemDate = new Date(item.date);
      return isEvent && (isNaN(itemDate.getTime()) || itemDate <= now);
    });

    const sortedPast = [...pastEvents].sort((a, b) => {
      const dateA = a.date ? new Date(a.date) : new Date(0);
      const dateB = b.date ? new Date(b.date) : new Date(0);
      return dateB - dateA;
    });

    return sortedPast.map((item) => {
      let day = '21';
      let month = 'JUN';
      if (item.date) {
        const d = new Date(item.date);
        if (!isNaN(d.getTime())) {
          day = String(d.getDate()).padStart(2, '0');
          month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
        } else {
          const match = item.date.match(/([A-Za-z]+)\s+(\d+)/);
          if (match) {
            month = match[1].substring(0, 3).toUpperCase();
            day = String(match[2]).padStart(2, '0');
          }
        }
      }
      return {
        date: day,
        month: month,
        title: item.title,
        loc: item.venue || item.location || item.loc || 'TSPL GROUP, Pune',
        readMoreUrl: item.documentId || item.id ? `/news-events/${item.documentId || item.id}` : null,
      };
    });
  }, [latestNews]);

  const realSpotlightCards = useMemo(() => {
    const list = latestNews && latestNews.length > 0 ? latestNews : localNews;
    return list.slice(0, 3).map((item) => ({
      category: item.tag || item.category || 'News',
      title: item.title,
      date: item.date || 'Recent',
      img: item.image ? extractMediaUrl(item.image) : 'https://backend.tsplgroup.in/uploads/Whats_App_Image_2026_05_17_at_21_29_50_a23ccb68f7.jpeg',
      readMoreUrl: `/news-events/${item.documentId || item.id}`,
    }));
  }, [latestNews]);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroParallaxRef,
    offset: ['start end', 'end start'],
  });

  const heroFeatureY = useTransform(heroProgress, [0, 1], (reduceMotion || isMobile) ? [0, 0] : [-30, 30]);
  const heroOrangeX = useTransform(heroProgress, [0, 1], (reduceMotion || isMobile) ? [0, 0] : [-28, 22]);
  const heroQuickX = useTransform(heroProgress, [0, 1], (reduceMotion || isMobile) ? [0, 0] : [24, -20]);
  const heroMilestonesX = useTransform(heroProgress, [0, 1], (reduceMotion || isMobile) ? [0, 0] : [-18, 16]);
  const heroAwardY = useTransform(heroProgress, [0, 1], (reduceMotion || isMobile) ? [0, 0] : [22, -18]);

  useEffect(() => {
    const loadLatestNews = async () => {
      const items = await fetchNews();
      const combined = [...(items || []), ...localNews];
      // Sort by date descending (newest first)
      combined.sort((a, b) => {
        const dateA = a.date ? new Date(a.date) : new Date(0);
        const dateB = b.date ? new Date(b.date) : new Date(0);
        return dateB - dateA;
      });
      const uniqueNews = [];
      const seenTitles = new Set();
      combined.forEach((item) => {
        const itemTitle = (item.title || '').trim().toLowerCase();
        if (itemTitle && !seenTitles.has(itemTitle)) {
          seenTitles.add(itemTitle);
          uniqueNews.push(item);
        }
      });
      setLatestNews(uniqueNews);
    };

    loadLatestNews();
  }, []);

  useEffect(() => {
    const loadPageContent = async () => {
      const data = await fetchSingleType('/api/news-events-page?populate[birthdayUpcoming]=*&populate[birthdaySpotlight][populate]=image&populate[welcomeUpcoming]=*&populate[welcomeSpotlight][populate]=image');
      setPageData(data);
    };

    loadPageContent();
  }, []);

  const carouselItem = newsAndUpdatesItems[carouselIndex];

  return (
    <div className="min-h-screen bg-white px-4 sm:px-12 pt-28 sm:pt-32 font-sans">
      <Navbar />

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 6s ease-in-out infinite;
        }
      `}</style>

      <motion.h1
        className="mb-10 text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-black leading-none tracking-tighter whitespace-normal sm:whitespace-nowrap"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="inline-block text-[#006bb8]">{content.pageContent.heroTitleLeft}</span>
        <span className="inline-block text-orange-500"> {content.pageContent.heroTitleRight}</span>
      </motion.h1>

      <motion.div ref={heroParallaxRef} className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:gap-6 md:grid-cols-4">
        <div className="group block h-full cursor-pointer md:col-span-2 md:row-span-2 relative">
          <motion.div
            className="relative h-[320px] overflow-hidden rounded-3xl sm:h-[380px] md:h-full w-full"
            initial={{ opacity: 0, y: 72, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            style={{ y: heroFeatureY }}
          >
            {carouselItem ? (
              <div className="relative w-full h-full">
                <Link to={`/news-events/${carouselItem.documentId || carouselItem.id}`} className="block w-full h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={carouselIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <img
                        src={carouselItem.image ? extractMediaUrl(carouselItem.image) : content.hero.featureImage}
                        alt={carouselItem.title}
                        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent z-10" />
                      <div className="absolute bottom-0 p-8 left-0 right-0 z-20 text-left">
                        <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
                          {carouselItem.tag || 'Featured News'}
                        </span>
                        <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-white leading-tight line-clamp-2">
                          {carouselItem.title}
                        </h3>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </Link>

                {/* Pagination Dots */}
                <div className="absolute bottom-6 right-6 z-30 flex gap-2">
                  {newsAndUpdatesItems.slice(0, 3).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCarouselIndex(idx);
                      }}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        carouselIndex === idx ? 'w-6 bg-[#f7d54b]' : 'w-2 bg-white/40 hover:bg-white/80'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <Link to="/naps" className="block w-full h-full">
                <img
                  src={content.hero.featureImage}
                  alt={content.hero.featureTitle}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 p-8 text-left">
                  <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
                    {content.hero.featureTag}
                  </span>
                  <h3 className="mt-4 text-3xl font-bold text-white">
                    {content.hero.featureTitle}
                  </h3>
                </div>
              </Link>
            )}
          </motion.div>
        </div>

        <motion.div
          className="flex flex-col justify-between rounded-3xl bg-orange-500 p-8 text-white transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-200"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.05 }}
          style={{ x: heroOrangeX }}
        >
          <Sparkles className="h-8 w-8 opacity-50" />
          <div>
            <div className="text-5xl sm:text-6xl font-bold">{content.hero.eventCount}</div>
            <div className="text-lg opacity-90">{content.hero.eventCountLabel}</div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col justify-between rounded-3xl bg-[#006bb8] p-8 text-white transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-200/40"
          initial={{ opacity: 0, x: 42 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.08 }}
          style={{ x: heroQuickX }}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold tracking-widest text-white/60">{content.hero.quickAccessTitle}</span>
            <ArrowRight className="h-5 w-5 text-orange-500" />
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {content.hero.quickAccessItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  if (item === 'Calendar') {
                    navigate('/calendar');
                  } else {
                    const targetId = quickAccessTargets[item];
                    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="rounded-full border border-white/20 px-4 py-2 text-xs transition-colors hover:bg-white hover:text-slate-900"
              >
                {item}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col justify-center rounded-3xl bg-[#006bb8] p-8 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-200/40 md:col-span-1"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.12 }}
          style={{ x: heroMilestonesX }}
        >
          <h3 className="text-2xl font-bold leading-tight text-white">
            {content.hero.milestonesLeft} <span className="text-orange-500">&amp;</span> {content.hero.milestonesRight}
          </h3>
          <p className="mt-2 text-slate-400">{content.hero.milestonesSubtitle}</p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center justify-center rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm transition-all hover:scale-[1.02] hover:shadow-md"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          style={{ y: heroAwardY }}
        >
          <div className="mb-4 rounded-2xl bg-orange-50 p-4">
            <Award className="h-10 w-10 text-orange-500" />
          </div>
          <h4 className="text-lg font-bold leading-tight text-slate-900">{content.hero.awardTitle}</h4>
          <p className="text-sm text-slate-500">{content.hero.awardSubtitle}</p>
        </motion.div>
      </motion.div>

      {newsAndUpdatesItems.length > 0 && (
        <section className="mx-auto mt-14 max-w-7xl">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1.5 rounded-full bg-orange-500" />
              <h2 className="text-3xl font-bold text-[#006bb8]">Latest News &amp; Updates</h2>
            </div>
            <Link
              to="/all-news"
              className="group inline-flex items-center gap-2 rounded-xl border border-orange-500 bg-orange-50 px-4 py-2 text-sm font-bold text-orange-600 transition-all hover:bg-orange-500 hover:text-white shadow-sm cursor-pointer"
            >
              View More News <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {newsAndUpdatesItems.slice(0, 3).map((item) => {
              const itemId = item.documentId || item.id;
              return (
                <Link
                  key={itemId || item.title}
                  to={`/news-events/${itemId}`}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div>
                    <img
                      src={item.image ? extractMediaUrl(item.image) : content.hero.featureImage}
                      alt={item.title || 'News image'}
                      className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">{item.tag || 'News'}</p>
                      <h3 className="mt-2 line-clamp-2 text-lg font-bold text-slate-900 group-hover:text-orange-500 transition-colors">{item.title}</h3>
                      <p className="mt-2 text-sm text-slate-500">{item.date || '-'}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <motion.section
        id="announcements"
        className="mx-auto mt-12 sm:mt-20 max-w-7xl px-0"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="mb-8 sm:mb-10 flex items-center gap-4">
          <div className="h-10 w-1.5 rounded-full bg-orange-500" />
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#006bb8]">Announcements &amp; Events</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12">
          <motion.article
            className="group relative overflow-hidden rounded-[2rem] bg-slate-900 lg:col-span-8 min-h-[420px] sm:min-h-[460px] flex flex-col justify-end p-6 sm:p-10"
            initial={{ opacity: 0, y: 60, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            whileHover={{ y: -4 }}
          >
            <img
              src={content.spotlightFeature.image}
              alt="Spotlight feature image"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
            <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
              <span className="rounded-full bg-orange-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                {content.spotlightFeature.tag}
              </span>
            </div>
            <div className="relative z-10">
              <p className="mb-2 text-xs sm:text-sm text-slate-300">{content.spotlightFeature.date}</p>
              <h3 className="mb-3 text-xl sm:text-2xl md:text-3xl font-bold leading-tight text-white">
                {content.spotlightFeature.title}
              </h3>
              <p className="mb-4 text-xs sm:text-sm leading-relaxed text-slate-300 line-clamp-3 sm:line-clamp-none">
                {content.spotlightFeature.description}
              </p>
              <Link
                to={content.spotlightFeature.readMoreUrl || '/news-events'}
                className="inline-flex items-center gap-2 font-semibold text-orange-500 transition-colors hover:text-orange-400 text-sm sm:text-base"
              >
                Read More <ArrowRight size={18} />
              </Link>
            </div>
          </motion.article>

          <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-6">
            {(eventItems.length > 0
              ? eventItems.slice(0, 3).map((item) => ({
                  category: item.tag || 'Events',
                  title: item.title,
                  date: item.date || 'Recent',
                  img: item.image
                    ? extractMediaUrl(item.image)
                    : 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400',
                  readMoreUrl: `/news-events/${item.documentId || item.id}`,
                }))
              : realSpotlightCards.length > 0
              ? realSpotlightCards
              : content.spotlightCards
            ).map((news, index) => (
              <Link
                key={news.title || index}
                to={news.readMoreUrl || '/news-events'}
                className="block group"
              >
                <motion.article
                  className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.08 }}
                >
                  <img
                    src={news.img}
                    alt={news.title}
                    className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl object-cover shrink-0"
                  />
                  <div className="flex flex-col justify-center min-w-0">
                    <span className="mb-1 text-[10px] font-black uppercase tracking-[0.22em] text-orange-500">
                      {news.category}
                    </span>
                    <h4 className="mb-2 text-sm font-semibold leading-snug text-[#006bb8] transition-colors group-hover:text-orange-500 font-sans line-clamp-2">
                      {news.title}
                    </h4>
                    <p className="text-xs text-slate-400">{news.date}</p>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>




      {/* ── Latest Events Section ── */}
      <motion.section
        id="events"
        className="mx-auto mt-12 sm:mt-24 max-w-7xl px-0"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <div className="mb-8 sm:mb-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-10 w-1.5 rounded-full bg-orange-500" />
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#006bb8]">Latest Events</h2>
          </div>
          <Link
            to="/all-events"
            className="group inline-flex items-center gap-2 rounded-xl border border-orange-500 bg-orange-50 px-4 py-2 text-sm font-bold text-orange-600 transition-all hover:bg-orange-500 hover:text-white shadow-sm cursor-pointer"
          >
            View More Events <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {eventItems.slice(0, 3).map((item) => {
            const itemId = item.documentId || item.id;
            return (
              <Link key={itemId} to={`/news-events/${itemId}`} className="group block">
                <motion.article
                  className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                >
                  <img
                    src={item.image ? extractMediaUrl(item.image) : 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400'}
                    alt={item.title || 'Event image'}
                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">{item.tag || 'Event'}</p>
                    <h3 className="mt-2 line-clamp-2 text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-500">{item.date || '-'}</p>
                  </div>
                </motion.article>
              </Link>
            );
          })}
        </div>

        {eventItems.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center">
            <p className="text-slate-500">No events available yet.</p>
          </div>
        )}
      </motion.section>

      {/* ── Events Gallery Reel Section ── */}
      <motion.section
        id="gallery"
        className="mx-auto mt-12 sm:mt-24 max-w-7xl px-0"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <div className="mb-8 sm:mb-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-10 w-1.5 rounded-full bg-orange-500" />
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#006bb8]">Events Gallery</h2>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => {
                const reel = document.getElementById('events-reel-container');
                if (reel) reel.scrollLeft -= 320;
              }}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 active:scale-95 shadow-sm cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => {
                const reel = document.getElementById('events-reel-container');
                if (reel) reel.scrollLeft += 320;
              }}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 active:scale-95 shadow-sm cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Reel */}
        <div 
          id="events-reel-container"
          className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory py-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {eventItems.length > 0 ? (
            eventItems.map((event, idx) => {
              const eventId = event.documentId || event.id;
              return (
                <Link
                  key={eventId || idx}
                  to={`/news-events/${eventId}`}
                  className="group relative h-[380px] w-[280px] sm:w-[320px] shrink-0 overflow-hidden rounded-[2rem] shadow-md snap-start transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                >
                  <img
                    src={event.image ? extractMediaUrl(event.image) : 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400'}
                    alt={event.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                  
                  <div className="absolute bottom-0 p-6 left-0 right-0 z-10 text-left">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f7d54b]/20 border border-[#f7d54b]/30 text-[#f7d54b] text-[10px] font-bold uppercase tracking-wider mb-3">
                      <Sparkles size={10} /> Event Highlight
                    </span>
                    <h3 className="text-lg font-bold text-white leading-snug line-clamp-2 mb-2 group-hover:text-[#f7d54b] transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-300">
                      <Calendar size={12} className="text-orange-500" />
                      <span>{event.date}</span>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="w-full text-center py-12 text-slate-400">
              No gallery events found.
            </div>
          )}
        </div>
      </motion.section>

      {/* ── Team Celebrations & Welcomes Section ── */}
      {false && content.birthdaySpotlight && (
        <motion.section
          ref={birthdaySectionRef}
          className="mx-auto mt-12 sm:mt-24 max-w-7xl px-0"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes goldShineSweep {
              0% { transform: translateX(-150%) skewX(-15deg); }
              100% { transform: translateX(150%) skewX(-15deg); }
            }
            .gold-shining-card::after {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: linear-gradient(
                to right,
                rgba(247, 213, 75, 0) 0%,
                rgba(247, 213, 75, 0.05) 30%,
                rgba(247, 213, 75, 0.25) 50%,
                rgba(247, 213, 75, 0.05) 70%,
                rgba(247, 213, 75, 0) 100%
              );
              transform: translateX(-100%) skewX(-15deg);
              animation: goldShineSweep 6s infinite ease-in-out;
              pointer-events: none;
              z-index: 5;
            }
          `}} />
          {/* Main Birthday Spotlight Banner */}
          <div className="gold-shining-card overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0c0e2b] via-[#161a4f] to-[#0c0e2b] text-white p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-[0_20px_50px_rgba(247,213,75,0.06)] relative border border-[#f7d54b]/30">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#f7d54b] via-transparent to-transparent" />
            <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-[#f7d54b]/10 blur-3xl pointer-events-none" />
            <div className="absolute -left-24 -top-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none animate-pulse" />
            <Sparkles className="absolute top-8 right-12 text-[#f7d54b] opacity-20 pointer-events-none" size={24} />
            <Cake className="absolute bottom-6 left-12 text-[#f7d54b] opacity-15 pointer-events-none" size={28} />

            {/* Left Side: Text/Content Area */}
            <div className="flex-1 max-w-xl text-center lg:text-left relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f7d54b]/15 text-[#f7d54b] text-xs font-bold uppercase tracking-wider mb-6">
                <Cake size={14} /> Team Celebrations
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
                Birthday Spotlight
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed mb-8">
                {content.birthdaySpotlight.message || `Join us in wishing a very Happy Birthday to our ${content.birthdaySpotlight.role}, ${content.birthdaySpotlight.name}! We wish you continued growth, great success, and lasting happiness.`}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full">
                <button
                  onClick={async () => {
                    const imageUrl = content.birthdaySpotlight.image
                      ? extractMediaUrl(content.birthdaySpotlight.image)
                      : 'https://backend.tsplgroup.in/uploads/Whats_App_Image_2026_08_01_at_16_04_27_f763ed2bcf.jpeg';
                    const bName = content.birthdaySpotlight.name || 'Team Member';
                    const bRole = content.birthdaySpotlight.role || '';
                    const bMsg = content.birthdaySpotlight.message || `Join us in wishing a very Happy Birthday to our ${bRole}, ${bName}! We wish you continued growth, great success, and lasting happiness.`;
                    
                    const encodedName = encodeURIComponent(bName);
                    const encodedRole = encodeURIComponent(bRole);
                    const encodedImage = encodeURIComponent(imageUrl);
                    const encodedMsg = encodeURIComponent(bMsg);

                    const pageUrl = `${window.location.origin}/birthday-card?name=${encodedName}&role=${encodedRole}&image=${encodedImage}&msg=${encodedMsg}`;
                    const fileName = `${bName.toLowerCase().replace(/\s+/g, '-')}-birthday-poster.jpg`;
                    const shareText = `Wishing a very Happy Birthday to ${bRole ? bRole + ' ' : ''}${bName}! 🎂🎉 Open wishing card here: ${pageUrl}`;

                    try {
                      const file = await fetchImageAsFile(imageUrl, fileName);
                      if (navigator.canShare && navigator.canShare({ files: [file] })) {
                        await navigator.share({
                          title: `Happy Birthday ${bName}!`,
                          text: `Wishing a very Happy Birthday to ${bRole ? bRole + ' ' : ''}${bName}! 🎂🎉\n\nOpen wishing card here: ${pageUrl}`,
                          files: [file],
                        });
                        return;
                      } else if (navigator.share) {
                        await navigator.share({
                          title: `Happy Birthday ${bName}!`,
                          text: `Wishing a very Happy Birthday to ${bRole ? bRole + ' ' : ''}${bName}! 🎂🎉`,
                          url: pageUrl,
                        });
                        return;
                      }
                    } catch (err) {
                      if (err.name !== 'AbortError') {
                        console.warn('Native share failed:', err);
                      } else {
                        return;
                      }
                    }
                    // Fallback if native share is not supported by desktop browser
                    try {
                      await navigator.clipboard.writeText(shareText);
                      
                      const response = await fetch(imageUrl);
                      const blob = await response.blob();
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = fileName;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      window.URL.revokeObjectURL(url);

                      alert('🎉 Birthday poster downloaded & wishes copied to clipboard!\n\nYou can now upload the photo directly to your Instagram Story or WhatsApp Status and paste the wishing link.');
                    } catch (clipErr) {
                      console.warn('Fallback sharing copy/download failed:', clipErr);
                      alert('Birthday wishing card link & message copied to clipboard!');
                    }
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#f7d54b] text-[#0d1236] font-bold py-3.5 px-7 rounded-xl transition-all duration-300 hover:bg-white shadow-lg cursor-pointer text-sm sm:text-base"
                >
                  <Share2 size={18} /> Share Card
                </button>
                <button
                  onClick={async () => {
                    const imageUrl = content.birthdaySpotlight.image
                      ? extractMediaUrl(content.birthdaySpotlight.image)
                      : 'https://backend.tsplgroup.in/uploads/Whats_App_Image_2026_08_01_at_16_04_27_f763ed2bcf.jpeg';
                    const bName = content.birthdaySpotlight.name || 'Birthday_Poster';
                    try {
                      const response = await fetch(imageUrl);
                      const blob = await response.blob();
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${bName.replace(/\s+/g, '_')}_Birthday_Poster.jpg`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      window.URL.revokeObjectURL(url);
                    } catch (err) {
                      console.warn('Direct download failed, opening in new tab:', err);
                      window.open(imageUrl, '_blank');
                    }
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent text-white border border-white/20 hover:border-white font-bold py-3.5 px-7 rounded-xl transition-all duration-300 hover:bg-white/10 shadow-lg cursor-pointer text-sm sm:text-base"
                >
                  <Download size={18} /> Download Card
                </button>
              </div>
            </div>

            {/* Right Side: The Image */}
            <div className="flex-1 w-full flex justify-center lg:justify-end">
              <img
                src={content.birthdaySpotlight.image ? extractMediaUrl(content.birthdaySpotlight.image) : 'https://backend.tsplgroup.in/uploads/Whats_App_Image_2026_08_01_at_16_04_27_f763ed2bcf.jpeg'}
                alt={`Happy Birthday ${content.birthdaySpotlight.name}`}
                className="w-full max-w-[320px] sm:max-w-[380px] h-auto rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] object-contain border-2 border-[#f7d54b]/30"
                loading="lazy"
              />
            </div>

          </div>


        </motion.section>
      )}

      <motion.section
        id="in-the-news"
        className="mx-auto mt-12 sm:mt-24 max-w-7xl px-0"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <div className="mb-8 sm:mb-12 flex items-center gap-4">
          <div className="h-10 w-1.5 rounded-full bg-orange-500" />
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#006bb8]">In The News</h2>
        </div>

        <div className="mb-10 sm:mb-14 overflow-hidden rounded-[2rem] border border-white/60 bg-white/60 p-5 shadow-sm backdrop-blur-md">
          <div className="logo-marquee overflow-hidden">
            <div className="logo-marquee-track gap-4 py-2">
              {[...content.inTheNewsLogos, ...content.inTheNewsLogos].map((logo, index) => (
                <div
                  key={`${logo}-${index}`}
                  className="flex h-16 w-56 shrink-0 items-center justify-center rounded-2xl border border-slate-100 bg-white/85 px-5 text-center text-sm font-black uppercase tracking-[0.22em] text-slate-400 grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:text-[#006bb8]"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.inTheNewsArticles.map((article, index) => (
            <motion.article
              key={article.source}
              className="group relative overflow-hidden rounded-[2rem] bg-slate-50 p-6 sm:p-10 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-b-4 hover:border-orange-500"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.06 }}
            >
              <div className="mb-6 text-5xl leading-none text-orange-500/80">“</div>
              <p className="mb-10 font-serif text-lg italic leading-relaxed text-slate-700">
                {article.quote}
              </p>

              <div className="flex items-start gap-3 border-t border-slate-200 pt-6">
                <div className="mt-1 h-6 w-1 rounded-full bg-orange-500" />
                <div>
                  <h4 className="text-base font-bold text-[#006bb8]">{article.source}</h4>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-400">{article.date}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>
      <motion.section
        className="mx-auto mt-12 sm:mt-24 max-w-7xl px-0"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <div className="mb-10 sm:mb-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8 text-orange-500" />
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#006bb8]">Upcoming &amp; Past Events</h2>
          </div>
          <Link
            to="/all-events"
            className="group inline-flex items-center gap-2 rounded-xl border border-orange-500 bg-orange-50 px-4 py-2 text-sm font-bold text-orange-600 transition-all hover:bg-orange-500 hover:text-white shadow-sm cursor-pointer"
          >
            View All Events Directory <ArrowRight size={16} />
          </Link>
        </div>

        <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-slate-100" />

          <div>
            <div className="mb-6 sm:mb-8 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-slate-900">Upcoming</h3>
            </div>

            <div className="relative space-y-8">
              {realUpcomingEvents.length > 0 ? (
                <>
                  <div className="absolute left-8 top-2 bottom-2 w-px bg-slate-200" />
                  {realUpcomingEvents.slice(0, 3).map((event, idx) => (
                    <div
                      key={`${event.title}-${idx}`}
                      className="group relative z-10 flex gap-6 transition-transform duration-300 hover:translate-x-2"
                    >
                      <div className="flex h-20 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-[#006bb8] text-white shadow-lg shadow-blue-900/20">
                        <span className="text-2xl font-black leading-none">{event.date}</span>
                        <span className="mt-1 text-[10px] font-bold tracking-widest">{event.month}</span>
                      </div>
                      <div className="flex flex-1 flex-col justify-center">
                        <h4 className="mb-2 text-lg font-bold leading-tight text-slate-900 transition-colors group-hover:text-orange-500">
                          {event.readMoreUrl ? (
                            <Link to={event.readMoreUrl}>{event.title}</Link>
                          ) : (
                            event.title
                          )}
                        </h4>
                        <div className="flex items-center gap-1 text-sm text-slate-400">
                          <MapPin size={14} className="text-orange-500" />
                          {event.loc}
                        </div>
                        <div className="mt-3 flex items-center gap-4 opacity-0 transition-all group-hover:opacity-100">
                          <Link to="/contact-us" className="inline-flex items-center gap-1 text-sm font-semibold text-[#006bb8] hover:text-orange-500">
                            Register <ChevronRight size={14} />
                          </Link>
                          {event.readMoreUrl && (
                            <Link to={event.readMoreUrl} className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-orange-500">
                              Details <ChevronRight size={14} />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-slate-500 text-sm italic pl-2">No upcoming events scheduled at the moment.</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="mb-6 sm:mb-8 text-lg sm:text-xl font-bold uppercase tracking-wide text-slate-400">Past</h3>

            <div className="relative space-y-8">
              <div className="absolute left-8 top-2 bottom-2 w-px bg-slate-200" />
              {realPastEvents.slice(0, 3).map((event, idx) => (
                <div
                  key={`${event.title}-${idx}`}
                  className="relative z-10 flex gap-6 opacity-80 transition-all hover:opacity-100 hover:translate-x-1"
                >
                  <div className="flex h-20 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-slate-100 text-slate-700 font-bold shadow-sm">
                    <span className="text-2xl font-black leading-none">{event.date}</span>
                    <span className="mt-1 text-[10px] font-bold tracking-widest text-slate-400">{event.month}</span>
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <h4 className="mb-1 text-lg font-bold leading-tight text-slate-800 transition-colors hover:text-orange-500">
                      {event.readMoreUrl ? (
                        <Link to={event.readMoreUrl}>{event.title}</Link>
                      ) : (
                        event.title
                      )}
                    </h4>
                    <div className="flex items-center gap-1 text-sm text-slate-400 font-medium">
                      <MapPin size={14} className="text-orange-400" />
                      {event.loc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <ConfettiEffect active={confettiActive} onClose={() => setConfettiActive(false)} />



      <div className="mt-20 md:mt-24">
        <Footer />
      </div>
    </div>
  );
};

export default NewsEventsPage;