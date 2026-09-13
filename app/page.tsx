'use client';

import { useState, useEffect, useRef } from 'react';
import VideoIntro from '@/components/VideoIntro';
import HeroSection from '@/components/sections/HeroSection';
import StorySection from '@/components/sections/StorySection';
import CeremonyDetails from '@/components/sections/CeremonyDetails';
import CountdownSection from '@/components/sections/CountdownSection';
import GallerySection from '@/components/sections/GallerySection';
import VenueLocation from '@/components/sections/VenueLocation';
import RSVPSection from '@/components/sections/RSVPSection';
import BlessingsSection from '@/components/sections/BlessingsSection';
import FooterSection from '@/components/sections/FooterSection';


export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleOpen = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.4; // 40% volume for background
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add('scroll-smooth');
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden bg-background">
      <audio ref={audioRef} src="/Edd_Sheeran_-_Perfect_(mp3.pm).mp3" loop />
      
      {!isOpened ? (
        <VideoIntro onComplete={handleOpen} />
      ) : (
        <>
          <HeroSection />
          <CeremonyDetails />
          <CountdownSection />
          <GallerySection />
          <VenueLocation />
          <RSVPSection />
          <BlessingsSection />
          <FooterSection />
        </>
      )}
    </div>
  );
}
