import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Play, ChevronDown } from 'lucide-react';


export default function Hero() {
  const [scene, setScene] = useState('Evening')
const [brightness, setBrightness] = useState(65)
const sceneColors = {
  Morning: 'rgba(255,210,140,0.35)',
  Evening: 'rgba(0,230,200,0.18)',
  Night: 'rgba(0,60,120,0.30)',
}
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (bgRef.current) {
        gsap.from(bgRef.current, { scale: 1.05, opacity: 0, duration: 0.8 });
      }
      if (labelRef.current) {
        tl.from(labelRef.current, { y: 30, opacity: 0, filter: 'blur(8px)', duration: 0.6 }, 0.2);
      }
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.from(words, { y: 40, opacity: 0, stagger: 0.08, duration: 0.8 }, 0.3);
      }
      if (subRef.current) {
        tl.from(subRef.current, { y: 30, opacity: 0, duration: 0.6 }, 0.6);
      }
      if (ctaRef.current) {
        tl.from(ctaRef.current, { y: 20, opacity: 0, scale: 0.9, duration: 0.5 }, 0.8);
      }
      if (cardRef.current) {
        tl.from(cardRef.current, { x: 80, opacity: 0, duration: 1 }, 1.0);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
  ref={bgRef}
  className="absolute inset-0 z-0 transition-all duration-700"
  style={{
    backgroundImage: 'url(/hero-living-room.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: `brightness(${0.7 + brightness / 100})`,
  }}
/>

      {/* Dark Overlays */}

<div
  className="absolute inset-0 z-[1] pointer-events-none"
  style={{
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.75))',
  }}
/>

<div
  className="absolute inset-0 z-[1] pointer-events-none transition-all duration-700"
  style={{
    background: `
      radial-gradient(
        ellipse 80% 60% at 50% 100%,
        ${sceneColors[scene as keyof typeof sceneColors]} 0%,
        transparent 70%
      )
    `,
    mixBlendMode: 'screen',
  }}
/>

<div
  className="absolute inset-0 z-[1] pointer-events-none"
  style={{
    background:
      'radial-gradient(circle at 80% 20%, rgba(0,168,232,0.08) 0%, transparent 50%)',
  }}
/>
      {/* Content */}
      <div className="relative z-10 container-main text-center flex flex-col items-center pt-20">
        <span
          ref={labelRef}
          className="label-style text-[#00E6C8] mb-6"
        >
          THE FUTURE OF HOME LIVING
        </span>

        <h1
          ref={headlineRef}
          className="text-[clamp(48px,6vw,88px)] font-bold leading-[0.95] tracking-[-0.03em] text-white text-glow mb-6"
        >
          <span className="word inline-block">Your</span>{' '}
          <span className="word inline-block">Home,</span>{' '}
          <span className="word inline-block">Your</span>{' '}
          <span className="word inline-block">Way</span>
        </h1>

        <p
          ref={subRef}
          className="text-lg md:text-xl text-white/65 max-w-[560px] mb-10 leading-relaxed"
        >
          Where technology meets lifestyle. Premium smart home automation designed around you.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#products"
            className="gradient-bg text-[#0D0D0F] font-semibold text-sm px-8 py-3.5 rounded-full hover:brightness-110 hover:scale-[1.03] transition-all duration-300"
          >
            Explore Products
          </a>
          <button className="flex items-center gap-2 text-white border border-white/30 px-8 py-3.5 rounded-full hover:border-[#00E6C8] hover:bg-[rgba(0,230,200,0.08)] transition-all duration-300 text-sm font-medium">
            <Play size={16} fill="currentColor" />
            Watch Video
          </button>
        </div>
      </div>

      {/* Floating Smart Card */}

  <div
    ref={cardRef}
    className="absolute bottom-20 right-8 lg:right-16 z-20 hidden lg:block animate-float"
  >
        <div className="glass rounded-2xl relative z-[100] p-5 w-[280px] border border-white/10 shadow-float">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-white">Living Room</span>
            <span className="text-xs text-[#00E6C8] font-mono">24°C</span>
          </div>
          <div className="flex gap-2 mb-4">
  {['Morning', 'Evening', 'Night'].map((item) => (
    <button
      key={item}
      onClick={() => {
        setScene(item)

        if (item === 'Morning') setBrightness(100)
        if (item === 'Evening') setBrightness(65)
        if (item === 'Night') setBrightness(25)
      }}
      className={`cursor-pointer text-xs px-3 py-1.5 rounded-full transition-all duration-300 ${
        scene === item
          ? 'bg-[#00E6C8] text-black border border-[#00E6C8]'
          : 'bg-white/5 text-white/60 border border-white/10 hover:border-white/20'
      }`}
    >
      {item}
    </button>
  ))}
</div>
          <div className="flex items-center gap-3">
  <span className="text-xs text-white/40">Brightness</span>

  <input
    type="range"
    min="0"
    max="100"
    value={brightness}
    onChange={(e) => setBrightness(Number(e.target.value))}
    className="flex-1 accent-[#00E6C8]"
  />

  <span className="text-xs text-white/60 font-mono">
    {brightness}%
  </span>
</div>
        </div>
      </div>
      

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
        <ChevronDown className="w-6 h-6 text-white/40" />
      </div>
    </section>
  );
}
