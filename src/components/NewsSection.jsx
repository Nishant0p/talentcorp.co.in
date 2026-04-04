import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { ArrowRight, Calendar, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const newsItems = [
  {
    date: 'March 28, 2026',
    tag: 'Event',
    title: 'National Apprenticeship Mela 2026',
    desc: 'Join us in Mumbai for the largest hiring drive of the year with over 50+ partner companies.',
    img: 'https://i.pinimg.com/736x/af/c5/88/afc58894fd4d7cc33b9e4aeffdf03759.jpg',
  },
  {
    date: 'March 15, 2026',
    tag: 'News',
    title: 'TSPL Hits 40,000 Placements Milestone',
    desc: 'We are proud to announce that we have successfully transformed the careers of 40k+ candidates.',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80',
  },
  {
    date: 'Feb 10, 2026',
    tag: 'Updates',
    title: 'New Government Policy on NATS 2.0',
    desc: 'Understanding the new stipend benefits and how they affect the modern Indian workforce.',
    img: 'https://i.pinimg.com/736x/4d/ce/cc/4dcecc1aa007866ed59d34ab52b35770.jpg',
  },
];

function NewsScene() {
  return (
    <group>
      <Float speed={2.8} rotationIntensity={0.45} floatIntensity={1.2}>
        <Sphere args={[1.08, 48, 48]} position={[-4.8, -0.45, -4.0]}>
          <MeshDistortMaterial
            color="#FF8C00"
            emissive="#ffb347"
            emissiveIntensity={0.28}
            speed={1.6}
            distort={0.24}
            roughness={0.08}
            metalness={0.05}
          />
        </Sphere>
      </Float>

      <Float speed={3.2} rotationIntensity={0.55} floatIntensity={1.35}>
        <Sphere args={[0.84, 48, 48]} position={[4.25, -1.7, -3.8]}>
          <MeshDistortMaterial
            color="#2f80ff"
            emissive="#7ec3ff"
            emissiveIntensity={0.34}
            speed={1.5}
            distort={0.26}
            roughness={0.1}
            metalness={0.1}
          />
        </Sphere>
      </Float>

      <ambientLight intensity={0.9} />
      <pointLight position={[5, 8, 6]} intensity={0.45} color="#cfe9ff" />
      <pointLight position={[-5, 2, 4]} intensity={0.42} color="#ffbf73" />
    </group>
  );
}

const NewsSection = () => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  return (
    <section id="news-events" className="relative overflow-hidden bg-white py-10 md:py-16">
      {isDesktop && (
        <div className="pointer-events-none absolute inset-0 z-0 opacity-50">
          <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 42 }} gl={{ antialias: true, powerPreference: 'high-performance' }}>
            <Suspense fallback={null}>
              <NewsScene />
            </Suspense>
          </Canvas>
        </div>
      )}

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(255,140,0,0.06) 0%, rgba(47,128,255,0.08) 100%), repeating-linear-gradient(90deg, rgba(255,140,0,0.018) 0px, rgba(255,140,0,0.018) 1px, transparent 1px, transparent 20px)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          className="mb-12 flex flex-col gap-4 md:mb-16 md:gap-6 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          >
            <motion.span
              className="inline-block rounded-full bg-orange-50 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-orange-600"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Stay Updated
            </motion.span>
            <motion.h2
              className="mt-4 mb-4 text-3xl md:text-4xl font-extrabold text-[#1a2b4b] sm:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Latest <span className="text-orange-500">News & Events</span>
            </motion.h2>
            <motion.p
              className="text-base md:text-lg text-gray-500"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              Check out the latest happenings at TSPL and the Indian job market.
            </motion.p>
          </motion.div>

          <motion.button
            className="group flex items-center gap-2 border-b-2 border-orange-100 pb-1 font-bold text-orange-500 transition-all hover:gap-4 whitespace-nowrap"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ x: 4 }}
          >
            View All Updates <ArrowRight size={20} />
          </motion.button>
        </motion.div>

        <motion.div
          className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          {newsItems.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-2xl md:rounded-[2.2rem] border border-gray-100 bg-white/45 shadow-sm backdrop-blur-md transition-all duration-500 hover:shadow-2xl hover:shadow-blue-100/60"
            >
              <motion.div
                className="relative h-48 md:h-56 overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.1 }}
              >
                <motion.img
                  src={item.img}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.1 + 0.2 }}
                />
                <motion.div
                  className="absolute left-4 top-4 rounded-lg bg-white/90 px-3 py-1 text-[10px] font-bold text-gray-900 backdrop-blur-sm"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.25 }}
                >
                  {item.tag}
                </motion.div>
              </motion.div>

              <motion.div
                className="p-6 md:p-8"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.15 }}
              >
                <motion.div
                  className="mb-4 flex items-center gap-2 text-sm font-bold text-orange-500"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                >
                  <Calendar size={16} />
                  <span>{item.date}</span>
                </motion.div>
                <motion.h3
                  className="mb-4 text-xl md:text-2xl font-bold text-gray-900 transition-colors group-hover:text-orange-500 line-clamp-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.25 }}
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  className="mb-6 md:mb-8 leading-relaxed text-gray-500 line-clamp-2 md:line-clamp-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                >
                  {item.desc}
                </motion.p>

                <motion.button
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-50 py-3 md:py-4 font-bold text-orange-500 transition-all group-hover:bg-orange-500 group-hover:text-white text-sm md:text-base"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.35 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Read More <ExternalLink size={18} />
                </motion.button>
              </motion.div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;
