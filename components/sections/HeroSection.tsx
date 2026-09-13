'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cross, Heart, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  const [guestPrefix, setGuestPrefix] = useState('');
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setGuestPrefix(params.get('prefix') || '');
    setGuestName(params.get('name') || '');
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-[50%_25%] bg-no-repeat blur-[3px] scale-105"
        style={{ backgroundImage: 'url(/images/2.jpg)' }}
      />

      {/* Improved vignette overlay to show the image while keeping text readable */}
      <div className="absolute inset-0 bg-black/30 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.7)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-screen">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(rgba(240,218,170,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(240,218,170,0.25) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col items-center justify-center px-4 pb-16 pt-28 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f0daaa]/55 bg-black/30 px-5 py-2 backdrop-blur-sm"
        >
          <Cross className="h-4 w-4 text-[#f0daaa]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#f0daaa] sm:text-xs">
            Wedding Invitation
          </span>
          <Cross className="h-4 w-4 text-[#f0daaa]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.1 }}
          className="font-serif text-4xl font-light leading-tight tracking-[0.08em] text-[#fff7e8] sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-xl"
        >
          MALITH <span className="text-[#f0daaa] drop-shadow-md">&amp;</span> URESHA
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.25 }}
          className="mt-6 flex flex-col items-center max-w-3xl text-[10px] sm:text-xs md:text-sm uppercase tracking-widest leading-loose text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-semibold bg-black/20 px-6 py-8 rounded-3xl backdrop-blur-[2px]"
        >
          <p className="text-white drop-shadow-md">Loving Son of Mr. Janaka Cooray &amp; Mrs. Sunila</p>
          <p className="my-3 italic lowercase text-[#f0daaa] font-medium tracking-widest">together with</p>
          <p className="text-white drop-shadow-md">Loving Daughter of Mr. Kaminda Vijayantha &amp; Mrs. Priyanga</p>
          <p className="mt-8 text-white/90 drop-shadow-md">Request the pleasure of the company of</p>
          {guestName && (
            <p className="mt-4 font-semibold text-[#f0daaa] text-sm sm:text-base drop-shadow-md">{guestPrefix} {guestName}</p>
          )}
          <div className="w-full max-w-md h-px bg-white/20 my-5"></div>
          <p className="text-white/90 drop-shadow-md">On the occasion of their marriage</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-8 rounded-3xl border border-[#f0daaa]/45 bg-black/35 px-6 py-5 backdrop-blur-sm sm:px-10"
        >
          <p className="text-xs uppercase tracking-[0.28em] text-[#f0daaa]">Sunday, October 25, 2026</p>
          <p className="mt-2 font-serif text-2xl text-[#fff7e8] sm:text-3xl">At 7:00 PM</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.55 }}
          className="mt-8 flex items-center gap-3 text-[#f0daaa]"
        >
          <Sparkles className="h-4 w-4" />
          <Heart className="h-4 w-4 fill-current" />
          <Sparkles className="h-4 w-4" />
        </motion.div>
      </div>
    </section>
  );
}
