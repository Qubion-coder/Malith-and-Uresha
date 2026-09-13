'use client';

import { useState, useEffect } from 'react';

interface VideoIntroProps {
  onComplete: () => void;
}

export default function VideoIntro({ onComplete }: VideoIntroProps) {
  const [guestPrefix, setGuestPrefix] = useState('');
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setGuestPrefix(params.get('prefix') || '');
    setGuestName(params.get('name') || '');
  }, []);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[linear-gradient(180deg,#1f0610_0%,#451022_45%,#1b050d_100%)] overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 h-full w-full opacity-[0.07] mix-blend-screen"
          style={{ backgroundImage: `radial-gradient(circle at 20px 20px, #C9A227 1.1px, transparent 1.1px)`, backgroundSize: '36px 36px' }} />
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#C9A227]/10 blur-[100px]" />
        <div className="absolute right-0 bottom-0 h-[40rem] w-[40rem] rounded-full bg-[#d81b3f]/10 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 p-8 sm:p-12 bg-[#1a0408]/60 backdrop-blur-md rounded-[2.5rem] border border-[#C9A227]/30 shadow-[0_0_50px_rgba(201,162,39,0.15)] max-w-lg w-[90%] mx-auto">
        <div className="text-center mb-2">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#D4AF37] mb-6 tracking-wide drop-shadow-lg">
            <span className="block text-sm sm:text-base tracking-[0.3em] uppercase font-light mb-3 text-[#f5e6c8]/80">The Wedding of</span>
            <span className="block text-[#fff7de] tracking-wider">Malith <span className="text-[#C9A227] italic">&amp;</span> Uresha</span>
          </h1>
          
          <div className="w-full max-w-[200px] mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#C9A227]/50 to-transparent mb-6" />

          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-light text-[#f0daaa]">
            {guestName ? `Dear ${guestPrefix} ${guestName},` : 'You are invited'}
          </p>
          <p className="text-lg sm:text-xl font-serif text-[#f0daaa] mt-2 italic opacity-90">
            {guestName ? 'We Cordially Invite You' : 'To Celebrate Our Love'}
          </p>
        </div>
        
        <button
          onClick={onComplete}
          className="px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white text-sm font-bold tracking-widest uppercase rounded-full hover:scale-105 transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)]"
        >
          Open Invitation
        </button>
      </div>
    </div>
  );
}
