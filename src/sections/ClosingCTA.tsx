import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import LeadForm from '../components/Leadform';

export default function ClosingCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          scale: 1.05,
          duration: 20,
          ease: 'none',
          yoyo: true,
          repeat: -1,
        });
      }

      if (contentRef.current) {
        const children = contentRef.current.children;
        gsap.from(children[0], {
          filter: 'blur(12px)',
          opacity: 0,
          y: 20,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        });
        gsap.from(children[1], {
          y: 20,
          opacity: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        });
        gsap.from(children[2], {
          scale: 0.9,
          opacity: 0,
          duration: 0.6,
          delay: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/closing-future-living.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-[#0D0D0F]/60 z-[1]" />
      <div className="absolute inset-0 z-[1]" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,230,200,0.12) 0%, transparent 70%)', mixBlendMode: 'screen' }} />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 container-main text-center flex flex-col items-center">
        <h2 className="text-[clamp(40px,5vw,72px)] font-bold leading-[0.95] tracking-[-0.03em] text-white text-glow mb-6">
          The Future of Home<br />Living Is Here
        </h2>
        <p className="text-lg md:text-xl text-white/65 max-w-[560px] mb-10 leading-relaxed">
          Step into a world where innovation meets comfort. A home that listens, responds, and adapts to your needs effortlessly.
        </p>
        <button
  onClick={() => setOpenForm(true)}
  className="gradient-bg text-[#0D0D0F] font-semibold text-base px-10 py-4 rounded-full hover:brightness-110 hover:scale-[1.03] transition-all duration-300 mb-8"
>
  Get Started Today
</button>
        <span className="label-style text-white/40">
          WELCOME TO THE FUTURE. WELCOME HOME.
        </span>
      </div>
      <LeadForm
  isOpen={openForm}
  onClose={() => setOpenForm(false)}
/>
    </section>
  );
}
