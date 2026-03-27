import React, { useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  CheckCircle2, Globe2, ShieldCheck, Trophy, 
  Award, Star, Users, MapPin, Building2 
} from 'lucide-react';

// Counter Component
const CountUpNumber = ({ target, duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = target / (duration * 60);
    let animationFrameId;

    const animate = () => {
      start += increment;
      if (start < target) {
        setCount(Math.floor(start));
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}+</span>;
};

const StatsSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax effect for background circle
  const yParallax = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  // Trust badge staggered animation
  const badgeVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.12,
        duration: 0.7,
        ease: 'easeOut',
      },
    }),
  };

  // Image hover tilt effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left - rect.width / 2) / 20,
      y: (e.clientY - rect.top - rect.height / 2) / 20,
    });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div ref={containerRef} className="bg-white py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Decor - Seamless textures */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Slanting line pattern overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, rgba(37,99,235,0.05) 0px, rgba(37,99,235,0.05) 1px, transparent 1px, transparent 16px)',
          }}
        />
        {/* Parallax corner dot-fade texture */}
        <motion.div
          className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full opacity-35 pointer-events-none"
          style={{
            y: yParallax,
            backgroundImage:
              'radial-gradient(circle, rgba(249,115,22,0.24) 1px, transparent 1px), radial-gradient(circle at center, rgba(249,115,22,0.14) 0%, rgba(249,115,22,0.05) 55%, transparent 76%)',
            backgroundSize: '14px 14px, 100% 100%',
          }}
        />
        {/* Additional top-left texture */}
        <motion.div
          className="absolute -left-24 -top-20 h-80 w-80 rounded-full opacity-30 pointer-events-none"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [-100, 50]),
            backgroundImage:
              'radial-gradient(circle, rgba(37,99,235,0.2) 1px, transparent 1px), radial-gradient(circle at center, rgba(37,99,235,0.12) 0%, rgba(37,99,235,0.04) 55%, transparent 76%)',
            backgroundSize: '14px 14px, 100% 100%',
          }}
        />
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          
          {/* LEFT: Image with Floating Stats */}
          <motion.div className="relative" variants={itemVariants}>
            <motion.div
              className="rounded-[3rem] overflow-hidden shadow-2xl relative group cursor-move"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{
                rotateX: mousePosition.y,
                rotateY: mousePosition.x,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ perspective: 1000 }}
            >
              <img
                src="/happy-excited-executive-business-team-600nw-2424450635.jpg.webp"
                alt="Happy partners"
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay for Image readability */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent"></div>
            </motion.div>

            {/* Floating Badge 1: Verified Partner */}
            <motion.div
              className="absolute top-8 left-8 bg-white/80 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-xl flex items-center gap-3"
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 4,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
            >
              <div className="bg-emerald-500 p-2 rounded-lg text-white">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Verified Partner</p>
                <p className="text-[10px] text-gray-500 font-medium">Govt. of India</p>
              </div>
            </motion.div>

            {/* Floating Badge 2: Placements Card */}
            <motion.div
              className="absolute -bottom-10 -right-6 lg:right-10 bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-50 flex items-center gap-6"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3.5,
                ease: 'easeInOut',
                repeat: Infinity,
                delay: 0.3,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-blue-600 p-4 rounded-2xl text-white shadow-lg shadow-blue-200">
                <Users size={32} />
              </div>
              <div>
                <h3 className="text-4xl font-black text-gray-900 leading-none">
                  <CountUpNumber target={40000} duration={1.5} />
                </h3>
                <p className="text-gray-500 font-bold mt-1 uppercase tracking-wider text-xs">Successful Placements</p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Feature List & Mini Stats */}
          <motion.div className="space-y-10 relative" variants={itemVariants}>
            {/* Texture overlay for this section */}
            <div className="absolute -inset-8 pointer-events-none overflow-hidden rounded-3xl">
              {/* Darker slanting line pattern */}
              <div
                className="absolute inset-0 opacity-55"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(135deg, rgba(37,99,235,0.08) 0px, rgba(37,99,235,0.08) 1px, transparent 1px, transparent 16px)',
                }}
              />
              {/* Top-right corner dot-fade */}
              <div
                className="absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-25"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(249,115,22,0.15) 1px, transparent 1px), radial-gradient(circle at center, rgba(249,115,22,0.1) 0%, rgba(249,115,22,0.02) 55%, transparent 76%)',
                  backgroundSize: '14px 14px, 100% 100%',
                }}
              />
              {/* Bottom-left corner dot-fade in blue */}
              <div
                className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full opacity-20"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(37,99,235,0.12) 1px, transparent 1px), radial-gradient(circle at center, rgba(37,99,235,0.08) 0%, rgba(37,99,235,0.02) 55%, transparent 76%)',
                  backgroundSize: '14px 14px, 100% 100%',
                }}
              />
            </div>

            <h2 className="text-5xl font-extrabold text-gray-900 leading-tight relative z-10">
              Why TSPL is the <span className="text-blue-600">Right Choice</span>
            </h2>

            <div className="space-y-4 relative z-10">
              {[
                { text: "Pan-India presence across 25+ states", icon: <MapPin size={18} /> },
                { text: "Direct partnerships with government bodies", icon: <Building2 size={18} /> },
                { text: "Dedicated compliance & support teams", icon: <ShieldCheck size={18} /> },
                { text: "Real-time tracking & reporting dashboards", icon: <Globe2 size={18} /> },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-blue-100 hover:bg-white transition-all group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <div className="bg-white p-2 rounded-lg text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <span className="font-semibold text-gray-700">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Mini Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 relative z-10">
              {[
                { val: 10, lab: "Years", icon: <Trophy className="text-blue-600" /> },
                { val: 25, lab: "States", icon: <MapPin className="text-blue-600" /> },
                { val: 50, lab: "Sectors", icon: <Building2 className="text-blue-600" /> },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="bg-blue-50/50 p-6 rounded-[2rem] text-center border border-blue-100"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <div className="flex justify-center mb-2">{stat.icon}</div>
                  <p className="text-2xl font-black text-gray-900">
                    <CountUpNumber target={stat.val} duration={1.2} />
                  </p>
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{stat.lab}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* BOTTOM: Trust Badges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Government Authorized", tag: "Official Partner", val: "100", desc: "Compliant with all norms", icon: <ShieldCheck />, color: "blue" },
            { title: "World Record Holder", tag: "World Record", val: "#1", desc: "Recognized globally", icon: <Trophy />, color: "orange" },
            { title: "Excellence Award", tag: "2024 Winner", val: "15", desc: "Awards for contribution", icon: <Award />, color: "orange" },
            { title: "ISO Certified", tag: "ISO 9001", val: "98", desc: "Satisfaction rate", icon: <Star />, color: "blue" },
          ].map((card, i) => (
            <motion.div
              key={i}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
              custom={i}
              variants={badgeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className={`mb-6 p-3 w-fit rounded-xl ${card.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                {React.cloneElement(card.icon, { size: 24 })}
              </div>
              <div className="flex justify-between items-end mb-4">
                <span className={`text-[10px] font-black px-3 py-1 rounded uppercase tracking-tighter ${card.color === 'blue' ? 'bg-blue-600 text-white' : 'bg-orange-500 text-white'}`}>
                  {card.tag}
                </span>
                <span className="text-3xl font-black text-gray-900">
                  {card.val === "#1" ? "#1" : <CountUpNumber target={parseInt(card.val)} duration={1.2} />}
                  {card.val !== "#1" && "%"}
                </span>
              </div>
              <h4 className="font-bold text-gray-900 text-lg mb-1">{card.title}</h4>
              <p className="text-gray-500 text-sm font-medium">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default StatsSection;

