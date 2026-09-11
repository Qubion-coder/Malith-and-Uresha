'use client';

import { useState, useEffect, useRef } from 'react';

interface VideoIntroProps {
  onComplete: () => void;
}

export default function VideoIntro({ onComplete }: VideoIntroProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [guestPrefix, setGuestPrefix] = useState('');
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setGuestPrefix(params.get('prefix') || '');
    setGuestName(params.get('name') || '');
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      <video
        ref={videoRef}
        src="/images/Video Project 7.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        onEnded={onComplete}
        playsInline
      />
      
      {!isPlaying && (
        <div className="relative z-10 flex flex-col items-center gap-6 p-8 sm:p-12 bg-black/40 backdrop-blur-md rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-lg w-[90%] mx-auto">
          <div className="text-center mb-2">
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#D4AF37] mb-6 tracking-wide drop-shadow-lg">
              <span className="block text-sm sm:text-base tracking-[0.3em] uppercase font-light mb-3 text-white/80">The Wedding of</span>
              <span className="block text-white/95 tracking-wider">Malith <span className="text-[#D4AF37]/80 italic">&amp;</span> Uresha</span>
            </h1>
            
            <div className="w-full max-w-[200px] mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mb-6" />

            <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-light text-[#f0daaa]">
              {guestName ? `Dear ${guestPrefix} ${guestName},` : 'You are invited'}
            </p>
            <p className="text-lg sm:text-xl font-serif text-[#f0daaa] mt-2 italic opacity-90">
              {guestName ? 'We Cordially Invite You' : 'To Celebrate Our Love'}
            </p>
          </div>
          
          <button
            onClick={handlePlay}
            className="px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white text-sm font-bold tracking-widest uppercase rounded-full hover:scale-105 transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)]"
          >
            Play Invitation
          </button>
          
          <button
            onClick={onComplete}
            className="text-xs text-white/50 uppercase tracking-widest hover:text-white transition-colors mt-2"
          >
            Skip Video
          </button>
        </div>
      )}
      
      {isPlaying && (
        <>
          {/* Elegant floating text while video plays */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center">
             <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase font-light text-white/60 mb-2 drop-shadow-lg">
               The Wedding of
             </p>
             <h2 className="font-serif text-2xl sm:text-3xl text-white/90 tracking-widest drop-shadow-xl">
               Malith <span className="italic text-[#D4AF37]/90">&amp;</span> Uresha
             </h2>
          </div>

          <button
            onClick={onComplete}
            className="absolute top-6 right-6 z-20 px-5 py-2.5 bg-black/30 backdrop-blur-md text-white text-[10px] sm:text-xs uppercase tracking-widest rounded-full border border-white/20 hover:bg-black/50 transition-colors shadow-lg"
          >
            Skip Intro
          </button>
        </>
      )}
    </div>
  );
}
